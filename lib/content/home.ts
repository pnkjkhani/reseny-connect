import type { IconName } from "@/components/ui/icon";
import type { Faq } from "./types";

/**
 * Copy for the home page, following the blueprint in SOP §7.2.
 * Anything marked TODO(content) is a claim or figure the SOP asks you to verify
 * or fill from your own measurements before publishing.
 */

export const hero = {
  eyebrow: "Backed by Astransys · Building IT solutions since 2017",
  headlineLead: "Every lead called.",
  headlineAccent: "Every appointment booked.",
  subline:
    "Reseny Connect is the AI calling agent that contacts every lead within seconds, qualifies them in their own language, follows up until they respond, and books the meeting on your calendar.",
  proof: [
    { icon: "clock", label: "24×7, including nights and holidays" },
    { icon: "languages", label: "Speaks your customer's language, incl. Hinglish" },
    { icon: "repeat", label: "Call, WhatsApp, SMS and email follow-up" },
    { icon: "headset", label: "Human handoff with the full summary" },
  ] satisfies { icon: IconName; label: string }[],
} as const;

/** Mini "how it plays out" strip under the hero buttons. */
export const heroFlow = ["New lead", "AI calls", "Qualified", "Booked"] as const;

export const instantDemo = {
  eyebrow: "Instant demo",
  // TODO(content): "30 seconds" is the SOP's promise: confirm it holds in production before publishing.
  titleLead: "Get a call from Reseny",
  titleAccent: "in 30 seconds",
  body: "Enter your number and our AI will call you. It introduces itself as an AI, asks a few quick questions and shows you how a booking works.",
  steps: [
    "The AI calls the number you enter",
    "It asks three or four quick questions",
    "It shows you how a booking works",
  ],
} as const;

/** SOP §7.2 #3: an illustrative counter story, deliberately free of statistics. */
export const problemCards = [
  {
    id: "wait",
    icon: "hourglass",
    title: "Leads that wait, lose interest",
    body: "Interest fades quickly after an enquiry. The longer a lead waits, the more likely they have already spoken to someone else.",
  },
  {
    id: "missed",
    icon: "phone-missed",
    title: "Missed calls are lost revenue",
    body: "Calls that arrive at night, during meetings or on busy days go unanswered, and each one is a customer who may never try again.",
  },
  {
    id: "forgotten",
    icon: "list-checks",
    title: "Manual follow-up gets forgotten",
    body: "Spreadsheets and good intentions do not scale. Follow-ups slip, leads go cold, and nobody notices until the month-end review.",
  },
] as const satisfies readonly { id: string; icon: string; title: string; body: string }[];

export const howItWorks = [
  {
    id: "connect",
    icon: "plug",
    title: "Connect your leads",
    body: "Link website forms, ad campaigns, your CRM or a simple spreadsheet. New leads flow in automatically, tagged with their source.",
  },
  {
    id: "teach",
    icon: "wand-sparkles",
    title: "Teach your agent",
    body: "Pick a ready template for your profession, add your offers and qualifying questions, and choose the language and voice. No code, or let our engineers do it for you.",
  },
  {
    id: "call",
    icon: "phone-call",
    title: "Reseny calls and follows up",
    body: "Within seconds of an enquiry the agent calls, qualifies and scores the lead, then keeps following up on call, WhatsApp, SMS and email until they respond.",
  },
  {
    id: "book",
    icon: "calendar-check",
    title: "Appointments land on your calendar",
    body: "Hot leads are booked straight into your live calendar with reminders and no-show recovery, and your team gets the full conversation summary.",
  },
] as const satisfies readonly { id: string; icon: IconName; title: string; body: string }[];

/** Lead-to-appointment flow diagram nodes (SOP §8). */
export const flowNodes = [
  { id: "lead", icon: "user-plus", label: "Lead", caption: "Enquiry arrives from any source" },
  { id: "call", icon: "phone-call", label: "Call", caption: "AI calls within seconds" },
  { id: "qualify", icon: "clipboard-check", label: "Qualify", caption: "Your questions, your scoring" },
  { id: "follow-up", icon: "repeat", label: "Follow-up", caption: "Voice, WhatsApp, SMS, email" },
  { id: "booked", icon: "calendar-check", label: "Booked", caption: "On your calendar, with a summary" },
] as const satisfies readonly { id: string; icon: IconName; label: string; caption: string }[];

export interface OutcomeMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface Outcome {
  icon: IconName;
  title: string;
  body: string;
  /**
   * Fill from your own measured pilot data. Per the SOP, counters show "only real
   * figures": while this is undefined the tile shows the qualitative statement only.
   */
  metric?: OutcomeMetric;
  /** Static label used instead of a counter, e.g. "24×7". */
  badge?: string;
}

