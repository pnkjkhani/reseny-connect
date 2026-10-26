import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { features } from "@/lib/content/home";

/** Features grid (SOP §7.2 #6): qualification, cadence, multilingual, booking, handoff, analytics, integrations. */
export function FeaturesGrid() {
  return (
    <Section tone="subtle" aria-label="Everything between “new lead” and “meeting booked”">
      <Container>
        <SectionHeading
          eyebrow="The platform"
          title="Everything between “new lead” and “meeting booked”"
          description="Most tools stop at the call. Reseny covers the whole loop, so nothing falls between the cracks."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="reveal">
              <Link
                href={feature.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop"
              >
                <IconTile name={feature.icon} size="lg" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                <h3 className="mt-5 text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{feature.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text">
                  Learn more
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
          <li className="reveal">
            <Link
              href="/product"
              className="group flex h-full flex-col justify-between rounded-3xl bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_60%,#4510c4_100%)] p-6 text-white shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-[#c9b6ff] uppercase">And more</p>
                <h3 className="mt-3 text-xl font-bold">Explore the whole platform</h3>
                <p className="mt-2 leading-relaxed text-[#d9ceff]">
                  Campaign manager, Agent Studio, templates, API and webhooks.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                See the product
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
