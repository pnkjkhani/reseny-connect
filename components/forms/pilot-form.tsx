"use client";

import { LoaderCircle, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  FormError,
  Honeypot,
  PhoneField,
  SelectField,
  TextField,
  TextareaField,
  type PhoneValue,
} from "@/components/ui/form-fields";
import { goalOptions, industryOptions, monthlyLeadOptions } from "@/lib/content/form-options";
import { useLeadSubmit } from "@/lib/hooks/use-lead-submit";
import { saveLeadSummary } from "@/lib/lead-summary";
import { DEFAULT_DIAL_CODE, composePhone, maskPhone } from "@/lib/leads/phone";
import { pilotSchema, toFieldErrors } from "@/lib/leads/schema";
import { consentLabels } from "./consent-label";

/** "Start free pilot" (SOP §8.3): one short step, since pilot intent is already high. */
export function PilotForm() {
  const router = useRouter();
  const { submit, pending, error, clearError } = useLeadSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    monthlyLeads: "",
    goal: "",
    notes: "",
  });
  const [phone, setPhone] = useState<PhoneValue>({ dial: DEFAULT_DIAL_CODE, national: "" });
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function set(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();

    const payload = {
      intent: "pilot" as const,
      ...values,
      notes: values.notes.trim() || undefined,
      phone: composePhone(phone.dial, phone.national),
      consent,
      source: "start-pilot",
      company_url: trap,
    };

    const check = pilotSchema.safeParse(payload);
    if (!check.success) {
      setErrors(toFieldErrors(check.error));
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    const result = await submit(payload);
    if (result.ok) {
      setDone(true);
      saveLeadSummary({ intent: "pilot", name: values.name, email: values.email, phone: maskPhone(check.data.phone) });
      router.push("/thank-you/pilot");
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
      className="relative space-y-4 rounded-3xl border border-border bg-card p-5 shadow-pop sm:p-8"
    >
      <Honeypot value={trap} onChange={setTrap} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Full name" required name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
        <TextField label="Company" required name="company" autoComplete="organization" value={values.company} onChange={(e) => set("company", e.target.value)} error={errors.company} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PhoneField
          value={phone}
          onChange={(next) => {
            setPhone(next);
            setErrors((current) => ({ ...current, phone: "" }));
          }}
          error={errors.phone || undefined}
        />
        <TextField label="Work email" required type="email" name="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Industry" required value={values.industry} onChange={(e) => set("industry", e.target.value)} options={industryOptions} placeholder="Choose your industry" error={errors.industry} />
        <SelectField label="Leads or calls per month" required value={values.monthlyLeads} onChange={(e) => set("monthlyLeads", e.target.value)} options={monthlyLeadOptions} placeholder="Choose" error={errors.monthlyLeads} />
      </div>
      <SelectField label="What would you like to pilot?" required value={values.goal} onChange={(e) => set("goal", e.target.value)} options={goalOptions} placeholder="Choose" error={errors.goal} />
      <TextareaField label="Anything we should know?" optional name="notes" placeholder="Where your leads come from, tools you use, what success looks like…" value={values.notes} onChange={(e) => set("notes", e.target.value)} error={errors.notes} />
      <CheckboxField
        checked={consent}
        onChange={(checked) => {
          setConsent(checked);
          setErrors((current) => ({ ...current, consent: "" }));
        }}
        error={errors.consent || undefined}
        label={consentLabels.pilot}
      />
      {error ? <FormError>{error}</FormError> : null}
      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? (
          <>
            <LoaderCircle aria-hidden className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Rocket aria-hidden className="size-5" />
            Start my free pilot
          </>
        )}
      </Button>
    </form>
  );
}
