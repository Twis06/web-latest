import fs from 'fs';
import path from 'path';

export interface Photo {
  src: string;
  category: string;
  filename: string;
}

export interface PhotoCategory {
  name: string;
  slug: string;
  photos: Photo[];
}

export function getPhotoCategories(): PhotoCategory[] {
  const photosDirectory = path.join(process.cwd(), 'public', 'photography');
  
  // Define category order
  const categoryOrder = ['2025', '2024', '2023', 'travel', 'food'];
  
  const categories: PhotoCategory[] = [];

  // Check if directory exists
  if (!fs.existsSync(photosDirectory)) {
    return categories;
  }

  // Get all subdirectories (categories)
  const categoryFolders = fs.readdirSync(photosDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Sort by predefined order
  const sortedCategories = categoryOrder.filter(cat => categoryFolders.includes(cat));
  
  // Add any additional categories not in the order
  const additionalCategories = categoryFolders.filter(cat => !categoryOrder.includes(cat));
  const allCategories = [...sortedCategories, ...additionalCategories];

  allCategories.forEach(category => {
    const categoryPath = path.join(photosDirectory, category);
    const files = fs.readdirSync(categoryPath);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    const photos: Photo[] = imageFiles.map(file => ({
      src: `/photography/${category}/${file}`,
      category: category,
      filename: file,
    }));

    if (photos.length > 0) {
      categories.push({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        slug: category,
        photos,
      });
    }
  });

  return categories;
}
