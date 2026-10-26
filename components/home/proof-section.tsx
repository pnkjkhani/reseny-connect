import { Rocket } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { pilotProof, resenyUsesReseny } from "@/lib/content/home";

/**
 * Case studies and testimonials (SOP §7.2 #10: "with real numbers once pilots are done").
 * There are no pilots to report yet, so this section tells the true story available now,
 * "Reseny uses Reseny" (SOP §6.2), and says plainly that results will follow. No invented
 * customers, quotes or figures.
 */
export function ProofSection() {
  return (
    <Section aria-label={resenyUsesReseny.title}>
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Eyebrow>{resenyUsesReseny.eyebrow}</Eyebrow>
          <h2
            className="mt-3 text-3xl leading-[1.12] font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            {resenyUsesReseny.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{resenyUsesReseny.body}</p>

          <ol className="mt-8 space-y-0">
            {resenyUsesReseny.steps.map((step, index) => (
              <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                {index < resenyUsesReseny.steps.length - 1 ? (
                  <span aria-hidden className="absolute top-9 bottom-0 left-4 w-0.5 bg-border" />
                ) : null}
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="pt-1 leading-relaxed text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="self-start rounded-3xl border border-dashed border-border-strong bg-surface p-7 sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-text">
            <Rocket aria-hidden className="size-6" />
          </span>
          <h3 className="mt-5 text-2xl font-bold text-foreground">{pilotProof.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{pilotProof.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/start-pilot">Be one of our first pilots</ButtonLink>
            <ButtonLink href="/resources/case-studies" variant="secondary">
              Case studies
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
