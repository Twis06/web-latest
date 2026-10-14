"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FlightRun } from "@/content/cv";
import { Hud } from "./figure";
import { attachScrub } from "./scrub";
import { OPEN_FIGURE } from "./viewer";

/*
  The drone flight tests as a small explorer (after the framevisualize project): choose the frame's
  tilt, then a takeoff point; hovering a point previews its run, pressing it keeps it, and pressing
  the clip opens it large. Every run is a real recording.
*/

type Props = {
  index: number;
  n: string;
  caption: string;
  ratio: number;
  angles: number[];
  runs: FlightRun[];
  hud?: string[];
};

const POINTS = Array.from({ length: 10 }, (_, i) => i + 1);

export function FlightTest({ index, n, caption, ratio, angles, runs, hud }: Props) {
  const [angle, setAngle] = useState(angles[angles.length - 1]);
  const [picked, setPicked] = useState(() => runs.find((run) => run.angle === angles[angles.length - 1])?.id ?? 1);
  const [preview, setPreview] = useState<number | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLButtonElement>(null);
  const visible = useRef(false);

  const atAngle = runs.filter((run) => run.angle === angle);
  const run = atAngle.find((r) => r.id === (preview ?? picked)) ?? atAngle.find((r) => r.id === picked) ?? atAngle[0];

  // Play only while the figure is on screen; reduced motion leaves the first frame showing.
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
    // Drag across the clip to fly the drone through the frame by hand.
    const detach = stage.current ? attachScrub(stage.current, () => video.current, sync) : () => {};
    return () => {
      detach();
      observer.disconnect();
    };
  }, [run.src]);

  const chooseAngle = (next: number) => {
    setAngle(next);
    setPreview(null);
    if (!runs.some((r) => r.angle === next && r.id === picked)) {
      setPicked(runs.find((r) => r.angle === next)?.id ?? 1);
    }
  };

  const open = () =>
    window.dispatchEvent(
      new CustomEvent(OPEN_FIGURE, {
        detail: {
          index,
          media: { kind: "clip", ratio, src: run.src, poster: run.poster, alt: `Takeoff point ${run.id}, frame tilted ${run.angle}°` },
          caption: `Takeoff point ${run.id} through a frame tilted ${run.angle}°`,
        },
      }),
    );

  return (
    <figure className="figure flight">
      <div className="flight__controls">
        <div className="flight__group" role="group" aria-label="Frame tilt">
          <span className="readout">Frame tilt</span>
          {angles.map((a) => (
            <button key={a} type="button" className="flight__chip" aria-pressed={a === angle} onClick={() => chooseAngle(a)}>
              {a}°
            </button>
          ))}
          <TiltGlyph angle={angle} />
        </div>
        <div className="flight__group flight__points" role="group" aria-label="Takeoff point" onMouseLeave={() => setPreview(null)}>
          <span className="readout">Takeoff</span>
          {POINTS.map((id) => {
            const recorded = atAngle.some((r) => r.id === id);
            return (
              <button
                key={id}
                type="button"
                className="flight__point"
                disabled={!recorded}
                aria-pressed={recorded && id === run.id}
                aria-label={recorded ? `Takeoff point ${id}` : `Takeoff point ${id}, not recorded at ${angle}°`}
                onMouseEnter={() => recorded && setPreview(id)}
                onFocus={() => recorded && setPreview(id)}
                onBlur={() => setPreview(null)}
                onClick={() => {
                  setPicked(id);
                  setPreview(null);
                }}
              >
                {id}
              </button>
            );
          })}
        </div>
      </div>

      <button
        ref={stage}
        type="button"
        className="figure__media flight__stage"
        style={{ aspectRatio: ratio }}
        onClick={open}
        aria-label={`Open figure ${n} large`}
      >
        {/* The run's first frame sits under the clip, so a switch never flashes empty. */}
        <Image src={run.poster} alt="" fill sizes="(min-width: 768px) 760px, 100vw" />
        <video key={run.src} ref={video} src={run.src} poster={run.poster} muted loop playsInline preload="auto" aria-hidden="true" data-live="" />
        <span className="figure__tag readout" aria-hidden="true">
          View · Run {String(run.id).padStart(2, "0")} · {run.angle}°
        </span>
        <Hud lines={[`Frame tilt ${run.angle}°`, `Takeoff point ${run.id}`, ...(hud ?? [])]} />
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
          Run <b>{String(run.id).padStart(2, "0")}</b> · {run.angle}° · {atAngle.length} recorded
        </span>
      </figcaption>
    </figure>
  );
}

/** A side view of the frame at its tilt, with the flight line passing through it. */
function TiltGlyph({ angle }: { angle: number }) {
  const r = (angle * Math.PI) / 180;
  const half = 13;
  const cx = 34;
  const cy = 16;
  const dx = Math.cos(r) * half;
  const dy = Math.sin(r) * half;
  return (
    <svg className="flight__glyph" viewBox="0 0 64 30" aria-hidden="true">
      <line x1="2" y1="28" x2="62" y2="28" className="flight__ground" />
      <path d={`M4 26 Q 20 ${cy + 2} ${cx} ${cy} T 62 ${cy - 6}`} className="flight__path" />
      <line x1={cx - dx} y1={cy + dy} x2={cx + dx} y2={cy - dy} className="flight__frame" />
    </svg>
  );
}
