import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeroProps {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  /** The page's single <h1>. */
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Right-hand visual (demo, form, illustration). */
  aside?: ReactNode;
  className?: string;
}

/** Top band for every inner page: breadcrumbs, H1, intro, calls to action and an optional visual. */
export function PageHero({ breadcrumbs, eyebrow, title, description, actions, aside, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b border-border bg-background", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <Container className="py-12 sm:py-16 lg:py-20">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-6" /> : null}
        <div className={cn("grid items-center gap-10 lg:gap-14", aside && "lg:grid-cols-[1.05fr_0.95fr]")}>
          <div>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="mt-3 text-4xl leading-[1.07] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
