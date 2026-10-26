import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { partnerProgram } from "@/lib/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner programme for agencies and resellers",
  description:
    "Offer AI calling to your own clients under your brand. Reseny's partner programme gives agencies, consultants and resellers the product, engineering support and sales help.",
  path: "/solutions/agencies",
});

const benefitIcons = ["trending-up", "wrench", "sparkles", "handshake"] as const;

export default function AgenciesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: "Agencies and resellers", href: "/solutions/agencies" },
        ]}
        eyebrow="Partner programme"
        title={partnerProgram.headline}
        description={partnerProgram.intro}
      />

      <Section aria-label="What you get as a Reseny partner">
        <Container>
          <SectionHeading eyebrow="Why partner" title="What you get as a Reseny partner" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerProgram.benefits.map((benefit, index) => (
              <li key={benefit.title} className="reveal rounded-3xl border border-border bg-card p-6 shadow-card">
                <IconTile name={benefitIcons[index] ?? "sparkles"} size="lg" />
                <h3 className="mt-5 text-lg font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="Tell us about your clients">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Talk to us"
              title="Tell us about your clients"
              description="Share who you work with and how you would like to partner. We will reply with how a partnership could look, including white-label options for qualifying partners."
            />
          </div>
          <ContactForm defaultTopic="partnerships" />
        </Container>
      </Section>
    </>
  );
}
