import { CallNowForm } from "@/components/forms/call-now-form";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { instantDemo } from "@/lib/content/home";
import { industries } from "@/lib/content/solutions";
import { PhoneMockup } from "./phone-mockup";
import { toSampleCallItems } from "./sample-call-items";
import { SampleCallGroup } from "./sample-calls";

/** The three sample calls the SOP asks for: real estate, clinic, education. */
const SAMPLE_SLUGS = ["real-estate", "healthcare", "education"];

const sampleItems = toSampleCallItems(industries.filter((industry) => SAMPLE_SLUGS.includes(industry.slug)));

/**
 * Instant demo strip (SOP §7.2 #2): number + language form, the animated phone, and
 * three sample-call cards with live transcripts. The id is the target of the hero's
 * "Get a call from Reseny now" button.
 */
export function InstantDemo() {
  return (
    <Section id="get-a-call" tone="subtle" aria-label={`${instantDemo.titleLead} ${instantDemo.titleAccent}`}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Eyebrow>{instantDemo.eyebrow}</Eyebrow>
            <h2
              className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl"
            >
              {instantDemo.titleLead} <span className="text-gradient">{instantDemo.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{instantDemo.body}</p>

            <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
              {instantDemo.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-2.5">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-text">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-pop sm:p-7">
              <CallNowForm source="home-strip" />
            </div>
          </div>

          <PhoneMockup />
        </div>

        <div className="mt-20 sm:mt-24">
          <SectionHeading
            as="h3"
            eyebrow="Listen first"
            title="Hear how the agent handles real conversations"
            description="Press play to follow a sample call with a live transcript. Every call here is synthetic: fictional businesses and people."
          />
          <SampleCallGroup items={sampleItems} className="mt-10" />
        </div>
      </Container>
    </Section>
  );
}
