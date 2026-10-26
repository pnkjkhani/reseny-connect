"use client";

import { useCountUp } from "@/lib/hooks/use-count-up";
import { useInView } from "@/lib/hooks/use-in-view";
import type { OutcomeMetric } from "@/lib/content/home";

/**
 * Counts up to a figure when it scrolls into view. Per the SOP, only ever pass real,
 * measured numbers: the outcome tiles render this solely when a metric is supplied.
 * The final value is also in the DOM for assistive tech via `aria-label`.
 */
export function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: OutcomeMetric) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const current = useCountUp(value, inView);
  const format = (n: number) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <span ref={ref} aria-label={`${prefix}${format(value)}${suffix}`} className="tabular-nums">
      <span aria-hidden>
        {prefix}
        {format(current)}
        {suffix}
      </span>
    </span>
  );
}
