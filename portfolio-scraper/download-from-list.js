import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOAD_DIR = path.join(__dirname, 'downloaded-images');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Function to download an image
async function downloadImage(url, filename) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000
    });

    const filepath = path.join(DOWNLOAD_DIR, filename);
    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`✗ Failed to download ${filename}:`, error.message);
  }
}

// Extract filename from URL
function extractFilename(url) {
  const urlParts = url.split('/');
  const filename = urlParts[urlParts.length - 1].split('?')[0];
  return filename || `image-${Date.now()}.jpg`;
}

// Main function
async function downloadFromList() {
  console.log('🚀 Starting download from URL list...\n');

  // Read URLs from urls.txt
  const urlsFile = path.join(__dirname, 'urls.txt');
  
  if (!fs.existsSync(urlsFile)) {
    console.error('❌ urls.txt not found!');
    console.log('Create a urls.txt file with one image URL per line.');
    return;
  }

  const urls = fs.readFileSync(urlsFile, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('http'));

  console.log(`📊 Found ${urls.length} URLs to download\n`);

  let successCount = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = extractFilename(url);
    
    console.log(`[${i + 1}/${urls.length}] Downloading: ${filename}`);
    await downloadImage(url, filename);
    successCount++;
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Download complete! ${successCount}/${urls.length} images saved to ${DOWNLOAD_DIR}`);
}

downloadFromList();
