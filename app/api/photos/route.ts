import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PHOTO_CATEGORIES, isPhotoFile } from '@/app/lib/photos';

export const revalidate = 3600;

export async function GET() {
  try {
    const photosDirectory = path.join(process.cwd(), 'public', 'photography');
    const thumbsDirectory = path.join(process.cwd(), 'public', 'photography-thumbs');
    const categories = [...PHOTO_CATEGORIES];
    const hasThumbsDirectory = fs.existsSync(thumbsDirectory);
    
    const photos: Array<{
      previewSrc: string;
      fullSrc: string;
      category: string;
      filename: string;
    }> = [];

    // Check if directory exists
    if (!fs.existsSync(photosDirectory)) {
      return NextResponse.json({ photos: [] });
    }

    // Scan each category folder
    categories.forEach(category => {
      const categoryPath = path.join(photosDirectory, category);
      
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath);
        
        // Filter for image files
        const imageFiles = files.filter((file) => isPhotoFile(file));

        imageFiles.forEach(file => {
          const fullSrc = `/photography/${category}/${file}`;
          const thumbFilename = `${path.parse(file).name}.jpg`;
          const thumbPath = path.join(thumbsDirectory, category, thumbFilename);
          const thumbSrc = `/photography-thumbs/${category}/${thumbFilename}`;

          photos.push({
            previewSrc: hasThumbsDirectory && fs.existsSync(thumbPath) ? thumbSrc : fullSrc,
            fullSrc,
            category: category,
            filename: file,
          });
        });
      }
    });

    return NextResponse.json(
      { photos },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error reading photos:', error);
    return NextResponse.json({ photos: [], error: 'Failed to load photos' }, { status: 500 });
  }
}
