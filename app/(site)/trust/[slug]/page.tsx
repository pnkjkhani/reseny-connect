import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { SectionNav, TrustSections } from "@/components/trust/trust-sections";
import { FaqList } from "@/components/ui/faq-list";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { trustPages } from "@/lib/content/trust";
import { pageMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export function generateStaticParams() {
  return trustPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trust/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = trustPages.find((item) => item.slug === slug);
  if (!page) return {};
  return pageMetadata({
    title: `${page.title}: Trust Center`,
    description: truncate(page.intro),
    path: `/trust/${page.slug}`,
  });
}

export default async function TrustDetailPage({ params }: PageProps<"/trust/[slug]">) {
  const { slug } = await params;
  const page = trustPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trust Center", href: "/trust" },
          { name: page.title, href: `/trust/${page.slug}` },
        ]}
        eyebrow="Trust Center"
        title={page.title}
        description={page.intro}
      />

      <Section aria-label={page.title}>
        <Container className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <SectionNav sections={page.sections} />
          <div className="max-w-3xl">
            <TrustSections sections={page.sections} />
          </div>
        </Container>
      </Section>

      {page.faqs ? (
        <Section tone="subtle" aria-label="Common questions">
          <Container className="max-w-4xl">
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <FaqList faqs={page.faqs} name={`faq-${page.slug}`} schema className="mt-12" />
          </Container>
        </Section>
      ) : null}

      <CtaBand source={`trust:${page.slug}`} title="Questions about trust?" description="Talk to us, or hear the agent for yourself." />
    </>
  );
}
