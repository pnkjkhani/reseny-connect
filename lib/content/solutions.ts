import { industries } from "./industries";
import { teams } from "./teams";
import type { Solution, SolutionCategory } from "./types";
import { useCases } from "./use-cases";

export { industries, teams, useCases };

export const solutionCategories: SolutionCategory[] = ["industries", "use-cases", "teams"];

export const categoryMeta: Record<
  SolutionCategory,
  { label: string; singular: string; description: string; ready: string }
> = {
  industries: {
    label: "By industry",
    singular: "Industry",
    description: "Ready-made agents and workflows in your sector's own words.",
    ready: "Ready template for this industry",
  },
  "use-cases": {
    label: "By use case",
    singular: "Use case",
    description: "Start from the job you need done, from qualification to collections.",
    ready: "Ready template for this use case",
  },
  teams: {
    label: "By team size",
    singular: "Team size",
    description: "From a one-person shop to a national enterprise.",
    ready: "What a typical rollout covers",
  },
};

export const allSolutions: Solution[] = [...industries, ...useCases, ...teams];

export function isSolutionCategory(value: string): value is SolutionCategory {
  return (solutionCategories as string[]).includes(value);
}

export function getSolutions(category: SolutionCategory): Solution[] {
  return allSolutions.filter((solution) => solution.category === category);
}

export function getSolution(category: string, slug: string): Solution | undefined {
  if (!isSolutionCategory(category)) return undefined;
  return allSolutions.find((solution) => solution.category === category && solution.slug === slug);
}

export function solutionHref(solution: Pick<Solution, "category" | "slug">) {
  return `/solutions/${solution.category}/${solution.slug}`;
}

/** Other pages in the same category, for "Explore more" links. */
export function relatedSolutions(solution: Solution, count = 3): Solution[] {
  const siblings = getSolutions(solution.category).filter((item) => item.slug !== solution.slug);
  const index = getSolutions(solution.category).findIndex((item) => item.slug === solution.slug);
  // Rotate so each page links to its neighbours rather than always the same first few.
  const rotated = [...siblings.slice(index), ...siblings.slice(0, index)];
  return rotated.slice(0, count);
}
