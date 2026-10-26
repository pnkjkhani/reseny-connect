import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { mission, values, vision } from "@/lib/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mission, vision and values",
  description:
    "Our mission is to give every business an AI sales and service team that responds instantly, follows up relentlessly and turns conversations into confirmed appointments.",
  path: "/company/mission-vision",
});

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/company" },
          { name: "Mission and vision", href: "/company/mission-vision" },
        ]}
        eyebrow="Mission and vision"
        title={
          <>
            No lead unanswered. <span className="text-gradient">No business too small.</span>
          </>
        }
        description="What we are building, where we are heading and the values we hold ourselves to."
      />

      <Section aria-label="Mission and vision">
        <Container className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-4xl border border-border bg-card p-8 shadow-card sm:p-10">
            <p className="text-sm font-bold tracking-[0.16em] text-primary-text uppercase">Our mission</p>
            <p className="mt-4 text-2xl leading-snug font-bold text-foreground">{mission}</p>
          </article>
          <article className="rounded-4xl bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_60%,#4510c4_100%)] p-8 text-white shadow-pop sm:p-10">
            <p className="text-sm font-bold tracking-[0.16em] text-[#c9b6ff] uppercase">Our vision</p>
            <p className="mt-4 text-2xl leading-snug font-bold">{vision}</p>
          </article>
        </Container>
      </Section>

      <Section tone="subtle" aria-label="What we hold ourselves to">
        <Container>
          <SectionHeading eyebrow="Values" title="What we hold ourselves to" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="reveal rounded-3xl border border-border bg-card p-6 shadow-card">
                <IconTile name={value.icon} size="lg" />
                <h3 className="mt-5 text-lg font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{value.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand source="mission-vision" />
    </>
  );
}
