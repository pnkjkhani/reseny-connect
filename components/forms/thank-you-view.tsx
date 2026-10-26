"use client";

import { ArrowRight, CalendarCheck, CircleCheck, Mail, PhoneCall, Rocket } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { events, trackEvent } from "@/lib/analytics";
import { useLeadSummary } from "@/lib/lead-summary";

export type ThankYouType = "demo" | "call" | "pilot" | "contact";

const icons = { demo: CalendarCheck, call: PhoneCall, pilot: Rocket, contact: Mail } as const;

const content: Record<
  ThankYouType,
  { title: string; lead: string; steps: string[] }
> = {
  demo: {
    title: "Your demo request is in",
    lead: "Thank you. We have your details and your preferred time.",
    steps: [
      "A confirmation reaches you by WhatsApp or SMS and email, with the meeting link.",
      "If you asked for it, Reseny's AI may call you to confirm the details and ask a few quick questions.",
      "You will get a reminder the day before and shortly before the demo.",
    ],
  },
  call: {
    title: "Keep your phone nearby",
    lead: "Reseny's AI agent is calling the number you entered.",
    steps: [
      "It introduces itself as an AI, asks a few quick questions and shows you how a booking works.",
      "Missed it? Request another call, or try the live demo in your browser.",
      "You can end the call or opt out of further contact at any time.",
    ],
  },
  pilot: {
    title: "Thanks, let's plan your pilot",
    lead: "We have your pilot request.",
    steps: [
      "Our team reviews your leads and goals and gets in touch to agree the scope.",
      "We configure your agent and connect your calendar.",
      "Your leads start getting calls within days, and we review the results together.",
    ],
  },
  contact: {
    title: "Message received",
    lead: "Thank you for getting in touch.",
    steps: [
      "The right person on our team will read your message and reply.",
      "Urgent? You can also book a demo or get a call right now.",
    ],
  },
};

/** Confirmation page content. Also fires the conversion event that ad and analytics tools count. */
export function ThankYouView({ type }: { type: ThankYouType }) {
  const summary = useLeadSummary();
  const copy = content[type];
  const Glyph = icons[type];

  useEffect(() => {
    trackEvent(events.thankYouView, { type });
  }, [type]);

  const name = summary?.name?.split(" ")[0];

  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <div className="rounded-4xl border border-border bg-card p-7 text-center shadow-pop sm:p-12">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-success-soft text-success">
          <CircleCheck aria-hidden className="size-9" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {name ? `${copy.title}, ${name}` : copy.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">{copy.lead}</p>

        {summary && (summary.slotLabel || summary.phone || summary.email) ? (
          <dl className="mx-auto mt-7 inline-grid max-w-full gap-x-6 gap-y-2 rounded-2xl bg-surface px-6 py-4 text-left text-sm sm:grid-cols-[auto_1fr]">
            {summary.slotLabel ? (
              <>
                <dt className="font-semibold text-subtle-foreground">Requested time</dt>
                <dd className="font-bold text-foreground">{summary.slotLabel}</dd>
              </>
            ) : null}
            {summary.phone ? (
              <>
                <dt className="font-semibold text-subtle-foreground">Phone</dt>
                <dd className="font-bold text-foreground">{summary.phone}</dd>
              </>
            ) : null}
            {summary.email ? (
              <>
                <dt className="font-semibold text-subtle-foreground">Email</dt>
                <dd className="font-bold break-all text-foreground">{summary.email}</dd>
              </>
            ) : null}
          </dl>
        ) : null}

        <div className="mt-10 text-left">
          <h2 className="flex items-center gap-2 text-sm font-bold tracking-wider text-subtle-foreground uppercase">
            <Glyph aria-hidden className="size-4 text-primary-text" />
            What happens next
          </h2>
          <ol className="mt-4 space-y-3">
            {copy.steps.map((step, index) => (
              <li key={step} className="flex gap-3.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-text">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {type === "call" ? (
            <ButtonLink href="/get-a-call" size="lg">
              Try the live demo
            </ButtonLink>
          ) : (
            <ButtonLink href="/product" size="lg">
              Explore the product
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          )}
          <ButtonLink href="/resources/sample-calls" variant="secondary" size="lg">
            Hear a sample call
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Something wrong?{" "}
          <Link href="/company/contact" className="font-semibold text-primary-text underline underline-offset-2 hover:no-underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
