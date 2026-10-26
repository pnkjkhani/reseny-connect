"use client";

import { ArrowLeft, ArrowRight, Check, LoaderCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitLead } from "@/app/actions/lead";
import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  FormError,
  Honeypot,
  PhoneField,
  SelectField,
  TextField,
  type PhoneValue,
} from "@/components/ui/form-fields";
import { events, trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { goalOptions, industryOptions, monthlyLeadOptions, teamSizeOptions } from "@/lib/content/form-options";
import { DEFAULT_LANGUAGE, languageOptions } from "@/lib/content/languages";
import { useLeadSubmit } from "@/lib/hooks/use-lead-submit";
import { useMounted } from "@/lib/hooks/use-mounted";
import { saveLeadSummary } from "@/lib/lead-summary";
import { DEFAULT_DIAL_CODE, composePhone, maskPhone } from "@/lib/leads/phone";
import { bookDemoSchema, bookDemoStep1, bookDemoStep2, bookDemoStep3, toFieldErrors } from "@/lib/leads/schema";
import { cn } from "@/lib/utils";
import { consentLabels } from "./consent-label";
import { SlotPicker, type SelectedSlot } from "./slot-picker";

interface Values {
  name: string;
  phone: PhoneValue;
  email: string;
  consent: boolean;
  company: string;
  industry: string;
  teamSize: string;
  monthlyLeads: string;
  currentTools: string;
  goal: string;
  language: string;
  slot: SelectedSlot | null;
  aiQualifyCall: boolean;
}

const EMPTY: Values = {
  name: "",
  phone: { dial: DEFAULT_DIAL_CODE, national: "" },
  email: "",
  consent: false,
  company: "",
  industry: "",
  teamSize: "",
  monthlyLeads: "",
  currentTools: "",
  goal: "",
  language: DEFAULT_LANGUAGE,
  slot: null,
  aiQualifyCall: true,
};

const STEPS = [
  { title: "About you", hint: "Where should we reach you?" },
  { title: "Your business", hint: "A little context helps us prepare." },
  { title: "Choose a time", hint: "What do you want, and when?" },
] as const;

const DRAFT_KEY = "reseny:draft:book-demo";

interface Draft {
  values: Values;
  step: number;
  leadKey: string;
}

function loadDraft(): Draft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function saveDraft(draft: Draft) {
  try {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage blocked: the form still works, it just cannot be resumed.
  }
}

function clearDraft() {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nothing to clear.
  }
}

/** Placeholder with the same footprint as the form, shown until the browser can restore a draft. */
function WizardSkeleton() {
  return <div aria-hidden className="h-136 animate-pulse rounded-3xl bg-surface-2" />;
}

/**
 * The booking form is browser-only: it restores an unfinished draft from this tab's
 * session storage, which the server cannot know, so it mounts after hydration.
 */
export function BookDemoForm() {
  const mounted = useMounted();
  return mounted ? <BookDemoWizard /> : <WizardSkeleton />;
}

