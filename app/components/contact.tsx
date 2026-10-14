"use client";

import { useRef, useState } from "react";
import { Arrow } from "./arrow";

/**
 * One quiet line of links under the name. Email copies to the clipboard and says so in a readout;
 * where the clipboard is refused it falls back to the mail app.
 */
export function Contact({ email, github, photography }: { email: string; github: string; photography: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <p className="contact">
      <button type="button" className="contact__link" onClick={copy} title={email} data-copied={copied ? "" : undefined}>
        Email
        <span className="contact__note readout" aria-live="polite">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
      <a className="contact__link" href={github} target="_blank" rel="noopener noreferrer">
        GitHub
        <Arrow />
      </a>
      <a className="contact__link" href={photography}>
        Photography
        <Arrow />
      </a>
    </p>
  );
}
