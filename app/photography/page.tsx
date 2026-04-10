'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PHOTO_CATEGORIES } from '@/app/lib/photos';

// Categories - add your photos to /public/photography/[category]/
const INITIAL_BATCH_SIZE = 20;
const BATCH_SIZE = 16;

interface Photo {
  previewSrc: string;
  fullSrc: string;
  category: string;
  filename: string;
}

const shuffleArray = (array: Photo[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getShuffledByCategory = (allPhotos: Photo[], category: string) => {
  const basePhotos = category === 'all'
    ? allPhotos
    : allPhotos.filter((photo) => photo.category === category);

  return shuffleArray(basePhotos);
};

const Photography = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const selectedCategoryRef = useRef<string>('all');
  const prefetchedFullRes = useRef<Set<string>>(new Set());

  useEffect(() => {
    const controller = new AbortController();

    // Fetch photos from API route
    fetch('/api/photos', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        const nextPhotos = data.photos || [];
        setPhotos(nextPhotos);
        setFilteredPhotos(getShuffledByCategory(nextPhotos, selectedCategoryRef.current));
        setVisibleCount(INITIAL_BATCH_SIZE);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.error('Failed to load photos:', err);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxImage]);

  const handleCategoryChange = (category: string) => {
    selectedCategoryRef.current = category;
    setSelectedCategory(category);
    setFilteredPhotos(getShuffledByCategory(photos, category));
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || loading || visibleCount >= filteredPhotos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredPhotos.length));
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredPhotos.length, loading, visibleCount]);

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);
  const prefetchFullRes = (src: string) => {
    if (prefetchedFullRes.current.has(src)) return;
    const img = new window.Image();
    img.src = src;
    prefetchedFullRes.current.add(src);
  };

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
            moments captured through my lens
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
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-2 rounded-full text-sm font-light transition-all ${
              selectedCategory === 'all'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            All
          </button>
          {PHOTO_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
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
            No photos found. 
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
            {visiblePhotos.map((photo, index) => (
              <div
                key={photo.fullSrc}
                className="break-inside-avoid mb-4 cursor-pointer group"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}
                onMouseEnter={() => prefetchFullRes(photo.fullSrc)}
                onClick={() => setLightboxImage(photo.fullSrc)}
              >
                <div className="overflow-hidden">
                  <Image
                    src={photo.previewSrc}
                    alt={`${photo.category} - ${photo.filename}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={60}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {!loading && filteredPhotos.length > visiblePhotos.length && (
          <div ref={loadMoreRef} className="h-12" aria-hidden />
        )}

        {/* Lightbox */}
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
            <div onClick={(event) => event.stopPropagation()}>
              <Image
                src={lightboxImage}
                alt="Fullscreen view"
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                quality={85}
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Photography;
