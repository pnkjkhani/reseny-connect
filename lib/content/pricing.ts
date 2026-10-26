import type { Faq } from "./types";

/**
 * Pricing plans (SOP §4: Starter, Growth, Scale, Enterprise).
 *
 * TODO(content): no prices exist in the brief, so none are invented. Set `price`
 * on each plan once decided: the card shows it automatically, and until then it
 * shows "Get a quote". The feature lists below are a proposal based on the product
 * capabilities named in the SOP: confirm what each tier really includes.
 */
export interface Plan {
  id: "starter" | "growth" | "scale" | "enterprise";
  name: string;
  tagline: string;
  forWho: string;
  /** e.g. { amount: 9999, unit: "per month" }: omit until pricing is decided. */
  price?: { amount: number; unit: string };
  priceNote: string;
  featured?: boolean;
  features: string[];
  custom: string[];
  cta: { label: string; href: string };
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Your first AI telecaller",
    forWho: "Solo owners and small businesses (1 to 20 staff)",
    priceNote: "Simple monthly plan",
    features: [
      "One AI voice agent from a ready template",
      "Outbound and inbound calling",
      "Calendar booking with WhatsApp and SMS confirmations",
      "Recordings (where permitted), transcripts and summaries",
      "Guided self-serve setup",
    ],
    custom: ["Scripts beyond the template", "Extra languages and voices"],
    cta: { label: "Start a pilot", href: "/start-pilot" },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Speed to lead for growing teams",
    forWho: "Growing SMEs (20 to 200 staff) with a CRM and a sales team",
    priceNote: "Monthly plan, scaled to your volume",
    featured: true,
    features: [
      "Everything in Starter",
      "Multiple agents and campaigns",
      "Voice, WhatsApp, SMS and email follow-up cadence",
      "CRM and calendar integrations",
      "Lead scoring, routing and hot-lead alerts",
      "Analytics by source and campaign",
    ],
    custom: ["CRM field mapping", "Done-for-you setup"],
    cta: { label: "Book a demo", href: "/book-a-demo" },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Campaigns and handoff at volume",
    forWho: "High-volume teams running outbound campaigns",
    priceNote: "Monthly plan, scaled to your volume",
    features: [
      "Everything in Growth",
      "Campaign manager and bulk calling",
      "Human handoff and live transfer",
      "API and webhooks",
      "Priority support",
      "Monthly performance reviews",
    ],
    custom: ["Telephony set-up", "Custom reporting"],
    cta: { label: "Book a demo", href: "/book-a-demo" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Security, scale and control",
    forWho: "Mid-market and enterprise with compliance and integration needs",
    priceNote: "Custom quote",
    features: [
      "Everything in Scale",
      "Security and compliance review",
      "Service-level agreement",
      "Custom integrations and bespoke agents",
      "Private deployment options, subject to scoping",
      "Dedicated success manager",
    ],
    custom: ["Everything: scoped with you"],
    cta: { label: "Talk to us", href: "/company/contact" },
  },
];

export const pilotOffer = {
  title: "Go live with a pilot in 7 days",
  // TODO(content): the SOP's "pilot in 7 days" offer: confirm the terms (duration, scope, what is free).
  body: "Run Reseny on a slice of your real leads and see recordings, summaries and booked appointments before you commit. Our Astransys engineers help you set it up.",
  steps: [
    "Tell us about your leads and goals",
    "We configure your agent and connect your calendar",
    "Your leads start getting calls within days",
    "Review the results together and decide",
  ],
} as const;

export const pricingFaqs: Faq[] = [
  {
    question: "How is pricing structured?",
    answer:
      "Starter, Growth and Scale are monthly plans. Exact pricing depends on your call volume and set-up needs, which we confirm with you before you commit.",
  },
  {
    question: "What does the pilot include?",
    answer:
      "A pilot runs Reseny on a slice of your real leads so you can judge it on your own data. We help you go live within days and review results with you afterwards.",
  },
  {
    question: "Is there a set-up fee?",
    answer:
      "Self-serve set-up from a ready template does not need our engineers. Done-for-you set-up, custom agents and integrations are available as services, scoped to your needs.",
  },
  {
    question: "Can pricing be linked to results?",
    answer:
      "For suitable use cases we are open to discussing an outcome-linked option. Talk to us about what you would want to measure.",
  },
  {
    question: "Which plan should I start with?",
    answer:
      "Solo owners and small teams usually start with Starter. If you already run a CRM and sales team, Growth adds integrations and routing. If you run large outbound campaigns, look at Scale. Not sure? Book a demo and we will recommend one.",
  },
];
