"use client";

import { useEffect } from "react";

/**
 * Section openers draw their ink rule from the left as they scroll into view. A jump past one
 * (an anchor link, a fast fling) draws it too. Without JavaScript, or with reduced motion, the
 * rules are simply there.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".opener")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9,
    );
    pending.forEach((el) => el.setAttribute("data-draw", "pending"));
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.88;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > line) return true;
        el.setAttribute("data-draw", "done");
        return false;
      });
      if (!pending.length) window.removeEventListener("scroll", schedule);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
