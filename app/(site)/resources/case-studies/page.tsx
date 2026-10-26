import { FlaskConical, Rocket } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { illustrativeScenario } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case studies",
  description:
    "Real results from Reseny Connect pilots will be published here with real numbers. Be one of our first pilots.",
  path: "/resources/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Case studies", href: "/resources/case-studies" },
        ]}
        eyebrow="Case studies"
        title={
          <>
            Real results, <span className="text-gradient">when they are real</span>
          </>
        }
        description="We are onboarding our first pilot customers. As results come in, this page will show real numbers and customer stories, never invented ones."
        actions={
          <ButtonLink href="/start-pilot" size="lg">
            <Rocket aria-hidden className="size-5" />
            Be one of our first pilots
          </ButtonLink>
        }
      />

      <Section aria-label="Case studies">
        <Container className="grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-dashed border-border-strong bg-surface p-7 sm:p-9">
            <FlaskConical aria-hidden className="size-8 text-primary-text" />
            <h2 className="mt-5 text-2xl font-bold text-foreground">Pilot results are on the way</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Each case study will include the customer&apos;s starting point, what was set up, and measured outcomes such as
              leads reached, appointments booked and cost per qualified lead, shared with their permission.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9">
            <p className="inline-flex rounded-full bg-warning-soft px-3 py-1 text-xs font-bold text-warning">
              {illustrativeScenario.label}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-foreground">{illustrativeScenario.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{illustrativeScenario.body}</p>
            <Link
              href="/pricing/roi-calculator"
              className="mt-5 inline-flex font-semibold text-primary-text underline underline-offset-2 hover:no-underline"
            >
              Estimate it for your own business →
            </Link>
          </article>
        </Container>
      </Section>
    </>
  );
}
