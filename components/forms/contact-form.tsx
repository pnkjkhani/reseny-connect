"use client";

import { LoaderCircle, Send } from "lucide-react";
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
import { contactTopicOptions } from "@/lib/content/form-options";
import { useLeadSubmit } from "@/lib/hooks/use-lead-submit";
import { saveLeadSummary } from "@/lib/lead-summary";
import { DEFAULT_DIAL_CODE, composePhone } from "@/lib/leads/phone";
import { contactSchema, toFieldErrors } from "@/lib/leads/schema";
import { consentLabels } from "./consent-label";

/** Contact page form (SOP §7.3): sales, support or partnerships. */
export function ContactForm({ defaultTopic = "" }: { defaultTopic?: string }) {
  const router = useRouter();
  const { submit, pending, error, clearError } = useLeadSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({ topic: defaultTopic, name: "", email: "", company: "", message: "" });
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
      intent: "contact" as const,
      ...values,
      company: values.company.trim() || undefined,
      // Phone is optional here: only validate it if the visitor typed something.
      phone: phone.national.trim() ? composePhone(phone.dial, phone.national) : "",
      consent,
      source: "contact-page",
      company_url: trap,
    };

    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      setErrors(toFieldErrors(check.error));
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    const result = await submit(payload);
    if (result.ok) {
      setDone(true);
      saveLeadSummary({ intent: "contact", name: values.name, email: values.email });
      router.push("/thank-you/contact");
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
      <SelectField label="What is this about?" required value={values.topic} onChange={(e) => set("topic", e.target.value)} options={contactTopicOptions} placeholder="Choose a topic" error={errors.topic} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Full name" required name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
        <TextField label="Email" required type="email" name="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PhoneField
          label="Phone"
          required={false}
          value={phone}
          onChange={(next) => {
            setPhone(next);
            setErrors((current) => ({ ...current, phone: "" }));
          }}
          error={errors.phone || undefined}
        />
        <TextField label="Company" optional name="company" autoComplete="organization" value={values.company} onChange={(e) => set("company", e.target.value)} error={errors.company} />
      </div>
      <TextareaField label="Message" required name="message" placeholder="Tell us what you need and we will point you to the right person." value={values.message} onChange={(e) => set("message", e.target.value)} error={errors.message} />
      <CheckboxField
        checked={consent}
        onChange={(checked) => {
          setConsent(checked);
          setErrors((current) => ({ ...current, consent: "" }));
        }}
        error={errors.consent || undefined}
        label={consentLabels.contact}
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
            <Send aria-hidden className="size-5" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
