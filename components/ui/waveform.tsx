import { cn } from "@/lib/utils";

/** Bar height profile: deterministic (no randomness) so server and client render identically. */
const profile = Array.from({ length: 32 }, (_, index) => 0.35 + 0.65 * Math.abs(Math.sin(index * 1.37 + 0.6)));

/**
 * Pulsing voice waveform. Pure CSS: bars animate while `active`, and settle to a
 * quiet baseline otherwise. Decorative, so hidden from assistive technology.
 */
export function Waveform({
  active,
  bars = 28,
  className,
  barClassName,
}: {
  active: boolean;
  bars?: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span aria-hidden className={cn("flex h-9 items-center gap-[3px]", className)}>
      {Array.from({ length: bars }, (_, index) => (
        <span
          key={index}
          className={cn(
            "w-[3px] origin-center rounded-full bg-current transition-opacity",
            active ? "animate-wave opacity-100" : "scale-y-[0.18] opacity-40",
            barClassName,
          )}
          style={{
            height: `${Math.round(profile[index % profile.length] * 100)}%`,
            animationDelay: active ? `${(index % 9) * 90}ms` : undefined,
            animationDuration: active ? `${950 + (index % 5) * 120}ms` : undefined,
          }}
        />
      ))}
    </span>
  );
}
