"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface UseCycleOptions {
  /** Only advance while true (e.g. while the element is on screen). */
  active: boolean;
  /** Milliseconds each step is held. A number, or one duration per step. */
  intervalMs: number | readonly number[];
  /** Extra steps held at the end before looping back to 0 (a soft pause). */
  holdSteps?: number;
}

/**
 * Steps through `0 … count-1` on a timer and loops: drives the looping explainer
 * animations (hero flow, phone mock-up, lead-to-appointment diagram). With reduced
 * motion it parks on the last step so the finished state is shown.
 */
export function useCycle(count: number, { active, intervalMs, holdSteps = 1 }: UseCycleOptions): number {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const total = count + holdSteps;

  useEffect(() => {
    if (!active || reducedMotion) return;
    const delay = typeof intervalMs === "number" ? intervalMs : (intervalMs[step % intervalMs.length] ?? 1500);
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % total), delay);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, intervalMs, step, total]);

  if (reducedMotion) return count - 1;
  return Math.min(step, count - 1);
}
