import { describe, expect, it } from "vitest";
import * as company from "./company";
import * as home from "./home";
import * as pricing from "./pricing";
import { products } from "./products";
import * as resources from "./resources";
import { allSolutions, industries, solutionCategories, teams, useCases } from "./solutions";
import * as trust from "./trust";

describe("solution pages", () => {
  it("covers the 16 sectors, 9 use cases and 3 team sizes from the brand SOP", () => {
    expect(industries).toHaveLength(16);
    expect(useCases).toHaveLength(9);
    expect(teams).toHaveLength(3);
  });

  it("has unique slugs within each category and unique sample-call ids overall", () => {
    for (const category of solutionCategories) {
      const slugs = allSolutions.filter((item) => item.category === category).map((item) => item.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
    const ids = allSolutions.map((item) => item.sampleCall.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(allSolutions.map((item) => [`${item.category}/${item.slug}`, item] as const))(
    "%s fills every section of the SOP §7.3 template",
    (_name, item) => {
      expect(item.painPoints.length).toBeGreaterThanOrEqual(3);
      expect(item.workflow.length).toBeGreaterThanOrEqual(4);
      expect(item.agentQuestions.length).toBeGreaterThanOrEqual(3);
      expect(item.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(item.compliance.length).toBeGreaterThanOrEqual(2);
      expect(item.faqs.length).toBeGreaterThanOrEqual(3);
      expect(item.headline.length).toBeGreaterThan(10);
      // A sample call must be a real two-sided conversation with a result.
      const speakers = new Set(item.sampleCall.lines.map((line) => line.speaker));
      expect(speakers).toEqual(new Set(["agent", "lead"]));
      expect(item.sampleCall.lines.length).toBeGreaterThanOrEqual(5);
      expect(item.sampleCall.outcome.length).toBeGreaterThan(5);
    },
  );
});

describe("product pages", () => {
  it("has unique slugs, and every related page exists", () => {
    const slugs = products.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(products).toHaveLength(11);
    for (const product of products) {
      for (const related of product.related) expect(slugs).toContain(related);
      expect(product.highlights.length).toBeGreaterThanOrEqual(3);
      expect(product.faqs.length).toBeGreaterThanOrEqual(2);
    }
  });
});

/**
 * The SOP: "only publish claims you can prove ... avoid copying competitor statistics" and
 * counters show "only real figures". Content must therefore not contain percentages or
 * multiplier claims. Add real, measured numbers deliberately (and update this test) once pilots finish.
 */
describe("no invented statistics", () => {
  const publicContent = {
    home: { ...home, outcomes: home.outcomes },
    pricing,
    trust,
    company,
    resources,
    industries,
    useCases,
    teams,
    products,
  };
  const text = JSON.stringify(publicContent);

  it("contains no percentage figures", () => {
    expect(text.match(/\d\s?%/g)).toBeNull();
  });

  it("contains no 'Nx faster/more' style multipliers", () => {
    expect(text.match(/\b\d+(\.\d+)?\s?(x|×)\s?(faster|more|higher|better|increase)/gi)).toBeNull();
  });

  it("ships outcome tiles without fabricated metrics", () => {
    for (const outcome of home.outcomes) expect(outcome.metric).toBeUndefined();
  });
});
