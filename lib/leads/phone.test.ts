import { describe, expect, it } from "vitest";
import { composePhone, maskPhone, normalizePhone } from "./phone";

describe("composePhone", () => {
  it("prefixes the selected dial code and drops spaces and a trunk zero", () => {
    expect(composePhone("+91", "98765 43210")).toBe("+919876543210");
    expect(composePhone("+91", "098765 43210")).toBe("+919876543210");
  });

  it("lets a pasted international number win over the selected country", () => {
    expect(composePhone("+91", "+44 20 7946 0958")).toBe("+44 20 7946 0958");
    expect(composePhone("+91", "0044 20 7946 0958")).toBe("+44 20 7946 0958");
  });

  it("does not double the Indian country code when it is already typed", () => {
    expect(composePhone("+91", "919876543210")).toBe("+919876543210");
  });
});

describe("normalizePhone", () => {
  it("returns E.164 for valid numbers", () => {
    expect(normalizePhone("+91 98765-43210")).toBe("+919876543210");
    expect(normalizePhone("+44 (20) 7946 0958")).toBe("+442079460958");
    expect(normalizePhone("0091 98765 43210")).toBe("+919876543210");
  });

  it("rejects Indian numbers that are not valid mobiles", () => {
    expect(normalizePhone("+915876543210")).toBeNull(); // mobiles start 6-9
    expect(normalizePhone("+91987654321")).toBeNull(); // 9 digits
    expect(normalizePhone("+9198765432101")).toBeNull(); // 11 digits
  });

  it("rejects numbers without a country code or with an impossible length", () => {
    expect(normalizePhone("9876543210")).toBeNull();
    expect(normalizePhone("+1234")).toBeNull();
    expect(normalizePhone("+1234567890123456")).toBeNull();
    expect(normalizePhone("not a number")).toBeNull();
  });
});

describe("maskPhone", () => {
  it("keeps the country code and last digits only", () => {
    expect(maskPhone("+919876543210")).toBe("+91 98••• ••210");
  });
});
