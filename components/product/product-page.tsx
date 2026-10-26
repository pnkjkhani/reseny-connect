import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { FaqList } from "@/components/ui/faq-list";
import { Icon } from "@/components/ui/icon";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { integrationGroups } from "@/lib/content/home";
import { testedLanguages } from "@/lib/content/languages";
import { products } from "@/lib/content/products";
import type { ProductPage } from "@/lib/content/types";
import { siteConfig } from "@/lib/site";

/** Webhook events named in plain words: the exact identifiers live in the API documentation. */
const webhookEvents = [
  "Call completed, with summary and outcome",
  "Lead qualified, with score",
  "Appointment booked, rescheduled or cancelled",
  "Human handoff requested",
  "Opt-out recorded",
];

/** Extra sections for pages that need more than the standard template. */
function Extras({ slug }: { slug: string }) {
  if (slug === "multilingual-voice") {
    return (
      <Section aria-label="Languages we have tested">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Languages"
            title="Languages we have tested"
            description="We list only languages we have tested end to end, and add to the list after testing. Need another? Tell us and we will test it first."
          />
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {testedLanguages.map((language) => (
              <li
                key={language.value}
                className="rounded-full border border-primary/30 bg-primary-soft px-6 py-3 text-lg font-bold text-primary-text"
              >
                {language.label}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    );
  }

  if (slug === "integrations") {
    return (
      <Section aria-label="Your stack, connected">
        <Container>
          <SectionHeading
            eyebrow="Connects to"
            title="Your stack, connected"
            description="Examples of tools Reseny connects to through APIs, webhooks and custom integrations. If yours is not here, our engineers can usually connect it."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {integrationGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="flex items-center gap-3 text-lg font-bold text-foreground">
                  <IconTile name={group.icon} size="sm" />
                  {group.title}
                </span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  if (slug === "developers") {
    return (
      <Section aria-label="Events your systems can react to">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Webhooks"
              title="Events your systems can react to"
              description="Subscribe once and keep your CRM, dashboards and internal tools in step with every call."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.links.docs ? (
                <ButtonLink href={siteConfig.links.docs} size="lg">
                  Read the documentation
                </ButtonLink>
              ) : (
                <ButtonLink href="/company/contact" size="lg">
                  Request API access
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <CheckList items={webhookEvents} tone="primary" />
          </div>
        </Container>
      </Section>
    );
  }

  return null;
}

/** Template for the product pages (SOP §2.2–2.12). */
export function ProductPageView({ product }: { product: ProductPage }) {
  const related = product.related
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item): item is ProductPage => Boolean(item));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Product", href: "/product" },
          { name: product.name, href: `/product/${product.slug}` },
        ]}
        eyebrow="Product"
        title={product.headline}
        description={product.intro}
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
        aside={
          <div className="rounded-4xl bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_60%,#4510c4_100%)] p-7 text-white shadow-pop sm:p-9">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white/12">
              <Icon name={product.icon} className="size-8" strokeWidth={1.6} />
            </span>
            <p className="mt-6 text-sm font-bold tracking-[0.16em] text-[#c9b6ff] uppercase">At a glance</p>
            <ul className="mt-4 space-y-3">
              {product.highlights.slice(0, 4).map((highlight) => (
                <li key={highlight.title} className="flex items-center gap-3 font-semibold">
                  <Icon name={highlight.icon} className="size-5 shrink-0 text-[#c9b6ff]" />
                  {highlight.title}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section aria-label="What it does">
        <Container>
          <SectionHeading eyebrow="Capabilities" title="What it does" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((highlight) => (
              <li key={highlight.title} className="reveal rounded-3xl border border-border bg-card p-6 shadow-card">
                <IconTile name={highlight.icon} size="lg" />
                <h3 className="mt-5 text-lg font-bold text-foreground">{highlight.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{highlight.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="Set up once, then it runs">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading align="left" eyebrow="How it works" title="Set up once, then it runs" />
            <ol className="mt-8 space-y-6">
              {product.howItWorks.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand text-base font-extrabold text-primary-foreground shadow-glow">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h3 className="text-lg font-bold text-foreground">What&apos;s included</h3>
            <CheckList items={product.included} className="mt-5" />
          </div>
        </Container>
      </Section>

      <Extras slug={product.slug} />

      <Section aria-label={`About ${product.name.toLowerCase()}`}>
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title={`About ${product.name.toLowerCase()}`} />
          <FaqList faqs={product.faqs} name={`faq-${product.slug}`} schema className="mt-12" />
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="subtle" size="sm" aria-label="Works best together with">
          <Container>
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground">
              Works best together with
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/product/${item.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                  >
                    <IconTile name={item.icon} />
                    <span className="flex-1">
                      <span className="block font-bold text-foreground">{item.name}</span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">{item.summary}</span>
                    </span>
                    <ArrowRight aria-hidden className="mt-1 size-4 text-subtle-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBand source={`product:${product.slug}`} />
    </>
  );
}
