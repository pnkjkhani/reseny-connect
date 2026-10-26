"use client";

import { useState } from "react";
import { SelectField, type SelectOption } from "@/components/ui/form-fields";
import { EmailCaptureForm } from "./email-capture-form";

/**
 * The industry playbooks are still being written, so rather than link to downloads that do
 * not exist, visitors pick one and leave an email to be notified when it is ready.
 */
export function PlaybookWaitlist({ options }: { options: SelectOption[] }) {
  const [selected, setSelected] = useState(options[0]?.value ?? "");
  const label = options.find((option) => option.value === selected)?.label ?? selected;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-pop sm:p-8">
      <h2 className="text-xl font-bold text-foreground">Get notified when your playbook is ready</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Choose your industry and leave your email. We will send the playbook as soon as it is published.
      </p>
      <div className="mt-5 space-y-4">
        <SelectField
          label="Which playbook do you want?"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          options={options}
        />
        <EmailCaptureForm
          intent="guide_request"
          source="guides-waitlist"
          topic={label}
          buttonLabel="Notify me"
          successMessage="Thank you! We will send it as soon as it is ready."
          stacked
        />
      </div>
    </div>
  );
}
