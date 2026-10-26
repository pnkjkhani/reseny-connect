"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven step index for "pinned" storytelling sections. `ref` is the tall outer
 * wrapper; while it scrolls past the viewport the progress 0→1 is split evenly into
 * `count` steps. Updates state only when the step changes, so scrolling never causes a
 * re-render storm.
 */
export function useScrollSteps<T extends HTMLElement = HTMLDivElement>(count: number, enabled = true) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setStep(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Measure once after layout; deferred so state is never set synchronously in the effect.
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count, enabled]);

  return { ref, step };
}
