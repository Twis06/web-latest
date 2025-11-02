"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";


export default function HeroSection() {
  const { scrollY } = useScroll();

  // Mountain moves up as you scroll
  const mountainYRange = useTransform(scrollY, [0, 600], [500, -200]);
  const springConfig = { stiffness: 80, damping: 22, mass: 0.8 };
  const mountainY = useSpring(mountainYRange, springConfig);

  // Title animations
  const titleY = useSpring(
    useTransform(scrollY, [0, 300], [0, -50]),
    { stiffness: 100, damping: 30, mass: 1 }
  );
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const titleBlur = useTransform(scrollY, [0, 300], [0, 4]);

  // Background behind the title: moves a bit, slower than the mountain
  const bgY = useSpring(
    useTransform(scrollY, [0, 600], [0, -100]),
    { stiffness: 90, damping: 26, mass: 0.9 }
  );

  // Overlay opacity: appears as mountain approaches/overlaps title area
  const overlayOpacity = useSpring(
    useTransform(scrollY, [200, 420], [0, 1]),
    { stiffness: 70, damping: 24 }
  );

  return (
    <section className="relative h-screen overflow-hidden">
      {/* SVG filter defs for liquid refraction */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="liquid-refraction">
            <feTurbulence id="turb" baseFrequency="0.01" numOctaves="2" seed="3" stitchTiles="stitch" />
            <feDisplacementMap in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G" />
            {/* animate the turbulence baseFrequency for smooth flowing */}
            <animate xlinkHref="#turb" attributeName="baseFrequency" dur="6s" values="0.003;0.016;0.009;0.003" repeatCount="indefinite" />
          </filter>
        </defs>
      </svg>
      {/* --- Sky background --- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-200 via-sky-100 to-gray-50 dark:from-slate-900 dark:via-slate-950 dark:to-black" />

      {/* --- Title background (full-width) --- */}
      <motion.div
        className="fixed left-0 right-0 top-1/2 transform -translate-y-1/2 z-[15] flex justify-center pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="w-full h-44 title-bg relative">
          {/* Glass overlay sits over the background - opacity adjustable in globals.css */}
          <div className="absolute inset-0 title-glass" />
        </div>
      </motion.div>

      {/* --- Liquid refraction overlay (distorted duplicate of mountain) --- */}
      <motion.div
        className="absolute inset-0 z-35 pointer-events-none overflow-hidden"
        style={{ opacity: overlayOpacity }}
      >
        <div className="relative w-full h-full" style={{ filter: 'url(#liquid-refraction)' }}>
          {/* duplicate mountain image that will be distorted to simulate refraction */}
          <Image
            src="/mountainbg.svg"
            alt="Mountain refraction"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "bottom" }}
            className="pointer-events-none opacity-90 mix-blend-overlay"
          />
        </div>
      </motion.div>

      {/* --- Title with scroll animations --- */}
      <motion.div 
        className="fixed inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        style={{
          y: titleY,
          opacity: titleOpacity,
          scale: titleScale,
          filter: useTransform(titleBlur, (blur) => `blur(${blur}px)`),
        }}
      >
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md dark:text-gray-100 sm:text-6xl">
          A Twis Website
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-700 dark:text-gray-300">
          The journey starts in the sky — scroll to see the peaks rise and cover the horizon.
        </p>
      </motion.div>

      {/* --- Mountain (scrolls up and covers title) --- */}
      <motion.div
        style={{ y: mountainY }}
        className="absolute bottom-0 left-0 z-30 w-full h-full pointer-events-none"
      >
        <Image
          src="/mountainbg.svg"
          alt="Mountain landscape"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          className="transition-all duration-700 mix-blend-multiply  dark:brightness-90"
        />
      </motion.div>

      {/* --- Gradient fade to blend into next section --- */}
      <div className="absolute bottom-0 left-0 z-40 h-[35vh] w-full bg-gradient-to-t from-gray-50 via-gray-50/60 to-transparent dark:from-black dark:via-black/70" />
    </section>
  );
}
