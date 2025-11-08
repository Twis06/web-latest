'use client';

import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Photography = () => {
  const photos = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-light mb-2">Photography</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12 font-light">
              A visual collection of moments
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {photos.map((index) => (
              <motion.div
                key={index}
                className="break-inside-avoid mb-6 cursor-pointer group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-900 overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-800 transition-colors font-light">
                    <span className="text-lg">Photo {index}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Photography;
