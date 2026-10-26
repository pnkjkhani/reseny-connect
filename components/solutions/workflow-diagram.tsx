import type { Step } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/** Static class names so Tailwind can see them (it cannot build `grid-cols-${n}` at runtime). */
const columns: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Static visual of a sector's call-to-booking journey (SOP §7.3 #4). Vertical on phones,
 * horizontal from `lg`, with a connector between steps.
 */
export function WorkflowDiagram({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-0 lg:gap-4", columns[steps.length] ?? "lg:grid-cols-4", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.title}
            className={cn(
              "relative flex gap-4 pb-8 last:pb-0 lg:block lg:pb-0",
              !isLast &&
                "after:absolute after:top-12 after:left-[1.35rem] after:h-[calc(100%-3rem)] after:w-0.5 after:rounded-full after:bg-border lg:after:top-[1.35rem] lg:after:left-14 lg:after:h-0.5 lg:after:w-[calc(100%-3.5rem)]",
            )}
          >
            <span
              className={cn(
                "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl text-base font-extrabold",
                isLast ? "bg-success text-white dark:text-[#07140e]" : "bg-brand text-primary-foreground shadow-glow",
              )}
            >
              {index + 1}
            </span>
            <div className="lg:mt-4">
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