export const outcomes: Outcome[] = [
  { icon: "users", title: "More leads reached", body: "Every enquiry gets a call attempt, plus smart retries at the right times." },
  { icon: "calendar-check", title: "More appointments", body: "Qualified leads are booked straight onto your calendar." },
  { icon: "zap", title: "Faster response", body: "Contact within seconds of the enquiry instead of hours later." },
  { icon: "wallet", title: "Lower cost per lead handled", body: "One agent takes repetitive calling work so your people can focus on closing." },
  { icon: "clock", title: "24×7 coverage", body: "Nights, weekends and holidays included.", badge: "24×7" },
];

export const features = [
  { icon: "user-check", title: "Lead qualification", body: "Your questions, scoring and routing rules, with hot leads sent to humans instantly.", href: "/product/lead-qualification" },
  { icon: "repeat", title: "Follow-up cadence", body: "Voice, WhatsApp, SMS and email in one sequence with smart retry timing.", href: "/product/follow-up-cadence" },
  { icon: "languages", title: "Multilingual voice", body: "Speaks the customer's language, including mixed languages such as Hinglish.", href: "/product/multilingual-voice" },
  { icon: "calendar-check", title: "Calendar booking", body: "Live calendar sync, rescheduling, reminders and no-show recovery.", href: "/product/appointment-booking" },
  { icon: "headset", title: "Human handoff", body: "Transfer hot leads instantly with the full conversation summary.", href: "/product/human-handoff" },
  { icon: "chart-column", title: "Analytics and recordings", body: "Recording (where permitted), transcript, summary and outcome for every call.", href: "/product/analytics" },
  { icon: "plug", title: "Integrations", body: "CRM, calendar, WhatsApp, telephony and automation tools.", href: "/product/integrations" },
] as const satisfies readonly { icon: IconName; title: string; body: string; href: string }[];

/** SOP §5.4: "For a small business owner". */
export const smallBusiness = {
  eyebrow: "For small businesses",
  title: "Built for owners, not just IT teams",
  // TODO(content): "Start in a day" is the SOP's promise: verify before publishing.
  promise: "Start in a day",
  body: "No telecaller to hire, train or replace. Pick a ready template for your profession, connect your calendar and go live without technical knowledge.",
  benefits: [
    { title: "No more lost leads", body: "The enquiry that arrives at 11 pm, or while you are busy, gets a call within seconds, not tomorrow morning." },
    { title: "No telecaller to hire", body: "The agent works every day, never forgets a follow-up and never has a bad day." },
    { title: "Your calendar fills itself", body: "Appointments, site visits and demos are booked directly." },
    { title: "Talk only to serious buyers", body: "Time-wasters and wrong-fit leads are filtered out first." },
    { title: "Full visibility", body: "Every call has a recording (where permitted), transcript, summary and outcome." },
  ],
} as const;

/** SOP §5.4: "For mid-size and large businesses". */
export const enterpriseBenefits = [
  "Handle thousands of calls at once with consistent quality",
  "Standardise scripts, compliance language and objection handling across teams and locations",
  "Integrate with CRM, calendar, WhatsApp and internal systems through APIs",
  "Reduce cost per qualified lead and speed up the sales cycle",
  "Get analytics on what customers actually say",
] as const;

export interface IntegrationGroup {
  title: string;
  icon: IconName;
  items: string[];
}

/**
 * Integrations wall (SOP §7.2 #9). Shown as names, not logos, because third-party
 * logos need permission. TODO(content): confirm which of these you support (native
 * connector or API/webhook build) and delete any you do not.
 */
export const integrationGroups: IntegrationGroup[] = [
  { title: "CRM", icon: "database", items: ["Zoho CRM", "HubSpot", "Salesforce", "LeadSquared", "Freshsales", "Pipedrive"] },
  { title: "Calendar", icon: "calendar-check", items: ["Google Calendar", "Microsoft Outlook", "Calendly", "Cal.com"] },
  { title: "WhatsApp, SMS and email", icon: "message-circle", items: ["WhatsApp Business", "SMS", "Email"] },
  { title: "Telephony", icon: "phone", items: ["Exotel", "Twilio", "Knowlarity", "Ozonetel", "Your own SIP trunk"] },
  { title: "Automation", icon: "webhook", items: ["Zapier", "Make", "n8n", "Webhooks", "REST API"] },
];

