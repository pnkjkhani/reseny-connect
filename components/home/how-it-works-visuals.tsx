import {
  CalendarCheck,
  Check,
  Database,
  FileSpreadsheet,
  Globe,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  Sparkles,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Illustrative mock-ups for each "How it works" step. They show the shape of the product,
 * not real customer data, and are hidden from assistive technology (the step text
 * beside them says the same thing).
 */

function Panel({ title, badge, children }: { title: string; badge?: string; children: ReactNode }) {
  return (
    <div aria-hidden className="w-full rounded-3xl border border-border bg-card p-5 shadow-pop sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">{title}</p>
        {badge ? (
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-text">{badge}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ConnectVisual() {
  const sources = [
    { icon: Globe, label: "Website forms" },
    { icon: Megaphone, label: "Ad campaigns" },
    { icon: Database, label: "Your CRM" },
    { icon: FileSpreadsheet, label: "Spreadsheet (CSV)" },
  ];
  return (
    <Panel title="Lead sources" badge="Auto-sync">
      <ul className="space-y-2.5">
        {sources.map(({ icon: SourceIcon, label }) => (
          <li key={label} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary-text">
              <SourceIcon className="size-4" />
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-success">
              <span className="size-1.5 rounded-full bg-success" />
              Connected
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 rounded-xl bg-primary-soft px-3.5 py-2.5 text-sm font-medium text-primary-text">
        <Zap className="size-4 shrink-0" />
        New leads arrive with their source page and campaign tags
      </p>
    </Panel>
  );
}

function TeachVisual() {
  const questions = ["Which project are you interested in?", "What is your budget range?", "When do you plan to move?"];
  return (
    <Panel title="Agent Studio" badge="No code">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-subtle-foreground uppercase">Template</p>
          <p className="mt-1 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm font-semibold text-foreground">
            Real estate · site-visit booking
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-subtle-foreground uppercase">Language</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {["English", "Hindi", "Hinglish"].map((language, index) => (
              <span
                key={language}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  index > 0 ? "border-primary bg-primary-soft text-primary-text" : "border-border text-muted-foreground",
                )}
              >
                {language}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-subtle-foreground uppercase">Questions your agent asks</p>
          <ul className="mt-1.5 space-y-1.5">
            {questions.map((question) => (
              <li key={question} className="flex items-center gap-2.5 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-success" />
                {question}
              </li>
            ))}
          </ul>
        </div>
        <p className="flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-bold text-primary-foreground">
          <PhoneCall className="size-4" />
          Call my phone to test
        </p>
      </div>
    </Panel>
  );
}

function CallVisual() {
  const steps = [
    { icon: PhoneCall, title: "AI call", note: "Within seconds of the enquiry", ring: true },
    { icon: MessageCircle, title: "WhatsApp", note: "If the call was not answered" },
    { icon: MessageSquare, title: "SMS reminder", note: "At a smart retry time" },
    { icon: Mail, title: "Email details", note: "Case study and pricing for warm leads" },
  ];
  return (
    <Panel title="Follow-up cadence" badge="Until they respond">
      <ol className="relative space-y-3">
        <span aria-hidden className="absolute top-5 bottom-5 left-[1.15rem] w-0.5 bg-border" />
        {steps.map(({ icon: StepIcon, title, note, ring }, index) => (
          <li key={title} className="relative flex items-center gap-3.5">
            <span
              className={cn(
                "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full",
                index === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card text-primary-text",
              )}
            >
              <StepIcon className={cn("size-4", ring && "animate-ring-shake")} />
            </span>
            <div className="flex-1 rounded-xl border border-border bg-surface px-3.5 py-2">
              <p className="text-sm font-bold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

function CalendarVisual() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <Panel title="Your calendar" badge="Live sync">
      <div className="grid grid-cols-5 gap-2">
        {days.map((day, index) => (
          <div key={day} className="space-y-1.5">
            <p className="text-center text-[0.65rem] font-bold text-subtle-foreground uppercase">{day}</p>
            {[0, 1, 2].map((slot) => {
              const booked = index === 3 && slot === 1;
              const taken = (index + slot) % 3 === 0 && !booked;
              return (
                <div
                  key={slot}
                  className={cn(
                    "flex h-9 items-center justify-center rounded-lg text-[0.65rem] font-bold",
                    booked && "bg-success text-white dark:text-[#07140e]",
                    taken && "bg-surface-2 text-subtle-foreground",
                    !booked && !taken && "border border-dashed border-border-strong text-subtle-foreground",
                  )}
                >
                  {booked ? "Booked" : taken ? "Busy" : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-surface p-3.5">
        <div className="flex items-center gap-2">
          <CalendarCheck className="size-4 text-success" />
          <p className="text-sm font-bold text-foreground">Hot lead · Site visit · Thu</p>
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary-text" />
          Summary, transcript and recording link sent to your team
        </p>
      </div>
    </Panel>
  );
}

const visuals = {
  connect: ConnectVisual,
  teach: TeachVisual,
  call: CallVisual,
  book: CalendarVisual,
} as const;

export type StepVisualId = keyof typeof visuals;

export function StepVisual({ id }: { id: StepVisualId }) {
  const Visual = visuals[id];
  return <Visual />;
}