function BookDemoWizard() {
  const router = useRouter();
  const { submit, pending, error, clearError } = useLeadSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const partialSentFor = useRef<string>("");

  const [draft] = useState(loadDraft);
  const [values, setValues] = useState<Values>(draft?.values ?? EMPTY);
  const [step, setStep] = useState(draft?.step ?? 1);
  const [leadKey] = useState(() => draft?.leadKey ?? crypto.randomUUID());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trap, setTrap] = useState("");
  const [done, setDone] = useState(false);

  // Keep the draft in step with the form so a refresh or accidental navigation loses nothing.
  useEffect(() => {
    if (!done) saveDraft({ values, step, leadKey });
  }, [values, step, leadKey, done]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  const phoneE164 = composePhone(values.phone.dial, values.phone.national);

  function focusFirstError() {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }

  function goTo(next: number, { keepErrors = false }: { keepErrors?: boolean } = {}) {
    setStep(next);
    if (!keepErrors) setErrors({});
    trackEvent(events.bookingStep, { step: next });
    // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function validateStep(current: number): boolean {
    const result =
      current === 1
        ? bookDemoStep1.safeParse({ name: values.name, phone: phoneE164, email: values.email, consent: values.consent })
        : current === 2
          ? bookDemoStep2.safeParse({
              company: values.company,
              industry: values.industry,
              teamSize: values.teamSize,
              monthlyLeads: values.monthlyLeads,
              currentTools: values.currentTools.trim() || undefined,
            })
          : bookDemoStep3.safeParse({
              goal: values.goal,
              language: values.language,
              slot: values.slot ?? undefined,
              aiQualifyCall: values.aiQualifyCall,
            });
    if (result.success) return true;
    setErrors(toFieldErrors(result.error));
    focusFirstError();
    return false;
  }

  /** After step 1 (with consent ticked) keep a partial lead so an abandoned form can still be followed up. */
  function sendPartialLead() {
    const signature = `${values.name}|${phoneE164}|${values.email}`;
    if (partialSentFor.current === signature) return;
    partialSentFor.current = signature;
    void submitLead({
      intent: "book_demo_partial",
      name: values.name,
      phone: phoneE164,
      email: values.email,
      consent: values.consent,
      language: values.language,
      source: "book-demo-form",
      leadKey,
      attribution: getAttribution(),
    }).catch(() => {
      // Best effort: the visitor can still complete the booking.
    });
  }

  function onContinue() {
    if (!validateStep(step)) return;
    if (step === 1) sendPartialLead();
    goTo(step + 1);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      onContinue();
      return;
    }
    clearError();
    if (!validateStep(3)) return;
    if (!values.slot) return;

    const payload = {
      intent: "book_demo" as const,
      name: values.name,
      phone: phoneE164,
      email: values.email,
      consent: values.consent,
      company: values.company,
      industry: values.industry,
      teamSize: values.teamSize,
      monthlyLeads: values.monthlyLeads,
      currentTools: values.currentTools.trim() || undefined,
      goal: values.goal,
      language: values.language,
      slot: values.slot,
      aiQualifyCall: values.aiQualifyCall,
      source: "book-demo-form",
      leadKey,
      company_url: trap,
    };

    const check = bookDemoSchema.safeParse(payload);
    if (!check.success) {
      const fieldErrors = toFieldErrors(check.error);
      setErrors(fieldErrors);
      // Send the visitor back to the earliest step that has a problem.
      const step1Fields = ["name", "phone", "email", "consent"];
      const step2Fields = ["company", "industry", "teamSize", "monthlyLeads"];
      const firstKey = Object.keys(fieldErrors)[0] ?? "";
      goTo(step1Fields.includes(firstKey) ? 1 : step2Fields.includes(firstKey) ? 2 : 3, { keepErrors: true });
      focusFirstError();
      return;
    }

    const result = await submit(payload);
    if (result.ok) {
      setDone(true);
      clearDraft();
      saveLeadSummary({
        intent: "book_demo",
        name: values.name,
        email: values.email,
        phone: maskPhone(check.data.phone),
        slotLabel: values.slot.label,
        language: values.language,
      });
      router.push("/thank-you/demo");
    } else if (result.error === "validation") {
      setErrors(result.fieldErrors);
    }
  }

  const busy = pending || done;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={busy}
      className="relative rounded-3xl border border-border bg-card p-5 shadow-pop sm:p-8"
    >
      <Honeypot value={trap} onChange={setTrap} />

      {/* Progress */}
      <ol aria-label="Progress" className="mb-6 flex items-center gap-2">
        {STEPS.map((item, index) => {
          const number = index + 1;
          const complete = number < step;
          const current = number === step;
          return (
            <li key={item.title} aria-current={current ? "step" : undefined} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  complete && "bg-success text-white dark:text-[#07140e]",
                  current && "bg-primary text-primary-foreground",
                  !complete && !current && "bg-surface-2 text-subtle-foreground",
                )}
              >
                {complete ? <Check aria-hidden className="size-4" /> : number}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-semibold sm:block",
                  current ? "text-foreground" : "text-subtle-foreground",
                )}
              >
                {item.title}
              </span>
              {number < STEPS.length ? (
                <span aria-hidden className={cn("h-0.5 flex-1 rounded-full", complete ? "bg-success" : "bg-border")} />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mb-5">
        <p className="text-xs font-bold tracking-wider text-subtle-foreground uppercase">
          Step {step} of {STEPS.length}
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-extrabold tracking-tight text-foreground outline-none">
          {STEPS[step - 1].title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{STEPS[step - 1].hint}</p>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <TextField
            label="Full name"
            required
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            error={errors.name}
          />
          <PhoneField
            value={values.phone}
            onChange={(next) => set("phone", next)}
            error={errors.phone}
          />
          <TextField
            label="Work email"
            required
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            error={errors.email}
          />
          <CheckboxField
            checked={values.consent}
            onChange={(checked) => set("consent", checked)}
            error={errors.consent}
            label={consentLabels.booking}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <TextField
            label="Company name"
            required
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => set("company", event.target.value)}
            error={errors.company}
          />
          <SelectField
            label="Industry"
            required
            value={values.industry}
            onChange={(event) => set("industry", event.target.value)}
            options={industryOptions}
            placeholder="Choose your industry"
            error={errors.industry}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Team size"
              required
              value={values.teamSize}
              onChange={(event) => set("teamSize", event.target.value)}
              options={teamSizeOptions}
              placeholder="Choose"
              error={errors.teamSize}
            />
            <SelectField
              label="Leads or calls per month"
              required
              value={values.monthlyLeads}
              onChange={(event) => set("monthlyLeads", event.target.value)}
              options={monthlyLeadOptions}
              placeholder="Choose"
              error={errors.monthlyLeads}
            />
          </div>
          <TextField
            label="Tools you use today"
            optional
            name="currentTools"
            placeholder="CRM, dialer, WhatsApp, spreadsheet…"
            value={values.currentTools}
            onChange={(event) => set("currentTools", event.target.value)}
            error={errors.currentTools}
          />
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
          <fieldset aria-describedby={errors.goal ? "goal-error" : undefined}>
            <legend className="mb-2 text-sm font-semibold text-foreground">
              What do you want Reseny to do? <span aria-hidden className="text-danger">*</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {goalOptions.map((option) => (
                <label key={option.value} className="relative block">
                  <input
                    type="radio"
                    name="goal"
                    value={option.value}
                    checked={values.goal === option.value}
                    onChange={() => set("goal", option.value)}
                    className="peer sr-only"
                  />
                  <span className="flex min-h-12 cursor-pointer items-center rounded-xl border border-input px-4 py-2.5 text-sm font-semibold text-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary-soft peer-checked:text-primary-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring hover:border-primary/60">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.goal ? (
              <p id="goal-error" role="alert" className="mt-1.5 text-xs font-medium text-danger">
                {errors.goal}
              </p>
            ) : null}
          </fieldset>

          <SelectField
            label="Preferred language"
            value={values.language}
            onChange={(event) => set("language", event.target.value)}
            options={languageOptions}
          />

          <SlotPicker value={values.slot} onChange={(slot) => set("slot", slot)} error={errors.slot} />

          <CheckboxField
            checked={values.aiQualifyCall}
            onChange={(checked) => set("aiQualifyCall", checked)}
            label="Have Reseny's AI call me right after I book to confirm the details and ask a few quick questions."
          />
          <p className="rounded-xl bg-surface px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Your time is a request: we will confirm it by WhatsApp and email.
          </p>
        </div>
      ) : null}

      {error ? <FormError>{error}</FormError> : null}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        {step > 1 ? (
          <Button type="button" variant="ghost" onClick={() => goTo(step - 1)} disabled={busy}>
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </Button>
        ) : null}
        {step < 3 ? (
          <Button type="button" size="lg" className="ml-auto" onClick={onContinue}>
            Continue
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        ) : (
          <Button type="submit" size="lg" className="ml-auto" disabled={busy}>
            {busy ? (
              <>
                <LoaderCircle aria-hidden className="size-5 animate-spin" />
                Booking…
              </>
            ) : (
              <>
                Book my demo
                <Check aria-hidden className="size-5" />
              </>
            )}
          </Button>
        )}
      </div>

      {/* SOP §9.1: offer an instant call at every step. */}
      <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
        <PhoneCall aria-hidden className="mr-1.5 inline size-4 text-primary-text" />
        Prefer a call right now?{" "}
        <Link href="/get-a-call" className="font-semibold text-primary-text underline underline-offset-2 hover:no-underline">
          Get a call from Reseny
        </Link>
      </p>
    </form>
  );
}
