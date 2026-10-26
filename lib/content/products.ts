import type { ProductPage } from "./types";

/**
 * Product pages (SOP §2.2–2.12), rendered at /product/[slug].
 * Describes capabilities named in the brand SOP only. Add specifics (limits, exact
 * integration lists, latency) once they are measured: the SOP asks for proven claims.
 */
export const products: ProductPage[] = [
  {
    slug: "ai-voice-agent",
    name: "AI Voice Agent",
    icon: "bot",
    summary: "Outbound and inbound calling agents that handle real conversations.",
    headline: "An AI voice agent that calls like your best caller, every time.",
    intro:
      "Reseny's voice agent makes and answers calls in natural, conversational language, copes with interruptions, and works within your script and rules, day or night.",
    highlights: [
      { icon: "phone-outgoing", title: "Outbound and inbound", body: "Call new leads within seconds, or answer incoming calls instantly, from the same agent." },
      { icon: "mic", title: "Natural interruption handling", body: "Customers can interrupt, change topic or ask a question mid-sentence, and the agent adapts." },
      { icon: "shield-check", title: "Honest about being an AI", body: "The agent introduces itself as an AI and hands over to a person whenever someone asks." },
      { icon: "settings", title: "Works to your rules", body: "Your script, offers, tone and boundaries. It does not improvise beyond what you approve." },
      { icon: "clock", title: "24×7 coverage", body: "Nights, weekends and holidays are included, so no enquiry waits for office hours." },
    ],
    howItWorks: [
      { title: "Choose or build an agent", body: "Start from a ready template or design your own in Agent Studio." },
      { title: "Connect your numbers and leads", body: "Point it at your lead sources and telephony." },
      { title: "Go live and review", body: "Every call has a summary and outcome, with recordings and transcripts where permitted." },
    ],
    included: [
      "Outbound and inbound calling",
      "Natural voice with interruption handling",
      "Your script, tone and boundaries",
      "Call summaries and outcomes",
      "Recording and transcripts where permitted",
      "Live transfer to a person",
    ],
    faqs: [
      { question: "Will callers know they are speaking to an AI?", answer: "Yes. The agent says so at the start of the call, and a caller can ask for a person at any time." },
      { question: "Can it handle both sales and support calls?", answer: "Yes. Different agents and scripts can run for different purposes, such as sales, appointments, support or collections." },
    ],
    related: ["lead-qualification", "multilingual-voice", "human-handoff"],
  },
  {
    slug: "lead-qualification",
    name: "Lead Qualification Engine",
    icon: "user-check",
    summary: "Your questions, your scoring, your routing rules.",
    headline: "Qualification you control, applied to every lead.",
    intro:
      "Define what a good lead looks like. Reseny asks your questions, scores the answers and routes hot leads to people instantly, so your team only talks to people who are ready to buy.",
    highlights: [
      { icon: "clipboard-list", title: "Your own questions", body: "Business type, current process, volume, timeline: whatever tells you who is serious." },
      { icon: "gauge", title: "Scoring you define", body: "Weight the answers and set the thresholds for hot, warm and cold." },
      { icon: "git-branch", title: "Routing rules", body: "Send hot leads to the right person or team, and warm leads into the follow-up cadence." },
      { icon: "bell-ring", title: "Instant hot-lead alerts", body: "Your sales team receives a summary with the transcript, score and recording link." },
      { icon: "badge-check", title: "Consistent every time", body: "The same questions in the same order, so reports compare like with like." },
    ],
    howItWorks: [
      { title: "Define a good lead", body: "Questions, scoring and routing, set in Agent Studio or by our team." },
      { title: "The agent asks and scores", body: "A short conversation, adapted to how the lead answers." },
      { title: "Route and record", body: "Hot, warm or cold: routed, tagged and written to your CRM." },
    ],
    included: [
      "Custom qualification questions",
      "Scoring and thresholds",
      "Routing and handoff rules",
      "Hot-lead alerts with summaries",
      "CRM write-back",
    ],
    faqs: [
      { question: "Can we change the questions later?", answer: "Yes. Update the questions and scoring at any time and apply them to new calls." },
      { question: "What happens to leads that are not qualified?", answer: "They are tagged and added to a slow nurture list, and treated as do-not-call if they ask." },
    ],
    related: ["follow-up-cadence", "human-handoff", "analytics"],
  },
  {
    slug: "follow-up-cadence",
    name: "Smart Follow-Up Cadence",
    icon: "repeat",
    summary: "Voice, WhatsApp, SMS and email in one cadence, with smart retry timing.",
    headline: "Follow up on every channel until they respond.",
    intro:
      "Most leads need several touches, and not everyone answers a call. Reseny runs voice, WhatsApp, SMS and email in one cadence, retries at sensible times, and stops the moment the lead replies or opts out.",
    highlights: [
      { icon: "repeat", title: "One cadence, four channels", body: "Call, WhatsApp, SMS and email coordinated, not four separate tools." },
      { icon: "clock", title: "Smart retry timing", body: "Retries at times a lead is more likely to pick up, within quiet hours you set." },
      { icon: "message-circle", title: "Responds to replies", body: "A reply on WhatsApp can trigger a booking or a call, not a dead end." },
      { icon: "shield", title: "Caps and quiet hours", body: "Set the number of attempts and when contact is allowed." },
      { icon: "circle-check", title: "Stops at the right moment", body: "On a booking, a reply that needs a person, or an opt-out." },
    ],
    howItWorks: [
      { title: "Choose a cadence", body: "Start from a template or set your own sequence and timings." },
      { title: "Reseny follows up", body: "Across channels, adapting to what the lead does." },
      { title: "Outcome recorded", body: "Booked, handed over, nurtured or closed, written back to your CRM." },
    ],
    included: [
      "Voice, WhatsApp, SMS and email",
      "Retry timing and attempt limits",
      "Quiet hours and channel consent",
      "Reply handling and escalation",
      "Opt-out handling across channels",
    ],
    faqs: [
      { question: "Can we use WhatsApp templates?", answer: "Yes. Messages follow the WhatsApp Business rules for approved templates, which we help you set up." },
      { question: "Will leads feel spammed?", answer: "Caps, spacing and stop rules are yours to set, and an opt-out on any channel stops all of them." },
    ],
    related: ["appointment-booking", "multilingual-voice", "campaign-manager"],
  },
  {
    slug: "appointment-booking",
    name: "Appointment Booking & Calendar Sync",
    icon: "calendar-check",
    summary: "Live calendar sync, rescheduling, reminders and no-show recovery.",
    headline: "From conversation to confirmed appointment, automatically.",
    intro:
      "The agent offers real available slots from your calendar, books the appointment, confirms it on every channel, reminds the customer, and recovers no-shows, so your calendar fills itself.",
    highlights: [
      { icon: "calendar-clock", title: "Live calendar sync", body: "Only genuinely free slots are offered, per person, team or location." },
      { icon: "refresh-cw", title: "Reschedule and cancel", body: "Customers change plans on a call or message, and the calendar updates itself." },
      { icon: "message-square", title: "Confirmations everywhere", body: "WhatsApp, SMS and email with the meeting link or address." },
      { icon: "bell-ring", title: "Reminders", body: "A message the day before and a call or message an hour before." },
      { icon: "calendar-x", title: "No-show recovery", body: "A same-day call and WhatsApp offering a new slot." },
    ],
    howItWorks: [
      { title: "Connect your calendar", body: "Choose who can be booked and when." },
      { title: "The agent books", body: "Offers slots, confirms the choice and sends confirmations." },
      { title: "Reminders and recovery", body: "Keeps the appointment on track, or rebooks it." },
    ],
    included: [
      "Calendar sync and availability rules",
      "Booking, rescheduling and cancelling",
      "Multichannel confirmations",
      "Reminder sequences",
      "No-show recovery",
    ],
    faqs: [
      { question: "Which calendars are supported?", answer: "See the Integrations page for supported calendars. Anything with an API can be connected by our engineers." },
      { question: "Can several people be booked?", answer: "Yes. Availability can be set per person, team or location, with routing rules." },
    ],
    related: ["follow-up-cadence", "integrations", "human-handoff"],
  },
  {
    slug: "multilingual-voice",
    name: "Multilingual Voice",
    icon: "languages",
    summary: "Speaks the customer's language, including mixed languages such as Hinglish.",
    headline: "Speaks your customer's language, including Hinglish.",
    intro:
      "Customers answer best in the language they think in. Reseny converses in the customer's language, including natural mixes such as Hinglish, and handles interruptions like a real conversation.",
    highlights: [
      { icon: "languages", title: "Mixed-language conversations", body: "Customers can switch between languages mid-sentence without confusing the agent." },
      { icon: "mic", title: "Natural interruption handling", body: "The agent stops and listens when interrupted, rather than talking over the customer." },
      { icon: "globe", title: "Language per lead or campaign", body: "Choose a default language per campaign, or let the lead choose." },
      { icon: "badge-check", title: "Only tested languages are listed", body: "We publish the languages we have tested end to end, and add to the list after testing." },
    ],
    howItWorks: [
      { title: "Pick languages", body: "A default per campaign, with fallbacks." },
      { title: "The agent adapts", body: "Detects and follows the customer's language during the call." },
      { title: "Summaries in your language", body: "Call summaries and transcripts for your team in the language you choose." },
    ],
    included: [
      "Multiple languages and mixed-language speech",
      "Interruption handling",
      "Voice selection",
      "Per-campaign language settings",
      "Transcripts and summaries",
    ],
    faqs: [
      { question: "Which languages are supported?", answer: "See the list of tested languages on this page. If you need another, tell us and we will test it before offering it." },
      { question: "Can the agent switch languages mid-call?", answer: "Yes, for the languages we have tested, including natural mixes such as Hinglish." },
    ],
    related: ["ai-voice-agent", "agent-studio", "follow-up-cadence"],
  },
  {
    slug: "campaign-manager",
    name: "Campaign Manager & Bulk Calling",
    icon: "megaphone",
    summary: "Run large calling campaigns within your calling windows, with live reporting.",
    headline: "Run large campaigns without losing control.",
    intro:
      "Upload a list or sync from your CRM, set your calling windows and pacing, and let Reseny work through thousands of contacts while you watch the results arrive.",
    highlights: [
      { icon: "layers", title: "Lists and segments", body: "Upload or sync lists, and tag by source, campaign and language." },
      { icon: "clock", title: "Calling windows", body: "Calls only within the hours you allow, per region." },
      { icon: "gauge", title: "Pacing and concurrency", body: "Set how fast the campaign runs, so your team can handle handovers." },
      { icon: "shield-check", title: "Do-not-disturb scrubbing", body: "Check lists against do-not-disturb preferences before dialling." },
      { icon: "chart-line", title: "Live dashboard", body: "Connected, qualified, booked and opted-out, updated as the campaign runs." },
    ],
    howItWorks: [
      { title: "Prepare the list", body: "Upload, scrub and tag your contacts." },
      { title: "Set rules", body: "Calling windows, pacing, retries and the script." },
      { title: "Launch and monitor", body: "Pause, adjust or stop at any time." },
    ],
    included: [
      "List upload and CRM sync",
      "Calling windows and pacing",
      "Retry rules",
      "Do-not-disturb handling",
      "Campaign reporting",
    ],
    faqs: [
      { question: "Can we run managed campaigns?", answer: "Yes. Our team can run managed outbound campaigns with reporting. See Services." },
      { question: "How many calls can run at once?", answer: "Concurrency depends on your plan and telephony set-up. Talk to us about your volumes." },
    ],
    related: ["follow-up-cadence", "analytics", "integrations"],
  },
  {
    slug: "human-handoff",
    name: "Human Handoff & Live Transfer",
    icon: "headset",
    summary: "Hot leads go to people instantly, with the full conversation summary.",
    headline: "Hand hot leads to your team, with the whole story.",
    intro:
      "The agent does the first conversation; your people close. When a lead is ready, or asks for a person, Reseny transfers the call or alerts your team with the full summary.",
    highlights: [
      { icon: "phone-forwarded", title: "Live transfer", body: "Connect the caller to the right person while the lead is still on the line." },
      { icon: "file-text", title: "Summary on screen", body: "Your team sees what was said, the score and what to do next." },
      { icon: "calendar-clock", title: "Warm callbacks", body: "If nobody is free, the agent books a callback instead of dropping the lead." },
      { icon: "siren", title: "Escalation triggers", body: "Keywords, sentiment and your rules can route a call to a person immediately." },
      { icon: "headset", title: "Always available on request", body: "A caller who asks for a person gets one." },
    ],
    howItWorks: [
      { title: "Set handoff rules", body: "Who gets which lead, and when." },
      { title: "The agent hands over", body: "By live transfer, alert or booked callback." },
      { title: "Your team closes", body: "With the transcript, score and recording link at hand." },
    ],
    included: [
      "Live transfer and callbacks",
      "Hot-lead alerts",
      "Escalation rules",
      "Conversation summary",
      "Routing by team, skill or language",
    ],
    faqs: [
      { question: "What if nobody is available?", answer: "The agent offers a time and books a callback with the summary attached." },
      { question: "Can the customer always reach a person?", answer: "Yes. Asking for a person triggers a handoff or a booked callback." },
    ],
    related: ["lead-qualification", "analytics", "ai-voice-agent"],
  },
  {
    slug: "analytics",
    name: "Analytics, Call Recordings & Transcripts",
    icon: "chart-column",
    summary: "Every call recorded where permitted, transcribed, summarised and measured.",
    headline: "See every call, and what customers actually say.",
    intro:
      "Every call has a transcript, summary and outcome, with a recording where permitted. Dashboards show what is working, and analytics surface what customers are really asking for.",
    highlights: [
      { icon: "mic", title: "Recordings where permitted", body: "Recording follows your policy and the notice given on the call." },
      { icon: "scroll-text", title: "Transcripts", body: "Searchable, per call, in the language spoken." },
      { icon: "file-check", title: "Summaries and outcomes", body: "A short summary and a clear outcome on every call." },
      { icon: "chart-column", title: "Source and campaign reporting", body: "See which sources and campaigns produce booked meetings." },
      { icon: "ear", title: "Voice of the customer", body: "Spot common objections, questions and requests to improve campaigns and products." },
    ],
    howItWorks: [
      { title: "Calls are captured", body: "Recording, transcript and summary generated automatically." },
      { title: "Outcomes tagged", body: "Booked, qualified, callback, not interested, do-not-call." },
      { title: "Reports and insights", body: "Dashboards and exports for your team." },
    ],
    included: [
      "Recordings where permitted",
      "Transcripts and summaries",
      "Outcome tagging",
      "Dashboards by source, campaign and agent",
      "Exports and API access",
    ],
    faqs: [
      { question: "Can we turn recording off?", answer: "Yes. Recording and retention follow the policy you set for each campaign and region." },
      { question: "Can we export the data?", answer: "Yes, through exports, the API and webhooks." },
    ],
    related: ["lead-qualification", "developers", "human-handoff"],
  },
  {
    slug: "agent-studio",
    name: "Agent Studio & Template Library",
    icon: "wand-sparkles",
    summary: "A no-code builder with ready templates for your profession.",
    headline: "Build your agent without writing code, or start from a template.",
    intro:
      "Agent Studio lets owners and operations teams create agents visually: choose a voice and language, write the questions, set the rules and test by phone. Ready templates mean most teams start in a day.",
    highlights: [
      { icon: "layout-template", title: "Ready templates", body: "Pre-built agents for sectors such as real estate, clinics and education." },
      { icon: "wand-sparkles", title: "No-code builder", body: "Edit the script, questions, scoring and handoff rules in plain language." },
      { icon: "phone-call", title: "Test before you launch", body: "Call your own phone to hear exactly what customers will hear." },
      { icon: "languages", title: "Voice and language", body: "Choose from the voices and languages we have tested." },
      { icon: "handshake", title: "Done-for-you option", body: "Prefer not to build it yourself? Our engineers will set it up." },
    ],
    howItWorks: [
      { title: "Pick a template", body: "Start from your sector or use case." },
      { title: "Make it yours", body: "Offers, questions, tone and rules." },
      { title: "Test and launch", body: "Hear it on your own phone, then go live." },
    ],
    included: [
      "Visual agent builder",
      "Template library by sector and use case",
      "Test calls",
      "Voice and language selection",
      "Done-for-you setup option",
    ],
    faqs: [
      { question: "Do I need technical knowledge?", answer: "No. Use a template and edit it in plain language, or ask our team to do it for you." },
      { question: "Can I have several agents?", answer: "Yes. Different agents can serve different campaigns, products or locations." },
    ],
    related: ["ai-voice-agent", "multilingual-voice", "integrations"],
  },
  {
    slug: "integrations",
    name: "Integrations",
    icon: "plug",
    summary: "CRM, calendar, WhatsApp, telephony and automation tools.",
    headline: "Connect Reseny to the tools you already use.",
    intro:
      "Leads come from your forms, ads and CRM; bookings land on your calendar; messages go out on WhatsApp. Reseny connects to your stack, and our engineers build the connections you need.",
    highlights: [
      { icon: "database", title: "CRM", body: "Read leads in, write scores, summaries and outcomes back." },
      { icon: "calendar-check", title: "Calendar", body: "Live availability and automatic booking." },
      { icon: "message-circle", title: "WhatsApp, SMS and email", body: "Follow-up on the channels your customers use." },
      { icon: "phone", title: "Telephony", body: "Connect numbers and carriers." },
      { icon: "webhook", title: "Automation tools and webhooks", body: "Trigger flows and move data into thousands of other tools." },
      { icon: "wrench", title: "Custom integrations", body: "Built by our expert engineering team when you need them." },
    ],
    howItWorks: [
      { title: "Choose your tools", body: "CRM, calendar, messaging and telephony." },
      { title: "Connect and map", body: "Authorise access and map fields." },
      { title: "Test end to end", body: "A lead goes in; a booked meeting and CRM record come out." },
    ],
    included: [
      "CRM and calendar connections",
      "WhatsApp, SMS and email",
      "Telephony",
      "Webhooks and automation tools",
      "Custom integration services",
    ],
    faqs: [
      { question: "Which exact tools do you support?", answer: "The current list is shown on this page. If your tool is not listed, our engineers can usually connect it through its API." },
      { question: "Can you integrate with internal systems?", answer: "Yes. Use the API and webhooks, or ask for a custom integration." },
    ],
    related: ["developers", "appointment-booking", "campaign-manager"],
  },
  {
    slug: "developers",
    name: "Developers: API, Webhooks & Docs",
    icon: "code",
    summary: "APIs and webhooks to embed Reseny into your own systems.",
    headline: "Build Reseny into your own systems.",
    intro:
      "Trigger calls, receive events and read results through the API and webhooks. Backed by Astransys engineers, who have been delivering software since 2017.",
    highlights: [
      { icon: "code", title: "API", body: "Create leads, start campaigns and read call results programmatically." },
      { icon: "webhook", title: "Webhooks", body: "Receive events such as call completed, lead qualified, appointment booked and handoff requested." },
      { icon: "activity", title: "Real-time events", body: "Keep your CRM and internal tools in step with every call." },
      { icon: "book-open", title: "Documentation", body: "Reference and guides for your engineering team." },
      { icon: "users-round", title: "Engineering support", body: "Talk to engineers, not only support agents, when you integrate." },
    ],
    howItWorks: [
      { title: "Get access", body: "Request API credentials and documentation." },
      { title: "Build and test", body: "In a test environment, with help from our team." },
      { title: "Go live", body: "With monitoring and support from Astransys engineers." },
    ],
    included: [
      "API access",
      "Webhooks",
      "Documentation",
      "Engineering support",
      "Custom integration services",
    ],
    faqs: [
      { question: "Where is the documentation?", answer: "Request access through the contact form, and we will share API documentation and credentials." },
      { question: "Can we run Reseny privately?", answer: "Private deployment is available for qualifying requirements. See Data Residency and Deployment in the Trust Center." },
    ],
    related: ["integrations", "analytics", "agent-studio"],
  },
];
