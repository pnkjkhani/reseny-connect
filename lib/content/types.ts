import type { IconName } from "@/components/ui/icon";

export interface Faq {
  question: string;
  answer: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface TranscriptLine {
  speaker: "agent" | "lead";
  text: string;
}

/**
 * A synthetic example call. Per the brand SOP, sample calls must be consented or
 * synthetic: never real customer recordings. Add `audioSrc` (a file in /public)
 * once a consented/synthetic recording exists; until then the transcript animates
 * on its own.
 */
export interface SampleCall {
  id: string;
  title: string;
  /** Short context line, e.g. "Property enquiry → site visit". */
  scenario: string;
  language: string;
  lines: TranscriptLine[];
  /** What the call achieved: shown when the transcript finishes. */
  outcome: string;
  audioSrc?: string;
}

export type SolutionCategory = "industries" | "use-cases" | "teams";

/** One page built from the shared "Template for Every Solution Page" (SOP §7.3). */
export interface Solution {
  category: SolutionCategory;
  slug: string;
  name: string;
  icon: IconName;
  /** One line for cards and menus. */
  summary: string;
  /** H1, written in the sector's own words. */
  headline: string;
  intro: string;
  painPoints: Step[];
  sampleCall: SampleCall;
  /** The sector's call-to-booking journey. */
  workflow: Step[];
  /** The questions the ready-made agent template asks. */
  agentQuestions: string[];
  /** Kinds of systems the sector typically connects (categories, not endorsements). */
  integrations: string[];
  /** Qualitative outcomes. Real metrics belong in case studies once pilots finish. */
  outcomes: string[];
  compliance: string[];
  faqs: Faq[];
  /** Sector-specific call-to-action label. */
  ctaLabel: string;
}

export interface ProductPage {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  headline: string;
  intro: string;
  highlights: { title: string; body: string; icon: IconName }[];
  howItWorks: Step[];
  /** Bullet list under "What's included". */
  included: string[];
  faqs: Faq[];
  /** Slugs of related product pages. */
  related: string[];
}
