import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { IconTile } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { services } from "@/lib/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services: done-for-you setup, custom agents and more",
  description:
    "The Reseny Connect platform plus done-for-you setup, custom agent development, managed campaigns, integrations, optimisation and a partner programme.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/company" },
          { name: "Services", href: "/services" },
        ]}
        eyebrow="Services"
        title={
          <>
            Use the platform, or <span className="text-gradient">let our engineers do it</span> for you
          </>
        }
        description="Reseny Connect is available as a self-serve platform, and our team can set it up, extend it and run it for you."
        actions={
          <ButtonLink href="/company/contact" size="lg">
            Talk to us
          </ButtonLink>
        }
      />

      <Section aria-label="Our services">
        <Container>
          <h2 className="sr-only">
            Our services
          </h2>
          <ul className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.id}
                className="reveal flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <IconTile name={service.icon} size="lg" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-xs font-bold tracking-wider text-subtle-foreground uppercase">Who it is for</dt>
                    <dd className="mt-1 text-foreground">{service.forWho}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold tracking-wider text-subtle-foreground uppercase">What is delivered</dt>
                    <dd className="mt-2">
                      <CheckList items={service.delivered} className="space-y-2 text-sm" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold tracking-wider text-subtle-foreground uppercase">Timeline</dt>
                    <dd className="mt-1 font-semibold text-foreground">{service.timeline}</dd>
                  </div>
                </dl>
                <ButtonLink href="/company/contact" variant="secondary" className="mt-7 self-start">
                  Talk to us
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand source="services" />
    </>
  );
}
