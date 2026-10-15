"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Clip, Figure as FigureData } from "@/content/cv";
import { FlightTest } from "./flight-test";
import { TaskSet } from "./task-set";
import { attachScrub } from "./scrub";
import { OPEN_FIGURE } from "./viewer";

const SIZES = "(min-width: 1100px) 30vw, (min-width: 768px) 600px, 100vw";
const CELL_SIZES = "(min-width: 1100px) 15vw, (min-width: 768px) 300px, 50vw";
const WIDE_CELL_SIZES = "(min-width: 768px) 380px, 50vw";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const onMotionChange = (notify: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

/**
 * A numbered figure. Clips rest on their first frame; with a mouse they play while their entry is
 * pointed at, on touch while a quarter of the figure is on screen. They fade in once they actually
 * play; reduced motion keeps them paused.
 * Pressing the figure opens it large in the viewer.
 */
export function Figure({ index, n, figure }: { index: number; n: string; figure: FigureData }) {
  if (figure.media.kind === "flight") {
    const { ratio, angles, runs } = figure.media;
    return <FlightTest index={index} n={n} caption={figure.caption} ratio={ratio} angles={angles} runs={runs} hud={figure.hud} />;
  }
  if (figure.media.kind === "set") {
    return <TaskSet index={index} n={n} caption={figure.caption} ratio={figure.media.ratio} items={figure.media.items} />;
  }
  return <ClipFigure index={index} n={n} figure={figure} />;
}

function ClipFigure({ index, n, figure }: { index: number; n: string; figure: FigureData }) {
  const { media, caption } = figure;
  const box = useRef<HTMLButtonElement>(null);
  const held = useRef(false);
  const sync = useRef<() => void>(() => {});
  const reduced = useSyncExternalStore(onMotionChange, prefersReducedMotion, () => false);
  // Until the visitor presses Play or Pause, clips follow the motion preference.
  const [choice, setChoice] = useState<boolean | null>(null);
  const paused = choice ?? reduced;

  useEffect(() => {
    if (media.kind === "youtube" || !box.current) return;
    const root = box.current;
    const videos = Array.from(root.querySelectorAll("video"));
    let visible = false;
    // With a fine pointer, a clip rests on its first frame and plays while its entry is pointed at
    // (Jon Barron's rows); on touch screens it plays while on screen.
    const hoverable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let engaged = !hoverable;
    const row = root.closest<HTMLElement>("[data-entry]");
    const engage = () => {
      engaged = true;
      sync.current();
    };
    const release = () => {
      engaged = !hoverable;
      sync.current();
    };
    if (hoverable && row) {
      row.addEventListener("pointerenter", engage);
      row.addEventListener("pointerleave", release);
      row.addEventListener("focusin", engage);
      row.addEventListener("focusout", release);
    }

    sync.current = () => {
      for (const video of videos) {
        if (visible && engaged && !held.current) {
          if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    };

    // The clip fades in over its poster only once it has a frame to show.
    const onPlaying = (event: Event) => (event.target as HTMLElement).setAttribute("data-live", "");
    videos.forEach((video) => video.addEventListener("playing", onPlaying));

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.25;
        sync.current();
      },
      { threshold: [0, 0.25, 0.5] },
    );
    observer.observe(root);
    // A single clip can be scrubbed by hand; leaving it hands playback back.
    const detach = media.kind === "clip" ? attachScrub(root, () => videos[0] ?? null, () => sync.current()) : () => {};
    return () => {
      detach();
      observer.disconnect();
      videos.forEach((video) => video.removeEventListener("playing", onPlaying));
      if (hoverable && row) {
        row.removeEventListener("pointerenter", engage);
        row.removeEventListener("pointerleave", release);
        row.removeEventListener("focusin", engage);
        row.removeEventListener("focusout", release);
      }
    };
  }, [media.kind]);

  useEffect(() => {
    held.current = paused;
    sync.current();
  }, [paused]);

  const kind = media.kind === "youtube" ? "Video" : media.kind === "grid" ? `${media.clips.length} clips` : "Clip";

  return (
    <figure className={media.ratio < 1 ? "figure figure--portrait" : "figure"}>
      <button
        ref={box}
        type="button"
        className="figure__media"
        style={{ aspectRatio: media.ratio }}
        onClick={() => window.dispatchEvent(new CustomEvent(OPEN_FIGURE, { detail: index }))}
        aria-label={`Open figure ${n}: ${caption}`}
      >
        {media.kind === "clip" ? <ClipView clip={media} sizes={SIZES} /> : null}
        {media.kind === "grid" ? (
          <span className="figure__grid">
            {media.clips.map((clip) => (
              <span key={clip.src} className="figure__cell">
                <ClipView clip={clip} sizes={figure.wide ? WIDE_CELL_SIZES : CELL_SIZES} />
              </span>
            ))}
          </span>
        ) : null}
        {media.kind === "youtube" ? <Image src={media.poster} alt="" fill sizes={SIZES} /> : null}
        <span className="figure__tag readout" aria-hidden="true">
          {media.kind === "youtube" ? (
            <svg viewBox="0 0 7 8">
              <path d="M0 0 7 4 0 8Z" fill="currentColor" />
            </svg>
          ) : null}
          {media.kind === "youtube" ? "Play" : "View"} · {kind}
        </span>
        <Hud lines={figure.hud} />
        {media.kind === "clip" ? (
          <span className="figure__scrub" aria-hidden="true">
            <span data-scrub-bar="" />
          </span>
        ) : null}
      </button>
      <figcaption className="figure__cap">
        <span className="readout">
          Fig. <b>{n}</b>
        </span>
        <span>{caption}</span>
        {media.kind === "youtube" ? (
          <a
            className="figure__ctl readout"
            href={`https://www.youtube.com/watch?v=${media.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        ) : (
          <button type="button" className="figure__ctl readout" onClick={() => setChoice(!paused)} aria-label={paused ? "Play clip" : "Pause clip"}>
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </figcaption>
    </figure>
  );
}

/** The footage's facts as readouts over its lower edge, staggered in on hover, like the photo site's HUD. */
export function Hud({ lines }: { lines?: string[] }) {
  if (!lines?.length) return null;
  return (
    <span className="hud" aria-hidden="true">
      {lines.map((line, i) => (
        <span key={line} className="hud__line readout" style={{ transitionDelay: `${i * 60}ms` }}>
          {line}
        </span>
      ))}
    </span>
  );
}

function ClipView({ clip, sizes }: { clip: Clip; sizes: string }) {
  return (
    <>
      <Image src={clip.poster} alt={clip.alt} fill sizes={sizes} />
      <video data-src={clip.src} muted loop playsInline preload="none" aria-hidden="true" />
    </>
  );
}
