'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !numberRef.current) return;

    const preloadValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 23, 30, 50, 70, 80, 100];
    const totalDuration = 2.8;
    const splitDuration = totalDuration / preloadValues.length;

    let count = 0;
    let interval: NodeJS.Timeout;

    const updateNumber = (val: number) => {
      const number = numberRef.current;
      if (!number) return;

      let displayValue = val;
      const isMobile = window.innerWidth < 768;
      if (displayValue === 100 && isMobile) {
        displayValue = 95;
      }

      number.textContent = displayValue.toString();
      number.style.transform = `translateX(${displayValue}%)`;
    };

    const destroy = () => {
      clearInterval(interval);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.8,
          ease: 'slow.inOut',
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.remove();
            }
            if (onComplete) {
              onComplete();
            }
          },
        });
      }
    };

    // Start the preloader animation
    interval = setInterval(() => {
      if (count < preloadValues.length) {
        updateNumber(preloadValues[count]);
        count++;
      } else {
        destroy();
      }
    }, splitDuration * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Number display */}
        <div className="relative h-24 overflow-hidden">
          <div
            ref={numberRef}
            className="text-7xl md:text-8xl font-light tracking-tight text-black dark:text-white transition-transform duration-100"
            style={{ transform: 'translateX(0%)' }}
          >
            0
          </div>
        </div>

        {/* Loading text */}
        <p className="text-sm font-light text-gray-600 dark:text-gray-400 tracking-widest uppercase">
          Loading
        </p>

        {/* Animated underline */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-black dark:via-white to-transparent" />
      </div>
    </div>
  );
};

export default Preloader;
