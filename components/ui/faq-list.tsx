import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo";

/**
 * Accessible accordion built on native <details>/<summary>: works without JavaScript,
 * is keyboard operable by default, and `name` makes it exclusive in modern browsers.
 * Set `schema` to also emit FAQPage structured data (once per page).
 */
export function FaqList({
  faqs,
  name = "faq",
  schema = false,
  className,
}: {
  faqs: readonly Faq[];
  name?: string;
  schema?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-card", className)}>
      {faqs.map((faq) => (
        <details key={faq.question} name={name} className="group px-5 sm:px-6">
          <summary className="flex items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground sm:text-lg">
            {faq.question}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-text transition-transform duration-200 group-open:rotate-45">
              <Plus aria-hidden className="size-4.5" />
            </span>
          </summary>
          <p className="pb-6 pr-10 leading-relaxed text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
      {schema ? <JsonLd data={faqJsonLd(faqs)} /> : null}
    </div>
  );
}
