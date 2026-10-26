import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { outcomes } from "@/lib/content/home";
import { AnimatedCounter } from "./animated-counter";

/**
 * Outcome tiles (SOP §7.2 #5). The SOP says to "fill with your own measured numbers", so
 * tiles show a counter only when `metric` is set in `lib/content/home.ts`; until then
 * they state the outcome in words rather than inventing a figure.
 */
export function OutcomeTiles() {
  return (
    <Section aria-label="Built around the results you actually buy">
      <Container>
        <SectionHeading
          eyebrow="Outcomes"
          title="Built around the results you actually buy"
          description="Not features for their own sake: more leads reached, more appointments booked, and less effort to get there."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {outcomes.map((outcome, index) => (
            <li
              key={outcome.title}
              className="reveal flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
              style={{ animationRange: `entry ${index * 6}% entry ${70 + index * 6}%` }}
            >
              {outcome.metric ? (
                <p className="text-gradient text-4xl font-extrabold tracking-tight">
                  <AnimatedCounter {...outcome.metric} />
                </p>
              ) : outcome.badge ? (
                <p className="text-gradient text-4xl font-extrabold tracking-tight">{outcome.badge}</p>
              ) : (
                <IconTile name={outcome.icon} size="lg" />
              )}
              <h3 className="mt-5 text-lg font-bold text-foreground">{outcome.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{outcome.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
