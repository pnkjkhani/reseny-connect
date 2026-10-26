import type { Faq, Solution } from "./types";

/**
 * Sector pages (SOP §5.2 and §7.3). One entry renders one page at
 * /solutions/industries/[slug].
 *
 * Content rules from the brand SOP:
 * - Sample calls are synthetic (fictional businesses and people), never real recordings.
 * - No invented statistics. Add real pilot numbers to the case-study pages once they exist.
 * - Compliance notes describe how the product is configured, not legal advice.
 *   TODO(trust): have counsel review the compliance wording before publishing.
 */

/** Appended to every sector's own FAQs. */
const SHARED_FAQS: Faq[] = [
  {
    question: "How quickly can we go live?",
    answer:
      "Reseny is built to go live in days, not months. Our Astransys engineers can handle done-for-you setup: script, voice and language, CRM and calendar connection and a compliance review, so no technical skills are needed on your side.",
  },
  {
    question: "Which languages can the agent speak?",
    answer:
      "The agent speaks the customer's language, including mixed languages such as Hinglish. See the Multilingual Voice page for the exact languages we have tested.",
  },
];

export const industries: Solution[] = [
  {
    category: "industries",
    slug: "real-estate",
    name: "Real estate & builders",
    icon: "building",
    summary: "Call every property enquiry back in seconds and book the site visit.",
    headline: "Every property enquiry called back in seconds. Every site visit booked.",
    intro:
      "Buyers enquire on portals, ads and your website at all hours, then go quiet or call the next builder. Reseny calls each enquiry straight away, qualifies budget and timeline, and books the site visit for your sales team.",
    painPoints: [
      {
        title: "Portal and ad leads go cold fast",
        body: "Enquiries arrive from many sources at once. By the time a telecaller gets to them, the buyer has often spoken to someone else.",
      },
      {
        title: "Sales time lost on casual browsers",
        body: "Without early qualification, site-visit slots go to people with the wrong budget or a vague timeline.",
      },
      {
        title: "Booked visits that never happen",
        body: "Visits get booked and then forgotten. Without reminders and rebooking, an empty slot costs the sales team a day.",
      },
    ],
    sampleCall: {
      id: "real-estate",
      title: "Real estate",
      scenario: "Property enquiry to site visit",
      language: "Hinglish",
      lines: [
        { speaker: "agent", text: "Namaste Rohan ji, main Reseny ki AI assistant bol rahi hoon, Skyline Homes ki taraf se. Aapne 3 BHK ke liye enquiry ki thi. Kya abhi do minute baat kar sakte hain?" },
        { speaker: "lead", text: "Haan, boliye." },
        { speaker: "agent", text: "Thank you! Aap kis area mein dekh rahe hain, aur budget kya soch rakha hai?" },
        { speaker: "lead", text: "Whitefield side, ek crore ke around." },
        { speaker: "agent", text: "Perfect. Aap kab tak shift hona chahenge?" },
        { speaker: "lead", text: "Teen-chaar mahine mein." },
        { speaker: "agent", text: "Great. Site visit ke liye Saturday 11 baje ka slot khali hai. Book kar dun?" },
        { speaker: "lead", text: "Haan, kar dijiye." },
        { speaker: "agent", text: "Done! Confirmation aapko WhatsApp par bhej diya hai. Hamare sales executive visit par aapse milenge." },
      ],
      outcome: "Site visit booked · confirmation sent on WhatsApp",
    },
    workflow: [
      { title: "Enquiry arrives", body: "From a portal, ad form or your website: captured the moment it is submitted." },
      { title: "Reseny calls within seconds", body: "Confirms the project of interest, budget range, configuration and move-in timeline." },
      { title: "Scores and routes", body: "Hot buyers go to your sales executive with a summary. Others enter a follow-up cadence." },
      { title: "Visit booked and protected", body: "Slot confirmed on WhatsApp, reminded the day before and rebooked if missed." },
    ],
    agentQuestions: [
      "Which project or location are you interested in?",
      "Which configuration are you looking for (1, 2 or 3 BHK, plot, commercial)?",
      "What budget range are you comfortable with?",
      "Is this for your own use or as an investment?",
      "When are you planning to move or buy?",
      "Would you like to visit the site this weekend?",
    ],
    integrations: ["Real-estate CRMs", "Property-portal and ad-form leads", "WhatsApp Business", "Google or Outlook calendar"],
    outcomes: [
      "Every enquiry gets a call attempt, including at night and on weekends",
      "Sales executives meet only buyers with a confirmed budget and timeline",
      "Fewer empty site-visit slots thanks to reminders and same-day rebooking",
    ],
    compliance: [
      "Calls respect do-not-disturb preferences and your configured calling windows.",
      "The agent quotes only project details you have approved, including any registration or disclosure wording your compliance team requires.",
    ],
    faqs: [
      {
        question: "Can it handle leads from several portals and ad campaigns?",
        answer: "Yes. Leads from any source can be sent to Reseny and tagged by source, so you can see which channels produce booked visits.",
      },
      {
        question: "What happens when a buyer asks something the agent cannot answer?",
        answer: "The agent says it will have a specialist follow up, notes the question, and can hand the call to your team live if you have enabled transfer.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about site visits",
  },
  {
    category: "industries",
    slug: "education",
    name: "Education & coaching",
    icon: "graduation-cap",
    summary: "Answer every admission enquiry while interest is high and book counselling.",
    headline: "Every admission enquiry answered while the interest is high.",
    intro:
      "Enquiries spike after campaigns and results, and counsellors cannot call everyone the same day. Reseny reaches every parent and student quickly, understands what they are looking for, and books a counselling session or demo class.",
    painPoints: [
      {
        title: "Enquiry peaks overwhelm counsellors",
        body: "After a campaign or result day, hundreds of enquiries arrive together and the slowest ones are never reached.",
      },
      {
        title: "Parents are hard to reach",
        body: "Parents answer after work or on weekends. Calls at the wrong time are missed and never retried properly.",
      },
      {
        title: "Demo classes and counselling no-shows",
        body: "Sessions are booked and then forgotten, so counsellors sit idle and the family drifts away.",
      },
    ],
    sampleCall: {
      id: "education",
      title: "Education",
      scenario: "Admission enquiry to counselling session",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Ananya, this is Reseny's AI assistant calling from BrightPath Academy. You asked about the Class 11 science batch. Do you have two minutes?" },
        { speaker: "lead", text: "Sure." },
        { speaker: "agent", text: "Is the course for you or your child, and which subjects are you most interested in?" },
        { speaker: "lead", text: "It's for my daughter. She wants PCM." },
        { speaker: "agent", text: "Great. The PCM batch starts next month. Would you like a free counselling session with a mentor by phone?" },
        { speaker: "lead", text: "Yes, in the evening please." },
        { speaker: "agent", text: "I can book Friday at 5:00 PM. Shall I confirm it?" },
        { speaker: "lead", text: "Yes, confirm." },
        { speaker: "agent", text: "Confirmed. I'll send the batch details on WhatsApp right now." },
      ],
      outcome: "Counselling booked · batch details sent on WhatsApp",
    },
    workflow: [
      { title: "Enquiry arrives", body: "From an ad, landing page, walk-in form or WhatsApp click: captured instantly." },
      { title: "Reseny calls and listens", body: "Learns the course, class or exam, who the student is and what matters most to the family." },
      { title: "Counselling or demo booked", body: "A slot on a counsellor's calendar, confirmed by WhatsApp with the details." },
      { title: "Reminders and rebooking", body: "A reminder before the session and a same-day nudge to rebook if it was missed." },
    ],
    agentQuestions: [
      "Which course, class or exam are you interested in?",
      "Is the enquiry for you or for your child?",
      "Which board or current class is the student in?",
      "Do you prefer online or classroom learning?",
      "When would you like a free counselling session?",
      "Should we share the brochure and fee details on WhatsApp?",
    ],
    integrations: ["Admissions CRMs and LMS", "Ad and landing-page forms", "WhatsApp Business", "Counsellor calendars"],
    outcomes: [
      "Every enquiry is reached while the interest is still fresh",
      "Counsellors spend their time with families who are ready to talk",
      "Fewer missed counselling sessions through reminders and rebooking",
    ],
    compliance: [
      "When the student is a minor, the agent speaks with a parent or guardian and records consent for follow-ups.",
      "The agent never promises results or placements unless the claim is in your approved script.",
    ],
    faqs: [
      {
        question: "Can the agent speak to both parents and students?",
        answer: "Yes. It asks who it is speaking with and adapts its questions. Consent for follow-up is recorded from the parent or guardian where the student is a minor.",
      },
      {
        question: "Can it call at a time the family prefers?",
        answer: "Yes. If the family asks for a later time, the agent schedules the call and tries again then, rather than pushing for a conversation now.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about admissions",
  },
  {
    category: "industries",
    slug: "healthcare",
    name: "Healthcare, clinics & wellness",
    icon: "stethoscope",
    summary: "Answer every patient enquiry, book appointments and cut no-shows.",
    headline: "Every patient enquiry answered. Every appointment confirmed.",
    intro:
      "Front desks are busy, and enquiries arrive after hours. Reseny calls back every enquiry, collects the non-clinical details needed to book, and fills your appointment book, then reminds patients so slots are not wasted.",
    painPoints: [
      {
        title: "Enquiries wait until the front desk is free",
        body: "Calls and form submissions pile up during peak hours. Some patients book elsewhere before you get back to them.",
      },
      {
        title: "No-shows leave expensive gaps",
        body: "An empty chair is lost revenue for the clinic and a lost slot for another patient.",
      },
      {
        title: "Follow-ups are easy to forget",
        body: "Review visits, diagnostic reports and treatment plans need gentle nudges that busy staff cannot always make.",
      },
    ],
    sampleCall: {
      id: "healthcare",
      title: "Clinic",
      scenario: "Appointment enquiry to booked visit",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Priya, this is an AI assistant calling from CareFirst Clinic. You enquired about a dental check-up. Is now a good time?" },
        { speaker: "lead", text: "Yes, go ahead." },
        { speaker: "agent", text: "Is this your first visit with us, or a follow-up?" },
        { speaker: "lead", text: "First visit. I have some sensitivity in my teeth." },
        { speaker: "agent", text: "Thanks for sharing. I can't give medical advice, but Dr. Mehta can examine you. Would a weekday morning or evening suit you?" },
        { speaker: "lead", text: "Evening works." },
        { speaker: "agent", text: "I have Thursday at 6:30 PM. Shall I book it?" },
        { speaker: "lead", text: "Yes please." },
        { speaker: "agent", text: "Booked. You'll get a WhatsApp confirmation and a reminder the day before." },
      ],
      outcome: "Appointment booked · reminder scheduled",
    },
    workflow: [
      { title: "Enquiry arrives", body: "From your website, ad, Google listing or a missed call: captured immediately." },
      { title: "Reseny calls and collects booking details", body: "New or returning patient, department or doctor, and preferred day and time. No clinical advice." },
      { title: "Appointment confirmed", body: "Slot booked on the doctor's calendar with a WhatsApp confirmation and directions." },
      { title: "Reminders and recovery", body: "Reminders before the visit and an offer to rebook if the patient does not turn up." },
    ],
    agentQuestions: [
      "Is this your first visit, or a follow-up?",
      "Which doctor or department would you like to see?",
      "What is the general reason for the visit (not a medical history)?",
      "Which day and time work best for you?",
      "Should we send directions and a reminder on WhatsApp?",
    ],
    integrations: ["Clinic and hospital management systems", "Doctor calendars", "WhatsApp Business", "Payment links"],
    outcomes: [
      "Enquiries reached the same day, including after hours",
      "Appointment books filled without adding front-desk workload",
      "Fewer no-shows through reminders and easy rebooking",
    ],
    compliance: [
      "The agent never gives medical advice or a diagnosis. Clinical questions are passed to your staff, and urgent keywords trigger an immediate handoff or a prompt to contact emergency services.",
      "Health-related details are sensitive personal data. The agent collects only what is needed to book, and recordings and transcripts follow the retention policy you set.",
    ],
    faqs: [
      {
        question: "Does the agent give medical advice?",
        answer: "No. It books, confirms and reminds. Anything clinical is handed to your staff, and the agent says clearly that it cannot advise.",
      },
      {
        question: "Can it work for diagnostics, dental and wellness centres too?",
        answer: "Yes. The template is adapted to your services: test booking, home-collection scheduling, consultation slots or treatment follow-ups.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about appointments",
  },
  {
    category: "industries",
    slug: "banking-finance",
    name: "Banking, NBFC, fintech & loans",
    icon: "landmark",
    summary: "Qualify loan enquiries instantly and route ready applicants to an advisor.",
    headline: "Qualify every loan enquiry the moment it arrives.",
    intro:
      "Digital loan leads lose interest quickly, and screening them by hand is slow and inconsistent. Reseny calls each applicant, runs your eligibility questions the same way every time, and sends serious applicants to your advisors with a full summary.",
    painPoints: [
      {
        title: "Digital leads expire quickly",
        body: "Applicants often submit several forms at once. The first lender to have a real conversation tends to hold the lead.",
      },
      {
        title: "Inconsistent screening",
        body: "Different telecallers ask different questions, so advisors receive uneven, hard-to-compare leads.",
      },
      {
        title: "Repayment reminders strain the team",
        body: "Large volumes of polite reminder calls take collections staff away from the accounts that need real attention.",
      },
    ],
    sampleCall: {
      id: "banking-finance",
      title: "Loans",
      scenario: "Personal loan enquiry to advisor call",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Vikram, this is an AI assistant from Prime Finance. You applied online for a personal loan. May I ask a few quick questions?" },
        { speaker: "lead", text: "Okay." },
        { speaker: "agent", text: "Are you salaried or self-employed, and roughly what loan amount are you looking at?" },
        { speaker: "lead", text: "Salaried. Around five lakh." },
        { speaker: "agent", text: "Thanks. Is your monthly income above or below fifty thousand rupees? A range is fine." },
        { speaker: "lead", text: "Above." },
        { speaker: "agent", text: "That helps. I'll connect you with an advisor tomorrow at 11 AM to go through options. I never ask for OTPs or card details on a call. Does that time work?" },
        { speaker: "lead", text: "Yes, that works." },
      ],
      outcome: "Qualified · advisor call booked with summary",
    },
    workflow: [
      { title: "Application arrives", body: "From your site, app or lead partner: captured with its source tag." },
      { title: "Reseny runs your eligibility questions", body: "Same questions, same order, every time, with consent recorded at the start." },
      { title: "Score and route", body: "Strong applicants are booked with an advisor. Others receive a follow-up with next steps." },
      { title: "Reminders", body: "Polite due-date and document reminders by call and WhatsApp, handing disputes to a person." },
    ],
    agentQuestions: [
      "Which type of loan are you interested in, and for what amount?",
      "Are you salaried, self-employed or a business owner?",
      "What is your approximate monthly income range?",
      "Which city do you live in?",
      "When would you like to speak with an advisor?",
      "Do you consent to us contacting you about this application?",
    ],
    integrations: ["Loan-origination systems and CRMs", "Advisor calendars", "WhatsApp Business", "Payment-link providers"],
    outcomes: [
      "Every applicant screened with the same questions",
      "Advisors speak only with applicants who meet your criteria",
      "Routine reminders handled without stretching the collections team",
    ],
    compliance: [
      "The agent says it is an AI at the start of the call, records consent, and never asks for OTPs, PINs, CVVs or passwords.",
      "Calling windows, tone and escalation rules for reminders and collections are configured to your regulator's guidelines and your internal policy.",
    ],
    faqs: [
      {
        question: "Can the agent handle repayment reminders as well as new leads?",
        answer: "Yes. Reminder and collections flows use their own scripts, calling windows and escalation rules, and always hand disputes or distress to a person.",
      },
      {
        question: "Does the agent collect sensitive financial details?",
        answer: "No. It collects only the details you specify for eligibility screening and never asks for OTPs, PINs, CVVs or passwords.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about loan enquiries",
  },
  {
    category: "industries",
    slug: "insurance",
    name: "Insurance",
    icon: "shield-check",
    summary: "Reach every policy enquiry and renewal before a competitor does.",
    headline: "Reach every policy enquiry before a competitor does.",
    intro:
      "Policy buyers compare options quickly, and renewals lapse when nobody calls in time. Reseny contacts every enquiry and renewal, qualifies need and cover, and books time with your advisor.",
    painPoints: [
      {
        title: "Comparison-site leads are shared",
        body: "The same enquirer is often contacted by several insurers. The first useful conversation matters.",
      },
      {
        title: "Renewals lapse quietly",
        body: "Reminders are sent late or not at all, and policyholders only notice after cover has ended.",
      },
      {
        title: "Advisors spend time on cold enquiries",
        body: "Without screening, advisors call people who were only checking prices.",
      },
    ],
    sampleCall: {
      id: "insurance",
      title: "Insurance",
      scenario: "Policy enquiry to advisor call",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Meera, this is an AI assistant from SafeGuard Insurance. You asked about a family health plan. Is this a good time?" },
        { speaker: "lead", text: "Yes, I have a few minutes." },
        { speaker: "agent", text: "How many family members would you like to cover, and does anyone have an existing policy?" },
        { speaker: "lead", text: "Four of us. We have a small employer cover only." },
        { speaker: "agent", text: "Understood. An advisor can explain the options in detail. Would tomorrow evening suit you?" },
        { speaker: "lead", text: "Tomorrow at 7 is fine." },
        { speaker: "agent", text: "Booked for 7 PM. I'll send a summary and the advisor's name on WhatsApp." },
      ],
      outcome: "Advisor call booked · summary sent",
    },
    workflow: [
      { title: "Enquiry or renewal date arrives", body: "From a form, partner lead or your policy system." },
      { title: "Reseny calls", body: "Confirms need, family or business profile and existing cover within your approved script." },
      { title: "Advisor booked", body: "Interested prospects are booked straight into an advisor's calendar." },
      { title: "Renewal cadence", body: "Reminders by call, WhatsApp and SMS ahead of the due date, with human handoff for questions." },
    ],
    agentQuestions: [
      "Which type of cover are you looking for?",
      "Who would the policy cover?",
      "Do you currently hold any policy?",
      "When would you like to speak with an advisor?",
      "Do you consent to a follow-up on WhatsApp?",
    ],
    integrations: ["Policy-administration systems and CRMs", "Advisor calendars", "WhatsApp Business", "Payment links for renewals"],
    outcomes: [
      "Enquiries reached while the buyer is still comparing",
      "Renewal reminders sent on time, every time",
      "Advisors focus on prospects with a clear need",
    ],
    compliance: [
      "Scripts and disclosures are the ones your compliance team approves; the agent does not improvise product recommendations.",
      "Opt-out requests are honoured immediately and recorded.",
    ],
    faqs: [
      {
        question: "Can the agent recommend a policy?",
        answer: "It stays within your approved script: it gathers needs and books an advisor, who makes the recommendation.",
      },
      {
        question: "Can it handle renewal reminders?",
        answer: "Yes. Renewal reminder flows run ahead of the due date by voice, WhatsApp and SMS, with a person available for questions.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about policy enquiries",
  },
  {
    category: "industries",
    slug: "automotive",
    name: "Automotive",
    icon: "car",
    summary: "Turn showroom enquiries into booked test drives and service visits.",
    headline: "Turn every showroom enquiry into a test drive.",
    intro:
      "Car buyers enquire with several dealers at once. Reseny calls each enquiry immediately, learns the model and budget, and books the test drive. It also reminds owners about service so workshop bays stay busy.",
    painPoints: [
      {
        title: "Buyers enquire with many dealers",
        body: "The dealer who calls back first, and well, often gets the test drive.",
      },
      {
        title: "Test drives that do not happen",
        body: "Bookings made on one call are forgotten by the day, wasting a salesperson's time and a demo vehicle.",
      },
      {
        title: "Service reminders slip",
        body: "Owners forget service dates and the workshop loses repeat business.",
      },
    ],
    sampleCall: {
      id: "automotive",
      title: "Automotive",
      scenario: "Car enquiry to test drive",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Arjun, this is an AI assistant from Metro Motors. You enquired about the compact SUV. Do you have a minute?" },
        { speaker: "lead", text: "Yes." },
        { speaker: "agent", text: "Are you leaning towards petrol or diesel, and will you be financing the purchase?" },
        { speaker: "lead", text: "Petrol, with a loan." },
        { speaker: "agent", text: "Got it. Would you like to take a test drive this Sunday? I have 11 AM and 3 PM." },
        { speaker: "lead", text: "11 works." },
        { speaker: "agent", text: "Booked for Sunday at 11 AM at our Main Road showroom. I'll send the location on WhatsApp." },
      ],
      outcome: "Test drive booked · location shared",
    },
    workflow: [
      { title: "Enquiry arrives", body: "From the OEM, classifieds, ads or your website." },
      { title: "Reseny calls within seconds", body: "Model, variant, fuel, finance and timeline captured." },
      { title: "Test drive booked", body: "Slot on the showroom calendar, confirmed on WhatsApp." },
      { title: "Service and renewal reminders", body: "Owners reminded at the right time, with easy rebooking." },
    ],
    agentQuestions: [
      "Which model and variant are you interested in?",
      "Do you prefer petrol, diesel, CNG or electric?",
      "Will you be paying in full or financing?",
      "Do you have a car to exchange?",
      "When would you like a test drive, and at which showroom?",
    ],
    integrations: ["Dealer-management systems and CRMs", "Showroom calendars", "WhatsApp Business", "OEM lead feeds"],
    outcomes: [
      "Enquiries called back before the buyer calls the next dealer",
      "Sales staff meet buyers who have a booked test drive",
      "Workshop bays kept full with timely service reminders",
    ],
    compliance: [
      "Service reminders and promotional calls are kept separate, and promotional campaigns respect do-not-disturb preferences.",
      "Consent is recorded before WhatsApp follow-ups.",
    ],
    faqs: [
      {
        question: "Can it handle both sales and service?",
        answer: "Yes. Sales enquiries and service reminders run as separate flows with their own scripts and calling rules.",
      },
      {
        question: "Does it work across several showrooms?",
        answer: "Yes. Bookings are routed to the right showroom and calendar based on the customer's location or choice.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about test drives",
  },
  {
    category: "industries",
    slug: "ecommerce-d2c",
    name: "E-commerce & D2C",
    icon: "shopping-bag",
    summary: "Confirm orders, recover carts and answer customer calls at any hour.",
    headline: "Confirm orders, recover carts and answer every customer call.",
    intro:
      "Cash-on-delivery confirmations, abandoned carts and delivery queries create a mountain of calls. Reseny handles them in your customers' language so your support team can focus on the cases that need a person.",
    painPoints: [
      {
        title: "Unconfirmed COD orders",
        body: "Orders placed on impulse are refused at the door, and every returned parcel costs you twice.",
      },
      {
        title: "Abandoned carts go quiet",
        body: "A nudge at the right moment can bring a shopper back, but nobody has time to call each one.",
      },
      {
        title: "Delivery and return queries",
        body: "Repetitive questions about status, address changes and returns fill the support queue.",
      },
    ],
    sampleCall: {
      id: "ecommerce-d2c",
      title: "E-commerce",
      scenario: "Cash-on-delivery order confirmation",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Sneha, this is an AI assistant from UrbanNest. You placed an order for a linen bedsheet set with cash on delivery. Can I confirm a couple of details?" },
        { speaker: "lead", text: "Sure." },
        { speaker: "agent", text: "Is the delivery address ending in Lake Road, Pune still correct?" },
        { speaker: "lead", text: "Yes, that's right." },
        { speaker: "agent", text: "Great. You can also pay online with a secure link, which makes delivery faster. Shall I send it on WhatsApp?" },
        { speaker: "lead", text: "Okay, send it." },
        { speaker: "agent", text: "Sent. Your order is confirmed for delivery within the estimated window." },
      ],
      outcome: "Order confirmed · secure payment link sent",
    },
    workflow: [
      { title: "Order or cart event", body: "Triggered from your store when an order is placed or a cart is abandoned." },
      { title: "Reseny calls", body: "Confirms address and intent, or helps the shopper finish checkout." },
      { title: "Smart follow-up", body: "A WhatsApp link for payment or tracking, with the call as the personal touch." },
      { title: "Post-delivery feedback", body: "A short call or message to capture how it went." },
    ],
    agentQuestions: [
      "Can you confirm the delivery address and pincode?",
      "Is there a time of day when someone will be home?",
      "Would you like to pay online with a secure link instead of cash?",
      "Anything you'd like to change about this order?",
    ],
    integrations: ["Storefront and order platforms", "Courier and tracking systems", "WhatsApp Business", "Payment-link providers"],
    outcomes: [
      "Fewer unconfirmed orders reaching the courier",
      "Shoppers reminded to finish checkout in their own language",
      "Support team freed from repetitive status calls",
    ],
    compliance: [
      "Payment details are never taken on the call; customers receive a secure payment link instead.",
      "Transactional calls (order confirmation) and promotional calls are configured separately, and opt-outs are respected.",
    ],
    faqs: [
      {
        question: "Does it connect to my store?",
        answer: "Order and cart events can be sent to Reseny through integrations or webhooks. Our engineers can help connect your platform.",
      },
      {
        question: "Can customers pay on the call?",
        answer: "No. For safety, the agent sends a secure payment link by WhatsApp or SMS and never takes card details.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about order confirmation",
  },
  {
    category: "industries",
    slug: "travel-hospitality",
    name: "Travel & hospitality",
    icon: "plane",
    summary: "Turn travel and stay enquiries into confirmed conversations with an expert.",
    headline: "Turn every travel enquiry into a confirmed conversation.",
    intro:
      "Travellers compare packages and hotels in minutes. Reseny calls every enquiry straight away, captures destination, dates and group size, and books a call with your travel expert while the trip is still on their mind.",
    painPoints: [
      {
        title: "Seasonal peaks swamp the team",
        body: "Holiday and festival seasons bring enquiries faster than agents can call back.",
      },
      {
        title: "Quotes go unanswered",
        body: "After a quote is sent, follow-up is patchy and travellers book elsewhere.",
      },
      {
        title: "Last-minute changes",
        body: "Rescheduling and confirmation calls consume agents' time during busy periods.",
      },
    ],
    sampleCall: {
      id: "travel-hospitality",
      title: "Travel",
      scenario: "Holiday enquiry to expert call",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Karan, this is an AI assistant from Wanderline Holidays. You enquired about a Kerala package. Is this a good time?" },
        { speaker: "lead", text: "Yes." },
        { speaker: "agent", text: "How many travellers are you, and which dates are you considering?" },
        { speaker: "lead", text: "Four adults, first week of December." },
        { speaker: "agent", text: "Lovely. Do you have a rough budget per person, so my colleague can suggest the best options?" },
        { speaker: "lead", text: "Around forty thousand." },
        { speaker: "agent", text: "Thanks. A travel expert can call you tomorrow at 4 PM with itineraries. Shall I book that?" },
        { speaker: "lead", text: "Yes please." },
      ],
      outcome: "Expert call booked · itinerary notes passed on",
    },
    workflow: [
      { title: "Enquiry arrives", body: "From your site, ad or an aggregator." },
      { title: "Reseny calls and captures the trip", body: "Destination, dates, group size and budget." },
      { title: "Expert call booked", body: "The right specialist, with the trip summary in hand." },
      { title: "Quote follow-up", body: "Gentle follow-ups after the quote by call and WhatsApp until the traveller replies." },
    ],
    agentQuestions: [
      "Where would you like to travel?",
      "Which dates, and how flexible are they?",
      "How many travellers, and are children or seniors included?",
      "What is your approximate budget per person?",
      "When would you like a call from a travel expert?",
    ],
    integrations: ["Booking and itinerary systems", "Agent calendars", "WhatsApp Business", "Payment links"],
    outcomes: [
      "Seasonal enquiry spikes absorbed without extra headcount",
      "Experts speak with travellers who have shared dates and budget",
      "Quotes followed up consistently",
    ],
    compliance: [
      "Payment details are never collected on the call; payment links are sent securely.",
      "Prices and availability are quoted only from sources you approve.",
    ],
    faqs: [
      {
        question: "Can the agent quote prices?",
        answer: "Only from the rates and rules you approve. Otherwise it books a call with your expert, who prepares the quote.",
      },
      {
        question: "Does it work for hotels and resorts?",
        answer: "Yes. For stays, the agent captures dates, room needs and special requests and books a callback or confirms availability from your approved data.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about travel enquiries",
  },
  {
    category: "industries",
    slug: "restaurants-food",
    name: "Restaurants & food",
    icon: "utensils",
    summary: "Take reservations and catering enquiries without pulling staff off the floor.",
    headline: "Never miss a reservation call during the dinner rush.",
    intro:
      "When the phone rings during service, nobody can pick up. Reseny answers reservation and catering enquiries, confirms bookings and sends reminders, so your team stays with the guests in front of them.",
    painPoints: [
      {
        title: "Calls missed during service",
        body: "The busiest hours are exactly when no one can take a booking.",
      },
      {
        title: "Catering and bulk enquiries wait",
        body: "High-value enquiries sit in a queue until someone has time to call back.",
      },
      {
        title: "Reservation no-shows",
        body: "Empty tables on a full night are a direct hit on the day's revenue.",
      },
    ],
    sampleCall: {
      id: "restaurants-food",
      title: "Restaurant",
      scenario: "Table reservation",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello, thank you for calling Saffron Table. I'm an AI assistant. How can I help?" },
        { speaker: "lead", text: "I'd like a table for six this Saturday." },
        { speaker: "agent", text: "Happy to help. What time would you like, and is it for a special occasion?" },
        { speaker: "lead", text: "Eight o'clock. It's a birthday." },
        { speaker: "agent", text: "Lovely. I have a table for six at 8 PM on Saturday. May I take a name and number for the booking?" },
        { speaker: "lead", text: "Rahul, nine eight seven six five..." },
        { speaker: "agent", text: "Thank you, Rahul. You're booked, and I'll send a confirmation and reminder on WhatsApp." },
      ],
      outcome: "Table booked · confirmation and reminder scheduled",
    },
    workflow: [
      { title: "Call or enquiry comes in", body: "Answered instantly, day or night." },
      { title: "Reseny captures the booking", body: "Date, time, party size and special requests." },
      { title: "Confirmed", body: "Added to your reservation book with a WhatsApp confirmation." },
      { title: "Reminder", body: "A reminder before the booking and an easy way to cancel or change." },
    ],
    agentQuestions: [
      "What date and time would you like?",
      "How many guests?",
      "Is it a special occasion, or do you have seating preferences?",
      "Any dietary requirements we should note?",
      "May I take your name and number for the booking?",
    ],
    integrations: ["Reservation and POS systems", "WhatsApp Business", "Google Business Profile enquiries", "Calendar"],
    outcomes: [
      "Every call answered, even at peak service",
      "Catering enquiries followed up the same day",
      "Fewer empty tables thanks to reminders",
    ],
    compliance: [
      "Allergen and dietary information is given only from your approved menu; anything else is passed to staff.",
      "Customers can opt out of reminders and promotions at any time.",
    ],
    faqs: [
      {
        question: "Can it answer menu or timing questions?",
        answer: "Yes, from the information you provide: timings, location, menu highlights and policies. Anything beyond that is handed to your team.",
      },
      {
        question: "Does it work for cloud kitchens?",
        answer: "Yes. It can handle order-status calls, delivery feedback and bulk or catering enquiries.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about reservations",
  },
  {
    category: "industries",
    slug: "home-services",
    name: "Home services, interiors, solar & repair",
    icon: "wrench",
    summary: "Book the site visit while the customer is still comparing quotes.",
    headline: "Book the site visit while the customer is still searching.",
    intro:
      "Homeowners ask several providers for quotes and choose whoever responds first and sounds organised. Reseny calls every enquiry, understands the job, and books the site visit for your technician or designer.",
    painPoints: [
      {
        title: "Customers call many providers",
        body: "A slow reply means the homeowner has already booked someone else.",
      },
      {
        title: "Quotes need a site visit",
        body: "Without good scoping, visits are wasted on small or unsuitable jobs.",
      },
      {
        title: "Scheduling across a field team",
        body: "Technicians and designers are on the road, so enquiries wait until the evening.",
      },
    ],
    sampleCall: {
      id: "home-services",
      title: "Home services",
      scenario: "Solar enquiry to site survey",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Suresh, this is an AI assistant from BrightRoof Solar. You asked about rooftop solar. Can I ask a few quick questions?" },
        { speaker: "lead", text: "Go ahead." },
        { speaker: "agent", text: "Is it a house or a commercial building, and roughly how much is your monthly electricity bill?" },
        { speaker: "lead", text: "House, around four thousand a month." },
        { speaker: "agent", text: "Thanks. Our surveyor can visit and give an accurate quote. Would Wednesday morning or afternoon be better?" },
        { speaker: "lead", text: "Morning." },
        { speaker: "agent", text: "Booked for Wednesday 10 AM. I'll send the surveyor's details on WhatsApp." },
      ],
      outcome: "Site survey booked · surveyor details sent",
    },
    workflow: [
      { title: "Enquiry arrives", body: "From ads, classifieds or your website." },
      { title: "Reseny scopes the job", body: "Type of work, property, city, size and budget." },
      { title: "Site visit booked", body: "A slot on the right technician's or designer's calendar." },
      { title: "Quote follow-up", body: "Follow-ups after the visit until the customer decides." },
    ],
    agentQuestions: [
      "What kind of work do you need?",
      "Is it a house, apartment or commercial space, and in which city?",
      "What is the approximate size or scope?",
      "Do you have a budget range in mind?",
      "When can someone visit to take measurements?",
    ],
    integrations: ["Job and CRM systems", "Technician calendars", "WhatsApp Business", "Ad and classifieds leads"],
    outcomes: [
      "Enquiries called back before the customer calls competitors",
      "Visits reserved for well-scoped, serious jobs",
      "Quotes followed up consistently",
    ],
    compliance: [
      "The agent quotes only price ranges you have approved and does not promise timelines you have not confirmed.",
      "Customers can opt out of follow-ups at any time.",
    ],
    faqs: [
      {
        question: "Can the agent give a quote?",
        answer: "Only indicative ranges you approve. Final quotes come from your expert after the site visit.",
      },
      {
        question: "Does it handle repair and service calls?",
        answer: "Yes. It can take service requests, schedule technicians and send arrival reminders.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about site visits",
  },
  {
    category: "industries",
    slug: "salons-fitness",
    name: "Salons, spas, fitness & gyms",
    icon: "dumbbell",
    summary: "Fill appointment books and convert trial sessions into members.",
    headline: "Fill your appointment book and keep members coming back.",
    intro:
      "When you are with a client you cannot answer the phone. Reseny books appointments, follows up on trial sessions and reminds members to renew, so your calendar stays full without a receptionist on every shift.",
    painPoints: [
      {
        title: "Missed calls mean missed bookings",
        body: "Staff are hands-on with clients and cannot answer, so callers move on to the next salon or gym.",
      },
      {
        title: "Trial sessions that do not convert",
        body: "A trial is booked and attended, but nobody follows up on membership.",
      },
      {
        title: "Lapsed members",
        body: "Renewal and re-engagement are low priority until revenue dips.",
      },
    ],
    sampleCall: {
      id: "salons-fitness",
      title: "Fitness",
      scenario: "Trial session booking",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Divya, this is an AI assistant from PulseFit Gym. You requested a free trial. Is now a good time?" },
        { speaker: "lead", text: "Sure." },
        { speaker: "agent", text: "What's your main goal: weight loss, strength or general fitness?" },
        { speaker: "lead", text: "Weight loss." },
        { speaker: "agent", text: "Great. Would you prefer a morning or evening trial session?" },
        { speaker: "lead", text: "Evening, around seven." },
        { speaker: "agent", text: "Booked for tomorrow at 7 PM with one of our trainers. I'll send the address on WhatsApp." },
      ],
      outcome: "Trial session booked · address shared",
    },
    workflow: [
      { title: "Enquiry or call arrives", body: "From Instagram, Google, a walk-in form or a missed call." },
      { title: "Reseny books the visit", body: "Service or goal, preferred time and first-visit details." },
      { title: "Reminders", body: "A reminder before the session and easy rescheduling." },
      { title: "Trial follow-up and renewals", body: "Follow-up after the trial and a renewal cadence for members." },
    ],
    agentQuestions: [
      "Which service or goal are you interested in?",
      "Have you visited us before?",
      "Which day and time suit you?",
      "Do you have a preferred stylist or trainer?",
      "Should we send directions on WhatsApp?",
    ],
    integrations: ["Booking and membership software", "WhatsApp Business", "Calendar", "Payment links"],
    outcomes: [
      "Bookings captured while staff are with clients",
      "Trials followed up consistently",
      "Renewals prompted before memberships lapse",
    ],
    compliance: [
      "The agent does not give medical or dietary advice; such questions go to a trainer or practitioner.",
      "Promotional follow-ups are sent only with consent and can be stopped at any time.",
    ],
    faqs: [
      {
        question: "Can it manage staff schedules?",
        answer: "It books into the availability you connect, per stylist, trainer or room.",
      },
      {
        question: "Can it chase membership renewals?",
        answer: "Yes. Renewal reminders run by call and WhatsApp ahead of expiry, with an option to speak to a person.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about bookings",
  },
  {
    category: "industries",
    slug: "recruitment-hr",
    name: "Recruitment & HR",
    icon: "users",
    summary: "Screen every applicant and schedule interviews without a first-round call marathon.",
    headline: "Screen every candidate the day they apply.",
    intro:
      "Recruiters lose hours on first-round calls and many good candidates drop off while they wait. Reseny screens applicants with your structured questions and books interviews, so your team meets only qualified, available candidates.",
    painPoints: [
      {
        title: "First-round calls consume the day",
        body: "Recruiters make the same screening call dozens of times, leaving less time for assessment and closing.",
      },
      {
        title: "Candidates drop off while waiting",
        body: "Good candidates take other offers while they wait to hear back.",
      },
      {
        title: "Interview scheduling back-and-forth",
        body: "Coordinating availability across candidates and panels is slow and error-prone.",
      },
    ],
    sampleCall: {
      id: "recruitment-hr",
      title: "Recruitment",
      scenario: "Candidate screening to interview",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Nisha, this is an AI assistant from TalentBridge. You applied for the customer support executive role. Do you have five minutes?" },
        { speaker: "lead", text: "Yes." },
        { speaker: "agent", text: "How many years of customer support experience do you have, and are you comfortable with rotational shifts?" },
        { speaker: "lead", text: "Two years, and yes, shifts are fine." },
        { speaker: "agent", text: "What is your notice period?" },
        { speaker: "lead", text: "One month." },
        { speaker: "agent", text: "Thanks. I can schedule your interview with the hiring manager on Tuesday at 2 PM. Does that suit you?" },
        { speaker: "lead", text: "Yes." },
      ],
      outcome: "Screened · interview scheduled · profile summary sent",
    },
    workflow: [
      { title: "Application arrives", body: "From a job board, careers page or referral." },
      { title: "Reseny screens", body: "Experience, notice period, location and availability, asked the same way for everyone." },
      { title: "Shortlist and interview slot", body: "Qualified candidates are booked with the hiring manager." },
      { title: "Reminders and drop-off recovery", body: "Interview reminders and follow-ups with candidates who go quiet." },
    ],
    agentQuestions: [
      "Which role did you apply for, and are you still interested?",
      "How many years of relevant experience do you have?",
      "What is your current location and are you open to relocation?",
      "What is your notice period?",
      "What are your salary expectations (range)?",
      "When are you available for an interview?",
    ],
    integrations: ["Applicant-tracking systems", "Job-board feeds", "Interview calendars", "WhatsApp Business"],
    outcomes: [
      "Every applicant screened with the same structured questions",
      "Recruiters interview only qualified, available candidates",
      "Fewer drop-offs through fast follow-up",
    ],
    compliance: [
      "Screening questions are structured and job-relevant. Do not configure questions that discriminate on protected characteristics.",
      "Candidates are told the call may be recorded, consent is captured and retention follows your policy.",
    ],
    faqs: [
      {
        question: "Does the agent decide who gets hired?",
        answer: "No. It screens against your criteria and schedules interviews. People make every hiring decision.",
      },
      {
        question: "Can it screen in regional languages?",
        answer: "It can speak the candidate's language, including mixed languages such as Hinglish. See Multilingual Voice for tested languages.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about candidate screening",
  },
  {
    category: "industries",
    slug: "saas-b2b",
    name: "SaaS, IT services & B2B",
    icon: "laptop",
    summary: "Call every demo request in seconds and book the meeting with the right rep.",
    headline: "Call every demo request in seconds, not hours.",
    intro:
      "Inbound demo requests are most valuable in the first minutes. Reseny calls each one, qualifies company size, need and timeline, and books the demo with the right sales rep, the same way it runs our own sales process.",
    painPoints: [
      {
        title: "Inbound leads wait for an SDR",
        body: "Requests arriving after hours or during busy periods are contacted the next day, if at all.",
      },
      {
        title: "Inconsistent qualification",
        body: "Reps ask different questions, so pipeline reports mix strong and weak leads.",
      },
      {
        title: "Demo no-shows",
        body: "Demos are booked and then missed, with no automatic recovery.",
      },
    ],
    sampleCall: {
      id: "saas-b2b",
      title: "B2B demo booking",
      scenario: "Demo request to booked meeting",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Amit, this is Reseny's AI assistant. You asked for a demo of Reseny Connect. Is now a good time for a few quick questions?" },
        { speaker: "lead", text: "Yes." },
        { speaker: "agent", text: "What type of business do you run, and how do you currently handle new leads?" },
        { speaker: "lead", text: "We're a software services company. The sales team calls leads manually." },
        { speaker: "agent", text: "Roughly how many leads do you get in a month, and when would you like to get started?" },
        { speaker: "lead", text: "A few hundred. Within a month." },
        { speaker: "agent", text: "Thanks. I can offer Thursday at 3 PM for a demo with our team. Shall I book it?" },
        { speaker: "lead", text: "Please." },
        { speaker: "agent", text: "Booked. A confirmation with the meeting link is on its way by WhatsApp, SMS and email." },
      ],
      outcome: "Demo booked · confirmations on WhatsApp, SMS and email",
    },
    workflow: [
      { title: "Demo request arrives", body: "From your website, ad or webinar form, tagged with source and campaign." },
      { title: "Reseny qualifies", body: "Business type, current process, volume and timeline." },
      { title: "Demo booked", body: "Offers slots from the rep's live calendar and confirms on every channel." },
      { title: "Reminders and recovery", body: "A day-before message, an hour-before reminder and same-day rebooking if missed." },
    ],
    agentQuestions: [
      "What type of business do you run?",
      "How do you currently handle new leads?",
      "Roughly how many leads or calls do you handle in a month?",
      "When would you like to get started?",
      "Which time suits you for a demo?",
    ],
    integrations: ["CRMs", "Sales-rep calendars", "WhatsApp, SMS and email", "Webhooks and automation tools"],
    outcomes: [
      "Demo requests contacted in seconds, around the clock",
      "Reps meet only qualified, scheduled prospects",
      "Fewer demo no-shows thanks to reminders and rebooking",
    ],
    compliance: [
      "B2B calling still follows consent, calling-window and do-not-disturb rules, and the agent identifies itself as an AI.",
      "Hot-lead alerts include the transcript and recording link for your sales team where recording is permitted.",
    ],
    faqs: [
      {
        question: "Is this how Reseny sells Reseny?",
        answer: "Yes. Our own demo requests follow the same journey described here: the AI calls, qualifies, books and follows up.",
      },
      {
        question: "Can it create records in our CRM?",
        answer: "Yes. Qualified leads, scores and summaries can be written to your CRM through integrations or webhooks.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about demo booking",
  },
  {
    category: "industries",
    slug: "events-exhibitions",
    name: "Events & exhibitions",
    icon: "ticket",
    summary: "Confirm registrations, remind attendees and follow up with exhibitors.",
    headline: "Fill the room: invite, confirm and remind every attendee.",
    intro:
      "Registrations do not equal attendance. Reseny confirms each registrant, answers common questions and reminds them before the event, then follows up with exhibitors and sponsors afterwards.",
    painPoints: [
      {
        title: "Registrations that never show",
        body: "Many registrants forget or lose interest between sign-up and the event date.",
      },
      {
        title: "Sponsor and exhibitor follow-up",
        body: "Outreach to exhibitors and sponsors competes with a hundred other event tasks.",
      },
      {
        title: "Last-minute changes",
        body: "Venue or schedule changes need to reach everyone quickly.",
      },
    ],
    sampleCall: {
      id: "events-exhibitions",
      title: "Events",
      scenario: "Registration confirmation",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Farah, this is an AI assistant from the TechConnect Summit. You registered for the two-day expo. Can I confirm your attendance?" },
        { speaker: "lead", text: "Yes, I'll be there." },
        { speaker: "agent", text: "Wonderful. Will you attend on both days, and which sessions interest you most?" },
        { speaker: "lead", text: "Both days. Mainly the AI sessions." },
        { speaker: "agent", text: "Noted. I'll send your pass and the AI session schedule on WhatsApp, with a reminder the day before." },
      ],
      outcome: "Attendance confirmed · pass and schedule sent",
    },
    workflow: [
      { title: "Registration arrives", body: "From your event page or ticketing platform." },
      { title: "Reseny confirms", body: "Attendance, sessions of interest and special requirements." },
      { title: "Reminders", body: "Messages and calls ahead of the event, with schedule updates." },
      { title: "Post-event follow-up", body: "Feedback calls and exhibitor or sponsor follow-up." },
    ],
    agentQuestions: [
      "Will you be able to attend?",
      "How many people will be coming with you?",
      "Which sessions or exhibitors are you most interested in?",
      "Do you have any accessibility or dietary requirements?",
      "Should we send your pass and schedule on WhatsApp?",
    ],
    integrations: ["Ticketing and registration platforms", "CRM", "WhatsApp Business", "Calendar"],
    outcomes: [
      "Registrants confirmed and reminded personally",
      "Schedule changes communicated quickly",
      "Exhibitor and sponsor follow-ups handled consistently",
    ],
    compliance: [
      "Event communications are sent with consent, and attendees can opt out of future event messages.",
      "Feedback calls are short, optional and can be declined.",
    ],
    faqs: [
      {
        question: "Can it call thousands of registrants?",
        answer: "Yes. The campaign manager lets you run large batches within your calling windows.",
      },
      {
        question: "Can it handle exhibitors and sponsors?",
        answer: "Yes. Use a separate flow with its own questions and handoff to your partnerships team.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about event outreach",
  },
  {
    category: "industries",
    slug: "logistics-utilities",
    name: "Logistics & utilities",
    icon: "truck",
    summary: "Confirm deliveries and service visits, and keep customers informed at scale.",
    headline: "Confirm every delivery and service visit before the truck rolls.",
    intro:
      "Failed deliveries and missed service visits cost fuel, time and goodwill. Reseny confirms addresses and availability in advance, reschedules automatically and keeps customers informed during disruptions.",
    painPoints: [
      {
        title: "Failed first attempts",
        body: "Wrong addresses and unavailable customers lead to repeat trips and unhappy customers.",
      },
      {
        title: "Call spikes at billing time",
        body: "Predictable peaks in billing and outage queries swamp support lines.",
      },
      {
        title: "Notifying many customers fast",
        body: "During disruptions, you need to reach thousands of people in their own language.",
      },
    ],
    sampleCall: {
      id: "logistics-utilities",
      title: "Logistics",
      scenario: "Delivery slot confirmation",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Imran, this is an AI assistant from SwiftLine Logistics. Your parcel is scheduled for delivery tomorrow. Can I confirm the details?" },
        { speaker: "lead", text: "Okay." },
        { speaker: "agent", text: "Will someone be available at the delivery address between 10 AM and 2 PM?" },
        { speaker: "lead", text: "I'm only free after four." },
        { speaker: "agent", text: "No problem. I've moved it to the 4 to 7 PM window. Is the landmark in your address still correct?" },
        { speaker: "lead", text: "Yes, it is." },
        { speaker: "agent", text: "Thank you. You'll get a tracking link on WhatsApp." },
      ],
      outcome: "Slot rescheduled · tracking link sent",
    },
    workflow: [
      { title: "Shipment or visit is scheduled", body: "Triggered from your dispatch or ticketing system." },
      { title: "Reseny confirms", body: "Address, landmark and availability window." },
      { title: "Reschedules automatically", body: "Moves the slot and updates the system." },
      { title: "Proactive updates", body: "Calls and messages for delays, outages or completed visits." },
    ],
    agentQuestions: [
      "Is the delivery or service address correct, including the landmark?",
      "Which time window suits you?",
      "Is there an alternate contact person?",
      "Would you like a tracking link on WhatsApp?",
    ],
    integrations: ["Transport and dispatch systems", "Ticketing and billing systems", "WhatsApp Business and SMS", "Calendar"],
    outcomes: [
      "Fewer failed first attempts",
      "Predictable call peaks absorbed",
      "Customers informed quickly during disruptions",
    ],
    compliance: [
      "Service and transactional calls are configured separately from promotional ones and respect calling windows.",
      "Customers can ask for a human or opt out of non-essential messages.",
    ],
    faqs: [
      {
        question: "Can it update our dispatch system?",
        answer: "Yes. Confirmed or rescheduled slots can be written back through integrations or webhooks.",
      },
      {
        question: "Can it handle utility billing reminders?",
        answer: "Yes. Reminder flows follow your calling windows and escalate disputes to a person.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about delivery confirmation",
  },
  {
    category: "industries",
    slug: "government-ngo",
    name: "Government-linked & NGOs",
    icon: "hand-heart",
    summary: "Reach citizens, donors and volunteers in their own language, at scale.",
    headline: "Reach every citizen, donor and volunteer in their own language.",
    intro:
      "Outreach programmes cover large, multilingual populations with small teams. Reseny runs respectful, consent-led calls to share information, register volunteers and follow up with donors.",
    painPoints: [
      {
        title: "Large lists, small teams",
        body: "Volunteer coordinators cannot personally call every person on the list.",
      },
      {
        title: "Language diversity",
        body: "Programmes serve communities who speak many languages, and a single-language call centre misses many of them.",
      },
      {
        title: "Follow-up gaps",
        body: "Sign-ups, donor thank-yous and scheme reminders are delayed or forgotten.",
      },
    ],
    sampleCall: {
      id: "government-ngo",
      title: "NGO outreach",
      scenario: "Volunteer sign-up follow-up",
      language: "English",
      lines: [
        { speaker: "agent", text: "Hello Lakshmi, this is an AI assistant from the Helping Hands Foundation. You signed up to volunteer. Do you have a minute?" },
        { speaker: "lead", text: "Yes." },
        { speaker: "agent", text: "Which days are you usually free, and which area would you like to help in: education, health or environment?" },
        { speaker: "lead", text: "Weekends, mostly education." },
        { speaker: "agent", text: "Wonderful. Our coordinator will call you on Monday with the next steps. Is that all right?" },
        { speaker: "lead", text: "That's fine." },
      ],
      outcome: "Volunteer registered · coordinator call scheduled",
    },
    workflow: [
      { title: "List or sign-up arrives", body: "From a form, campaign or uploaded list with consent." },
      { title: "Reseny calls in the right language", body: "Shares information, answers common questions and records interest." },
      { title: "Registers and routes", body: "Sign-ups go to the right coordinator or department." },
      { title: "Reminders and updates", body: "Event and scheme reminders, and thank-you calls for donors." },
    ],
    agentQuestions: [
      "Which language would you prefer for this call?",
      "Which programme or area are you interested in?",
      "Which days and times suit you?",
      "Do you consent to be contacted about this?",
    ],
    integrations: ["Donor and volunteer databases", "CRM", "WhatsApp Business and SMS", "Calendar"],
    outcomes: [
      "More people reached with a small team",
      "Outreach delivered in each person's language",
      "Follow-ups delivered on time",
    ],
    compliance: [
      "Public-sector and grant-funded programmes can have hosting and data-residency requirements: see the Trust Center and talk to us about deployment options.",
      "Calls are consent-led, identify the AI, and respect opt-outs.",
    ],
    faqs: [
      {
        question: "Can it be deployed privately?",
        answer: "Private deployment options exist for organisations with data-residency needs. See Data Residency and Deployment on the Trust Center.",
      },
      {
        question: "Can it run helpline-style calls?",
        answer: "It can answer common questions and route anything sensitive to a trained person, with a full summary.",
      },
      ...SHARED_FAQS,
    ],
    ctaLabel: "Get a call about outreach",
  },
];
