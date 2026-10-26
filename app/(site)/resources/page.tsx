import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { IconTile } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { resourceLinks } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources: sample calls, guides, case studies and help",
  description:
    "Hear synthetic sample calls, read industry playbooks and case studies, join webinars and find help for getting the most from Reseny Connect.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
        ]}
        eyebrow="Resources"
        title={
          <>
            Learn how to <span className="text-gradient">answer every lead</span>
          </>
        }
        description="Sample calls, playbooks, case studies, webinars and help, all in one place."
      />

      <Section aria-label="Resources">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resourceLinks.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop"
                >
                  <IconTile name={resource.icon} size="lg" />
                  <h2 className="mt-5 text-xl font-bold text-foreground">{resource.title}</h2>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{resource.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text">
                    Open
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/pricing/roi-calculator"
                className="group flex h-full flex-col justify-between rounded-3xl bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_60%,#4510c4_100%)] p-6 text-white shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-[#c9b6ff] uppercase">Tool</p>
                  <h2 className="mt-3 text-xl font-bold">ROI calculator</h2>
                  <p className="mt-2 leading-relaxed text-[#d9ceff]">
                    Estimate the revenue recovered by faster follow-up, with every assumption editable.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Try it
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          </ul>
        </Container>
      </Section>

      <CtaBand source="resources" />
    </>
  );
}
