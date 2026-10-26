import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { legalDocs, trustOverviewPoints, trustPages } from "@/lib/content/trust";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trust Center: consent, calling windows, privacy and AI oversight",
  description:
    "How Reseny handles consent, calling windows, do-not-disturb, data privacy, human handoff and call recording, explained in plain language first, legal language second.",
  path: "/trust",
});

export default function TrustCenterPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trust Center", href: "/trust" },
        ]}
        eyebrow="Trust Center"
        title={
          <>
            Compliance and privacy, <span className="text-gradient">in plain language</span>
          </>
        }
        description="Buyers are right to ask how an AI that calls their customers behaves. Here is how Reseny handles consent, calling windows, do-not-disturb, data, human handoff and recording."
        actions={
          <ButtonLink href="/company/contact" size="lg">
            Request a security review
          </ButtonLink>
        }
      />

      <Section aria-label="What you can rely on">
        <Container>
          <SectionHeading eyebrow="Our promises" title="What you can rely on" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustOverviewPoints.map((point) => (
              <li key={point.title} className="reveal flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-card">
                <IconTile name={point.icon} tone="green" size="lg" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="Read the detail">
        <Container>
          <SectionHeading eyebrow="Details" title="Read the detail" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {trustPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/trust/${page.slug}`}
                  className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop"
                >
                  <IconTile name={page.icon} size="lg" />
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-foreground">{page.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{page.summary}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-1 size-5 text-subtle-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary-text" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg font-bold text-foreground">Legal documents</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {legalDocs.map((doc) => (
                  <li key={doc.slug}>
                    <Link href={`/legal/${doc.slug}`} className="font-semibold text-primary-text hover:underline">
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg font-bold text-foreground">System status</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Check the availability of Reseny Connect and any current incidents.
              </p>
              <Link href="/trust/status" className="mt-3 inline-flex font-semibold text-primary-text hover:underline">
                View system status →
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
