import type { IconName } from "@/components/ui/icon";
import { industries } from "./industries";

/** Resources hub (SOP §5). Content that does not exist yet is shown honestly as such. */

export const resourceLinks: {
  href: string;
  title: string;
  body: string;
  icon: IconName;
}[] = [
  { href: "/resources/case-studies", title: "Case studies", body: "Real results from pilots and customers, as they are published.", icon: "chart-line" },
  { href: "/resources/sample-calls", title: "Sample call library", body: "Synthetic example calls for every sector, with live transcripts.", icon: "audio-lines" },
  { href: "/resources/guides", title: "Guides and e-books", body: "Playbooks for responding to and booking leads, by industry.", icon: "book-open" },
  { href: "/resources/webinars", title: "Webinars and events", body: "Live sessions on AI calling and lead response.", icon: "video" },
  { href: "/resources/help-center", title: "Help centre and documentation", body: "Guides for getting set up and getting the most from Reseny.", icon: "life-buoy" },
];

/**
 * One playbook per sector, requested through a form: the guides are being prepared,
 * so the page offers a waitlist rather than a download that does not exist.
 */
export const playbooks = industries.map((industry) => ({
  slug: industry.slug,
  title: `${industry.name}: lead-response playbook`,
  icon: industry.icon,
  body: industry.summary,
}));

export const helpTopics: { title: string; body: string; icon: IconName }[] = [
  { title: "Getting started", body: "Choose a template, connect your leads and make a test call.", icon: "rocket" },
  { title: "Building your agent", body: "Script, questions, voice, language and handoff rules.", icon: "wand-sparkles" },
  { title: "Integrations", body: "Connecting your CRM, calendar, WhatsApp and telephony.", icon: "plug" },
  { title: "Campaigns", body: "Lists, calling windows, pacing and reporting.", icon: "megaphone" },
  { title: "Compliance and consent", body: "Calling windows, do-not-disturb handling and recording.", icon: "shield-check" },
  { title: "Billing and plans", body: "Plans, usage and invoices.", icon: "receipt" },
];

/** SOP §5.4: the illustrative value story, clearly labelled as such. */
export const illustrativeScenario = {
  label: "Illustrative scenario, not a customer result",
  title: "A clinic with 300 enquiries a month",
  body: "A clinic that receives 300 enquiries a month and answers only part of them in time can recover a measurable share of lost bookings once every enquiry is called within a minute. We will replace this scenario with real pilot numbers as soon as we have them.",
} as const;
