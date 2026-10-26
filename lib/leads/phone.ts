export interface CountryCode {
  code: string;
  label: string;
  dial: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: "IN", label: "India", dial: "+91" },
  { code: "AE", label: "UAE", dial: "+971" },
  { code: "US", label: "US / Canada", dial: "+1" },
  { code: "GB", label: "UK", dial: "+44" },
  { code: "SG", label: "Singapore", dial: "+65" },
  { code: "AU", label: "Australia", dial: "+61" },
  { code: "SA", label: "Saudi Arabia", dial: "+966" },
  { code: "QA", label: "Qatar", dial: "+974" },
  { code: "NP", label: "Nepal", dial: "+977" },
  { code: "BD", label: "Bangladesh", dial: "+880" },
  { code: "LK", label: "Sri Lanka", dial: "+94" },
];

export const DEFAULT_DIAL_CODE = "+91";

const E164 = /^\+[1-9]\d{7,14}$/;
const INDIA_MOBILE = /^\+91[6-9]\d{9}$/;

/**
 * Combine a country dial code and whatever the visitor typed into one string for
 * validation. Pasted international numbers (`+44…` or `0044…`) win over the selected
 * country, and a pasted Indian number that already carries `91` is not doubled.
 */
export function composePhone(dial: string, national: string): string {
  const trimmed = national.trim();
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("00")) return `+${trimmed.slice(2)}`;
  const digits = trimmed.replace(/\D/g, "");
  if (dial === "+91" && digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return `${dial}${digits.replace(/^0+/, "")}`;
}

/**
 * Normalise to E.164 (`+919876543210`) or return null. Indian numbers must be valid
 * 10-digit mobiles (start 6–9); other countries get a generic length check.
 */
export function normalizePhone(raw: string): string | null {
  const cleaned = raw.trim().replace(/[\s().-]/g, "");
  const candidate = cleaned.startsWith("00") ? `+${cleaned.slice(2)}` : cleaned;
  if (!E164.test(candidate)) return null;
  if (candidate.startsWith("+91") && !INDIA_MOBILE.test(candidate)) return null;
  return candidate;
}

/** `+91 98••• ••210` style masking for display after submission. */
export function maskPhone(e164: string): string {
  if (e164.length < 8) return e164;
  return `${e164.slice(0, 3)} ${e164.slice(3, 5)}••• ••${e164.slice(-3)}`;
}
