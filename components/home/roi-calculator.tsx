"use client";

import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SelectField, TextField } from "@/components/ui/form-fields";
import { events, trackEvent } from "@/lib/analytics";
import {
  RESPONSE_TIME_OPTIONS,
  assumptionsFor,
  calculateRoi,
  type ResponseTime,
  type RoiAssumptions,
} from "@/lib/roi";
import { cn, formatINR } from "@/lib/utils";

const digitsOnly = (value: string) => value.replace(/[^\d]/g, "");
const toNumber = (value: string) => Number(value) || 0;
const toPercentString = (fraction: number) => String(Math.round(fraction * 100));

type AssumptionKey = "current" | "reseny" | "close";

const assumptionFields: { key: AssumptionKey; label: string; hint: string }[] = [
  { key: "current", label: "Leads you reach today (%)", hint: "Set from your response time. Edit it if you know your real figure." },
  { key: "reseny", label: "Leads reached with Reseny (%)", hint: "An illustrative figure: replace it with your own target." },
  { key: "close", label: "Reached leads that become customers (%)", hint: "Your own close rate on leads you do reach." },
];

/**
 * ROI calculator (SOP §7.4). Everything it assumes is shown and editable, and the result
 * is labelled as an estimate: the default rates are illustrative (see `lib/roi.ts`).
 */
export function RoiCalculator({
  variant = "full",
  className,
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const [leads, setLeads] = useState("300");
  const [dealValue, setDealValue] = useState("25000");
  const [responseTime, setResponseTime] = useState<ResponseTime>("next-day");
  const [overrides, setOverrides] = useState<Partial<Record<AssumptionKey, string>>>({});

  const base = assumptionsFor(responseTime);
  const shown: Record<AssumptionKey, string> = {
    current: overrides.current ?? toPercentString(base.currentContactRate),
    reseny: overrides.reseny ?? toPercentString(base.resenyContactRate),
    close: overrides.close ?? toPercentString(base.closeRate),
  };
  const assumptions: RoiAssumptions = {
    currentContactRate: toNumber(shown.current) / 100,
    resenyContactRate: toNumber(shown.reseny) / 100,
    closeRate: toNumber(shown.close) / 100,
  };
  const result = calculateRoi({ leadsPerMonth: toNumber(leads), dealValue: toNumber(dealValue) }, assumptions);
  const compact = variant === "compact";

  const track = () => trackEvent(events.roiCalculated, { variant, responseTime });

  return (
    <div className={cn("rounded-3xl border border-border bg-card p-5 shadow-pop sm:p-7", className)} onBlur={track}>
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <TextField
          label="Leads per month"
          inputMode="numeric"
          value={leads}
          onChange={(event) => setLeads(digitsOnly(event.target.value))}
        />
        <TextField
          label="Average deal value (₹)"
          inputMode="numeric"
          value={dealValue}
          onChange={(event) => setDealValue(digitsOnly(event.target.value))}
        />
        <SelectField
          label="How fast do you respond to a new lead today?"
          className={cn(!compact && "sm:col-span-2")}
          value={responseTime}
          onChange={(event) => {
            setResponseTime(event.target.value as ResponseTime);
            setOverrides((current) => ({ ...current, current: undefined }));
          }}
          options={RESPONSE_TIME_OPTIONS}
        />
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-6 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_60%,#4510c4_100%)] p-5 text-white sm:p-6"
      >
        <p className="text-xs font-bold tracking-[0.14em] text-[#c9b6ff] uppercase">Estimated extra revenue</p>
        <p className="mt-2 text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
          {formatINR(result.monthlyRevenue)}
          <span className="ml-2 text-base font-semibold tracking-normal text-[#c9b6ff]">per month</span>
        </p>
        <p className="mt-1 text-sm text-[#d9ceff]">about {formatINR(result.annualRevenue)} a year</p>
        {!compact ? (
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/15 pt-4 text-sm">
            <div>
              <dt className="text-[#c9b6ff]">More leads reached</dt>
              <dd className="mt-0.5 text-lg font-bold tabular-nums">≈ {Math.round(result.extraLeadsReached).toLocaleString("en-IN")} / month</dd>
            </div>
            <div>
              <dt className="text-[#c9b6ff]">More customers</dt>
              <dd className="mt-0.5 text-lg font-bold tabular-nums">≈ {result.extraCustomers.toFixed(1)} / month</dd>
            </div>
          </dl>
        ) : null}
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-text" />
        This is an estimate, not a guarantee. It is based on the illustrative assumptions you can edit
        {compact ? " on the full calculator" : " below"}, and the example numbers above: replace them with your own.
      </p>

      {compact ? (
        <Link
          href="/pricing/roi-calculator"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text hover:underline"
        >
          Adjust the assumptions
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      ) : (
        <details className="group mt-5 rounded-2xl border border-border bg-surface px-5">
          <summary className="flex items-center justify-between py-4 text-sm font-bold text-foreground">
            Assumptions behind this estimate
            <span aria-hidden className="text-primary-text transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="grid gap-4 pb-5 sm:grid-cols-3">
            {assumptionFields.map(({ key, label, hint }) => (
              <TextField
                key={key}
                label={label}
                hint={hint}
                inputMode="numeric"
                value={shown[key]}
                onChange={(event) =>
                  setOverrides((current) => ({
                    ...current,
                    [key]: String(Math.min(100, toNumber(digitsOnly(event.target.value)))),
                  }))
                }
              />
            ))}
          </div>
          <p className="border-t border-border pt-4 pb-5 text-xs leading-relaxed text-muted-foreground">
            Extra leads reached = leads × (reached with Reseny − reached today). Extra customers = extra leads reached ×
            close rate. Extra revenue = extra customers × average deal value.
          </p>
        </details>
      )}
    </div>
  );
}
