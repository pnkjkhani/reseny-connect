import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { helpTopics } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Help centre and documentation",
  description: "Guides for getting set up and getting the most from Reseny Connect: agents, integrations, campaigns, compliance and billing.",
  path: "/resources/help-center",
});

export default function HelpCenterPage() {
  const { helpCenter, docs } = siteConfig.links;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Help centre", href: "/resources/help-center" },
        ]}
        eyebrow="Help centre"
        title={
          <>
            Get set up and <span className="text-gradient">get more from Reseny</span>
          </>
        }
        description="Find your way around the platform, or talk to a person: our team and Astransys engineers are here to help."
        actions={
          <>
            {helpCenter ? (
              <ButtonLink href={helpCenter} size="lg">
                Open the help centre
              </ButtonLink>
            ) : null}
            {docs ? (
              <ButtonLink href={docs} variant="secondary" size="lg">
                API documentation
              </ButtonLink>
            ) : null}
            <ButtonLink href="/company/contact" variant={helpCenter ? "ghost" : "primary"} size="lg">
              Contact support
            </ButtonLink>
          </>
        }
      />

      <Section aria-label="What do you need help with?">
        <Container>
          <SectionHeading
            eyebrow="Topics"
            title="What do you need help with?"
            description="Articles for each of these are added as the platform launches. Until then, our team will answer any question directly."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {helpTopics.map((topic) => (
              <li key={topic.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <IconTile name={topic.icon} size="lg" />
                <h3 className="mt-5 text-lg font-bold text-foreground">{topic.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{topic.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
