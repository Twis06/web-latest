import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const photosDirectory = path.join(process.cwd(), 'public', 'photography');
    const categories = ['2025', '2024', '2023', 'travel', 'food'];
    
    const photos: Array<{ src: string; category: string; filename: string }> = [];

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
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
        });

        imageFiles.forEach(file => {
          photos.push({
            src: `/photography/${category}/${file}`,
            category: category,
            filename: file,
          });
        });
      }
    });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error reading photos:', error);
    return NextResponse.json({ photos: [], error: 'Failed to load photos' }, { status: 500 });
  }
}
