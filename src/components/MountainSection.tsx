"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function MountainSection() {
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 800], [0, -100]);
  const y = useSpring(yRange, { stiffness: 80, damping: 22, mass: 0.8 });

  return (
    <section className="relative h-[80vh] sm:h-[90vh] overflow-hidden z-50 bg-gray-50 dark:bg-black">
      {/* The Mountain SVG */}
      <motion.div
        style={{ y }}
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
      >
        <Image
          src="/mountainbg.svg"
          alt="Mountain landscape"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          className="transition-transform duration-700 dark:invert-0"
        />
      </motion.div>

      {/* Fade gradient to blend with next section */}
      <div className="absolute bottom-0 left-0  z-50 w-full h-1/3 bg-gradient-to-t from-gray-50 via-gray-50/70 to-transparent dark:from-black dark:via-black/80" />
    </section>
  );
}
