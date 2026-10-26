import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { trustPromises } from "@/lib/content/home";

/** Trust and compliance block (SOP §7.2 #11): the main promises, linking to the Trust Center. */
export function TrustBlock() {
  return (
    <Section tone="subtle" aria-label="Compliance is a feature, not a footnote">
      <Container>
        <SectionHeading
          eyebrow="Trust and compliance"
          title="Compliance is a feature, not a footnote"
          description="Buyers are right to ask hard questions about calling rules, privacy and AI. We answer them in plain language, up front."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustPromises.map((promise) => (
            <li key={promise.title} className="reveal flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-card">
              <IconTile name={promise.icon} tone="green" size="lg" />
              <div>
                <h3 className="text-lg font-bold text-foreground">{promise.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{promise.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href="/trust" variant="secondary" size="lg">
            Visit the Trust Center
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
