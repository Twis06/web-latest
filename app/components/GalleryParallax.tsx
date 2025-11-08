'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageTransform } from '@/app/lib/track';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

interface PortfolioItem {
  id: number;
  title: string;
  color: string;
}

const GalleryParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const tracksRef = useRef<ImageTransform[]>([]);

  const portfolioItems: PortfolioItem[] = [
    { id: 1, title: 'Project Alpha', color: 'from-gray-800 to-gray-900' },
    { id: 2, title: 'Project Beta', color: 'from-gray-900 to-black' },
    { id: 3, title: 'Project Gamma', color: 'from-black to-gray-800' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Initialize tracks for each image
    const imageElements = containerRef.current.querySelectorAll('[data-track]');
    tracksRef.current = Array.from(imageElements).map(
      (element) =>
        new ImageTransform(element as HTMLElement, {
          bounds: [0, 1],
          top: 'bottom',
          bottom: 'top',
        })
    );

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      tracksRef.current.forEach((track) => track.resize());
    });

    resizeObserver.observe(document.body);

    // Scroll listener
    const handleScroll = ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
      tracksRef.current.forEach((track) => track.render(scroll));
    };

    lenis.on('scroll', handleScroll);

    // Animation loop
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {portfolioItems.map((item, index) => (
        <section
          key={item.id}
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background track element with image */}
          <div data-track className="absolute inset-0">
            <div className="relative w-full h-full overflow-hidden">
              <div
                className={`w-full h-full bg-gradient-to-b ${item.color} flex items-center justify-center`}
              >
                <span className="text-7xl font-light text-white/20">{item.id}</span>
              </div>
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 text-center text-white pointer-events-none">
            <h2 className="text-6xl md:text-7xl font-light tracking-tight">{item.title}</h2>
            <p className="text-lg text-gray-300 mt-4 max-w-lg mx-auto font-light">
              A carefully crafted digital experience
            </p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default GalleryParallax;
