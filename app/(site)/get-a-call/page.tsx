import { preconnect } from "react-dom";
import { CallNowForm } from "@/components/forms/call-now-form";
import { DemoEmbed } from "@/components/home/demo-embed";
import { toSampleCallItems } from "@/components/home/sample-call-items";
import { SampleCallGroup } from "@/components/home/sample-calls";
import { PageHero } from "@/components/layout/page-hero";
import { FaqList } from "@/components/ui/faq-list";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { industries } from "@/lib/content/solutions";
import type { Faq } from "@/lib/content/types";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get a call from Reseny now: live AI demo",
  description:
    "Try Reseny Connect live. Talk to the AI agent right in your browser, or enter your number and get a call to hear how it qualifies and books.",
  path: "/get-a-call",
});

const faqs: Faq[] = [
  {
    question: "What happens when I ask for a call?",
    answer:
      "Reseny's AI agent calls the number you enter, introduces itself as an AI, asks a few quick questions about your business, and shows you how it would qualify and book a lead.",
  },
  {
    question: "Am I speaking to a real person?",
    answer:
      "No. You will hear an AI agent, and it says so at the start of the call. You can ask for a person at any time.",
  },
  {
    question: "Can I stop being contacted?",
    answer:
      "Yes. Tell the agent you do not want further contact, or let us know any time, and we will honour it on every channel.",
  },
];

const samples = toSampleCallItems(
  industries.filter((industry) => ["real-estate", "healthcare", "education"].includes(industry.slug)),
);

export default function GetACallPage() {
  preconnect(new URL(siteConfig.demo.embedUrl).origin);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Get a call now", href: "/get-a-call" },
        ]}
        eyebrow="Live AI demo"
        title={
          <>
            Get a call from Reseny <span className="text-gradient">right now</span>
          </>
        }
        description="Talk to the AI agent live in your browser, or ask it to call your phone. Either way you will hear exactly what your customers would hear."
        aside={<DemoEmbed src={siteConfig.demo.embedUrl} height={siteConfig.demo.height} />}
      />

      <Section tone="subtle" aria-label="Tell us where to call">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Prefer a phone call?"
            title="Tell us where to call"
            description="Enter your number, choose a language, and the agent will call you about your own business. We record your consent and your preferences so the conversation is relevant."
          />
          <div className="rounded-3xl border border-border bg-card p-5 shadow-pop sm:p-7">
            <CallNowForm source="get-a-call-page" />
          </div>
        </Container>
      </Section>

      <Section aria-label="Or follow a sample call">
        <Container>
          <SectionHeading
            eyebrow="Listen first"
            title="Or follow a sample call"
            description="Every call here is synthetic: fictional businesses and people."
          />
          <SampleCallGroup items={samples} className="mt-12" />
        </Container>
      </Section>

      <Section tone="subtle" aria-label="Before you try it">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Before you try it" />
          <FaqList faqs={faqs} name="call-faq" schema className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
