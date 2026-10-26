import { ChevronDown } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { COUNTRY_CODES } from "@/lib/leads/phone";
import { cn } from "@/lib/utils";

export const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/30";

interface FieldChrome {
  label: string;
  error?: string;
  hint?: string;
  /** Shows a required asterisk. */
  required?: boolean;
  /** Shows "(optional)" instead. */
  optional?: boolean;
  className?: string;
}

function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: FieldChrome & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span aria-hidden className="text-danger">
            {" "}
            *
          </span>
        ) : null}
        {optional ? <span className="font-normal text-subtle-foreground"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

export function TextField({
  label,
  error,
  hint,
  required,
  optional,
  className,
  id: idProp,
  ...props
}: FieldChrome & Omit<ComponentProps<"input">, "className">) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={optional} className={className}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={inputClass}
        {...props}
      />
    </FieldShell>
  );
}

export function TextareaField({
  label,
  error,
  hint,
  required,
  optional,
  className,
  id: idProp,
  ...props
}: FieldChrome & Omit<ComponentProps<"textarea">, "className">) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={optional} className={className}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputClass, "h-auto min-h-28 py-3 leading-relaxed")}
        {...props}
      />
    </FieldShell>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export function SelectField({
  label,
  error,
  hint,
  required,
  optional,
  className,
  id: idProp,
  options,
  placeholder,
  ...props
}: FieldChrome &
  Omit<ComponentProps<"select">, "className"> & {
    options: readonly SelectOption[];
    placeholder?: string;
  }) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={optional} className={className}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(inputClass, "appearance-none pr-10")}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-subtle-foreground" />
      </div>
    </FieldShell>
  );
}

export interface PhoneValue {
  dial: string;
  national: string;
}

/** Country-code select + number input. The combined value is validated and normalised by the lead schema. */
export function PhoneField({
  label = "Mobile number",
  value,
  onChange,
  error,
  hint,
  required = true,
  className,
  id: idProp,
  autoFocus,
}: {
  label?: string;
  value: PhoneValue;
  onChange: (next: PhoneValue) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  id?: string;
  autoFocus?: boolean;
}) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} optional={!required} className={className}>
      <div className="flex gap-2">
        <div className="relative w-28 shrink-0">
          <select
            aria-label="Country code"
            value={value.dial}
            onChange={(event) => onChange({ ...value, dial: event.target.value })}
            className={cn(inputClass, "appearance-none pr-8 pl-3")}
          >
            {COUNTRY_CODES.map((country) => (
              <option key={country.code} value={country.dial}>
                {country.code} {country.dial}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-subtle-foreground" />
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="98765 43210"
          value={value.national}
          onChange={(event) => onChange({ ...value, national: event.target.value })}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(inputClass, "min-w-0 flex-1")}
        />
      </div>
    </FieldShell>
  );
}

export function CheckboxField({
  label,
  error,
  checked,
  onChange,
  className,
  id: idProp,
  name,
}: {
  label: ReactNode;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  id?: string;
  name?: string;
}) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-md border border-input accent-[var(--primary)] aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-danger"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 pl-8 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Spam trap: invisible to people, tempting to bots. The server rejects submissions where it is filled. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company website
        <input
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm font-medium text-danger">
      {children}
    </p>
  );
}
