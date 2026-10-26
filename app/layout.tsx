import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The whole site is static. This makes the build fail if request-time rendering is ever introduced
 * by accident, and makes the first request for an unknown dynamic slug wait for the full render, so
 * `notFound()` returns a real HTTP 404 instead of a 200 "app shell" (soft 404).
 */
export const ensureStatic = "navigation";

const defaultTitle = `${siteConfig.name}: the AI calling agent that books your appointments`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.company }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: siteConfig.description, images: [OG_IMAGE.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0714" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${jakarta.variable} h-full antialiased`}
    >
      <head>
        {/* Sets data-theme before first paint so there is no light/dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
