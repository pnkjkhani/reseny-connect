import { industries } from "./industries";
import type { Faq, SampleCall, Solution } from "./types";

/**
 * "By team size" pages (SOP §3.3 and §5.1), rendered at /solutions/teams/[slug].
 * For these pages `agentQuestions` is shown as "What a typical rollout covers".
 */

function sampleFrom(slug: string, id: string): SampleCall {
  const source = industries.find((industry) => industry.slug === slug);
  if (!source) throw new Error(`Unknown industry for sample call: ${slug}`);
  return { ...source.sampleCall, id };
}

const SHARED_FAQS: Faq[] = [
  {
    question: "Which languages can the agent speak?",
    answer:
      "The agent speaks the customer's language, including mixed languages such as Hinglish. See the Multilingual Voice page for the languages we have tested.",
  },
];

export const teams: Solution[] = [
  {
    category: "teams",
    slug: "small-business",
    name: "Small business",
    icon: "store",
    summary: "Your first telecaller, without the hiring. Simple setup, ready templates.",
    headline: "Your first telecaller, without the hiring.",
    intro:
      "If you run a business with a handful of people, every missed enquiry hurts. Reseny answers leads in seconds, follows up so you do not have to, and fills your calendar. Start from a ready template for your profession, no technical knowledge needed.",
    painPoints: [
      { title: "Leads lost to missed calls", body: "The enquiry that arrives at 11 pm, or while you are with a customer, gets no reply until tomorrow." },
      { title: "No budget for a telecaller team", body: "Hiring, training and replacing callers is expensive and slow for a small business." },
      { title: "Follow-up happens when you remember", body: "With everything on your plate, follow-up slips and good leads go cold." },
    ],
    sampleCall: sampleFrom("home-services", "small-business"),
    workflow: [
      { title: "Pick a template", body: "Choose the ready-made agent for your profession." },
      { title: "Add your offers", body: "Services, prices you approve, working hours and language." },
      { title: "Connect your leads", body: "Website form, ads or a simple sheet of enquiries." },
      { title: "Watch the calendar fill", body: "Appointments, site visits and demos booked directly." },
    ],
    agentQuestions: [
      "A ready template for your profession, with the questions already written",
      "Voice and language chosen to match your customers",
      "Your calendar and WhatsApp connected",
      "A test call to your own phone before going live",
      "A simple dashboard with a recording, transcript, summary and outcome for every call",
    ],
    integrations: ["Google calendar", "WhatsApp Business", "Website forms and ad leads", "Simple spreadsheets"],
    outcomes: [
      "No more lost leads: every enquiry gets a call within seconds",
      "You talk only to serious buyers",
      "Full visibility of every call without listening to each one",
    ],
    compliance: [
      "Consent, calling windows and opt-outs are handled for you with sensible defaults.",
      "The agent always introduces itself as an AI.",
    ],
    faqs: [
      { question: "Do I need technical skills?", answer: "No. Start from a ready template, and our team can handle setup for you." },
      { question: "How much does it cost?", answer: "See the pricing page for plans, or run the ROI calculator with your own numbers." },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call and see how it works",
  },
  {
    category: "teams",
    slug: "growing-business",
    name: "Growing business",
    icon: "trending-up",
    summary: "Add speed-to-lead and follow-up to the CRM and sales team you already have.",
    headline: "Add speed and follow-up to the CRM you already have.",
    intro:
      "You have a CRM and a sales team, but leads still wait too long and follow-up is uneven. Reseny sits in front of your team: it calls every lead, qualifies, books meetings and hands over with a full summary.",
    painPoints: [
      { title: "Speed to lead is inconsistent", body: "Response time depends on who is free, not on how valuable the lead is." },
      { title: "CRM data is patchy", body: "Notes and statuses depend on busy reps updating them." },
      { title: "Reporting takes manual effort", body: "It is hard to see which sources and campaigns produce booked meetings." },
    ],
    sampleCall: sampleFrom("saas-b2b", "growing-business"),
    workflow: [
      { title: "Connect your CRM", body: "Leads flow in with source and campaign tags." },
      { title: "Define qualification and routing", body: "Your questions, scoring and handoff rules." },
      { title: "Reseny calls and follows up", body: "Every lead contacted in seconds, then followed up by call, WhatsApp, SMS and email." },
      { title: "Reporting and handoff", body: "Hot leads alerted to the team with transcript, score and recording link." },
    ],
    agentQuestions: [
      "CRM integration and field mapping",
      "Qualification questions, scoring and routing rules",
      "Calendar and WhatsApp connection",
      "Hot-lead alerts and handoff process",
      "Dashboards by source, campaign and outcome",
    ],
    integrations: ["CRMs", "Calendars", "WhatsApp, SMS and email", "Webhooks and automation tools"],
    outcomes: [
      "Consistent speed to lead whoever is on shift",
      "CRM records enriched with summaries and scores",
      "Clear reporting on what is working",
    ],
    compliance: [
      "Consent and opt-out status are written back to your CRM.",
      "Calling windows and retry rules are configurable per campaign.",
    ],
    faqs: [
      { question: "Will it replace our sales team?", answer: "No. It handles first contact, qualification and booking so your team talks only to people who are ready to buy." },
      { question: "Which CRMs can it work with?", answer: "See the Integrations page. Anything with an API or webhooks can be connected by our engineers." },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call and see how it works",
  },
  {
    category: "teams",
    slug: "enterprise",
    name: "Enterprise",
    icon: "building-2",
    summary: "Consistent, compliant calling at scale, with APIs, security review and private deployment.",
    headline: "Consistent, compliant calling at scale.",
    intro:
      "High lead volumes, many locations and strict compliance needs call for standard scripts, controlled data and proper integration. Reseny handles thousands of calls with consistent quality, backed by APIs, security review and deployment options.",
    painPoints: [
      { title: "Quality varies across teams and locations", body: "Scripts, compliance language and objection handling drift between centres." },
      { title: "Compliance and security reviews", body: "Procurement needs clear answers on data handling, access and residency." },
      { title: "Integration complexity", body: "Calling has to connect to CRM, telephony and internal systems reliably." },
    ],
    sampleCall: sampleFrom("banking-finance", "enterprise"),
    workflow: [
      { title: "Discovery and security review", body: "Requirements, data flows and compliance needs agreed up front." },
      { title: "Integration and configuration", body: "APIs, webhooks, telephony and CRM connected by our engineers." },
      { title: "Pilot on a slice of volume", body: "Measured against your own baseline before scaling." },
      { title: "Scale with governance", body: "Roles, reporting and ongoing optimisation with our team." },
    ],
    agentQuestions: [
      "Security and data-protection review with our team",
      "API and webhook integration with CRM, telephony and internal systems",
      "Standard scripts and compliance language across locations",
      "Role-based access and audit trails",
      "Private deployment and data-residency options, subject to scoping",
      "Service-level agreement and dedicated support",
    ],
    integrations: ["CRMs and core systems", "Telephony providers", "APIs and webhooks", "Analytics and BI"],
    outcomes: [
      "Thousands of calls handled with consistent quality",
      "Compliance language standardised across teams",
      "Analytics on what customers actually say",
    ],
    compliance: [
      "Details of data handling, access control and residency are on the Trust Center and shared in full during security review.",
      "Calling windows, consent capture and do-not-disturb handling are configured per campaign and region.",
    ],
    faqs: [
      { question: "Do you support private deployment?", answer: "Private deployment is available for qualifying requirements. Talk to us about scope and timelines." },
      { question: "Can we run a pilot first?", answer: "Yes. We recommend a measured pilot on a defined slice of volume." },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Talk to our enterprise team",
  },
];
