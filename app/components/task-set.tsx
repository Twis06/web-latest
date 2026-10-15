"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SetItem } from "@/content/cv";
import { Hud } from "./figure";
import { attachScrub } from "./scrub";
import { OPEN_FIGURE } from "./viewer";

/*
  A figure that holds several real tests of one project, chosen by tab: pointing at a tab previews
  its clip, pressing keeps it, the clip scrubs under the pointer and opens large in the viewer.
*/

type Props = { index: number; n: string; caption: string; ratio: number; items: SetItem[] };

export function TaskSet({ index, n, caption, ratio, items }: Props) {
  const [picked, setPicked] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLButtonElement>(null);
  const visible = useRef(false);
  const item = items[preview ?? picked];

  // Play only while on screen; reduced motion leaves the first frame showing.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sync = () => {
      if (visible.current && !still) {
        el.muted = true;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.intersectionRatio >= 0.25;
        sync();
      },
      { threshold: [0, 0.25] },
    );
    observer.observe(el);
    sync();
    const detach = stage.current ? attachScrub(stage.current, () => video.current, sync) : () => {};
    return () => {
      detach();
      observer.disconnect();
    };
  }, [item.src]);

  const open = () =>
    window.dispatchEvent(
      new CustomEvent(OPEN_FIGURE, {
        detail: { index, media: { kind: "clip", ratio, src: item.src, poster: item.poster, alt: item.alt }, caption: item.alt },
      }),
    );

  return (
    <figure className="figure flight">
      <div className="flight__controls">
        <div className="flight__group" role="group" aria-label="Test" onMouseLeave={() => setPreview(null)}>
          <span className="readout">Test</span>
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              className="flight__chip"
              aria-pressed={i === (preview ?? picked)}
              onMouseEnter={() => setPreview(i)}
              onFocus={() => setPreview(i)}
              onBlur={() => setPreview(null)}
              onClick={() => {
                setPicked(i);
                setPreview(null);
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>

      <button
        ref={stage}
        type="button"
        className="figure__media flight__stage"
        style={{ aspectRatio: ratio }}
        onClick={open}
        aria-label={`Open figure ${n} large: ${item.alt}`}
      >
        <Image src={item.poster} alt="" fill sizes="(min-width: 768px) 760px, 100vw" />
        <video key={item.src} ref={video} src={item.src} poster={item.poster} muted loop playsInline preload="auto" aria-hidden="true" data-live="" />
        <span className="figure__tag readout" aria-hidden="true">
          View · {item.label}
        </span>
        <Hud lines={item.hud} />
        <span className="figure__scrub" aria-hidden="true">
          <span data-scrub-bar="" />
        </span>
      </button>

      <figcaption className="figure__cap">
        <span className="readout">
          Fig. <b>{n}</b>
        </span>
        <span>{caption}</span>
        <span className="figure__ctl readout" aria-live="polite">
          {item.alt}
        </span>
      </figcaption>
    </figure>
  );
}
