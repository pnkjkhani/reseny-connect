"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

/** Error boundary for the marketing site: it renders inside the site layout, so the header and footer stay. */
export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="max-w-2xl py-24 text-center sm:py-32">
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-danger-soft text-danger">
        <TriangleAlert aria-hidden className="size-8" />
      </span>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground">Something went wrong</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        We hit an unexpected problem loading this page. Please try again, and if it keeps happening, let us know.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <ButtonLink href="/" variant="secondary" size="lg">
          Go to the home page
        </ButtonLink>
      </div>
    </Container>
  );
}
