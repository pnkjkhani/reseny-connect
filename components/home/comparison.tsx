import { Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { comparisonRows } from "@/lib/content/home";

/**
 * "Why teams choose Reseny" (SOP §7.2 #13). Table on wide screens, stacked cards on
 * phones. Kept factual and free of named competitors, as the SOP asks.
 */
export function Comparison() {
  return (
    <Section aria-label="Why teams choose Reseny">
      <Container>
        <SectionHeading
          eyebrow="Why Reseny"
          title="Why teams choose Reseny"
          description="Many voice-AI tools sell a toolkit. Reseny is built around the outcome you actually want: a booked appointment."
        />

        {/* Wide screens */}
        <div className="mt-14 hidden overflow-hidden rounded-3xl border border-border bg-card shadow-card md:block">
          <table className="w-full text-left">
            <caption className="sr-only">Comparison of typical voice-AI toolkits with Reseny Connect</caption>
            <thead>
              <tr className="border-b border-border bg-surface text-sm">
                <th scope="col" className="w-[22%] px-6 py-4 font-semibold text-subtle-foreground">
                  <span className="sr-only">Topic</span>
                </th>
                <th scope="col" className="w-[34%] px-6 py-4 font-semibold text-muted-foreground">
                  Many voice-AI toolkits
                </th>
                <th scope="col" className="w-[44%] bg-primary-soft px-6 py-4 font-bold text-primary-text">
                  Reseny Connect
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonRows.map((row) => (
                <tr key={row.topic}>
                  <th scope="row" className="px-6 py-4 align-top text-sm font-bold text-foreground">
                    {row.topic}
                  </th>
                  <td className="px-6 py-4 align-top text-sm text-muted-foreground">{row.typical}</td>
                  <td className="bg-primary-soft/50 px-6 py-4 align-top text-sm font-medium text-foreground">
                    <span className="flex items-start gap-2.5">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                      {row.reseny}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones */}
        <ul className="mt-12 space-y-4 md:hidden">
          {comparisonRows.map((row) => (
            <li key={row.topic} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <p className="font-bold text-foreground">{row.topic}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold">Many toolkits: </span>
                {row.typical}
              </p>
              <p className="mt-2 flex items-start gap-2 rounded-xl bg-primary-soft p-3 text-sm font-medium text-foreground">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                <span>
                  <span className="font-bold text-primary-text">Reseny: </span>
                  {row.reseny}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
