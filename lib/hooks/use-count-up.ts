"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `target` once `active` turns true. With reduced motion the final
 * value is returned straight away.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1400): number {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reducedMotion) return;
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      setValue(target * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion, target, durationMs]);

  return active && reducedMotion ? target : value;
}
