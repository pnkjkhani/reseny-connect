import type { IconName } from "@/components/ui/icon";
import type { Faq } from "./types";

/**
 * Trust Center (SOP §6). The SOP asks for plain language first, legal language
 * second, and for a lawyer to review the result.
 *
 * TODO(trust): everything below is a plain-language DRAFT. It describes how the
 * product is designed to behave according to the brand SOP and avoids certifications,
 * uptime figures, encryption standards or residency regions that have not been
 * confirmed. Have counsel and your engineering lead review and complete it before
 * publishing, and replace the legal-document placeholders with the approved text.
 */

export interface TrustSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface TrustPage {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  intro: string;
  sections: TrustSection[];
  faqs?: Faq[];
}

export const trustPages: TrustPage[] = [
  {
    slug: "security",
    title: "Security and data privacy",
    icon: "lock",
    summary: "What we collect, why, who can access it and how long it is kept.",
    intro:
      "Privacy, security and compliance are product features at Reseny, not afterthoughts. This page explains in plain language how we think about your data and your customers' data.",
    sections: [
      {
        heading: "What data Reseny handles",
        body: ["To place and manage calls and messages for you, Reseny handles:"],
        bullets: [
          "Lead details you send us, such as name, phone number and enquiry information",
          "The conversation itself: audio (where recording is permitted), transcript and summary",
          "Outcomes such as qualification scores, bookings and opt-outs",
        ],
      },
      {
        heading: "Why we handle it",
        body: [
          "Only to place and handle calls and messages on your behalf, to book appointments and to show you the results. We do not sell your leads' data.",
        ],
      },
      {
        heading: "Who can access it",
        body: [
          "You decide which people on your team can see recordings, transcripts and contact details. Astransys engineers access customer data only where it is needed for support or for integration work you have asked for.",
        ],
      },
      {
        heading: "Recording, retention and deletion",
        body: [
          "Recording is optional and follows your policy and local rules. You set how long recordings and transcripts are kept, and you can ask us to delete data.",
        ],
      },
      {
        heading: "Security practices",
        body: [
          "Our engineering team builds Reseny with security in mind. We share a detailed description of our controls, including architecture, access management and incident response, with prospective customers on request as part of security review.",
        ],
      },
    ],
    faqs: [
      { question: "Can we request a security review?", answer: "Yes. Enterprise and regulated customers can request a security review and our security documentation. Use the contact form to start." },
      { question: "Do you use customer data to train models?", answer: "Ask us for our position in writing during security review. We will confirm exactly how call data is used before you sign." },
    ],
  },
  {
    slug: "calling-compliance",
    title: "Calling compliance",
    icon: "phone-call",
    summary: "Consent, calling windows, do-not-disturb handling, number series and disclosure.",
    intro:
      "Calling rules vary by country, industry and type of call. Reseny gives you the controls to follow them: you decide the rules for each campaign, and we help you set them up and review them.",
    sections: [
      {
        heading: "Consent",
        body: [
          "Consent is recorded at the start of a call and before follow-up on WhatsApp, SMS or email. Forms on this site include clear consent wording, and your own forms should do the same.",
        ],
      },
      {
        heading: "Calling windows",
        body: [
          "Calls are made only within the hours you set for each campaign and region. Retries respect the same windows and your cap on attempts.",
        ],
      },
      {
        heading: "Do-not-disturb handling",
        body: [
          "Lists can be checked against do-not-disturb registrations before dialling, and any person who says they do not want to be contacted is marked do-not-call and left alone on every channel.",
        ],
      },
      {
        heading: "Number series",
        body: [
          "Regulators in some countries require different kinds of calls, such as promotional and service calls, to use designated number series. We help you set up telephony so each type of call uses the right one.",
        ],
      },
      {
        heading: "Disclosure",
        body: [
          "The agent introduces itself as an AI at the start of each call, and a caller can ask for a person at any time.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "You remain responsible for lawful use of your contact lists, for the content of your scripts and for the rules that apply to your sector. We run a compliance review with you during setup. This page is general information, not legal advice.",
        ],
        bullets: [
          "In India this includes telecom rules for commercial communication and data-protection law, such as the Digital Personal Data Protection Act, 2023.",
          "Regulated sectors such as banking, insurance and healthcare may have additional guidelines.",
        ],
      },
    ],
    faqs: [
      { question: "Does Reseny guarantee compliance?", answer: "No product can. Reseny provides consent capture, calling-window controls, do-not-disturb handling and recording policies, and we review your set-up with you. Lawful use of your lists and scripts remains your responsibility." },
      { question: "Can I run promotional and service calls together?", answer: "We recommend configuring them as separate campaigns with their own rules and number series." },
    ],
  },
  {
    slug: "data-residency",
    title: "Data residency and deployment",
    icon: "server",
    summary: "Where your data lives, and the deployment options for larger organisations.",
    intro:
      "Some organisations need to know exactly where their data is stored and processed, or to run the platform privately. Here are the options and how to discuss them.",
    sections: [
      {
        heading: "Hosted deployment",
        body: [
          "Most customers use the hosted platform, managed by our team. Tell us your residency requirements and we will confirm hosting location and sub-processors in writing before you commit.",
        ],
      },
      {
        heading: "Private deployment",
        body: [
          "For mid-market and enterprise customers with strict requirements, private deployment can be scoped with our engineers. Availability, timelines and cost depend on your needs.",
        ],
      },
      {
        heading: "Government-linked and regulated organisations",
        body: [
          "Public-sector programmes and regulated businesses can have hosting and data-localisation requirements. Raise them early in discovery so we can advise on what is possible.",
        ],
      },
    ],
    faqs: [
      { question: "Can I choose where my data is stored?", answer: "Residency options depend on your requirements and our current hosting. We confirm them in writing before you sign." },
    ],
  },
  {
    slug: "responsible-ai",
    title: "Responsible AI and human oversight",
    icon: "scale",
    summary: "Honesty about being an AI, boundaries you control, and people in the loop.",
    intro:
      "An AI that talks to your customers carries your reputation. These are the principles we build around so that you stay in control.",
    sections: [
      {
        heading: "Honest about being an AI",
        body: ["The agent says it is an AI at the start of each call and never pretends to be a person."],
      },
      {
        heading: "You set the boundaries",
        body: [
          "The agent works from your script, offers and rules. It does not give medical, financial or legal advice, and it passes anything outside its remit to a person.",
        ],
      },
      {
        heading: "People in the loop",
        body: [
          "Hot leads, sensitive moments and any request for a person go to your team with the full conversation summary. Call recordings (where permitted), transcripts and summaries let you review what was said.",
        ],
      },
      {
        heading: "Easy opt-out",
        body: ["Anyone can ask to stop being contacted, and the agent honours it across every channel."],
      },
      {
        heading: "Fair screening",
        body: [
          "For recruitment and similar uses, screening questions should be structured and job-relevant. Do not configure criteria that discriminate on protected characteristics.",
        ],
      },
      {
        heading: "Continuous review",
        body: ["We recommend regular call review and script tuning, which our optimisation service includes."],
      },
    ],
  },
];

