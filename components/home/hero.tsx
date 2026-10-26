import { PhoneCall } from "lucide-react";
import { preconnect } from "react-dom";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { hero } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { DemoEmbed } from "./demo-embed";
import { HeroFlow } from "./hero-flow";

/**
 * Home hero (SOP §7.2 #1). Outcome headline, one-sentence explanation, the two required
 * buttons, and, beside them, the live voice demo embedded as an iframe.
 */
export function Hero() {
  // Open the connection to the demo host while the page hydrates.
  preconnect(new URL(siteConfig.demo.embedUrl).origin);

  return (
    <section aria-label="Every lead called. Every appointment booked." className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />

      <Container className="grid items-start gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:pt-16 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
            <span aria-hidden className="size-2 rounded-full bg-green" />
            {hero.eyebrow}
          </p>

          <h1
            className="mt-6 text-[2.5rem] leading-[1.06] font-extrabold tracking-tight text-foreground sm:text-[3.4rem] lg:text-[3rem] xl:text-[3.6rem]"
          >
            {hero.headlineLead}
            <br />
            <span className="text-gradient">{hero.headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{hero.subline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#get-a-call" size="lg">
              <PhoneCall aria-hidden className="size-5" />
              Get a call from Reseny now
            </ButtonLink>
            <ButtonLink href="/book-a-demo" variant="secondary" size="lg">
              Book a demo
            </ButtonLink>
          </div>

          <HeroFlow className="mt-9 max-w-xl" />

          <ul className="mt-6 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
            {hero.proof.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-text">
                  <Icon name={item.icon} className="size-4" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-brand opacity-[0.12] blur-2xl" />
          <DemoEmbed src={siteConfig.demo.embedUrl} height={siteConfig.demo.height} />
        </div>
      </Container>
    </section>
  );
}
