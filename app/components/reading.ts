"use client";

import { useSyncExternalStore } from "react";

/*
  Which entry is being read. One scroll listener for the whole page: it picks the entry under the
  reading line, marks it data-current (its dates turn ink), and tells the bar and the sidebar.
*/

export type Where = { sectionId: string; section: string; index: string; count: string; roll: boolean };

/** The entry being read sits across this line, as a share of the viewport height. */
const READING_LINE = 0.38;

let where: Where | null = null;
const listeners = new Set<() => void>();
let started = false;

function start() {
  started = true;
  const entries = Array.from(document.querySelectorAll<HTMLElement>("[data-entry]"));
  if (!entries.length) return;
  let frame = 0;
  let current: HTMLElement | null = null;

  const read = () => {
    frame = 0;
    const line = window.innerHeight * READING_LINE;
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let next = current;
    const first = entries[0].getBoundingClientRect().top;
    if (first > line) {
      // Arriving: the first entry on screen is named before it reaches the line.
      next = first < window.innerHeight ? entries[0] : null;
    } else if (atEnd) {
      next = entries[entries.length - 1];
    } else {
      // Between entries (a section's opener), the last one read stays named.
      next =
        entries.find((el) => {
          const box = el.getBoundingClientRect();
          return box.top <= line && box.bottom > line;
        }) ?? current;
    }
    if (next === current) return;
    // The readout rolls when the entry changes, not when it first appears.
    const roll = current !== null;
    current?.removeAttribute("data-current");
    next?.setAttribute("data-current", "");
    current = next;
    where = next
      ? {
          sectionId: next.dataset.sectionId ?? "",
          section: next.dataset.section ?? "",
          index: next.dataset.index ?? "",
          count: next.dataset.count ?? "",
          roll,
        }
      : null;
    listeners.forEach((notify) => notify());
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(read);
  };
  read();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  if (!started) start();
  return () => listeners.delete(notify);
};

export function useReading() {
  return useSyncExternalStore(
    subscribe,
    () => where,
    () => null,
  );
}
