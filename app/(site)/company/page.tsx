import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { AstransysLogo, ResenyLockup } from "@/components/ui/logo";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { about, values } from "@/lib/content/company";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Reseny Business Mercantech",
  description:
    "Reseny Business Mercantech is an initiative by Astransys Group, an IT company since 2017, building the AI calling platform that makes sure no lead goes cold.",
  path: "/company",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/company" },
        ]}
        eyebrow="About us"
        title={about.title}
        description={about.story[0]}
        actions={
          <>
            <ButtonLink href="/book-a-demo" size="lg">
              Book a demo
            </ButtonLink>
            <ButtonLink href="/company/contact" variant="secondary" size="lg">
              Contact us
            </ButtonLink>
          </>
        }
        aside={
          <div className="flex flex-wrap items-center justify-center gap-5 rounded-4xl border border-border bg-card p-8 shadow-pop">
            <ResenyLockup width={260} />
            <AstransysLogo width={150} />
          </div>
        }
      />

      <Section aria-label="Built on years of engineering">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div>
            <SectionHeading align="left" eyebrow="Our story" title="Built on years of engineering" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {about.story.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <dl className="self-start rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            {about.heritage.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-border py-3 first:pt-0 last:border-0 last:pb-0">
                <dt className="text-sm font-semibold text-subtle-foreground">{item.label}</dt>
                <dd className="text-right font-bold text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="Our values">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="Our values"
            description={siteConfig.heritageLine}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="reveal rounded-3xl border border-border bg-card p-6 shadow-card">
                <IconTile name={value.icon} size="lg" />
                <h3 className="mt-5 text-lg font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{value.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link
              href="/company/mission-vision"
              className="inline-flex items-center gap-1.5 font-semibold text-primary-text hover:underline"
            >
              Read our mission and vision
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </p>
        </Container>
      </Section>

      <CtaBand source="company" />
    </>
  );
}
