"use client";

import { useCallback, useState } from "react";
import { submitLead, type LeadActionResult } from "@/app/actions/lead";
import { events, trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import type { LeadInput } from "@/lib/leads/schema";

const GENERIC_ERROR =
  "We couldn't send your request just now. Please try again in a moment, or contact us directly.";

/**
 * Sends a lead through the server action with campaign attribution attached, tracks the
 * outcome, and exposes pending/error state for the form UI.
 */
export function useLeadSubmit() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (payload: LeadInput): Promise<LeadActionResult> => {
    setPending(true);
    setError(null);
    try {
      const result = await submitLead({ ...payload, attribution: getAttribution() });
      if (result.ok) {
        trackEvent(events.leadSubmit, { intent: payload.intent, source: payload.source });
      } else {
        trackEvent(events.leadError, { intent: payload.intent, reason: result.error });
        if (result.error === "unavailable") setError(result.message);
      }
      return result;
    } catch {
      trackEvent(events.leadError, { intent: payload.intent, reason: "exception" });
      setError(GENERIC_ERROR);
      return { ok: false, error: "unavailable", message: GENERIC_ERROR };
    } finally {
      setPending(false);
    }
  }, []);

  return { submit, pending, error, clearError: () => setError(null) };
}
