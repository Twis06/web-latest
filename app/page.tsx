'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import Image from 'next/image';

const PHOTOGRAPHY_PORTFOLIO_URL = 'https://mediaportfolio.vercel.app/';

interface LayerTrack {
  trackImage: HTMLElement;
  layerStartScroll: number;
  layerDuration: number;
}

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    gsap.ticker.lagSmoothing(0);

    const textLayers = mainRef.current.querySelectorAll('[data-layer]');
    const trackImages = mainRef.current.querySelectorAll('[data-track-image]');

    const layerTracks = Array.from(textLayers).map((layer): LayerTrack | null => {
      const layerNumber = parseInt((layer as HTMLElement).dataset.layer || '1');
      const trackImage = trackImages[layerNumber - 1] as HTMLElement;

      if (!trackImage) return null;

      const layerTop = (layer as HTMLElement).offsetTop;
      const layerHeight = (layer as HTMLElement).offsetHeight;
      const viewportHeight = window.innerHeight;

      return {
        trackImage,
        layerStartScroll: layerTop - viewportHeight,
        layerDuration: layerHeight + viewportHeight,
      };
    }).filter((track): track is LayerTrack => track !== null);

    const handleScroll = ({ scroll }: { scroll: number }) => {
      layerTracks.forEach(({ trackImage, layerStartScroll, layerDuration }) => {
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

        trackImage.style.clipPath = `inset(${topCrop}% 0 ${bottomCrop}% 0)`;
      });
    };

    lenis.on('scroll', handleScroll);

    let animationId: number;
    const animate = () => {
      lenis.raf(Date.now());
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      lenis.destroy();
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
            Developer &{' '}
            <a href={PHOTOGRAPHY_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              Photographer
            </a>
          </p>
          <div className="text-sm text-gray-500 opacity-0 pt-8" data-hero-text="info">
            2026
          </div>
        </div>
      </section>

      <div className="fixed-images-container">
        <div data-track-image="1" className="track-image">
          <Image
            src="/photography/DSC04715-min.jpg"
            alt="2025 photography"
            fill
            sizes="(max-width: 1024px) 50vw, 30vw"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div data-track-image="2" className="track-image">
          <Image
            src="/photography/DSC04760-min.jpg"
            alt="2024 photography"
            fill
            sizes="(max-width: 1024px) 50vw, 30vw"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div data-track-image="3" className="track-image">
          <Image
            src="/photography/DSC04767-min.jpg"
            alt="2023 photography"
            fill
            sizes="(max-width: 1024px) 50vw, 30vw"
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      <section className="text-layer h-screen flex items-center justify-center relative z-20 pt-20" data-layer="1">
        <h2 className="text-6xl md:text-8xl font-light text-white text-center">
          <a href={PHOTOGRAPHY_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">2025</a>
        </h2>
      </section>

      <section className="text-layer h-screen flex items-center justify-center relative z-20 pt-20" data-layer="2">
        <h2 className="text-6xl md:text-8xl font-light text-white text-center">
          <a href={PHOTOGRAPHY_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">2024</a>
        </h2>
      </section>

      <section className="text-layer h-screen flex items-center justify-center relative z-20 pt-20" data-layer="3">
        <h2 className="text-6xl md:text-8xl font-light text-white text-center">
          <a href={PHOTOGRAPHY_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">2023</a>
        </h2>
      </section>

      {/* Footer */}
      <section className="bg-black flex items-center justify-center relative z-10 py-24 md:py-32">
        <div className="text-center space-y-8 max-w-3xl px-4 h-full flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-light">Get in touch</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            If you have a project in mind, feel free to reach out. I&apos;m always eager to learn and explore new ideas.
          </p>
          <div className="space-y-4 pt-8">
            <p className="text-gray-500"><a href="mailto:twislpy01@icloud.com">Email</a></p>
            <p className="text-gray-500"><a href="https://github.com/Twis06" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
          <p className="text-gray-600 text-sm pt-12">© 2026 Ben Li. All rights reserved.</p>
        </div>
      </section>

      <style jsx>{`
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

        @media (prefers-reduced-motion: reduce) {
          [data-hero-text] {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
