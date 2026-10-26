import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionPage } from "@/components/solutions/solution-page";
import { allSolutions, getSolution, solutionHref } from "@/lib/content/solutions";
import type { Solution } from "@/lib/content/types";
import { pageMetadata } from "@/lib/seo";
import { truncate } from "@/lib/utils";

export function generateStaticParams() {
  return allSolutions.map(({ category, slug }) => ({ category, slug }));
}

function seoTitle(solution: Solution) {
  switch (solution.category) {
    case "industries":
      return `AI calling agent for ${solution.name}`;
    case "use-cases":
      return `${solution.name} with an AI calling agent`;
    case "teams":
      return `Reseny Connect for ${solution.name.toLowerCase()} teams`;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const solution = getSolution(category, slug);
  if (!solution) return {};
  return pageMetadata({
    title: seoTitle(solution),
    description: truncate(solution.intro),
    path: solutionHref(solution),
  });
}

export default async function SolutionDetailPage({ params }: PageProps<"/solutions/[category]/[slug]">) {
  const { category, slug } = await params;
  const solution = getSolution(category, slug);
  if (!solution) notFound();
  return <SolutionPage solution={solution} />;
}
