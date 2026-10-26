/**
 * First-touch campaign attribution for the current browser session (SOP §6.2: "the
 * lead is stored in your CRM with its source page and campaign tags").
 *
 * Stored in sessionStorage only, so it disappears when the tab closes. Browser-only:
 * every function is a no-op on the server.
 */

const STORAGE_KEY = "reseny:attribution";
const TRACKED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof TRACKED_PARAMS)[number], string>> & {
  /** Page the form was submitted from. */
  page?: string;
  /** First page of the session (where the visitor landed). */
  landingPage?: string;
  referrer?: string;
};

function readStored(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Remember the campaign tags and referrer the visitor arrived with (first touch wins). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const captured: Attribution = {};
    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value) captured[key] = value.slice(0, 200);
    }
    if (document.referrer) {
      const referrer = new URL(document.referrer);
      // Same-site navigation is not an acquisition source.
      if (referrer.host !== window.location.host) captured.referrer = referrer.origin + referrer.pathname;
    }
    captured.landingPage = window.location.pathname;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // Storage blocked or malformed referrer: attribution is best-effort.
  }
}

/** Attribution to attach to a submission: stored first touch plus the page being submitted from. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return { ...readStored(), page: window.location.pathname };
}
