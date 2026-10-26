/**
 * Vendor-neutral event tracking for the success metrics in SOP §12 (visitor-to-demo
 * rate, "Get a call now" completion, bounce, and so on).
 *
 * Events are pushed to `window.dataLayer`. If `NEXT_PUBLIC_GTM_ID` is set, Google Tag
 * Manager (loaded in `components/analytics.tsx`) picks them up, and GA4, Meta, LinkedIn
 * etc. can be wired in GTM without touching the code. With no GTM id this is a no-op.
 */

type EventValue = string | number | boolean | undefined;
export type EventParams = Record<string, EventValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ??= []).push({ event, ...params });
}

/** Named events used across the site. Keep names stable: dashboards depend on them. */
export const events = {
  ctaClick: "cta_click",
  leadSubmit: "lead_submit",
  leadError: "lead_error",
  demoLoaded: "demo_embed_loaded",
  sampleCallPlay: "sample_call_play",
  roiCalculated: "roi_calculated",
  exitIntentShown: "exit_intent_shown",
  bookingStep: "booking_step",
  thankYouView: "generate_lead",
} as const;
