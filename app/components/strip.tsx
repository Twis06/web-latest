"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type StripItem = { n: string; title: string; target: string; poster: string; src: string | null };

/**
 * Every figure on the page as one strip of frames under the name, like a contact sheet. Frames
 * rest in grey; the one pointed at comes up in colour and plays; pressing it jumps to its entry.
 */
export function Strip({ items }: { items: StripItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  const enter = (i: number) => {
    setActive(i);
    const video = videos.current[i];
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
    video.muted = true;
    video.play().catch(() => {});
  };
  const leave = (i: number) => {
    setActive((current) => (current === i ? null : current));
    videos.current[i]?.pause();
  };
  const jump = (target: string) => {
    const entry = document.getElementById(target);
    if (!entry) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    entry.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
    entry.setAttribute("data-flash", "");
    window.setTimeout(() => entry.removeAttribute("data-flash"), 1600);
  };

  const shown = active === null ? null : items[active];

  return (
    <nav className="strip" aria-label="Figures">
      <ol className="strip__frames">
        {items.map((item, i) => (
          <li key={item.n}>
            <button
              type="button"
              className="strip__frame"
              data-active={active === i ? "" : undefined}
              onPointerEnter={() => enter(i)}
              onPointerLeave={() => leave(i)}
              onFocus={() => enter(i)}
              onBlur={() => leave(i)}
              onClick={() => jump(item.target)}
              aria-label={`Figure ${item.n}: ${item.title}. Go to entry`}
            >
              <Image src={item.poster} alt="" fill sizes="(min-width: 1100px) 180px, 140px" />
              {item.src ? (
                <video
                  ref={(node) => {
                    videos.current[i] = node;
                  }}
                  data-src={item.src}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                />
              ) : null}
              <span className="strip__n readout" aria-hidden="true">
                {item.n}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="strip__label readout" aria-live="polite">
        {shown ? (
          <span key={shown.n}>
            Fig. <b>{shown.n}</b>&ensp;{shown.title}
          </span>
        ) : (
          <span>
            <b>{String(items.length).padStart(2, "0")}</b> figures · point to look, press to go
          </span>
        )}
      </p>
    </nav>
  );
}
