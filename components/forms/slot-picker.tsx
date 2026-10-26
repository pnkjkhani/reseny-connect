"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchSlots, slotLabel, type Slot } from "@/lib/booking/slots";
import { cn } from "@/lib/utils";

export interface SelectedSlot {
  start: string;
  label: string;
}

/**
 * Day tabs plus a grid of times. Times are shown in IST and treated as the visitor's
 * requested slot (the team confirms it by WhatsApp and email until a live calendar is
 * connected: see `lib/booking/slots.ts`).
 */
export function SlotPicker({
  value,
  onChange,
  error,
}: {
  value: SelectedSlot | null;
  onChange: (slot: SelectedSlot) => void;
  error?: string;
}) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [pickedDay, setPickedDay] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSlots(Date.now()).then((result) => {
      if (!cancelled) setSlots(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const days = useMemo(() => {
    const unique = new Map<string, string>();
    for (const slot of slots ?? []) if (!unique.has(slot.dayKey)) unique.set(slot.dayKey, slot.dayLabel);
    return [...unique.entries()].map(([key, label]) => ({ key, label }));
  }, [slots]);

  if (!slots) {
    return <div aria-hidden className="h-44 animate-pulse rounded-2xl bg-surface-2" />;
  }
  if (slots.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
        No times are available right now. Choose &ldquo;Get a call now&rdquo; instead and we will fit you in.
      </p>
    );
  }

  const selectedDay = value ? slots.find((slot) => slot.start === value.start)?.dayKey : undefined;
  const activeDay = pickedDay ?? selectedDay ?? days[0]?.key;
  const times = slots.filter((slot) => slot.dayKey === activeDay);

  return (
    <fieldset aria-describedby={error ? "slot-error" : undefined}>
      <legend className="mb-2 text-sm font-semibold text-foreground">
        Preferred time <span className="font-normal text-subtle-foreground">(India Standard Time)</span>
      </legend>

      <div role="group" aria-label="Day" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {days.map((day) => (
          <button
            key={day.key}
            type="button"
            aria-pressed={day.key === activeDay}
            onClick={() => setPickedDay(day.key)}
            className={cn(
              "shrink-0 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors",
              day.key === activeDay
                ? "border-primary bg-primary-soft text-primary-text"
                : "border-input text-muted-foreground hover:border-primary/60",
            )}
          >
            {day.label}
          </button>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {times.map((slot) => (
          <label key={slot.start} className="relative block">
            <input
              type="radio"
              name="slot"
              value={slot.start}
              checked={value?.start === slot.start}
              onChange={() => onChange({ start: slot.start, label: slotLabel(slot) })}
              className="peer sr-only"
            />
            <span className="flex h-10 cursor-pointer items-center justify-center rounded-xl border border-input text-sm font-semibold text-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring hover:border-primary/60">
              {slot.timeLabel}
            </span>
          </label>
        ))}
      </div>

      {error ? (
        <p id="slot-error" role="alert" className="mt-2 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
