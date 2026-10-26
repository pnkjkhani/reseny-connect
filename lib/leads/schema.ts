import * as z from "zod/mini";
import { normalizePhone } from "./phone";

/**
 * Validation shared by the browser (inline errors) and the server action (the real
 * gate: never trust the client). Field schemas are defined once and composed per form.
 *
 * Uses `zod/mini`, Zod's tree-shakeable API: the forms run this in the browser, and the
 * full `zod` build would add roughly 30 KB (gzipped) to every page that has a form.
 */

export const LEAD_INTENTS = [
  "call_now",
  "book_demo_partial",
  "book_demo",
  "pilot",
  "contact",
  "guide_request",
  "newsletter",
] as const;
export type LeadIntent = (typeof LEAD_INTENTS)[number];

const text = (max: number) => z.string().check(z.trim(), z.maxLength(max));

const fields = {
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your name"), z.maxLength(100)),
  optionalName: z.optional(text(100)),
  phone: z.pipe(
    z.string().check(
      z.trim(),
      z.minLength(1, "Enter your mobile number"),
      z.refine((value) => normalizePhone(value) !== null, "Enter a valid mobile number, e.g. 98765 43210"),
    ),
    z.transform((value) => normalizePhone(value) as string),
  ),
  email: z.email("Enter a valid email address").check(z.maxLength(200)),
  company: z.string().check(z.trim(), z.minLength(2, "Enter your company name"), z.maxLength(150)),
  industry: z.string().check(z.trim(), z.minLength(1, "Choose your industry"), z.maxLength(80)),
  teamSize: z.string().check(z.trim(), z.minLength(1, "Choose your team size"), z.maxLength(40)),
  monthlyLeads: z.string().check(z.trim(), z.minLength(1, "Choose your monthly volume"), z.maxLength(40)),
  goal: z.string().check(z.trim(), z.minLength(1, "Choose what you want to achieve"), z.maxLength(80)),
  optionalText: z.optional(text(500)),
  language: z.optional(text(40)),
  message: z.string().check(z.trim(), z.minLength(10, "Tell us a little more (at least 10 characters)"), z.maxLength(2000)),
  topic: z.string().check(z.trim(), z.minLength(1, "Choose a topic"), z.maxLength(40)),
  consent: z.boolean().check(z.refine((value) => value === true, "Please tick the box to continue")),
};

const slotSchema = z.object(
  {
    start: z.string().check(z.minLength(1), z.maxLength(40)),
    label: z.string().check(z.minLength(1), z.maxLength(80)),
  },
  { error: "Pick a time that suits you" },
);

const attributionSchema = z.partial(
  z.object({
    page: text(300),
    landingPage: text(300),
    referrer: text(500),
    utm_source: text(200),
    utm_medium: text(200),
    utm_campaign: text(200),
    utm_term: text(200),
    utm_content: text(200),
    gclid: text(300),
    fbclid: text(300),
  }),
);

/** Metadata every submission carries. */
const common = {
  language: fields.language,
  /** Where on the site the form lives, e.g. "home-hero", "solutions:real-estate". */
  source: z.optional(text(100)),
  attribution: z.optional(attributionSchema),
  /** Client-generated id so a partial and its completed submission can be merged downstream. */
  leadKey: z.optional(text(64)),
  /**
   * Honeypot: hidden from people, irresistible to bots. It must be accepted here (not rejected) so
   * the server action can swallow the submission silently instead of telling the bot it failed.
   */
  company_url: z.optional(z.string().check(z.maxLength(500))),
};

/* Booking form: one schema per step, composed into the full submission. */
export const bookDemoStep1 = z.object({
  name: fields.name,
  phone: fields.phone,
  email: fields.email,
  consent: fields.consent,
});
export const bookDemoStep2 = z.object({
  company: fields.company,
  industry: fields.industry,
  teamSize: fields.teamSize,
  monthlyLeads: fields.monthlyLeads,
  currentTools: fields.optionalText,
});
export const bookDemoStep3 = z.object({
  goal: fields.goal,
  language: fields.language,
  slot: slotSchema,
  aiQualifyCall: z.boolean(),
});

export const callNowSchema = z.object({
  intent: z.literal("call_now"),
  name: fields.optionalName,
  phone: fields.phone,
  consent: fields.consent,
  industry: z.optional(text(80)),
  ...common,
});

export const bookDemoPartialSchema = z.object({
  intent: z.literal("book_demo_partial"),
  ...bookDemoStep1.shape,
  ...common,
});

export const bookDemoSchema = z.object({
  intent: z.literal("book_demo"),
  ...bookDemoStep1.shape,
  ...bookDemoStep2.shape,
  ...bookDemoStep3.shape,
  ...common,
});

export const pilotSchema = z.object({
  intent: z.literal("pilot"),
  name: fields.name,
  phone: fields.phone,
  email: fields.email,
  company: fields.company,
  industry: fields.industry,
  monthlyLeads: fields.monthlyLeads,
  goal: fields.goal,
  notes: fields.optionalText,
  consent: fields.consent,
  ...common,
});

export const contactSchema = z.object({
  intent: z.literal("contact"),
  topic: fields.topic,
  name: fields.name,
  email: fields.email,
  phone: z.optional(z.union([z.literal(""), fields.phone])),
  company: z.optional(text(150)),
  message: fields.message,
  consent: fields.consent,
  ...common,
});

export const guideRequestSchema = z.object({
  intent: z.literal("guide_request"),
  email: fields.email,
  topic: z.optional(text(120)),
  consent: fields.consent,
  ...common,
});

export const newsletterSchema = z.object({
  intent: z.literal("newsletter"),
  email: fields.email,
  consent: fields.consent,
  ...common,
});

export const leadSchema = z.discriminatedUnion("intent", [
  callNowSchema,
  bookDemoPartialSchema,
  bookDemoSchema,
  pilotSchema,
  contactSchema,
  guideRequestSchema,
  newsletterSchema,
]);

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

interface IssueLike {
  path: readonly PropertyKey[];
  message: string;
}

/** Flatten a Zod error into `{ fieldName: firstMessage }` for inline display. */
export function toFieldErrors(error: { issues: readonly IssueLike[] }): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!(key in result)) result[key] = issue.message;
  }
  return result;
}
