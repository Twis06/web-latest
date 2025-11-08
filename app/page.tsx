'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    gsap.ticker.lagSmoothing(0);

    // Get all text layers and cache their positions
    const textLayers = mainRef.current.querySelectorAll('[data-layer]');
    const trackImages = mainRef.current.querySelectorAll('[data-track-image]');
    
    // Pre-calculate all layer positions and create cache
    const layerTracks = Array.from(textLayers).map((layer, index) => {
      const layerNumber = parseInt((layer as HTMLElement).dataset.layer || '1');
      const trackImage = trackImages[layerNumber - 1] as HTMLElement;
      
      if (!trackImage) return null;
      
      const layerTop = (layer as HTMLElement).offsetTop;
      const layerHeight = (layer as HTMLElement).offsetHeight;
      const viewportHeight = window.innerHeight;
      
      return {
        layer: layer as HTMLElement,
        trackImage: trackImage,
        layerNumber: layerNumber,
        layerTop,
        layerHeight,
        viewportHeight,
        layerStartScroll: layerTop - viewportHeight,
        layerEndScroll: layerTop + layerHeight,
        layerDuration: (layerTop + layerHeight) - (layerTop - viewportHeight),
      };
    }).filter(Boolean);

    // Handle scroll with optimized calculations
    const handleScroll = ({ scroll }: { scroll: number }) => {
      (layerTracks as any[]).forEach(({ trackImage, layerStartScroll, layerEndScroll, layerDuration }) => {
        // Calculate progress
        let progress = (scroll - layerStartScroll) / layerDuration;
        progress = Math.max(0, Math.min(1, progress));
        
        let topCrop = 0;
        let bottomCrop = 0;
        
        if (progress < 0.5) {
          topCrop = (1 - progress * 2) * 100;
          bottomCrop = 0;
        } else if (progress < 1) {
          topCrop = 0;
          bottomCrop = (progress - 0.5) * 2 * 100;
        } else {
          topCrop = 0;
          bottomCrop = 100;
        }
        
        // Use transform instead of clip-path for better performance, fallback to clip-path
        trackImage.style.clipPath = `inset(${topCrop}% 0 ${bottomCrop}% 0)`;
      });
    };

    lenis.on('scroll', handleScroll);

    // Use Lenis's built-in RAF, not GSAP ticker
    let animationId: number;
    const animate = () => {
      lenis.raf(Date.now());
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);

    return () => {
      try {
        // Cancel animation before destroying Lenis
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        // Destroy Lenis - this will clean up listeners
        lenis.destroy();
      } catch (e) {
        // Silently catch errors to avoid breaking component cleanup
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="w-full bg-black text-white">
      {/* Hero Section - Ben Li */}
      <section className="h-screen flex items-center justify-center px-4 relative z-40 bg-black">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight opacity-0" data-hero-text="name">
            Ben Li 
          </h1>
          <p className="text-lg md:text-2xl font-light text-gray-400 opacity-0" data-hero-text="title">
            Developer & Photographer
          </p>
          <div className="text-sm text-gray-500 opacity-0 pt-8" data-hero-text="info">
            2025
          </div>
        </div>
      </section>

      {/* Fixed Image Container - All images here, track drives clip-path */}
      <div className="fixed-images-container">
        <div data-track-image="1" className="track-image">
          <img 
            src="/photography/DSC04715-min.jpg" 
            alt="Project Alpha" 
            className="w-full h-full object-cover"
          />
        </div>
        <div data-track-image="2" className="track-image">
          <img 
            src="/photography/DSC04760-min.jpg" 
            alt="Project Beta" 
            className="w-full h-full object-cover"
          />
        </div>
        <div data-track-image="3" className="track-image">
          <img 
            src="/photography/DSC04767-min.jpg" 
            alt="Project Gamma" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Layers - These scroll and trigger image reveals */}
      
      {/* Layer 1: Project Alpha */}
      <section className="text-layer h-screen flex items-center justify-center relative z-20 pt-20" data-layer="1">
        <h2 className="text-6xl md:text-8xl font-light text-white text-center">2025</h2>
      </section>

      {/* Layer 2: Project Beta */}
      <section className="text-layer h-screen flex items-center justify-center relative z-20 pt-20" data-layer="2">
        <h2 className="text-6xl md:text-8xl font-light text-white text-center">2024</h2>
      </section>

      {/* Layer 3: Project Gamma */}
      <section className="text-layer h-screen flex items-center justify-center relative z-20 pt-20" data-layer="3">
        <h2 className="text-6xl md:text-8xl font-light text-white text-center">2023</h2>
      </section>

      {/* Footer */}
      <section className="bg-black flex items-center justify-center relative z-10 py-100">
        <div className="text-center space-y-8 max-w-3xl px-4 h-full flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-light">Get in touch</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Contact me if you have a project in mind. 
          </p>
          <div className="space-y-4 pt-8">
            <p className="text-gray-500"><a href="mailto:twislpy01@icloud.com">Email</a></p>
            <p className="text-gray-500"><a href="https://github.com/Twis06">GitHub</a></p>
          </div>
          <p className="text-gray-600 text-sm pt-12">© 2025 Ben Li. All rights reserved.</p>
        </div>
      </section>

      <style jsx>{`
        /* Fixed Images Container - stays in place, above text */
        .fixed-images-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30vw;
          aspect-ratio: 1/1.5;
          max-height: 80vh;
          z-index: 50;
          pointer-events: none;
        }

        /* Individual track images */
        .track-image {
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: inset(100% 0 100% 0);
          overflow: hidden;
          top: 0;
          left: 0;
        }

        .track-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Text layers - scroll on top but below images */
        .text-layer {
          position: relative;
          background: transparent;
          z-index: 70;
        }

        [data-hero-text] {
          display: inline-block;
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