/** SOP §6.2: the journey that doubles as the best case study. */
export const resenyUsesReseny = {
  eyebrow: "Reseny uses Reseny",
  title: "Our own sales journey is run by our own agent",
  body: "When you ask for a demo on this site, the same workflow we deploy for customers takes over: the AI calls you, qualifies you, books your slot and follows up. It is the best proof we can give.",
  steps: [
    "You submit the form or ask for a call",
    "Your details go to our CRM with their source page and campaign",
    "Reseny calls within seconds and asks three or four qualifying questions",
    "Hot leads are offered live demo slots and booked, with confirmation on WhatsApp, SMS and email",
    "Warm leads receive a case study and pricing, then a scheduled follow-up call",
    "Reminders go out the day before and an hour before, and no-shows are called back the same day",
    "Our sales team receives the transcript, score and recording link for every hot lead",
  ],
} as const;

export const pilotProof = {
  title: "Pilot results will appear here",
  body: "We are onboarding our first pilot customers. As results come in, this section will show real numbers and customer stories, never invented ones.",
} as const;

export const trustPromises = [
  { icon: "file-check", title: "Consent captured", body: "Consent is recorded at the start of calls and before follow-up messages." },
  { icon: "clock", title: "Calling-window controls", body: "Calls only within the hours you and the regulations allow." },
  { icon: "shield-alert", title: "Do-not-disturb handling", body: "Registered numbers can be scrubbed, and opt-outs are honoured on every channel." },
  { icon: "bot", title: "Honest about being an AI", body: "The agent introduces itself as an AI and passes to a person on request." },
  { icon: "lock", title: "Recording and data policies", body: "Recording, retention and access follow policies you set." },
  { icon: "headset", title: "Human oversight", body: "Hot leads and sensitive moments go to your people, with the whole conversation." },
] as const satisfies readonly { icon: IconName; title: string; body: string }[];

export interface ComparisonRow {
  topic: string;
  typical: string;
  reseny: string;
}

/**
 * "Why teams choose Reseny" (SOP §3 gap analysis). Kept general and fair: the SOP
 * asks for verifiable comparisons without disparaging language. TODO(content):
 * review each row against what the product actually does at launch.
 */
export const comparisonRows: ComparisonRow[] = [
  { topic: "Instant proof", typical: "Audio samples or a builder sandbox", reseny: "Talk to a live agent in your browser, or get a call from Reseny in seconds" },
  { topic: "Outcome messaging", typical: "Platform, stack and infrastructure", reseny: "Every lead called. Every follow-up done. Every appointment booked." },
  { topic: "Small business", typical: "Often enterprise or developer framing", reseny: "Plain-language pages by profession, ready templates, simple plans" },
  { topic: "Trust and compliance", typical: "Often mentioned in passing", reseny: "A full Trust Center: consent, calling windows, DND handling, privacy, handoff, recording" },
  { topic: "Follow-up loop", typical: "The call is the product", reseny: "Call, WhatsApp, SMS and email in one cadence, with no-show recovery and rebooking" },
  { topic: "Pricing clarity", typical: "Often hidden behind “contact us”", reseny: "Public plans, an ROI calculator and a clear pilot offer" },
  { topic: "Local credibility", typical: "Start-up brands", reseny: "Backed by Astransys, building IT solutions since 2017" },
  { topic: "Getting started", typical: "Self-serve only", reseny: "Done-for-you onboarding by Astransys engineers" },
];

export const homeFaqs: Faq[] = [
  {
    question: "How much does Reseny Connect cost?",
    answer:
      "Reseny Connect is offered on simple monthly plans (Starter, Growth and Scale) with a custom Enterprise tier. See the pricing page for what each includes, or use the ROI calculator to estimate the value for your own business. You can also start with a pilot on your real leads.",
  },
  {
    question: "Which languages does the agent speak?",
    answer:
      "The agent speaks the customer's language, including mixed languages such as Hinglish, and handles interruptions naturally. The exact languages we have tested are listed on the Multilingual Voice page, and we add languages only after testing them.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams can start a pilot within days. Begin from a ready template for your profession, or let our Astransys engineers handle done-for-you setup: script design, voice and language selection, CRM and calendar integration, compliance review and go-live support.",
  },
  {
    question: "Is it compliant with calling rules?",
    answer:
      "Reseny is built with compliance in mind: consent capture, calling-window controls, do-not-disturb handling, and recording and data policies. Rules differ by country, industry and type of call, so we run a compliance review during setup, and you remain responsible for lawful use of your contact lists. The Trust Center explains the details in plain language.",
  },
  {
    question: "What happens when a lead is ready to talk to a person?",
    answer:
      "Hot leads are handed to your team instantly, by live transfer or alert, with the full conversation summary, score and transcript, plus the recording link where recording is permitted. If nobody is free, the agent books a callback.",
  },
  {
    question: "How is my data kept secure?",
    answer:
      "We treat privacy, security and compliance as product features. The Trust Center describes what we collect, why, who can access it, how long it is kept and where it is hosted, and larger organisations can request a security review and discuss private deployment.",
  },
];
