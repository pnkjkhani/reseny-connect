import path from "node:path";
import type { NextConfig } from "next";

/**
 * Origin of the embedded live-demo iframe. The Permissions-Policy header below
 * must delegate the microphone to it, otherwise the demo cannot start a call.
 * Keep the fallback in sync with `lib/site.ts`.
 */
const demoOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_DEMO_EMBED_URL ?? "https://resenyai.com").origin;
  } catch {
    return "https://resenyai.com";
  }
})();

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: `camera=(), geolocation=(), payment=(), microphone=(self "${demoOrigin}")`,
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    // Pin the workspace root to this folder: otherwise Turbopack may pick up an unrelated
    // lockfile from a parent directory (e.g. the user's home folder) and warn about it.
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
