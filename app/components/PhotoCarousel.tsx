'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoCarouselProps {
  images?: string[];
}

const PhotoCarousel = ({ images = [] }: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const displayImages = Array.from({ length: 5 }, (_, i) => i + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 500 : -500,
      opacity: 0,
      rotateY: dir > 0 ? 20 : -20,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir > 0 ? -500 : 500,
      opacity: 0,
      rotateY: dir > 0 ? -20 : 20,
    }),
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-black">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            rotateY: { duration: 0.6 },
          }}
          className="absolute inset-0 flex items-center justify-center perspective"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black flex items-center justify-center">
            <motion.div
              className="text-6xl font-light text-gray-600 dark:text-gray-700"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Photo {currentIndex + 1}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {displayImages.map((_, index) => (
          <motion.button
            key={index}
            className={`rounded-full transition-all ${
              index === currentIndex ? 'w-8 h-1 bg-white' : 'w-2 h-1 bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
