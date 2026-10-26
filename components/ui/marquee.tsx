import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Endless horizontal ticker. The content is rendered twice (the copy is hidden from
 * assistive tech) and the track slides by exactly one copy's width, so the loop is
 * seamless. Pauses on hover and stops entirely for reduced-motion users (global CSS).
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        <ul className="flex shrink-0 items-center gap-3 pr-3">{children}</ul>
        <ul aria-hidden className="flex shrink-0 items-center gap-3 pr-3">
          {children}
        </ul>
      </div>
    </div>
  );
}
