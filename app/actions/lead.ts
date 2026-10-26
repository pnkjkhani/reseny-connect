"use server";

import { headers } from "next/headers";
import { LeadDeliveryError, deliverLead } from "@/lib/leads/deliver";
import { leadSchema, toFieldErrors } from "@/lib/leads/schema";

export type LeadActionResult =
  | { ok: true; id: string }
  | { ok: false; error: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; error: "unavailable"; message: string };

const UNAVAILABLE_MESSAGE =
  "We couldn't send your request just now. Please try again in a moment, or contact us directly.";

/**
 * Single entry point for every form on the site. Validates on the server (the client
 * checks are only for UX), then hands the lead to `deliverLead`.
 */
export async function submitLead(input: unknown): Promise<LeadActionResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", fieldErrors: toFieldErrors(parsed.error) };
  }

  // Honeypot tripped: pretend it worked so bots learn nothing, and deliver nothing.
  if (parsed.data.company_url) {
    return { ok: true, id: "ignored" };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");

  try {
    const { id } = await deliverLead(parsed.data, {
      ip: forwardedFor?.split(",")[0]?.trim() || undefined,
      userAgent: requestHeaders.get("user-agent") ?? undefined,
    });
    return { ok: true, id };
  } catch (error) {
    if (error instanceof LeadDeliveryError) {
      return { ok: false, error: "unavailable", message: UNAVAILABLE_MESSAGE };
    }
    console.error("[leads] unexpected failure", error);
    return { ok: false, error: "unavailable", message: UNAVAILABLE_MESSAGE };
  }
}
