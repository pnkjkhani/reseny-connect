import { describe, expect, it } from "vitest";
import { CONTACT_RATE_BY_RESPONSE_TIME, assumptionsFor, calculateRoi } from "./roi";

describe("calculateRoi", () => {
  it("follows the documented formula", () => {
    // 300 leads × (85% − 35%) = 150 extra reached → ×10% close = 15 customers → ×₹25,000 = ₹3,75,000
    const result = calculateRoi({ leadsPerMonth: 300, dealValue: 25_000 }, assumptionsFor("next-day"));
    expect(result.extraLeadsReached).toBeCloseTo(150);
    expect(result.extraCustomers).toBeCloseTo(15);
    expect(result.monthlyRevenue).toBeCloseTo(375_000);
    expect(result.annualRevenue).toBeCloseTo(4_500_000);
  });

  it("shows no uplift for someone who already responds fastest", () => {
    const base = assumptionsFor("under-5-min");
    const result = calculateRoi({ leadsPerMonth: 300, dealValue: 25_000 }, { ...base, currentContactRate: 0.9, resenyContactRate: 0.85 });
    expect(result.monthlyRevenue).toBe(0);
  });

  it("never returns negative or non-finite numbers for hostile input", () => {
    const result = calculateRoi({ leadsPerMonth: -50, dealValue: Number.NaN }, assumptionsFor("same-day"));
    expect(result).toEqual({ extraLeadsReached: 0, extraCustomers: 0, monthlyRevenue: 0, annualRevenue: 0 });
  });

  it("clamps rates to 0-100%", () => {
    const result = calculateRoi(
      { leadsPerMonth: 100, dealValue: 1000 },
      { currentContactRate: -2, resenyContactRate: 5, closeRate: 3 },
    );
    expect(result.extraLeadsReached).toBe(100); // 100 × (1 − 0)
    expect(result.extraCustomers).toBe(100); // × 1
  });
});

describe("response-time assumptions", () => {
  it("get worse the slower you respond", () => {
    const rates = ["under-5-min", "under-1-hour", "same-day", "next-day", "no-follow-up"] as const;
    for (let i = 1; i < rates.length; i++) {
      expect(CONTACT_RATE_BY_RESPONSE_TIME[rates[i]]).toBeLessThan(CONTACT_RATE_BY_RESPONSE_TIME[rates[i - 1]]);
    }
  });
});
