"use client";

import { useEffect, useState } from "react";

/** The hero headline cycles through these, one at a time. Add, remove, or
 *  reorder freely — the rotation adjusts itself. `size` is per-line on purpose:
 *  a longer saying needs a smaller type size so the hero stays the same height. */
const HEADLINES = [
  {
    text: "Offering a Life Worth Living.",
    size: "text-5xl sm:text-7xl lg:text-8xl",
  },
  {
    text: "Strong Academics, Sensible Tuition, Serving Our Savior.",
    size: "text-4xl sm:text-6xl lg:text-7xl",
  },
];

/** How long each saying stays on screen, in milliseconds. */
const HOLD_MS = 5200;

/** All the sayings are stacked in one grid cell, so the block is always as tall
 *  as the longest one and the page never shifts when the text changes. */
export default function HeroHeadline({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (HEADLINES.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % HEADLINES.length);
    }, HOLD_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <h1 className={`grid ${className}`}>
      {HEADLINES.map((headline, index) => (
        <span
          key={headline.text}
          aria-hidden={index !== active}
          className={`col-start-1 row-start-1 self-end transition-opacity duration-700 ease-out motion-reduce:transition-none ${headline.size} ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {headline.text}
        </span>
      ))}
    </h1>
  );
}
