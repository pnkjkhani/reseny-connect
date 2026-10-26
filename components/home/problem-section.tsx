import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ProblemStory } from "./problem-story";

/** The problem (SOP §7.2 #3): leads that wait, missed calls, forgotten follow-up. */
export function ProblemSection() {
  return (
    <Section aria-label="Leads don't wait. Your follow-up shouldn't either.">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Leads don't wait. Your follow-up shouldn't either."
          description="Every business that lives on enquiries has the same three leaks. Reseny closes all of them."
        />
        <ProblemStory />
        <p className="mt-6 text-center text-xs text-subtle-foreground">
          The animations above are illustrations of the problems, not statistics.
        </p>
      </Container>
    </Section>
  );
}
