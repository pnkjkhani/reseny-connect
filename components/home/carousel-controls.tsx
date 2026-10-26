"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/** Previous/next buttons for a CSS scroll-snap track (the track stays usable by touch, keyboard and wheel). */
export function CarouselControls({ targetId }: { targetId: string }) {
  const scroll = (direction: 1 | -1) => {
    const track = document.getElementById(targetId);
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };
  const button =
    "inline-flex size-11 items-center justify-center rounded-full border border-border-strong bg-card text-foreground transition-colors hover:border-primary hover:text-primary-text";
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => scroll(-1)} aria-label="Previous industries" className={button}>
        <ChevronLeft aria-hidden className="size-5" />
      </button>
      <button type="button" onClick={() => scroll(1)} aria-label="Next industries" className={button}>
        <ChevronRight aria-hidden className="size-5" />
      </button>
    </div>
  );
}
