/**
 * Demo-slot generation for the booking form.
 *
 * There is no live calendar behind the site yet, so slots are generated from
 * business hours and presented as the visitor's *requested* time. When a real
 * availability source exists (Google/Outlook/Cal.com), replace `fetchSlots` below and
 * nothing else needs to change: the picker only depends on the `Slot` shape.
 *
 * Pure date maths (no `Date.now()`): `buildSlots` takes `nowMs`, so it is
 * deterministic and unit-testable.
 */

const IST_OFFSET_MS = 330 * 60_000;
const IST = "Asia/Kolkata";

export interface Slot {
  /** ISO 8601 instant. */
  start: string;
  /** `2026-10-27`, the IST calendar day. */
  dayKey: string;
  /** `Tue, 27 Oct`. */
  dayLabel: string;
  /** `4:30 PM`. */
  timeLabel: string;
}

export interface SlotOptions {
  days: number;
  startHour: number;
  endHour: number;
  stepMinutes: number;
  /** Earliest bookable moment after `now`. */
  leadTimeHours: number;
  weekdaysOnly: boolean;
}

export const DEFAULT_SLOT_OPTIONS: SlotOptions = {
  days: 7,
  startHour: 10,
  endHour: 18,
  stepMinutes: 30,
  leadTimeHours: 2,
  weekdaysOnly: true,
};

const dayFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: IST,
  weekday: "short",
  day: "numeric",
  month: "short",
});
const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: IST,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function buildSlots(nowMs: number, options: Partial<SlotOptions> = {}): Slot[] {
  const { days, startHour, endHour, stepMinutes, leadTimeHours, weekdaysOnly } = {
    ...DEFAULT_SLOT_OPTIONS,
    ...options,
  };
  const earliest = nowMs + leadTimeHours * 3_600_000;
  // Shift into IST, then read the calendar fields with the UTC getters.
  const istNow = new Date(nowMs + IST_OFFSET_MS);
  const slots: Slot[] = [];
  let daysWithSlots = 0;

  // Look at most two weeks ahead so weekends and a late-in-the-day "now" cannot loop forever.
  for (let offset = 0; offset < 14 && daysWithSlots < days; offset++) {
    const day = new Date(
      Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate() + offset),
    );
    const weekday = day.getUTCDay();
    if (weekdaysOnly && (weekday === 0 || weekday === 6)) continue;

    const dayKey = `${day.getUTCFullYear()}-${String(day.getUTCMonth() + 1).padStart(2, "0")}-${String(day.getUTCDate()).padStart(2, "0")}`;
    let added = 0;
    for (let minutes = startHour * 60; minutes < endHour * 60; minutes += stepMinutes) {
      const startMs =
        Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), 0, minutes) - IST_OFFSET_MS;
      if (startMs < earliest) continue;
      const start = new Date(startMs);
      slots.push({
        start: start.toISOString(),
        dayKey,
        dayLabel: dayFormatter.format(start),
        timeLabel: timeFormatter.format(start).toUpperCase(),
      });
      added++;
    }
    if (added > 0) daysWithSlots++;
  }
  return slots;
}

/** Swap this for a real calendar lookup when one is available. */
export async function fetchSlots(nowMs: number): Promise<Slot[]> {
  return buildSlots(nowMs);
}

/** Human label stored with the booking, e.g. `Tue, 27 Oct, 4:30 PM IST`. */
export function slotLabel(slot: Slot): string {
  return `${slot.dayLabel}, ${slot.timeLabel} IST`;
}
