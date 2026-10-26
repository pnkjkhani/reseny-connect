import type { MetadataRoute } from "next";
import { products } from "@/lib/content/products";
import { allSolutions, solutionHref } from "@/lib/content/solutions";
import { legalDocs, trustPages } from "@/lib/content/trust";
import { absoluteUrl } from "@/lib/site";

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

const staticPages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/product", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions/agencies", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing/roi-calculator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/case-studies", priority: 0.5, changeFrequency: "monthly" },
  { path: "/resources/sample-calls", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/guides", priority: 0.5, changeFrequency: "monthly" },
  { path: "/resources/webinars", priority: 0.4, changeFrequency: "monthly" },
  { path: "/resources/help-center", priority: 0.5, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.7, changeFrequency: "monthly" },
  { path: "/trust/status", priority: 0.3, changeFrequency: "monthly" },
  { path: "/company", priority: 0.6, changeFrequency: "yearly" },
  { path: "/company/mission-vision", priority: 0.5, changeFrequency: "yearly" },
  { path: "/company/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/services", priority: 0.6, changeFrequency: "monthly" },
  { path: "/book-a-demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/get-a-call", priority: 0.9, changeFrequency: "monthly" },
  { path: "/start-pilot", priority: 0.8, changeFrequency: "monthly" },
];

/** Thank-you pages and campaign landing pages are deliberately left out (they are noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...staticPages,
    ...products.map((product) => ({ path: `/product/${product.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...allSolutions.map((solution) => ({ path: solutionHref(solution), priority: 0.8, changeFrequency: "monthly" as const })),
    ...trustPages.map((page) => ({ path: `/trust/${page.slug}`, priority: 0.5, changeFrequency: "monthly" as const })),
    ...legalDocs.map((doc) => ({ path: `/legal/${doc.slug}`, priority: 0.3, changeFrequency: "yearly" as const })),
  ];
  return entries.map(({ path, priority, changeFrequency }) => ({ url: absoluteUrl(path), priority, changeFrequency }));
}
