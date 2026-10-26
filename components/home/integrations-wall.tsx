import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Marquee } from "@/components/ui/marquee";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { integrationGroups } from "@/lib/content/home";

const rows = [
  integrationGroups.flatMap((group) => group.items),
  [...integrationGroups].reverse().flatMap((group) => group.items),
];

/**
 * Integrations wall (SOP §7.2 #9). Names rather than logos (third-party marks need
 * permission), grouped by category beneath a two-row ticker.
 */
export function IntegrationsWall() {
  return (
    <Section aria-label="Works with the tools you already use" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Integrations"
          title="Works with the tools you already use"
          description="CRM, calendar, WhatsApp, telephony and automation tools, connected through APIs, webhooks and custom integrations from our engineers."
        />
      </Container>

      <div className="mt-12 space-y-3" aria-label="Examples of tools Reseny connects to" role="group">
        {rows.map((items, rowIndex) => (
          <Marquee key={rowIndex} reverse={rowIndex === 1}>
            {items.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="shrink-0 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-foreground shadow-sm"
              >
                {name}
              </li>
            ))}
          </Marquee>
        ))}
      </div>

      <Container>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {integrationGroups.map((group) => (
            <li key={group.title} className="rounded-2xl border border-border bg-card p-5 text-center shadow-card">
              <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
                <Icon name={group.icon} className="size-5.5" />
              </span>
              <p className="mt-3 text-sm font-bold text-foreground">{group.title}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <ButtonLink href="/product/integrations" variant="secondary">
            See integrations
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <p className="mt-3 text-sm text-muted-foreground">Don&apos;t see your tool? We build the connection for you.</p>
        </div>
      </Container>
    </Section>
  );
}
