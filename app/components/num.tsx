"use client";

import { useEffect, useRef } from "react";

/**
 * A figure in the text that counts up once, the first time it is fully on screen. The final value
 * is what the server renders, so without JavaScript or with reduced motion it simply reads.
 */
export function Num({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(value.replace(/,/g, ""));
    const decimals = value.split(".")[1]?.length ?? 0;
    const grouped = value.includes(",");
    const format = (v: number) =>
      v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped });
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Hold the final width so the line never reflows while the digits run.
        el.style.minWidth = `${el.getBoundingClientRect().width}px`;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1100);
          el.textContent = t < 1 ? format(target * (1 - Math.pow(1 - t, 4))) : value;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        el.textContent = format(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="num">
      {value}
    </span>
  );
}
