import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';

const run = promisify(execFile);
const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'public', 'photography');
const thumbsRoot = path.join(projectRoot, 'public', 'photography-thumbs');
const maxDimension = Number(process.env.PHOTO_THUMB_MAX_DIMENSION ?? '1000');
const jpegQuality = Number(process.env.PHOTO_THUMB_QUALITY ?? '74');
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const ensureDirectory = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const listDirectories = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
};

const listImagesInCategory = async (categoryPath) => {
  const entries = await fs.readdir(categoryPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => allowedExtensions.has(path.extname(filename).toLowerCase()));
};

const shouldRegenerate = async (sourcePath, targetPath) => {
  try {
    const [sourceStat, targetStat] = await Promise.all([fs.stat(sourcePath), fs.stat(targetPath)]);
    return sourceStat.mtimeMs > targetStat.mtimeMs;
  } catch {
    return true;
  }
};

const generateThumbnail = async (sourcePath, outputPath) => {
  await fs.access('/usr/bin/sips');
  const args = [
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    String(jpegQuality),
    '-Z',
    String(maxDimension),
    sourcePath,
    '--out',
    outputPath,
  ];
  await run('/usr/bin/sips', args);
};

const main = async () => {
  try {
    await fs.access('/usr/bin/sips');
  } catch {
    console.log('sips is not available on this machine. Skipping thumbnail generation.');
    return;
  }

  try {
    await fs.access(sourceRoot);
  } catch {
    console.log('No source images found under public/photography. Skipping thumbnail generation.');
    return;
  }

  await ensureDirectory(thumbsRoot);

  const categories = await listDirectories(sourceRoot);
  let generated = 0;
  let skipped = 0;

  for (const category of categories) {
    const categoryPath = path.join(sourceRoot, category);
    const images = await listImagesInCategory(categoryPath);

    if (images.length === 0) continue;

    const outputCategoryPath = path.join(thumbsRoot, category);
    await ensureDirectory(outputCategoryPath);

    for (const filename of images) {
      const sourcePath = path.join(categoryPath, filename);
      const outputFilename = `${path.parse(filename).name}.jpg`;
      const outputPath = path.join(outputCategoryPath, outputFilename);

      if (!(await shouldRegenerate(sourcePath, outputPath))) {
        skipped += 1;
        continue;
      }

      await generateThumbnail(sourcePath, outputPath);
      generated += 1;
    }
  }

  console.log(
    `Thumbnail generation complete. Generated: ${generated}, Skipped (up-to-date): ${skipped}, Max dimension: ${maxDimension}, JPEG quality: ${jpegQuality}`
  );
};

main().catch((error) => {
  console.error('Thumbnail generation failed:', error);
  process.exit(1);
});
