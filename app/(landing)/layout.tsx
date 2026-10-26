import Link from "next/link";
import { AttributionCapture } from "@/components/layout/attribution-capture";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

/**
 * Campaign landing-page chrome (SOP §7.1 #9): no navigation menu, a single call to action,
 * and only the legal links a paid-traffic page needs.
 */
export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="border-b border-border bg-background/90 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <p className="hidden text-sm text-muted-foreground sm:block">{siteConfig.heritageLine}</p>
        </Container>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border bg-surface py-8">
        <Container className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>{siteConfig.initiativeLine}</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link href="/legal/privacy" className="hover:text-primary-text">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-primary-text">
              Terms
            </Link>
            <Link href="/trust" className="hover:text-primary-text">
              Trust Center
            </Link>
          </nav>
        </Container>
      </footer>
      <AttributionCapture />
    </>
  );
}
