/**
 * Single source of truth for brand, URLs and contact details.
 *
 * Optional values come from `NEXT_PUBLIC_*` env vars (see `.env.example`) and are
 * omitted from the UI when unset, so the site never renders dead links or
 * invented contact details. Each variable is referenced literally so Next.js can
 * inline it into the client bundle.
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const whatsappDigits = clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "");

export const siteConfig = {
  name: "Reseny Connect",
  brand: "Reseny",
  company: "Reseny Business Mercantech",
  group: "Astransys Group",
  parentCompany: "Astransys Global Pvt Ltd",
  parentSince: 2017,
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.resenyconnect.com",
  tagline: "From lead to booked meeting, on autopilot.",
  description:
    "Reseny Connect is the AI calling agent that contacts every lead within seconds, qualifies them in their own language, follows up until they respond and books the appointment on your calendar.",
  /** Line required in the footer by the brand SOP. */
  initiativeLine: "Reseny is an initiative of Reseny Business Mercantech, part of Astransys Group.",
  heritageLine: "Backed by Astransys, building IT solutions since 2017",

  demo: {
    /** Live voice demo embedded in the hero and on /get-a-call. */
    embedUrl:
      clean(process.env.NEXT_PUBLIC_DEMO_EMBED_URL) ??
      "https://resenyai.com/embed/demo?token=138fbcb1-b49c-4ee9-ad46-c9b93b904369",
    height: 600,
  },

  contact: {
    salesEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL_SALES),
    supportEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL_SUPPORT),
    partnersEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL_PARTNERS),
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    whatsappNumber: whatsappDigits,
    whatsappUrl: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined,
    address: clean(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
    mapEmbedUrl: clean(process.env.NEXT_PUBLIC_CONTACT_MAP_EMBED_URL),
  },

  links: {
    app: clean(process.env.NEXT_PUBLIC_APP_URL),
    docs: clean(process.env.NEXT_PUBLIC_DOCS_URL),
    status: clean(process.env.NEXT_PUBLIC_STATUS_URL),
    helpCenter: clean(process.env.NEXT_PUBLIC_HELP_CENTER_URL),
  },

  social: [
    { label: "LinkedIn", href: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
    { label: "YouTube", href: clean(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) },
    { label: "X", href: clean(process.env.NEXT_PUBLIC_SOCIAL_X) },
    { label: "Instagram", href: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { label: "Facebook", href: clean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href)),

  analytics: {
    gtmId: clean(process.env.NEXT_PUBLIC_GTM_ID),
  },
} as const;

/** Absolute URL for a site path, e.g. `absoluteUrl("/pricing")`. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
