"use client";

import { CalendarCheck, ClipboardCheck, PhoneCall, Repeat, UserPlus, type LucideIcon } from "lucide-react";
import { flowNodes } from "@/lib/content/home";
import { useCycle } from "@/lib/hooks/use-cycle";
import { useInView } from "@/lib/hooks/use-in-view";
import { cn } from "@/lib/utils";

/** Direct icon imports keep the shared icon registry out of this client bundle. */
const glyphs: Record<string, LucideIcon> = {
  lead: UserPlus,
  call: PhoneCall,
  qualify: ClipboardCheck,
  "follow-up": Repeat,
  booked: CalendarCheck,
};

/**
 * Lead-to-appointment flow (SOP §8): Lead → Call → Qualify → Follow-up → Booked, with the
 * nodes lighting up in sequence while the diagram is on screen. Vertical on phones,
 * horizontal from `md`. With reduced motion every node is lit.
 */
export function FlowDiagram({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLOListElement>({ once: false, threshold: 0.3 });
  const active = useCycle(flowNodes.length, { active: inView, intervalMs: 1300, holdSteps: 2 });

  return (
    <ol ref={ref} className={cn("grid gap-0 md:grid-cols-5", className)}>
      {flowNodes.map((node, index) => {
        const reached = index <= active;
        const current = index === active;
        const isLast = index === flowNodes.length - 1;
        const Glyph = glyphs[node.id];
        return (
          <li
            key={node.id}
            aria-label={`${node.label}: ${node.caption}`}
            className={cn(
              "relative flex gap-4 pb-8 last:pb-0 md:flex-col md:items-center md:gap-4 md:pb-0 md:text-center",
              // Connector to the next node: vertical on phones, horizontal on md+.
              !isLast &&
                "after:absolute after:top-14 after:left-6 after:h-[calc(100%-3.5rem)] after:w-0.5 after:rounded-full md:after:top-7 md:after:left-[calc(50%+2.25rem)] md:after:h-0.5 md:after:w-[calc(100%-4.5rem)]",
              !isLast && (index < active ? "after:bg-primary" : "after:bg-border"),
              !isLast && "after:transition-colors after:duration-700",
            )}
          >
            <span
              className={cn(
                "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 md:size-14",
                reached
                  ? isLast
                    ? "border-success bg-success text-white shadow-lg dark:text-[#07140e]"
                    : "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card text-subtle-foreground",
                current && "scale-110",
              )}
            >
              <Glyph aria-hidden className="size-6" />
            </span>
            <span className="flex-1 md:flex-none">
              <span
                className={cn(
                  "block text-base font-bold transition-colors duration-500",
                  reached ? "text-foreground" : "text-subtle-foreground",
                )}
              >
                {node.label}
              </span>
              <span className="mt-0.5 block text-sm text-muted-foreground md:px-2">{node.caption}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
