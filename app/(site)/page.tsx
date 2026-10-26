import type { Metadata } from "next";
import { Comparison } from "@/components/home/comparison";
import { FeaturesGrid } from "@/components/home/features-grid";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { IndustryCarousel } from "@/components/home/industry-carousel";
import { InstantDemo } from "@/components/home/instant-demo";
import { IntegrationsWall } from "@/components/home/integrations-wall";
import { OutcomeTiles } from "@/components/home/outcome-tiles";
import { PricingTeaser } from "@/components/home/pricing-teaser";
import { ProblemSection } from "@/components/home/problem-section";
import { ProofSection } from "@/components/home/proof-section";
import { SmallBusinessBand } from "@/components/home/small-business-band";
import { TrustBlock } from "@/components/home/trust-block";
import { UspSection } from "@/components/home/usp-section";
import { CtaBand } from "@/components/layout/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqList } from "@/components/ui/faq-list";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { homeFaqs } from "@/lib/content/home";
import { softwareJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name}: every lead called, every appointment booked` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/** Home page, section by section as laid out in the brand SOP (§7.2). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <InstantDemo />
      <ProblemSection />
      <HowItWorks />
      <UspSection />
      <OutcomeTiles />
      <FeaturesGrid />
      <IndustryCarousel />
      <SmallBusinessBand />
      <IntegrationsWall />
      <ProofSection />
      <TrustBlock />
      <PricingTeaser />
      <Comparison />
      <Section tone="subtle" aria-label="Questions, answered">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            description="Cost, languages, setup time, compliance, handoff and data security."
          />
          <FaqList faqs={homeFaqs} name="home-faq" schema className="mt-12" />
        </Container>
      </Section>
      <CtaBand source="home-final" />
      <JsonLd data={softwareJsonLd()} />
    </>
  );
}
