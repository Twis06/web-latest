"use client";

import Link from "next/link";
import { Arrow } from "./arrow";
import { useReading } from "./reading";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ name, photography }: { name: string; photography: string }) {
  const where = useReading();

  return (
    <header className="bar">
      <Link href="/" className="bar__name">
        {name}
      </Link>
      <p className="bar__where readout" aria-hidden="true">
        {where ? (
          <span key={`${where.section}-${where.index}`} className={where.roll ? "roll" : undefined}>
            {where.section}&ensp;<b>{where.index}</b> / {where.count}
          </span>
        ) : null}
      </p>
      <nav className="bar__nav" aria-label="Primary">
        <a href="#experience" className="bar__link bar__anchor">
          Experience
        </a>
        <a href="#projects" className="bar__link bar__anchor">
          Projects
        </a>
        <a href={photography} className="bar__link">
          Photography
          <Arrow />
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
