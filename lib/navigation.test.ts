import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { features } from "@/lib/content/home";
import { resourceLinks } from "@/lib/content/resources";
import { solutionHref, allSolutions } from "@/lib/content/solutions";
import { footerColumns, headerCtas, mainNav, type NavItem } from "./navigation";
import { siteConfig } from "./site";

/** Every page the app can serve: the sitemap plus the deliberately unlisted ones. */
const validPaths = new Set<string>([
  ...sitemap().map((entry) => new URL(entry.url).pathname),
  ...["demo", "call", "pilot", "contact"].map((type) => `/thank-you/${type}`),
]);

const strip = (href: string) => href.split("#")[0].split("?")[0] || "/";

function navLinks(items: NavItem[]) {
  return items.flatMap((item) => [
    ...(item.href ? [item.href] : []),
    ...(item.groups ?? []).flatMap((group) => [...group.links.map((link) => link.href), ...(group.all ? [group.all.href] : [])]),
    ...(item.feature ? [item.feature.cta.href] : []),
  ]);
}

describe("internal links", () => {
  it("main navigation only links to pages that exist", () => {
    const missing = navLinks(mainNav).filter((href) => !validPaths.has(strip(href)));
    expect(missing).toEqual([]);
  });

  it("footer links only point at pages that exist", () => {
    const missing = footerColumns.flatMap((column) => column.links.map((link) => link.href)).filter((href) => !validPaths.has(strip(href)));
    expect(missing).toEqual([]);
  });

  it("header calls to action, feature tiles and resource links resolve", () => {
    const hrefs = [headerCtas.primary.href, headerCtas.secondary.href, ...features.map((f) => f.href), ...resourceLinks.map((r) => r.href)];
    expect(hrefs.filter((href) => !validPaths.has(strip(href)))).toEqual([]);
  });

  it("every solution page is in the sitemap", () => {
    for (const solution of allSolutions) expect(validPaths.has(solutionHref(solution))).toBe(true);
  });
});

describe("site configuration", () => {
  it("uses an absolute canonical URL", () => {
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });

  it("embeds the demo over HTTPS", () => {
    expect(new URL(siteConfig.demo.embedUrl).protocol).toBe("https:");
  });
});
