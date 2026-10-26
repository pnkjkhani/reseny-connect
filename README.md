# Reseny Connect: marketing website

The public website for **Reseny Connect**, the agentic-AI calling platform from Reseny Business Mercantech (an initiative of Astransys Group). It is built from the *Website Workflow, Market Strategy & Brand SOP* in [`docs/`](docs/), and the site itself is the demo: visitors can talk to the live agent, get a call, book a demo or start a pilot.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) with **Cache Components** and **Partial Prefetching** (see `next.config.ts`) |
| UI | React 19, TypeScript (strict), Tailwind CSS 4, `lucide-react` icons |
| Validation | Zod 4, shared by the browser and the server action |
| Animation | CSS (scroll-driven reveals, keyframes) plus small hooks. No animation library, so the JS stays light. Everything honours `prefers-reduced-motion` |
| Tests | Vitest (unit and content-integrity), plus the manual QA noted below |

> **Next.js here differs from older versions.** Read the relevant guide in `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Getting started

```bash
npm install
cp .env.example .env.local   # everything is optional, see below
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Develop, build and serve |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest: validation, ROI maths, slot generation, content integrity, no broken internal links |
| `node scripts/generate-brand-assets.mjs` | Rebuilds logos, favicon and the social share image from `docs/source-assets/` |

Requires Node 20.9+ (developed on 22).

## Before you go live: what needs *you*

The brand SOP says "only publish claims you can prove". Every claim or figure I could not verify is marked in code so it can be found and settled:

```bash
grep -rn "TODO(" lib components app
```

- **`TODO(content)`**: pricing (no prices exist in the brief, so plan cards show "Get a quote"), the exact tested **languages** (`lib/content/languages.ts`), the "**30 seconds**" call promise and "**Start in a day**" promise, the "**pilot in 7 days**" terms, which **integrations** you really support (`lib/content/home.ts`), service timelines, and the ROI calculator's illustrative default rates (`lib/roi.ts`).
- **`TODO(trust)`**: the Trust Center and legal pages (`lib/content/trust.ts`) are plain-language **drafts**; have counsel and your engineering lead review them, and replace the legal-document placeholders with approved text. The sector compliance notes in `lib/content/industries.ts` also need review.
- **Outcome numbers and testimonials** are intentionally absent. Counters only render when you set a real `metric` on an outcome tile (`lib/content/home.ts`); a test fails if invented percentages creep into the content.
- **Contact details and social links** are shown only when set (see env vars). Nothing is invented.

## Environment variables

Copy `.env.example`; all are optional. Public values are prefixed `NEXT_PUBLIC_`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap, Open Graph and structured data (default `https://www.resenyconnect.com`) |
| `NEXT_PUBLIC_DEMO_EMBED_URL` | Live demo iframe (defaults to the embed supplied for the project) |
| **`LEADS_WEBHOOK_URL`** | **Where every form submission is sent.** Required in production (see below) |
| `LEADS_WEBHOOK_SECRET` | Sent as `Authorization: Bearer …` |
| `NEXT_PUBLIC_CONTACT_*`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Phone, emails, WhatsApp (digits only, with country code) and address for the footer, contact page and floating widget |
| `NEXT_PUBLIC_APP_URL`, `…_DOCS_URL`, `…_STATUS_URL`, `…_HELP_CENTER_URL` | Enable the "Log in" link, API docs, status and help-centre links |
| `NEXT_PUBLIC_SOCIAL_*` | Footer social links |
| `NEXT_PUBLIC_GTM_ID` | Loads Google Tag Manager; site events are pushed to `dataLayer` |

## Lead capture and the AI follow-up workflow

The website collects and validates leads; **your systems do the rest** (CRM record, the AI call, WhatsApp/SMS/email confirmations, reminders, no-show recovery, the sales alert, SOP §6.2 and §9.2). Every form goes through one server action (`app/actions/lead.ts`) that re-validates with Zod and POSTs JSON to `LEADS_WEBHOOK_URL`: point it at your CRM, a Zapier/Make/n8n hook, or the Reseny platform's intake endpoint.

- **Production without a webhook returns an error to the visitor** (and logs one) rather than silently dropping leads. In development the lead is logged to the server console instead.
- **Delivery contract:** `POST` JSON, optional `Authorization: Bearer $LEADS_WEBHOOK_SECRET`, 8 s timeout, any 2xx counts as delivered.

