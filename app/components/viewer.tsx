"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Media } from "@/content/cv";

/** Fired by a figure to open itself here: its index on the page, or that plus the exact media to show. */
export const OPEN_FIGURE = "open-figure";

export type ViewerFigure = { n: string; title: string; caption: string; media: Media };

type OpenDetail = number | { index: number; media: Media; caption: string };

/**
 * The photography site's viewer, carried over: the figure large on the ground with a side column
 * of facts. Escape closes, arrows step through every figure on the page, focus returns to the opener.
 */
export function Viewer({ figures }: { figures: ViewerFigure[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // A figure can open with the exact media it is showing, such as the flight run picked.
  const [override, setOverride] = useState<{ media: Media; caption: string } | null>(null);
  const [shown, setShown] = useState(false);
  const opener = useRef<Element | null>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      opener.current = document.activeElement;
      const detail = (event as CustomEvent<OpenDetail>).detail;
      if (typeof detail === "number") {
        setOverride(null);
        setOpen(detail);
      } else {
        setOverride({ media: detail.media, caption: detail.caption });
        setOpen(detail.index);
      }
      requestAnimationFrame(() => setShown(true));
    };
    window.addEventListener(OPEN_FIGURE, onOpen);
    return () => window.removeEventListener(OPEN_FIGURE, onOpen);
  }, []);

  const dismiss = useCallback(() => {
    setShown(false);
    window.setTimeout(() => {
      setOpen(null);
      (opener.current as HTMLElement | null)?.focus?.();
    }, 320);
  }, []);

  const step = useCallback(
    (by: number) => {
      setOverride(null);
      setOpen((i) => (i === null ? i : (i + by + figures.length) % figures.length));
    },
    [figures.length],
  );

  useEffect(() => {
    if (open === null) return;
    close.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss, step]);

  if (open === null) return null;
  const figure = { ...figures[open], ...(override ?? {}) };
  const total = String(figures.length).padStart(2, "0");

  return (
    <div className="viewer" data-state={shown ? "open" : "closed"} role="dialog" aria-modal="true" aria-label={figure.caption}>
      <div className="viewer__stage" onClick={dismiss}>
        <div className="viewer__media" onClick={(event) => event.stopPropagation()} key={figure.n}>
          <Stage media={figure.media} />
        </div>
      </div>
      <aside className="viewer__side">
        <dl className="viewer__meta">
          <div>
            <dt className="readout">Figure</dt>
            <dd className="readout">
              <b>{figure.n}</b> / {total}
            </dd>
          </div>
          <div>
            <dt className="readout">Entry</dt>
            <dd>{figure.title}</dd>
          </div>
          <div>
            <dt className="readout">Shows</dt>
            <dd>{figure.caption}</dd>
          </div>
        </dl>
        <div className="viewer__controls">
          <button type="button" className="readout" onClick={() => step(-1)}>
            Prev
          </button>
          <button type="button" className="readout" onClick={() => step(1)}>
            Next
          </button>
          <button ref={close} type="button" className="readout" onClick={dismiss}>
            Close
          </button>
        </div>
      </aside>
    </div>
  );
}

function Stage({ media }: { media: Media }) {
  if (media.kind === "set") {
    const item = media.items[0];
    return <Stage media={{ kind: "clip", ratio: media.ratio, src: item.src, poster: item.poster, alt: item.alt }} />;
  }
  if (media.kind === "flight") {
    const run = media.runs[0];
    return <Stage media={{ kind: "clip", ratio: media.ratio, src: run.src, poster: run.poster, alt: `Takeoff point ${run.id}, frame tilted ${run.angle}°` }} />;
  }
  if (media.kind === "youtube") {
    return (
      <iframe
        className="viewer__frame"
        style={{ aspectRatio: media.ratio }}
        src={`https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0&playsinline=1`}
        title={media.title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  if (media.kind === "grid") {
    return (
      <div className="viewer__grid" style={{ aspectRatio: media.ratio }}>
        {media.clips.map((clip) => (
          <video key={clip.src} src={clip.src} poster={clip.poster} autoPlay muted loop playsInline aria-label={clip.alt} />
        ))}
      </div>
    );
  }
  return (
    <video
      className="viewer__clip"
      style={{ aspectRatio: media.ratio }}
      src={media.src}
      poster={media.poster}
      autoPlay
      muted
      loop
      playsInline
      controls
      aria-label={media.alt}
    />
  );
}
