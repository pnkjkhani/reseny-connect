import type { IconName } from "@/components/ui/icon";

/** About, mission/vision/values and services (SOP §10 and §11). */

export const about = {
  title: "Leads should never go cold because nobody called back",
  story: [
    "Reseny Business Mercantech is an initiative by Astransys Group. Astransys Global Pvt Ltd, a leading IT company since 2017, brings years of software engineering and delivery experience to everything we build.",
    "Reseny is the group's focused answer to one of business's oldest problems: leads that go cold because nobody called back in time.",
    "Reseny Connect is the product: an agentic-AI calling platform that calls leads automatically, qualifies them, follows up and books appointments, so your team only talks to people who are ready to buy.",
  ],
  heritage: [
    { label: "Brand", value: "Reseny" },
    { label: "Product", value: "Reseny Connect" },
    { label: "Company", value: "Reseny Business Mercantech" },
    { label: "Group", value: "Astransys Group" },
    { label: "Parent", value: "Astransys Global Pvt Ltd" },
    { label: "Engineering heritage", value: "IT company since 2017" },
  ],
} as const;

export const mission =
  "To give every business, from a one-person shop to a national enterprise, an AI sales and service team that responds to every customer instantly, follows up relentlessly, and turns conversations into confirmed appointments.";

export const vision =
  "To become the most trusted agentic-AI platform for customer conversations in emerging markets, where no lead goes unanswered and no business is too small to grow with AI.";

export const values: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "Customer outcomes first", body: "We measure ourselves by appointments booked and revenue recovered." },
  { icon: "handshake", title: "Respect for the person on the call", body: "Consent, honesty about being an AI, and easy opt-out." },
  { icon: "sparkles", title: "Simple for owners", body: "Powerful inside, effortless outside." },
  { icon: "shield-check", title: "Trust by design", body: "Privacy, security and compliance are product features." },
  { icon: "languages", title: "Local fluency", body: "Language, culture and context matter." },
  { icon: "cpu", title: "Engineering heritage", body: "Built on the foundation of Astransys, an IT company since 2017." },
];

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  forWho: string;
  delivered: string[];
  /** TODO(content): confirm the timelines you can commit to. */
  timeline: string;
}

export const services: Service[] = [
  {
    id: "platform",
    icon: "bot",
    title: "Reseny Connect platform",
    description: "The self-serve and managed AI calling platform, offered as a subscription.",
    forWho: "Any business that wants to call, qualify, follow up and book automatically",
    delivered: ["AI voice agents", "Follow-up cadence across channels", "Calendar booking", "Analytics, recordings and transcripts"],
    timeline: "Start the same day from a ready template",
  },
  {
    id: "setup",
    icon: "wand-sparkles",
    title: "Done-for-you setup",
    description: "Our engineers configure everything so you can go live without technical work.",
    forWho: "Owners and teams who would rather not build it themselves",
    delivered: ["Script design", "Voice and language selection", "CRM and calendar integration", "Compliance review", "Go-live support"],
    timeline: "Pilot-ready in days",
  },
  {
    id: "custom-agents",
    icon: "code",
    title: "Custom agent development",
    description: "Bespoke workflows, API integrations and private deployment for complex needs.",
    forWho: "Mid-market and enterprise teams with specific requirements",
    delivered: ["Bespoke conversation flows", "API integrations", "Private deployment options", "Documentation and handover"],
    timeline: "Scoped per project",
  },
  {
    id: "campaigns",
    icon: "megaphone",
    title: "Campaign management",
    description: "Managed outbound campaigns, run by our team, with reporting.",
    forWho: "Teams that want results without running campaigns themselves",
    delivered: ["Campaign planning", "List preparation and scrubbing", "Campaign execution", "Reporting"],
    timeline: "Starts after a short planning call",
  },
  {
    id: "integrations",
    icon: "plug",
    title: "Integration and automation services",
    description: "Connections between Reseny and your CRM, calendar, WhatsApp and internal tools, from our expert engineering team.",
    forWho: "Teams with an existing stack that needs to stay in step",
    delivered: ["CRM and calendar integration", "Webhook and API workflows", "Automation across tools", "Testing end to end"],
    timeline: "Scoped per integration",
  },
  {
    id: "optimisation",
    icon: "chart-line",
    title: "Training and optimisation",
    description: "Ongoing call review, script tuning and monthly performance reviews.",
    forWho: "Teams that want the agent to keep improving",
    delivered: ["Call review", "Script tuning", "Monthly performance reviews", "Recommendations"],
    timeline: "Monthly, ongoing",
  },
  {
    id: "partners",
    icon: "users-round",
    title: "Partner programme",
    description: "Offer AI calling to your own clients, under your brand, as an agency, consultant or freelancer.",
    forWho: "Agencies, consultants, freelancers and resellers",
    delivered: ["Partner onboarding", "White-label options, subject to discussion", "Sales and delivery support", "Co-marketing material"],
    timeline: "Onboarding after a discovery call",
  },
];

export const partnerProgram = {
  headline: "Offer AI calling to your clients, under your brand.",
  intro:
    "Agencies, consultants and resellers can bring Reseny Connect to their own clients. Tell us about your clients and how you would like to work with us, and we will set out how a partnership could look.",
  benefits: [
    { title: "A product your clients ask for", body: "Speed to lead and booked appointments are outcomes every client understands." },
    { title: "Engineering behind you", body: "Astransys engineers help with set-up, integration and custom builds." },
    { title: "Your brand, subject to discussion", body: "White-label and co-branded options can be discussed for qualifying partners." },
    { title: "Support to sell and deliver", body: "Demos, material and onboarding help for your first clients." },
  ],
} as const;
