"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { STAFF_WITH_PHOTOS, type StaffMember } from "../lib/staff";

/**
 * Horizontally scrolling row of staff photos with prev/next buttons.
 *
 * The row still auto-pans gently (see `.sca-marquee` in globals.css), but the
 * arrow buttons let visitors jump several cards at a time instead of waiting
 * for the slow pan. Clicking a button pauses the auto-pan so the manual scroll
 * position sticks. Panning also pauses on hover/focus, and
 * `prefers-reduced-motion` turns off the auto-pan entirely.
 */
export default function StaffMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    setPaused(true);
    // Jump by roughly the visible width so a click advances several cards.
    const amount = Math.max(el.clientWidth * 0.8, 260);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
      <div
        ref={scrollerRef}
        className={`sca-marquee overflow-x-auto${paused ? " is-paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onFocusCapture={() => setPaused(true)}
      >
        <div className="sca-marquee-track flex w-max">
          {STAFF_WITH_PHOTOS.map((person) => (
            <StaffPhotoCard key={person.name} person={person} />
          ))}
          {STAFF_WITH_PHOTOS.map((person) => (
            <StaffPhotoCard key={`repeat-${person.name}`} person={person} duplicate />
          ))}
        </div>
      </div>

      {/* Soften both edges so cards fade out instead of being sliced off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[linear-gradient(90deg,#f7f8fa,rgba(247,248,250,0))] sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[linear-gradient(270deg,#f7f8fa,rgba(247,248,250,0))] sm:w-20" />

      <button
        type="button"
        aria-label="Previous staff members"
        onClick={() => scrollByCards(-1)}
        disabled={!canScrollLeft}
        className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8dde6] bg-white/95 text-[#27183b] shadow-[0_6px_18px_rgba(39,24,59,0.16)] transition hover:border-[#d6a102] hover:text-[#d6a102] disabled:cursor-not-allowed disabled:opacity-0 sm:left-3"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Next staff members"
        onClick={() => scrollByCards(1)}
        disabled={!canScrollRight}
        className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8dde6] bg-white/95 text-[#27183b] shadow-[0_6px_18px_rgba(39,24,59,0.16)] transition hover:border-[#d6a102] hover:text-[#d6a102] disabled:cursor-not-allowed disabled:opacity-0 sm:right-3"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function StaffPhotoCard({
  person,
  duplicate = false,
}: {
  person: StaffMember & { image: NonNullable<StaffMember["image"]> };
  duplicate?: boolean;
}) {
  return (
    <div className="w-[220px] shrink-0 pr-4 sm:w-[250px]" aria-hidden={duplicate || undefined}>
      <Link
        href="/staff"
        tabIndex={duplicate ? -1 : undefined}
        className="group block overflow-hidden rounded-sm border border-[#d8dde6] bg-white transition hover:-translate-y-1 hover:border-[#d6a102] hover:shadow-[0_18px_40px_rgba(39,24,59,0.16)]"
      >
        <div className="relative aspect-4/5 overflow-hidden bg-[#27183b]">
          <Image
            src={person.image}
            alt={duplicate ? "" : person.name}
            fill
            sizes="250px"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#fdc10e]" />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-extrabold leading-5 text-[#27183b]">{person.name}</h3>
          <p className="mt-1 text-xs leading-5 text-[#6b6965]">{person.role}</p>
        </div>
      </Link>
    </div>
  );
}
