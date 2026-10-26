"use client";

import { CalendarCheck, ClipboardCheck, PhoneCall, UserPlus } from "lucide-react";
import { heroFlow } from "@/lib/content/home";
import { useCycle } from "@/lib/hooks/use-cycle";
import { useInView } from "@/lib/hooks/use-in-view";
import { cn } from "@/lib/utils";

const icons = [UserPlus, PhoneCall, ClipboardCheck, CalendarCheck];
const INTERVAL_MS = 1300;

/**
 * Four nodes that light up in turn: new lead → AI calls → qualified → booked. A tiny
 * looping version of the product story, shown under the hero buttons. Illustrative only.
 */
export function HeroFlow({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.4 });
  const active = useCycle(heroFlow.length, { active: inView, intervalMs: INTERVAL_MS, holdSteps: 2 });

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: a new lead is called by Reseny's AI, qualified, and booked onto a calendar."
      className={cn("rounded-2xl border border-border bg-card/70 p-4 backdrop-blur", className)}
    >
      <ol aria-hidden className="flex items-center">
        {heroFlow.map((label, index) => {
          const Glyph = icons[index];
          const reached = index <= active;
          const isLast = index === heroFlow.length - 1;
          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <span className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border transition-all duration-500",
                    reached
                      ? isLast
                        ? "scale-105 border-success bg-success text-white shadow-md dark:text-[#07140e]"
                        : "border-primary bg-primary text-primary-foreground shadow-glow"
                      : "border-border bg-surface text-subtle-foreground",
                  )}
                >
                  <Glyph className="size-5" />
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors duration-500",
                    reached ? "text-foreground" : "text-subtle-foreground",
                  )}
                >
                  {label}
                </span>
              </span>
              {!isLast ? (
                <span className="mx-2 mb-5 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full origin-left rounded-full bg-primary transition-transform duration-700"
                    style={{ transform: `scaleX(${index < active ? 1 : 0})` }}
                  />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-center text-xs text-subtle-foreground">How a lead becomes a booked meeting (illustration)</p>
    </div>
  );
}
