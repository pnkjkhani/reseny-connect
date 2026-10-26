import { CalendarClock } from "lucide-react";
import { EmailCaptureForm } from "@/components/forms/email-capture-form";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Webinars and events",
  description: "Live sessions on AI calling, lead response and booking more appointments. Join the list to hear about the next one first.",
  path: "/resources/webinars",
});

export default function WebinarsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: "Webinars and events", href: "/resources/webinars" },
        ]}
        eyebrow="Webinars and events"
        title={
          <>
            Live sessions on <span className="text-gradient">AI calling</span>
          </>
        }
        description="Practical sessions on responding to every lead and booking more appointments, with time for your questions."
      />
      <Section aria-label="Upcoming sessions">
        <Container className="max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-7 text-center shadow-card sm:p-10">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-text">
              <CalendarClock aria-hidden className="size-7" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-foreground">No sessions scheduled yet</h2>
            <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted-foreground">
              Leave your email and we will tell you about the next webinar or event before anyone else.
            </p>
            <EmailCaptureForm
              intent="guide_request"
              source="webinars-waitlist"
              topic="Webinars and events"
              buttonLabel="Notify me"
              successMessage="Thank you! We will let you know about the next session."
              stacked
              className="mx-auto mt-6 max-w-md text-left"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
