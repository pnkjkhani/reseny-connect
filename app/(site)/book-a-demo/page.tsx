import { CalendarCheck, Mic, PhoneCall, Sparkles } from "lucide-react";
import Link from "next/link";
import { BookDemoForm } from "@/components/forms/book-demo-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a demo",
  description:
    "Book a demo of Reseny Connect in three short steps. See the AI calling agent qualify and book appointments for your industry and lead volume.",
  path: "/book-a-demo",
});

const expectations = [
  { icon: Sparkles, text: "A short walkthrough tailored to your industry and lead volume" },
  { icon: Mic, text: "A live call, so you hear exactly what your customers would hear" },
  { icon: CalendarCheck, text: "A clear next step: a pilot on your own leads, with no obligation to continue" },
];

export default function BookDemoPage() {
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
              { name: "Book a demo", href: "/book-a-demo" },
            ]}
          />
          <Eyebrow>Book a demo</Eyebrow>
          <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl">
            See Reseny on <span className="text-gradient">your own leads</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Three short steps. We will confirm your time by WhatsApp and email, and our AI can call you straight after to
            check the details.
          </p>

          <ul className="mt-8 space-y-4">
            {expectations.map(({ icon: ItemIcon, text }) => (
              <li key={text} className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
                  <ItemIcon aria-hidden className="size-5" />
                </span>
                <span className="pt-1.5 font-medium text-foreground">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="flex items-center gap-2 font-bold text-foreground">
              <PhoneCall aria-hidden className="size-5 text-primary-text" />
              Prefer a call right now?
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Skip the form and hear the agent live, on your own phone or in your browser.
            </p>
            <Link
              href="/get-a-call"
              className="mt-3 inline-flex font-semibold text-primary-text underline underline-offset-2 hover:no-underline"
            >
              Get a call from Reseny →
            </Link>
          </div>
        </div>

        <BookDemoForm />
      </Container>
    </section>
  );
}
