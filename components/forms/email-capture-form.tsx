"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CheckboxField, FormError, Honeypot, TextField } from "@/components/ui/form-fields";
import { useLeadSubmit } from "@/lib/hooks/use-lead-submit";
import { guideRequestSchema, newsletterSchema, toFieldErrors } from "@/lib/leads/schema";
import { cn } from "@/lib/utils";
import { consentLabels } from "./consent-label";

interface EmailCaptureFormProps {
  /** `newsletter` for the footer; `guide_request` for playbook/webinar waitlists. */
  intent: "newsletter" | "guide_request";
  source: string;
  /** What they are signing up for (e.g. a playbook title), sent with `guide_request`. */
  topic?: string;
  buttonLabel?: string;
  successMessage?: string;
  /** Stack the button under the field instead of beside it. */
  stacked?: boolean;
  className?: string;
}

/** Email-only capture used by the footer newsletter and the guide/webinar waitlists. */
export function EmailCaptureForm({
  intent,
  source,
  topic,
  buttonLabel = "Subscribe",
  successMessage = "Thank you! You're on the list.",
  stacked = false,
  className,
}: EmailCaptureFormProps) {
  const { submit, pending, error, clearError } = useLeadSubmit();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();

    const payload =
      intent === "newsletter"
        ? ({ intent, email, consent, source, company_url: trap } as const)
        : ({ intent, email, consent, source, topic, company_url: trap } as const);
    const check = (intent === "newsletter" ? newsletterSchema : guideRequestSchema).safeParse(payload);
    if (!check.success) {
      setErrors(toFieldErrors(check.error));
      return;
    }
    setErrors({});

    const result = await submit(payload);
    if (result.ok) setSent(true);
    else if (result.error === "validation") setErrors(result.fieldErrors);
  }

  if (sent) {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm font-semibold text-success", className)}>
        <Check aria-hidden className="size-5" />
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={pending} className={cn("space-y-3", className)}>
      <Honeypot value={trap} onChange={setTrap} />
      <div className={cn("flex gap-2", stacked ? "flex-col" : "flex-col sm:flex-row sm:items-start")}>
        <TextField
          label="Email address"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className="flex-1 [&>label]:sr-only"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrors((current) => ({ ...current, email: "" }));
          }}
          error={errors.email || undefined}
        />
        <Button type="submit" size="md" disabled={pending} className={cn(!stacked && "sm:mt-0")}>
          {pending ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
          {buttonLabel}
        </Button>
      </div>
      <CheckboxField
        checked={consent}
        onChange={(checked) => {
          setConsent(checked);
          setErrors((current) => ({ ...current, consent: "" }));
        }}
        error={errors.consent || undefined}
        label={<span className="text-xs">{consentLabels.email}</span>}
      />
      {error ? <FormError>{error}</FormError> : null}
    </form>
  );
}
