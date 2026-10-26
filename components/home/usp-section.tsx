import { Container, Section, SectionHeading } from "@/components/ui/section";
import { FlowDiagram } from "./flow-diagram";

const verbs = ["call", "qualify", "follow up", "rebook", "remind", "hand over to a human"] as const;

/** The one USP to repeat everywhere (SOP §4): "Reseny closes the loop", with the animated flow (SOP §8). */
export function UspSection() {
  return (
    <Section tone="subtle" aria-label="Most tools make calls. Reseny closes the loop.">
      <Container>
        <SectionHeading
          eyebrow="Our difference"
          title={
            <>
              Most tools make calls. <span className="text-gradient">Reseny closes the loop.</span>
            </>
          }
          description="Reseny takes a raw lead all the way to a confirmed appointment on your calendar, and hands over to a human with the full conversation summary."
        />

        <div className="mt-14 rounded-4xl border border-border bg-card p-6 shadow-pop sm:p-10">
          <FlowDiagram />
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5 border-t border-border pt-8">
            {verbs.map((verb) => (
              <li
                key={verb}
                className="rounded-full bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary-text"
              >
                {verb}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
