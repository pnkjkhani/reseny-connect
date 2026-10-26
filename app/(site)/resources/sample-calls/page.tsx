import { toSampleCallItems } from "@/components/home/sample-call-items";
import { SampleCallGroup } from "@/components/home/sample-calls";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { industries, useCases } from "@/lib/content/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sample call library",
  description:
    "Follow synthetic example calls for every industry and use case, with live transcripts. All calls use fictional businesses and people.",
  path: "/resources/sample-calls",
});

export default function SampleCallLibraryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Sample call library", href: "/resources/sample-calls" },
        ]}
        eyebrow="Sample call library"
        title={
          <>
            Hear how the agent <span className="text-gradient">handles your industry</span>
          </>
        }
        description="Short, synthetic example calls for every sector and use case, each with a live transcript. They use fictional businesses and people: we never publish real customer recordings without permission."
        actions={
          <>
            <ButtonLink href="#by-industry" size="lg">
              By industry
            </ButtonLink>
            <ButtonLink href="#by-use-case" variant="secondary" size="lg">
              By use case
            </ButtonLink>
          </>
        }
      />

      <Section id="by-industry" aria-label="Sector sample calls">
        <Container>
          <SectionHeading eyebrow="By industry" title="Sector sample calls" />
          <SampleCallGroup items={toSampleCallItems(industries)} className="mt-12" />
        </Container>
      </Section>

      <Section id="by-use-case" tone="subtle" aria-label="Use-case sample calls">
        <Container>
          <SectionHeading eyebrow="By use case" title="Use-case sample calls" />
          <SampleCallGroup items={toSampleCallItems(useCases)} className="mt-12" />
        </Container>
      </Section>

      <CtaBand source="sample-call-library" title="Want to hear it on your own phone?" />
    </>
  );
}
