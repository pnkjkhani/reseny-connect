import { Compass } from "lucide-react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/** Lives outside the (site) group, so it wraps itself in the site chrome. */
export default function NotFound() {
  return (
    <SiteShell>
      <Container className="max-w-2xl py-24 text-center sm:py-32">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-primary-text">
          <Compass aria-hidden className="size-8" />
        </span>
        <p className="mt-6 text-sm font-bold tracking-[0.16em] text-primary-text uppercase">Error 404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">We can&apos;t find that page</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          It may have moved, or the link may be mistyped. These will get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/get-a-call" variant="secondary" size="lg">
            Get a call from Reseny
          </ButtonLink>
          <ButtonLink href="/company/contact" variant="ghost" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </SiteShell>
  );
}
