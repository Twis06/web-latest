'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
}

const ParallaxPortfolio = () => {
  const portfolioItems: PortfolioItem[] = [
    { id: 1, title: 'Project One', description: 'Description here' },
    { id: 2, title: 'Project Two', description: 'Description here' },
    { id: 3, title: 'Project Three', description: 'Description here' },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative bg-black">
      {portfolioItems.map((item, index) => (
        <ParallaxSection key={item.id} item={item} index={index} scrollProgress={scrollYProgress} />
      ))}
    </div>
  );
};

const ParallaxSection = ({
  item,
  index,
  scrollProgress,
}: {
  item: PortfolioItem;
  index: number;
  scrollProgress: any;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionProgress, setSectionProgress] = useState(0);

  const { scrollYProgress: localScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  useEffect(() => {
    return localScrollProgress.onChange((v) => setSectionProgress(v));
  }, [localScrollProgress]);

  // Image moves slower, text moves faster (parallax)
  const imageY = useTransform(scrollProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollProgress, [0, 1], [0, -150]);
  const opacity = useTransform(localScrollProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - moves slowly */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center text-5xl font-light text-gray-700">
          Image {item.id}
        </div>
      </motion.div>

      {/* Text Content - moves faster */}
      <motion.div
        className="relative z-10 text-center text-white"
        style={{ y: textY, opacity }}
      >
        <motion.h2
          className="text-6xl md:text-7xl font-light tracking-tight mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          {item.title}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {item.description}
        </motion.p>
      </motion.div>

      {/* Fade overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
};

export default ParallaxPortfolio;
