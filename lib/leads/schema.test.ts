import { describe, expect, it } from "vitest";
import { bookDemoSchema, callNowSchema, contactSchema, leadSchema, newsletterSchema, toFieldErrors } from "./schema";

const bookDemo = {
  intent: "book_demo" as const,
  name: "Rohit Sharma",
  phone: "+91 98765 43210",
  email: "rohit@example.com",
  consent: true,
  company: "Skyline Homes",
  industry: "real-estate",
  teamSize: "11-50",
  monthlyLeads: "100-500",
  goal: "sales",
  language: "english",
  slot: { start: "2026-10-27T04:30:00.000Z", label: "Tue, 27 Oct, 10:00 AM IST" },
  aiQualifyCall: true,
};

describe("callNowSchema", () => {
  it("normalises the phone number and keeps optional fields optional", () => {
    const result = callNowSchema.safeParse({ intent: "call_now", phone: "+91 98765 43210", consent: true });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.phone).toBe("+919876543210");
  });

  it("requires consent and a valid number, with friendly messages", () => {
    const result = callNowSchema.safeParse({ intent: "call_now", phone: "12345", consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(errors.phone).toMatch(/valid mobile number/i);
      expect(errors.consent).toMatch(/tick the box/i);
    }
  });
});

describe("bookDemoSchema", () => {
  it("accepts a complete booking", () => {
    expect(bookDemoSchema.safeParse(bookDemo).success).toBe(true);
  });

  it("flags a missing time slot on the slot field", () => {
    const result = bookDemoSchema.safeParse({ ...bookDemo, slot: undefined });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).slot).toBe("Pick a time that suits you");
  });

  it("rejects an invalid email", () => {
    const result = bookDemoSchema.safeParse({ ...bookDemo, email: "nope" });
    expect(result.success).toBe(false);
    if (!result.success) expect(toFieldErrors(result.error).email).toMatch(/valid email/i);
  });
});

describe("contactSchema", () => {
  const base = { intent: "contact" as const, topic: "sales", name: "Meera Iyer", email: "meera@example.com", message: "Interested in a pilot.", consent: true };

  it("treats the phone number as optional", () => {
    expect(contactSchema.safeParse({ ...base, phone: "" }).success).toBe(true);
    expect(contactSchema.safeParse(base).success).toBe(true);
  });

  it("still validates a phone number when one is given", () => {
    expect(contactSchema.safeParse({ ...base, phone: "12345" }).success).toBe(false);
  });
});

describe("leadSchema", () => {
  it("routes by intent and rejects unknown intents", () => {
    expect(leadSchema.safeParse({ intent: "newsletter", email: "a@b.co", consent: true }).success).toBe(true);
    expect(leadSchema.safeParse({ intent: "wire_transfer", email: "a@b.co", consent: true }).success).toBe(false);
  });

  it("accepts a filled honeypot so the server action can swallow it silently", () => {
    const result = newsletterSchema.safeParse({ intent: "newsletter", email: "a@b.co", consent: true, company_url: "http://spam.example" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.company_url).toBe("http://spam.example");
  });
});

describe("toFieldErrors", () => {
  it("keeps only the first message per field", () => {
    const result = newsletterSchema.safeParse({ intent: "newsletter", email: "", consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = toFieldErrors(result.error);
      expect(Object.keys(errors).sort()).toEqual(["consent", "email"]);
    }
  });
});
