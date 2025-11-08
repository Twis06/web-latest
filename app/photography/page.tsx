'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Categories - add your photos to /public/photography/[category]/
const CATEGORIES = ['2025', '2024', '2023', 'travel', 'food'];

interface Photo {
  src: string;
  category: string;
  filename: string;
}

const Photography = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch photos from API route
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load photos:', err);
        setLoading(false);
      });
  }, []);

  // Filter photos by category
  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-light mb-2">Photography</h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            A visual collection of moments captured through my lens
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-wrap gap-3"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full text-sm font-light transition-all ${
              selectedCategory === 'all'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-light transition-all capitalize ${
                selectedCategory === category
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            Loading photos...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No photos found. Add images to /public/photography/{selectedCategory !== 'all' ? selectedCategory : '[category]'}/
          </div>
        )}

        {/* Masonry Grid - Borderless with original aspect ratios */}
        {!loading && filteredPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="break-inside-avoid mb-4 cursor-pointer group"
                onClick={() => setLightboxImage(photo.src)}
              >
                <div className="overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={`${photo.category} - ${photo.filename}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={75}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox */}
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
            <Image
              src={lightboxImage}
              alt="Fullscreen view"
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              quality={90}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Photography;
