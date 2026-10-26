import { PlaybookWaitlist } from "@/components/forms/playbook-waitlist";
import { PageHero } from "@/components/layout/page-hero";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { playbooks } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides and playbooks by industry",
  description:
    "Lead-response playbooks for every industry, covering how to call, qualify, follow up and book. Join the list to be notified when yours is published.",
  path: "/resources/guides",
});

const options = playbooks.map((playbook) => ({ value: playbook.slug, label: playbook.title }));

export default function GuidesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Guides and e-books", href: "/resources/guides" },
        ]}
        eyebrow="Guides and e-books"
        title={
          <>
            A lead-response playbook <span className="text-gradient">for every industry</span>
          </>
        }
        description="Practical playbooks for calling, qualifying, following up and booking, written for your sector. They are being prepared now: choose yours and we will notify you."
        aside={<PlaybookWaitlist options={options} />}
      />

      <Section aria-label="Playbooks in the pipeline">
        <Container>
          <SectionHeading
            eyebrow="In preparation"
            title="Playbooks in the pipeline"
            description="One for each sector Reseny serves."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playbooks.map((playbook) => (
              <li key={playbook.slug} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                <IconTile name={playbook.icon} />
                <span>
                  <span className="block font-bold text-foreground">{playbook.title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{playbook.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
