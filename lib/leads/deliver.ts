import "server-only";
import { siteConfig } from "@/lib/site";
import type { Lead } from "./schema";

/**
 * Hands a validated lead to your systems.
 *
 * Production: POSTs JSON to `LEADS_WEBHOOK_URL` (CRM, Zapier/Make/n8n, or the Reseny
 * platform's lead-intake endpoint), optionally with `Authorization: Bearer
 * $LEADS_WEBHOOK_SECRET`. The receiver is what actually creates the CRM record,
 * places the AI call and sends confirmations (SOP §6.2 and §9.2).
 *
 * SECURITY: "call me now" lets any visitor type any phone number. Before enabling
 * automatic dialling at the receiver, add OTP verification or a captcha, and
 * per-number and per-IP rate limits there. Consent on this form is not proof that the
 * number belongs to the person who typed it.
 */

export interface LeadRequestMeta {
  ip?: string;
  userAgent?: string;
}

export interface DeliveredLead {
  id: string;
}

export class LeadDeliveryError extends Error {
  constructor(
    message: string,
    readonly reason: "not_configured" | "rejected" | "unreachable",
  ) {
    super(message);
    this.name = "LeadDeliveryError";
  }
}

const WEBHOOK_TIMEOUT_MS = 8_000;

function getWebhookUrl(): URL | null {
  const raw = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

export async function deliverLead(lead: Lead, meta: LeadRequestMeta): Promise<DeliveredLead> {
  const id = crypto.randomUUID();
  // The honeypot is only for the server action to inspect; it is never forwarded.
  const fields = { ...lead };
  delete fields.company_url;
  const payload = {
    id,
    receivedAt: new Date().toISOString(),
    site: siteConfig.url,
    ...fields,
    meta,
  };

  const url = getWebhookUrl();
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      console.error("[leads] LEADS_WEBHOOK_URL is not set (or invalid): lead was NOT delivered", { id, intent: lead.intent });
      throw new LeadDeliveryError("Lead webhook is not configured", "not_configured");
    }
    console.info("[leads] LEADS_WEBHOOK_URL not set: logging lead instead (development only)\n", JSON.stringify(payload, null, 2));
    return { id };
  }

  const secret = process.env.LEADS_WEBHOOK_SECRET?.trim();
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[leads] webhook unreachable", { id, intent: lead.intent, error: String(error) });
    throw new LeadDeliveryError("Lead webhook unreachable", "unreachable");
  }

  if (!response.ok) {
    console.error("[leads] webhook rejected lead", { id, intent: lead.intent, status: response.status });
    throw new LeadDeliveryError(`Lead webhook responded ${response.status}`, "rejected");
  }
  return { id };
}
