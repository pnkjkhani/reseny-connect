import { Rocket } from "lucide-react";
import { PilotForm } from "@/components/forms/pilot-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/section";
import { pilotOffer } from "@/lib/content/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a free pilot",
  description:
    "Run Reseny Connect on a slice of your real leads and see recordings, summaries and booked appointments before you commit. Our engineers help you go live in days.",
  path: "/start-pilot",
});

export default function StartPilotPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <Container className="grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
        <div className="lg:sticky lg:top-28">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Start a free pilot", href: "/start-pilot" },
            ]}
          />
          <Eyebrow>Free pilot</Eyebrow>
          <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl">
            {pilotOffer.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{pilotOffer.body}</p>

          <ol className="mt-8 space-y-4">
            {pilotOffer.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-base font-extrabold text-primary-foreground shadow-glow">
                  {index + 1}
                </span>
                <span className="font-semibold text-foreground">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground shadow-card">
            <Rocket aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-text" />
            Pilots are scoped around your real leads and a clear success measure, so you can judge Reseny on your own data.
          </p>
        </div>

        <PilotForm />
      </Container>
    </section>
  );
}
