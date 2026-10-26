import { ArrowRight, PhoneCall, Plug, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { toSampleCallItems } from "@/components/home/sample-call-items";
import { SampleCallGroup } from "@/components/home/sample-calls";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { FaqList } from "@/components/ui/faq-list";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { categoryMeta, relatedSolutions, solutionHref } from "@/lib/content/solutions";
import type { Solution } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { WorkflowDiagram } from "./workflow-diagram";

/**
 * The shared template for every industry, use-case and team-size page (SOP §7.3):
 * headline in the sector's words → pain points → interactive sample call → workflow
 * diagram → ready template → integrations → outcomes and compliance → results → FAQ → CTA.
 */
export function SolutionPage({ solution }: { solution: Solution }) {
  const meta = categoryMeta[solution.category];
  const related = relatedSolutions(solution);
  const path = solutionHref(solution);
  const isTeam = solution.category === "teams";

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: solution.name, href: path },
        ]}
        eyebrow={meta.singular}
        title={solution.headline}
        description={solution.intro}
        actions={
          <>
            <ButtonLink href="/get-a-call" size="lg">
              <PhoneCall aria-hidden className="size-5" />
              {solution.ctaLabel}
            </ButtonLink>
            <ButtonLink href="/book-a-demo" variant="secondary" size="lg">
              Book a demo
            </ButtonLink>
          </>
        }
        aside={
          <SampleCallGroup
            items={toSampleCallItems([solution])}
            className="md:grid-cols-1 xl:grid-cols-1"
            headingLevel="h2"
          />
        }
      />

      <Section aria-label="The problems this solves">
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="The problems this solves"
            description={`Where ${isTeam ? solution.name.toLowerCase() : "this"} work leaks leads, time and revenue today.`}
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {solution.painPoints.map((pain, index) => (
              <li key={pain.title} className="reveal rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="flex size-10 items-center justify-center rounded-xl bg-rose/12 text-base font-extrabold text-rose">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{pain.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{pain.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="subtle" aria-label={isTeam ? "How a rollout works" : "From enquiry to booking, step by step"}>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title={isTeam ? "How a rollout works" : "From enquiry to booking, step by step"}
            description="The journey your leads take once Reseny is switched on."
          />
          <div className="mt-14 rounded-4xl border border-border bg-card p-6 shadow-card sm:p-10">
            <WorkflowDiagram steps={solution.workflow} />
          </div>
        </Container>
      </Section>

      <Section aria-label={meta.ready}>
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={isTeam ? "What to expect" : "Ready template"}
              title={meta.ready}
              description={
                isTeam
                  ? "Everything we set up with you, so you can go live without technical work."
                  : "Start from this ready-made template and change any question, offer or rule in plain language."
              }
            />
            {!isTeam ? (
              <div className="mt-8">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Plug aria-hidden className="size-4 text-primary-text" />
                  Works with
                </p>
                <ul className="flex flex-wrap gap-2">
                  {solution.integrations.map((item) => (
                    <li key={item} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <CheckList items={solution.agentQuestions} tone="primary" />
          </div>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="What you get, and how it stays responsible">
        <Container>
          <SectionHeading eyebrow="Outcomes" title="What you get, and how it stays responsible" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7">
              <span className="flex items-center gap-2.5 text-lg font-bold text-foreground">
                <IconTile name="trending-up" size="sm" />
                What you get
              </span>
              <CheckList items={solution.outcomes} className="mt-5" />
            </div>
            {isTeam ? null : (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7">
                <span className="flex items-center gap-2.5 text-lg font-bold text-foreground">
                  <IconTile name="plug" size="sm" />
                  Connects to
                </span>
                <CheckList items={solution.integrations} tone="primary" className="mt-5" />
              </div>
            )}
            <div className={cn("rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7", isTeam && "lg:col-span-2")}>
              <span className="flex items-center gap-2.5 text-lg font-bold text-foreground">
                <ShieldCheck aria-hidden className="size-5 text-green" />
                Compliance notes
              </span>
              <CheckList items={solution.compliance} className="mt-5" />
              <Link href="/trust" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text hover:underline">
                Read the Trust Center
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-label="Results and stories" size="sm">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-dashed border-border-strong bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex items-start gap-4">
              <IconTile name="chart-line" size="lg" />
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Results and stories
                </h2>
                <p className="mt-1.5 max-w-xl leading-relaxed text-muted-foreground">
                  We publish only real numbers from real pilots, and results will appear here as soon as they exist.
                  {isTeam ? "" : ` Be one of our first ${solution.name.toLowerCase()} pilots.`}
                </p>
              </div>
            </div>
            <ButtonLink href="/start-pilot" className="shrink-0">
              <Sparkles aria-hidden className="size-4" />
              Start a free pilot
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" aria-label={`Questions about ${solution.name.toLowerCase()}`}>
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title={`Questions about ${solution.name.toLowerCase()}`} />
          <FaqList faqs={solution.faqs} name={`faq-${solution.slug}`} schema className="mt-12" />
        </Container>
      </Section>

      <Section size="sm" aria-label={`Explore more ${meta.label.toLowerCase()}`}>
        <Container>
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground">
            Explore more {meta.label.toLowerCase()}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={solutionHref(item)}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <IconTile name={item.icon} />
                  <span>
                    <span className="block font-bold text-foreground">{item.name}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">{item.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        source={`${solution.category}:${solution.slug}`}
        industry={solution.category === "industries" ? solution.slug : undefined}
        title={solution.ctaLabel}
        description="Enter your number and hear this exact scenario on your own phone."
      />
    </>
  );
}
