import type { ReactNode } from "react";
import { AttributionCapture } from "./attribution-capture";
import { ExitIntentOffer } from "./exit-intent-offer";
import { FloatingContact } from "./floating-contact";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** Marketing-site chrome: skip link, header, footer, floating widget and exit-intent offer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
      <FloatingContact />
      <ExitIntentOffer />
      <AttributionCapture />
    </>
  );
}
