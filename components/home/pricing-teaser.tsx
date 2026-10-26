import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { pilotOffer, plans } from "@/lib/content/pricing";
import { RoiCalculator } from "./roi-calculator";

/** Pricing teaser plus the compact ROI widget (SOP §7.2 #12). */
export function PricingTeaser() {
  return (
    <Section tone="subtle" aria-label="Simple plans, and a calculator that shows what it is worth">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow>Pricing</Eyebrow>
          <h2
            className="mt-3 text-3xl leading-[1.12] font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            Simple plans, and a calculator that shows what it is worth
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Public tiers for every stage, from your first telecaller to enterprise scale. Try the calculator with your own
            numbers, then start with a pilot.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {plans.map((plan) => (
              <li key={plan.id}>
                <Link
                  href="/pricing"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{plan.name}</span>
                    {plan.featured ? (
                      <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-bold text-primary-text uppercase">
                        Popular
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 text-sm leading-snug text-muted-foreground">{plan.forWho}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary-soft p-5">
            <p className="font-bold text-foreground">{pilotOffer.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pilotOffer.body}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/pricing" size="lg">
              Compare plans
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/start-pilot" variant="secondary" size="lg">
              Start a free pilot
            </ButtonLink>
          </div>
        </div>

        <RoiCalculator variant="compact" />
      </Container>
    </Section>
  );
}
