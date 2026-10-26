import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { PlanCard } from "@/components/pricing/plan-card";
import { RoiCalculator } from "@/components/home/roi-calculator";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pilotOffer, plans, pricingFaqs } from "@/lib/content/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing: plans, ROI calculator and free pilot",
  description:
    "Public plans from Starter to Enterprise, an ROI calculator to estimate recovered revenue, and a pilot so you can test Reseny Connect on your own leads.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ]}
        eyebrow="Pricing"
        title={
          <>
            Simple plans for <span className="text-gradient">every stage</span> of growth
          </>
        }
        description="Clear tiers, what is included and what is scoped with you. Start with a pilot on your own leads, and estimate the value with the calculator first if you like."
        actions={
          <>
            <ButtonLink href="/start-pilot" size="lg">
              Start a free pilot
            </ButtonLink>
            <ButtonLink href="/pricing/roi-calculator" variant="secondary" size="lg">
              <Calculator aria-hidden className="size-5" />
              ROI calculator
            </ButtonLink>
          </>
        }
      />

      <Section aria-label="Plans">
        <Container>
          <h2 className="sr-only">
            Plans
          </h2>
          <div className="grid gap-5 pt-3 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            Exact pricing depends on your call volume and set-up needs, and we confirm it with you before you commit.
            Need something that is not listed?{" "}
            <Link href="/company/contact" className="font-semibold text-primary-text underline underline-offset-2 hover:no-underline">
              Talk to us
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section tone="subtle" aria-label={pilotOffer.title}>
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Pilot"
              title={pilotOffer.title}
              description={pilotOffer.body}
            />
            <ButtonLink href="/start-pilot" size="lg" className="mt-8">
              Start a free pilot
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
          <ol className="space-y-4">
            {pilotOffer.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-base font-extrabold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="font-semibold text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-label="What could faster follow-up be worth?">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="ROI calculator"
            title="What could faster follow-up be worth?"
            description="Enter your leads per month, how quickly you respond today and your average deal value. The calculator shows an estimate of the extra revenue, with every assumption visible and editable."
          />
          <RoiCalculator variant="compact" />
        </Container>
      </Section>

      <Section id="faq" tone="subtle" aria-label="Pricing questions, answered">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Pricing FAQ" title="Pricing questions, answered" />
          <FaqList faqs={pricingFaqs} name="pricing-faq" schema className="mt-12" />
        </Container>
      </Section>

      <CtaBand source="pricing" />
    </>
  );
}
