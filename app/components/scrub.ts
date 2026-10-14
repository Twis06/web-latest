/**
 * Moving the pointer across a clip scrubs it: left edge is the first frame, right edge the last,
 * like a storyboard. Fine pointers only; leaving hands playback back to the caller.
 */
export function attachScrub(surface: HTMLElement, getVideo: () => HTMLVideoElement | null, onRelease: () => void) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const bar = surface.querySelector<HTMLElement>("[data-scrub-bar]");

  const move = (event: PointerEvent) => {
    const video = getVideo();
    if (!video) return;
    if (!video.getAttribute("src") && video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
    }
    const box = surface.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    surface.setAttribute("data-scrubbing", "");
    if (bar) bar.style.transform = `scaleX(${x})`;
    if (!video.duration) return;
    video.pause();
    video.setAttribute("data-live", "");
    video.currentTime = x * (video.duration - 0.05);
  };
  const leave = () => {
    surface.removeAttribute("data-scrubbing");
    onRelease();
  };

  surface.addEventListener("pointermove", move);
  surface.addEventListener("pointerleave", leave);
  return () => {
    surface.removeEventListener("pointermove", move);
    surface.removeEventListener("pointerleave", leave);
  };
}