```jsonc
{
  "id": "uuid",                       // generated per submission
  "receivedAt": "2026-10-26T12:01:30.219Z",
  "site": "https://www.resenyconnect.com",
  "intent": "call_now",               // call_now | book_demo_partial | book_demo | pilot | contact | guide_request | newsletter
  "name": "Asha Verma",
  "phone": "+919876543210",           // normalised E.164
  "consent": true,
  "language": "english",
  "source": "home-strip",             // which page/placement the form lives on
  "attribution": { "page": "/", "landingPage": "/", "utm_source": "…", "utm_campaign": "…", "referrer": "…" },
  "meta": { "ip": "…", "userAgent": "…" }
}
```

`book_demo` adds company, industry, team size, monthly volume, goal, `slot { start, label }` and `aiQualifyCall`. A `book_demo_partial` (name, phone, email, consent) is sent after step 1 of the booking form; it shares a `leadKey` with the final `book_demo` so you can merge them. Time slots are **requested** times in IST (there is no live calendar behind the site yet: swap `fetchSlots` in `lib/booking/slots.ts` for a real availability lookup).

> **Security: do this before enabling automatic dialling.** "Call me now" lets any visitor type any number. Consent on the form does not prove the number belongs to them. At the receiving end add OTP verification or a captcha plus per-number and per-IP rate limits. The honeypot field only stops naive bots.

## How the code is organised

```
app/
  (site)/…            Marketing pages (header, footer, floating widget, exit-intent)
  (landing)/lp/…      Campaign landing pages: no nav, one call to action, noindex
  actions/lead.ts     The single server action every form uses
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.png, icon.png
components/
  ui/                 Primitives: Button, Section, Card, form fields, Modal, FAQ, Marquee, …
  layout/             Header (mega-menu), mobile drawer, footer, CTA band, exit-intent
  home/               Home sections (hero, instant demo, pinned "how it works", ROI, …)
  forms/              Call-me, 3-step booking, pilot, contact, newsletter, thank-you
  solutions/, product/, pricing/, trust/   Page templates
lib/
  content/            ALL page copy as typed data (edit text here, not in components)
  leads/              Zod schemas, phone normalisation, webhook delivery (server-only)
  roi.ts, booking/    Calculator and slot logic (pure, unit-tested)
  navigation.ts       One source for the header, footer and sitemap
  hooks/              In-view, count-up, cycle, scroll-steps, reduced-motion, …
```

**Adding or changing content.** Sector, use-case and team-size pages are one template (`SolutionPage`) fed from `lib/content/industries.ts`, `use-cases.ts` and `teams.ts`: add an entry and the page, menu entry, sitemap URL, sample-call library card and campaign landing page all appear. Product pages come from `products.ts`, pricing from `pricing.ts`, home copy from `home.ts`.

## Things worth knowing

- **Cache Components rules apply.** Don't call `new Date()` / `Math.random()` while rendering a Server Component (the footer year lives in a `"use cache"` component). Dynamic routes use `generateStaticParams`, and the root layout exports `ensureStatic = "navigation"`: the build fails if request-time rendering is ever introduced by accident, and unknown slugs return a real HTTP 404 (not a 200 "shell"). `dynamicParams` is not supported in this mode.
- **Previous routes stay mounted but hidden.** Next keeps recently visited pages in the DOM (React `<Activity>`), so **never use `aria-labelledby`/ids that repeat across pages**; label regions with `aria-label`, and make hash-anchor ids page-unique. Tests that query the DOM should use accessible-role queries.
- **Theming:** `data-theme` on `<html>` is the single source of truth, set by an inline script before first paint (no flash). Colours are CSS tokens in `app/globals.css`, sampled from the logos.
- **Logos** have white backgrounds, so on dark surfaces they sit on a white tile.
- **Analytics and consent.** Nothing is tracked unless you set `NEXT_PUBLIC_GTM_ID`. If you enable it, add a consent mechanism that fits your audience and regulators (the Cookie Policy page currently describes only the functional storage the site itself uses).
- **Keep the project out of OneDrive.** Syncing `node_modules` and `.next` makes installs, builds and the dev server slow and can cause file-lock errors. Clone to a non-synced folder (for example `C:\dev\`), or exclude those two folders from sync.
- **The demo iframe's own page** (resenyai.com) logs React hydration errors (#418/#423) in the browser console. They come from that page, not this site.

## Quality checks run on this build

`npm run lint`, `npm run typecheck`, `npm test` (73 tests) and `npm run build` all pass (102 prerendered pages, 0 `npm audit` vulnerabilities). In a real browser: **zero axe-core violations** (WCAG 2.x A/AA + best practices) on the audited pages in light and dark; no horizontal overflow at 360/390/820/1024/1280 px; real HTTP 404s for unknown slugs; `og:image` on every page; end-to-end checks of the call-me, booking, contact and newsletter flows, sample-call playback, ROI calculator, theme persistence, keyboard navigation and exit-intent behaviour.
