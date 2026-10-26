import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { FlowDiagram } from "@/components/home/flow-diagram";
import { PhoneMockup } from "@/components/home/phone-mockup";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { products } from "@/lib/content/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product: the lead-to-appointment engine",
  description:
    "Reseny Connect calls, qualifies, follows up and books: an AI voice agent, qualification engine, follow-up cadence, calendar booking, analytics and integrations in one platform.",
  path: "/product",
});

export default function ProductOverviewPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Product", href: "/product" },
        ]}
        eyebrow="Product"
        title={
          <>
            The <span className="text-gradient">lead-to-appointment</span> engine
          </>
        }
        description="Reseny takes a raw lead all the way to a confirmed appointment on your calendar: call, qualify, follow up, rebook, remind, and hand over to a human with the full conversation summary."
        actions={
          <>
            <ButtonLink href="/get-a-call" size="lg">
              <PhoneCall aria-hidden className="size-5" />
              Get a call now
            </ButtonLink>
            <ButtonLink href="/book-a-demo" variant="secondary" size="lg">
              Book a demo
            </ButtonLink>
          </>
        }
        aside={<PhoneMockup />}
      />

      <Section aria-label="Every step of the journey, in one platform">
        <Container>
          <SectionHeading
            eyebrow="One loop"
            title="Every step of the journey, in one platform"
            description="Most tools stop at the call. Reseny covers everything between a new lead and a booked meeting."
          />
          <div className="mt-14 rounded-4xl border border-border bg-card p-6 shadow-pop sm:p-10">
            <FlowDiagram />
          </div>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="Explore what is inside">
        <Container>
          <SectionHeading
            eyebrow="The platform"
            title="Explore what is inside"
            description="Each capability works on its own and gets stronger with the others."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug} className="reveal">
                <Link
                  href={`/product/${product.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop"
                >
                  <IconTile
                    name={product.icon}
                    size="lg"
                    className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <h3 className="mt-5 text-lg font-bold text-foreground">{product.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text">
                    Learn more
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-muted-foreground">
            Prefer us to set it up?{" "}
            <Link href="/services" className="font-semibold text-primary-text underline underline-offset-2 hover:no-underline">
              See our done-for-you services
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CtaBand source="product-overview" />
    </>
  );
}
