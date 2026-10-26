"use client";

import { Container, SectionHeading } from "@/components/ui/section";
import { CalendarCheck, PhoneCall, Plug, WandSparkles, type LucideIcon } from "lucide-react";
import { howItWorks } from "@/lib/content/home";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useScrollSteps } from "@/lib/hooks/use-scroll-steps";
import { cn } from "@/lib/utils";
import { StepVisual, type StepVisualId } from "./how-it-works-visuals";

/** Direct icon imports keep the shared icon registry out of this client bundle. */
const glyphs: Record<string, LucideIcon> = {
  connect: Plug,
  teach: WandSparkles,
  call: PhoneCall,
  book: CalendarCheck,
};

/**
 * "How it works in 4 steps" (SOP §7.2 #4 and §8). On large screens the section pins in
 * place and advances one step per slice of scroll; on small screens (or with reduced
 * motion) it is a plain stack where every step is visible. All text is in the DOM either
 * way, so it reads the same to search engines and screen readers.
 */
export function HowItWorks() {
  const reducedMotion = useReducedMotion();
  const pinned = !reducedMotion;
  const { ref, step } = useScrollSteps(howItWorks.length, pinned);

  return (
    <section id="how-it-works" aria-label="From raw lead to booked meeting in four steps" className="bg-background">
      <Container className="pt-20 sm:pt-24 lg:pt-28">
        <SectionHeading
          eyebrow="How it works"
          title="From raw lead to booked meeting in four steps"
          description="You set it up once. After that, every new lead is called, qualified, followed up and booked, without anyone lifting a finger."
        />
      </Container>

      <div ref={ref} className={cn(pinned && "lg:h-[320vh]")}>
        <div className={cn("py-12 lg:py-16", pinned && "lg:sticky lg:top-18 lg:flex lg:h-[calc(100vh-4.5rem)] lg:items-center lg:py-0")}>
          <Container className={cn("grid gap-10 lg:gap-16", pinned && "lg:grid-cols-[1fr_1.05fr] lg:items-center")}>
            <ol className="space-y-5">
              {howItWorks.map((item, index) => {
                const active = !pinned || index === step;
                const Glyph = glyphs[item.id];
                return (
                  <li key={item.id} aria-current={pinned && active ? "step" : undefined}>
                    <div
                      className={cn(
                        "flex gap-4 rounded-3xl border p-5 transition-all duration-500 sm:p-6",
                        active ? "border-primary/40 bg-card shadow-card" : "border-transparent opacity-80",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500",
                          active ? "bg-brand text-primary-foreground shadow-glow" : "bg-surface-2 text-subtle-foreground",
                        )}
                      >
                        <Glyph aria-hidden className="size-6" />
                      </span>
                      <div>
                        <p className="text-xs font-bold tracking-wider text-primary-text uppercase">Step {index + 1}</p>
                        <h3 className="mt-0.5 text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                      </div>
                    </div>
                    <div className={cn("mt-4", pinned && "lg:hidden")}>
                      <StepVisual id={item.id as StepVisualId} />
                    </div>
                  </li>
                );
              })}
            </ol>

            {pinned ? (
              <div className="relative hidden aspect-[5/4] lg:block">
                {howItWorks.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "absolute inset-0 flex items-center transition-all duration-500",
                      index === step ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                    )}
                  >
                    <StepVisual id={item.id as StepVisualId} />
                  </div>
                ))}
              </div>
            ) : null}
          </Container>
        </div>
      </div>
    </section>
  );
}