export interface LegalDoc {
  slug: string;
  title: string;
  summary: string;
  /** Plain-language summary points (shown first). */
  plain: TrustSection[];
}

/** Shown on each legal page until the approved legal text is added. */
export const legalPlaceholder =
  "The full legal text of this document is being finalised with our legal counsel and will be published here. The plain-language summary above describes our intent.";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "How we collect, use and protect personal data on this website and through Reseny Connect.",
    plain: [
      {
        heading: "What we collect on this website",
        body: ["When you use a form on this site we collect what you enter, such as name, phone number, work email, business details and preferred language and time."],
        bullets: [
          "The page you came from and any campaign tags in the link, so we know which content helped you",
          "Your consent choices, including whether you agreed to be called",
          "Technical details such as your IP address and browser type, used to keep our forms safe from abuse",
          "Basic usage data, only if analytics is switched on for this site",
        ],
      },
      {
        heading: "How we use it",
        body: ["To respond to your request, including calling you if you asked us to, to book and remind you about demos, and to improve this website and our service."],
      },
      {
        heading: "Calls with Reseny's AI agent",
        body: ["If you ask for a call, our AI agent will call the number you provide, introduce itself as an AI and ask a few questions. Calls may be recorded where the law permits and you are told at the start."],
      },
      {
        heading: "Your choices and rights",
        body: ["You can ask us to access, correct or delete your data, to stop contacting you, or to withdraw consent at any time. Contact us using the details on our contact page."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The terms that apply when you use this website and Reseny Connect.",
    plain: [
      {
        heading: "Using this website",
        body: ["You may browse this website and submit enquiries for lawful business purposes. Please provide accurate information and only your own contact details, or those of people who have asked you to enter them."],
      },
      {
        heading: "Using Reseny Connect",
        body: ["The service is provided under a customer agreement that sets out plans, fees, acceptable use, data handling and support. Customers are responsible for lawful use of their contact lists and scripts."],
      },
      {
        heading: "Acceptable use",
        body: ["Do not use Reseny to harass people, mislead them, or contact people who have not consented where consent is required."],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    summary: "What this website stores in your browser, and why.",
    plain: [
      {
        heading: "What we store",
        body: ["This website stores a small number of items in your browser."],
        bullets: [
          "Your light or dark theme choice, so the site looks the way you left it",
          "A short-lived flag that remembers you have seen an offer, so we do not show it repeatedly",
          "A draft of an unfinished booking form, kept in your browser until you close the tab, so you can carry on where you left off",
          "Campaign tags from the link you arrived through (also cleared when you close the tab), so we can attribute your enquiry",
        ],
      },
      {
        heading: "Analytics and marketing tags",
        body: ["Analytics and marketing tags are loaded only if the site owner has switched them on, and are described in the Privacy Policy when they are."],
      },
      {
        heading: "Your choices",
        body: ["You can clear stored items in your browser settings at any time. The site still works without them."],
      },
    ],
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement",
    summary: "How Reseny processes personal data on behalf of customers.",
    plain: [
      {
        heading: "Roles",
        body: ["For the personal data of your leads and customers, you are the controller (or fiduciary) and Reseny acts as your processor, handling data only on your documented instructions."],
      },
      {
        heading: "What the agreement covers",
        body: ["Subject matter and duration, types of data, security measures, sub-processors, assistance with data-subject requests, breach notification, and deletion or return of data at the end of the contract."],
      },
      {
        heading: "Getting a signed copy",
        body: ["Customers can request our standard agreement as part of onboarding or security review."],
      },
    ],
  },
];

export const trustOverviewPoints = [
  { icon: "file-check", title: "Consent", body: "Captured at the start of calls and before follow-up messages." },
  { icon: "clock", title: "Calling windows", body: "Calls only within the hours you allow." },
  { icon: "shield-alert", title: "Do-not-disturb", body: "Opt-outs honoured on every channel." },
  { icon: "lock", title: "Data privacy", body: "You control access, recording and retention." },
  { icon: "headset", title: "Human handoff", body: "People take over when it matters." },
  { icon: "mic", title: "Recording policy", body: "Recording where permitted, with notice." },
] as const satisfies readonly { icon: IconName; title: string; body: string }[];
