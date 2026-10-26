"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Stop observing after the first time the element is visible. Default true. */
  once?: boolean;
  /** Fraction of the element that must be visible. */
  threshold?: number;
  rootMargin?: string;
}

/**
 * Reports whether an element is on screen. Used to start animations (counters, flow
 * diagrams, sample calls) only when the visitor can actually see them.
 */
export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  threshold = 0.35,
  rootMargin = "0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}
