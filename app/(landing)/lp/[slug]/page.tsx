import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallNowForm } from "@/components/forms/call-now-form";
import { toSampleCallItems } from "@/components/home/sample-call-items";
import { SampleCallGroup } from "@/components/home/sample-calls";
import { CheckList } from "@/components/ui/check-list";
import { Container, Eyebrow } from "@/components/ui/section";
import { industries } from "@/lib/content/solutions";
import { pageMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

/** Paid-campaign pages duplicate the sector pages' content, so they stay out of search results. */
export async function generateMetadata({ params }: PageProps<"/lp/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return {};
  return pageMetadata({
    title: `AI calling agent for ${industry.name}`,
    description: truncate(industry.intro),
    path: `/lp/${industry.slug}`,
    noindex: true,
  });
}

export default async function CampaignLandingPage({ params }: PageProps<"/lp/[slug]">) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-hero-glow" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50" />
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
          <div>
            <Eyebrow>{industry.name}</Eyebrow>
            <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl">
              {industry.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{industry.intro}</p>
            <CheckList items={industry.outcomes} className="mt-7" />
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-pop sm:p-8">
            <h2 className="text-xl font-extrabold text-foreground">{industry.ctaLabel}</h2>
            <p className="mt-1.5 mb-5 text-sm text-muted-foreground">
              Enter your number and our AI will call you to show how it works for {industry.name.toLowerCase()}.
            </p>
            <CallNowForm source={`lp:${industry.slug}`} industry={industry.slug} />
          </div>
        </Container>
      </section>

      <section aria-label="Hear a sample call first" className="bg-surface py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-foreground">
            Hear a sample call first
          </h2>
          <SampleCallGroup
            items={toSampleCallItems([industry])}
            className="md:grid-cols-1 xl:grid-cols-1"
          />
        </Container>
      </section>
    </>
  );
}
