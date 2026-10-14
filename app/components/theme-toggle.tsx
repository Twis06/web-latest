"use client";

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

// The same switch, glyph and storage key as the photography site. Where the browser can, the new
// theme opens as a circle from the switch itself, through a view transition.
export function ThemeToggle() {
  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem("portfolio-theme", next);
      } catch {
        // Private windows can refuse storage; the theme still applies for this visit.
      }
    };

    const doc = document as TransitionDocument;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label="Switch light or dark">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 1.6a6.4 6.4 0 0 1 0 12.8Z" fill="currentColor" />
      </svg>
    </button>
  );
}
