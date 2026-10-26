import { Scale } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { SectionNav, TrustSections } from "@/components/trust/trust-sections";
import { Container, Section } from "@/components/ui/section";
import { legalDocs, legalPlaceholder } from "@/lib/content/trust";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs.find((item) => item.slug === slug);
  if (!doc) return {};
  return pageMetadata({ title: doc.title, description: doc.summary, path: `/legal/${doc.slug}` });
}

/**
 * Plain-language summary first, legal language second (SOP §7.4). The full legal text is
 * pending review by counsel: see `legalPlaceholder` in lib/content/trust.ts.
 */
export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = legalDocs.find((item) => item.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trust Center", href: "/trust" },
          { name: doc.title, href: `/legal/${doc.slug}` },
        ]}
        eyebrow="Legal"
        title={doc.title}
        description={doc.summary}
      />

      <Section aria-label={doc.title}>
        <Container className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <SectionNav sections={doc.plain} />
          <div className="max-w-3xl">
            <p className="mb-8 text-sm font-bold tracking-wider text-subtle-foreground uppercase">Plain-language summary</p>
            <TrustSections sections={doc.plain} />
            <div className="mt-14 flex gap-4 rounded-2xl border border-dashed border-border-strong bg-surface p-6">
              <Scale aria-hidden className="mt-0.5 size-6 shrink-0 text-primary-text" />
              <p className="leading-relaxed text-muted-foreground">{legalPlaceholder}</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
