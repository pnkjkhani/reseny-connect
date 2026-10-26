import { Check } from "lucide-react";
import { CallNowForm } from "@/components/forms/call-now-form";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";

interface CtaBandProps {
  title?: string;
  description?: string;
  /** Stored with the lead so you can compare which pages convert. */
  source: string;
  industry?: string;
}

const reassurances = [
  "It introduces itself as an AI, so there are no surprises",
  "A few quick questions, then it shows you how booking works",
  "Stop at any time and opt out of further contact",
];

/**
 * Closing "Let Reseny call you" banner with the live mini-form (SOP §6.3 and §7.2 #15).
 * Used at the end of every section-heavy page.
 */
export function CtaBand({
  title = "Let Reseny call you",
  description = "Enter your number and hear exactly what your customers would hear. It takes about a minute.",
  source,
  industry,
}: CtaBandProps) {
  return (
    <Section tone="brand" size="lg" aria-label={title} className="isolate overflow-hidden">
      <div aria-hidden className="absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-[#7440ff]/40 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -bottom-40 -z-10 size-[28rem] rounded-full bg-[#f0892e]/25 blur-3xl" />
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Eyebrow inverse>Get a call in about 30 seconds</Eyebrow>
          <h2
            className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#d9ceff]">{description}</p>
          <ul className="mt-7 space-y-3">
            {reassurances.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#ece6ff]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check aria-hidden className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-a-demo" variant="light" size="lg">
              Prefer a demo? Book a time
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-5 text-foreground shadow-pop sm:p-7">
          <h3 className="text-lg font-bold">Enter your number</h3>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">Our AI will call you within seconds.</p>
          <CallNowForm source={source} industry={industry} compact />
        </div>
      </Container>
    </Section>
  );
}
