import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { SolutionGrid } from "@/components/solutions/solution-grid";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { categoryMeta, industries, teams, useCases } from "@/lib/content/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions by industry, use case and team size",
  description:
    "Ready-made AI calling agents for 16 sectors, 9 use cases and every team size, from real estate and clinics to banking, education and enterprise.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
        ]}
        eyebrow="Solutions"
        title={
          <>
            Built for <span className="text-gradient">your industry</span>, your use case and your team
          </>
        }
        description="Every page has its own ready template, workflow and compliance notes, written in that sector's own words. Start from the one that matches your business."
        actions={
          <>
            <ButtonLink href="#industries" size="lg">
              Browse industries
            </ButtonLink>
            <ButtonLink href="/book-a-demo" variant="secondary" size="lg">
              Book a demo
            </ButtonLink>
          </>
        }
      />

      <Section id="industries" aria-label="Ready-made for your industry">
        <Container>
          <SectionHeading
            eyebrow={categoryMeta.industries.label}
            title="Ready-made for your industry"
            description={categoryMeta.industries.description}
          />
          <SolutionGrid items={industries} className="mt-12" />
        </Container>
      </Section>

      <Section id="use-cases" tone="subtle" aria-label="Start from the job you need done">
        <Container>
          <SectionHeading
            eyebrow={categoryMeta["use-cases"].label}
            title="Start from the job you need done"
            description={categoryMeta["use-cases"].description}
          />
          <SolutionGrid items={useCases} className="mt-12" />
        </Container>
      </Section>

      <Section id="teams" aria-label="From a one-person shop to an enterprise">
        <Container>
          <SectionHeading
            eyebrow={categoryMeta.teams.label}
            title="From a one-person shop to an enterprise"
            description={categoryMeta.teams.description}
          />
          <SolutionGrid items={teams} className="mt-12" />

          <Link
            href="/solutions/agencies"
            className="group mt-5 flex flex-col items-start gap-5 rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/40 hover:shadow-pop sm:flex-row sm:items-center sm:p-8"
          >
            <IconTile name="handshake" size="lg" />
            <span className="flex-1">
              <span className="block text-xl font-bold text-foreground">Agencies, consultants and resellers</span>
              <span className="mt-1 block leading-relaxed text-muted-foreground">
                Offer AI calling to your own clients under your brand with our partner programme.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-primary-text">
              Become a partner
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Container>
      </Section>

      <CtaBand source="solutions-hub" />
    </>
  );
}
