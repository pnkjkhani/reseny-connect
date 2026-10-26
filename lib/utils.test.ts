import { describe, expect, it } from "vitest";
import { cn, formatClock, formatINR, jsonLdString, truncate } from "./utils";

describe("cn", () => {
  it("merges classes and lets the last Tailwind utility win", () => {
    expect(cn("p-2 text-sm", "p-4")).toBe("text-sm p-4");
    expect(cn("px-2", false && "hidden", undefined, "py-1")).toBe("px-2 py-1");
  });
});

describe("formatINR", () => {
  it("uses Indian digit grouping and no decimals", () => {
    expect(formatINR(375_000).replace(/\s/g, "")).toBe("₹3,75,000");
    expect(formatINR(1234.56).replace(/\s/g, "")).toBe("₹1,235");
  });
});

describe("formatClock", () => {
  it("formats seconds as mm:ss", () => {
    expect(formatClock(65)).toBe("01:05");
    expect(formatClock(-3)).toBe("00:00");
  });
});

describe("truncate", () => {
  it("leaves short text alone", () => {
    expect(truncate("short text", 50)).toBe("short text");
  });

  it("cuts at a word boundary and adds an ellipsis within the limit", () => {
    const result = truncate("one two three four five six seven", 20);
    expect(result.endsWith("…")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(20);
    expect(result).not.toMatch(/\s…$/);
  });
});

describe("jsonLdString", () => {
  it("escapes < so structured data can never close the script tag", () => {
    const output = jsonLdString({ name: "</script><script>alert(1)</script>" });
    expect(output).not.toContain("<");
    expect(JSON.parse(output).name).toBe("</script><script>alert(1)</script>");
  });
});
