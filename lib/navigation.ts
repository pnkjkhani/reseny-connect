import type { IconName } from "@/components/ui/icon";
import { products } from "./content/products";
import { resourceLinks } from "./content/resources";
import { industries, solutionHref, teams, useCases } from "./content/solutions";
import { legalDocs, trustPages } from "./content/trust";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
  /** Render the links in two columns (long lists). */
  twoColumns?: boolean;
  /** Link shown under the group, e.g. "View all". */
  all?: NavLink;
}

export interface NavItem {
  label: string;
  /** Page this item links to. Items without `groups` are plain links. */
  href?: string;
  groups?: NavGroup[];
  /** Highlighted card at the end of a mega-menu. */
  feature?: { title: string; body: string; cta: NavLink };
}

/** Main navigation: seven items, as the brand SOP requires (the seventh is the Book a Demo button). */
export const mainNav: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    groups: [
      {
        title: "Platform",
        twoColumns: true,
        links: [
          { label: "Product overview", href: "/product", description: "The lead-to-appointment engine", icon: "workflow" },
          ...products.map((product) => ({
            label: product.name,
            href: `/product/${product.slug}`,
            description: product.summary,
            icon: product.icon,
          })),
        ],
      },
    ],
    feature: {
      title: "See it work on your own phone",
      body: "Get a call from Reseny and hear how an AI agent qualifies and books.",
      cta: { label: "Get a call now", href: "/get-a-call" },
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        title: "By industry",
        twoColumns: true,
        links: industries.map((industry) => ({
          label: industry.name,
          href: solutionHref(industry),
          icon: industry.icon,
        })),
      },
      {
        title: "By use case",
        links: useCases.map((useCase) => ({
          label: useCase.name,
          href: solutionHref(useCase),
          icon: useCase.icon,
        })),
      },
      {
        title: "By team size",
        links: [
          ...teams.map((team) => ({ label: team.name, href: solutionHref(team), icon: team.icon })),
          { label: "Agencies and resellers", href: "/solutions/agencies", icon: "handshake" as const },
        ],
        all: { label: "All solutions", href: "/solutions" },
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/resources",
    groups: [
      {
        title: "Learn",
        links: resourceLinks.map((link) => ({
          label: link.title,
          href: link.href,
          description: link.body,
          icon: link.icon,
        })),
      },
    ],
  },
  {
    label: "Trust",
    href: "/trust",
    groups: [
      {
        title: "Trust Center",
        links: [
          { label: "Trust overview", href: "/trust", description: "Our promises, in plain language", icon: "shield-check" },
          ...trustPages.map((page) => ({
            label: page.title,
            href: `/trust/${page.slug}`,
            description: page.summary,
            icon: page.icon,
          })),
          { label: "System status", href: "/trust/status", description: "Service availability", icon: "activity" },
        ],
      },
      {
        title: "Legal",
        links: legalDocs.map((doc) => ({
          label: doc.title,
          href: `/legal/${doc.slug}`,
          icon: "file-text" as const,
        })),
      },
    ],
  },
  {
    label: "Company",
    href: "/company",
    groups: [
      {
        title: "Reseny Business Mercantech",
        links: [
          { label: "About us", href: "/company", description: "An initiative by Astransys Group", icon: "building-2" },
          { label: "Mission and vision", href: "/company/mission-vision", description: "What we are building and why", icon: "target" },
          { label: "Services", href: "/services", description: "Done-for-you setup, custom agents and more", icon: "wand-sparkles" },
          { label: "Partner programme", href: "/solutions/agencies", description: "For agencies and resellers", icon: "handshake" },
          { label: "Contact us", href: "/company/contact", description: "Sales, support and partnerships", icon: "mail" },
        ],
      },
    ],
  },
];

export const headerCtas = {
  primary: { label: "Book a demo", href: "/book-a-demo" },
  secondary: { label: "Get a call now", href: "/get-a-call" },
} as const;

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Product overview", href: "/product" },
      ...products
        .filter((product) =>
          ["ai-voice-agent", "lead-qualification", "follow-up-cadence", "appointment-booking", "multilingual-voice", "integrations"].includes(product.slug),
        )
        .map((product) => ({ label: product.name, href: `/product/${product.slug}` })),
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      ...industries.slice(0, 8).map((industry) => ({ label: industry.name, href: solutionHref(industry) })),
      { label: "All industries and use cases", href: "/solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      ...resourceLinks.map((link) => ({ label: link.title, href: link.href })),
      { label: "ROI calculator", href: "/pricing/roi-calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/company" },
      { label: "Mission and vision", href: "/company/mission-vision" },
      { label: "Services", href: "/services" },
      { label: "Partner programme", href: "/solutions/agencies" },
      { label: "Contact us", href: "/company/contact" },
      { label: "Start a free pilot", href: "/start-pilot" },
    ],
  },
  {
    title: "Trust and legal",
    links: [
      { label: "Trust Center", href: "/trust" },
      ...trustPages.map((page) => ({ label: page.title, href: `/trust/${page.slug}` })),
      { label: "System status", href: "/trust/status" },
      ...legalDocs.map((doc) => ({ label: doc.title, href: `/legal/${doc.slug}` })),
    ],
  },
];
