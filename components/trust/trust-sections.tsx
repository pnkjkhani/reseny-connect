import { CheckList } from "@/components/ui/check-list";
import type { TrustSection } from "@/lib/content/trust";

export const sectionId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Sticky in-page navigation for long policy-style pages. */
export function SectionNav({ sections }: { sections: readonly TrustSection[] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28">
      <p className="text-xs font-bold tracking-wider text-subtle-foreground uppercase">On this page</p>
      <ul className="mt-3 space-y-1 border-l border-border">
        {sections.map((section) => (
          <li key={section.heading}>
            <a
              href={`#${sectionId(section.heading)}`}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary-text"
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Plain-language policy sections: heading, paragraphs and an optional list. */
export function TrustSections({ sections }: { sections: readonly TrustSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.heading} id={sectionId(section.heading)} aria-label={section.heading}>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            {section.heading}
          </h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
          {section.bullets ? <CheckList items={section.bullets} className="mt-5" /> : null}
        </section>
      ))}
    </div>
  );
}
