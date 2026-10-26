"use client";

import { LoaderCircle, PhoneCall } from "lucide-react";
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
  type PhoneValue,
} from "@/components/ui/form-fields";
import { DEFAULT_LANGUAGE, languageOptions } from "@/lib/content/languages";
import { useLeadSubmit } from "@/lib/hooks/use-lead-submit";
import { saveLeadSummary } from "@/lib/lead-summary";
import { DEFAULT_DIAL_CODE, composePhone, maskPhone } from "@/lib/leads/phone";
import { callNowSchema, toFieldErrors } from "@/lib/leads/schema";
import { consentLabels } from "./consent-label";

interface CallNowFormProps {
  /** Where the form lives, e.g. "home-strip": stored with the lead so you can see which placements convert. */
  source: string;
  /** Pre-select the sector this page is about. */
  industry?: string;
  /** Phone only (plus consent), for tight spaces like the closing banner. */
  compact?: boolean;
  submitLabel?: string;
  className?: string;
}

/**
 * "Get a call from Reseny now" (SOP §7.2). Validates in the browser for instant feedback,
 * then the server action validates again and hands the lead to the webhook that places
 * the AI call. On success the visitor lands on /thank-you/call.
 */
export function CallNowForm({ source, industry, compact = false, submitLabel = "Call me now", className }: CallNowFormProps) {
  const router = useRouter();
  const { submit, pending, error, clearError } = useLeadSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState<PhoneValue>({ dial: DEFAULT_DIAL_CODE, national: "" });
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const clearFieldError = (field: string) =>
    setErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();

    const payload = {
      intent: "call_now" as const,
      name: name.trim() || undefined,
      phone: composePhone(phone.dial, phone.national),
      consent,
      language,
      industry,
      source,
      company_url: trap,
    };

    const check = callNowSchema.safeParse(payload);
    if (!check.success) {
      setErrors(toFieldErrors(check.error));
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});

    const result = await submit(payload);
    if (result.ok) {
      setDone(true);
      saveLeadSummary({ intent: "call_now", name: name.trim() || undefined, phone: maskPhone(check.data.phone), language });
      router.push("/thank-you/call");
    } else if (result.error === "validation") {
      setErrors(result.fieldErrors);
    }
  }

  const busy = pending || done;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={className} aria-busy={busy}>
      <Honeypot value={trap} onChange={setTrap} />
      <div className="space-y-4">
        {!compact ? (
          <TextField
            label="Your name"
            optional
            name="name"
            autoComplete="given-name"
            placeholder="So the agent can greet you"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        ) : null}
        <PhoneField
          value={phone}
          onChange={(next) => {
            setPhone(next);
            clearFieldError("phone");
          }}
          error={errors.phone}
        />
        {!compact ? (
          <SelectField
            label="Language"
            name="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            options={languageOptions}
          />
        ) : null}
        <CheckboxField
          checked={consent}
          onChange={(checked) => {
            setConsent(checked);
            clearFieldError("consent");
          }}
          error={errors.consent}
          label={consentLabels.call}
        />
        {error ? <FormError>{error}</FormError> : null}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? (
            <>
              <LoaderCircle aria-hidden className="size-5 animate-spin" />
              Connecting…
            </>
          ) : (
            <>
              <PhoneCall aria-hidden className="size-5" />
              {submitLabel}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
