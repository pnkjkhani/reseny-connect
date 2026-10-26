import { Activity } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "System status",
  description: "Availability of Reseny Connect and current incident updates.",
  path: "/trust/status",
});

/**
 * Deliberately does not render a made-up "all systems operational" banner. It links to a
 * real status page when `NEXT_PUBLIC_STATUS_URL` is set, and says so plainly otherwise.
 */
export default function SystemStatusPage() {
  const statusUrl = siteConfig.links.status;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trust Center", href: "/trust" },
          { name: "System status", href: "/trust/status" },
        ]}
        eyebrow="Trust Center"
        title="System status"
        description="Availability of Reseny Connect and current incident updates."
      />
      <Section aria-label="Status">
        <Container className="max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-10">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-text">
              <Activity aria-hidden className="size-7" />
            </span>
            {statusUrl ? (
              <>
                <h2 className="mt-5 text-2xl font-bold text-foreground">Live status</h2>
                <p className="mt-2 text-muted-foreground">See current availability and past incidents on our status page.</p>
                <ButtonLink href={statusUrl} size="lg" className="mt-6">
                  Open the status page
                </ButtonLink>
              </>
            ) : (
              <>
                <h2 className="mt-5 text-2xl font-bold text-foreground">A public status page is on its way</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Until it is live, contact support for incident updates and service information.
                </p>
                <ButtonLink href="/company/contact" size="lg" className="mt-6">
                  Contact support
                </ButtonLink>
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
