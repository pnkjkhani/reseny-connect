/**
 * ROI estimator behind the pricing-page calculator (SOP §7.4: leads per month,
 * current response time, average deal value → a projected recovered-revenue estimate,
 * clearly labelled as an estimate).
 *
 * The model is deliberately simple and fully visible to the visitor:
 *
 *   extra leads reached = leads × (contact rate with Reseny − contact rate today)
 *   extra customers     = extra leads reached × close rate
 *   extra revenue       = extra customers × average deal value
 *
 * TODO(content): the default rates below are ILLUSTRATIVE placeholders so the tool
 * works before pilots finish. The UI shows them as editable assumptions and says so.
 * Replace them with measured pilot data as soon as you have it.
 */

export type ResponseTime = "under-5-min" | "under-1-hour" | "same-day" | "next-day" | "no-follow-up";

export const RESPONSE_TIME_OPTIONS: { value: ResponseTime; label: string }[] = [
  { value: "under-5-min", label: "Within 5 minutes" },
  { value: "under-1-hour", label: "Within an hour" },
  { value: "same-day", label: "Later the same day" },
  { value: "next-day", label: "The next day or later" },
  { value: "no-follow-up", label: "We often don't follow up" },
];

/** Share of leads that end up reached, by how quickly you respond today (illustrative). */
export const CONTACT_RATE_BY_RESPONSE_TIME: Record<ResponseTime, number> = {
  "under-5-min": 0.8,
  "under-1-hour": 0.65,
  "same-day": 0.5,
  "next-day": 0.35,
  "no-follow-up": 0.25,
};

export const DEFAULT_RESENY_CONTACT_RATE = 0.85;
export const DEFAULT_CLOSE_RATE = 0.1;

export interface RoiInput {
  leadsPerMonth: number;
  dealValue: number;
}

export interface RoiAssumptions {
  /** 0–1: share of leads reached today. */
  currentContactRate: number;
  /** 0–1: share of leads reached with instant calling and follow-up. */
  resenyContactRate: number;
  /** 0–1: share of reached leads that become customers. */
  closeRate: number;
}

export interface RoiResult {
  extraLeadsReached: number;
  extraCustomers: number;
  monthlyRevenue: number;
  annualRevenue: number;
}

const clamp = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

export function assumptionsFor(responseTime: ResponseTime): RoiAssumptions {
  return {
    currentContactRate: CONTACT_RATE_BY_RESPONSE_TIME[responseTime],
    resenyContactRate: DEFAULT_RESENY_CONTACT_RATE,
    closeRate: DEFAULT_CLOSE_RATE,
  };
}

export function calculateRoi(input: RoiInput, assumptions: RoiAssumptions): RoiResult {
  const leads = clamp(input.leadsPerMonth, 0, 10_000_000);
  const dealValue = clamp(input.dealValue, 0, 10_000_000_000);
  const current = clamp(assumptions.currentContactRate, 0, 1);
  const withReseny = clamp(assumptions.resenyContactRate, 0, 1);
  const closeRate = clamp(assumptions.closeRate, 0, 1);

  // Reseny can only help if it reaches more people than you do today.
  const extraLeadsReached = leads * Math.max(0, withReseny - current);
  const extraCustomers = extraLeadsReached * closeRate;
  const monthlyRevenue = extraCustomers * dealValue;
  return {
    extraLeadsReached,
    extraCustomers,
    monthlyRevenue,
    annualRevenue: monthlyRevenue * 12,
  };
}
