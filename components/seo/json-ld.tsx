import { jsonLdString } from "@/lib/utils";

/** Structured data for search engines. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
