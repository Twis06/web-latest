'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import Link from 'next/link';

const PHOTOGRAPHY_PORTFOLIO_URL = 'https://mediaportfolio.vercel.app/';

const highlights = [
  {
    label: 'Computer Vision',
    title: 'CV / Robotics',
    description: 'Vision-to-control systems, embodied AI, and simulation-to-real projects.',
    href: '/cv',
    external: false,
  },
  {
    label: 'Archive',
    title: 'Photography',
    description: 'Photo essays and visual work now live on the dedicated media portfolio.',
    href: PHOTOGRAPHY_PORTFOLIO_URL,
    external: true,
  },
];

const Home = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

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
    <div className="w-full bg-black text-white">
      {/* Hero Section - Ben Li */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-40 bg-black">
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

      <section className="relative z-20 px-4 py-24 md:py-32 bg-neutral-950">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {highlights.map((item) => {
            const className = 'group block min-h-80 rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.06]';
            const content = (
              <>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{item.label}</p>
                <h2 className="mt-24 text-4xl font-light">{item.title}</h2>
                <p className="mt-4 text-sm leading-6 text-gray-400">{item.description}</p>
                <p className="mt-8 text-sm text-gray-300 group-hover:text-white">View →</p>
              </>
            );

            return item.external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
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
