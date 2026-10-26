import { describe, expect, it } from "vitest";
import { buildSlots } from "./slots";

/** Intl may use a narrow no-break space before AM/PM; normalise so assertions are stable. */
const plain = (value: string) => value.replace(/\s/g, " ");

// Monday 26 Oct 2026, 10:00 IST (04:30 UTC).
const MONDAY_10AM_IST = Date.UTC(2026, 9, 26, 4, 30);
// Friday 30 Oct 2026, 17:00 IST (11:30 UTC): no bookable time is left that day.
const FRIDAY_5PM_IST = Date.UTC(2026, 9, 30, 11, 30);

const EXPECTED_TIMES = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

describe("buildSlots", () => {
  it("starts after the lead time and expresses slots as exact instants", () => {
    const [first] = buildSlots(MONDAY_10AM_IST);
    expect(first.start).toBe("2026-10-26T06:30:00.000Z"); // 12:00 IST, two hours after "now"
    expect(first.dayKey).toBe("2026-10-26");
    expect(plain(first.timeLabel)).toBe("12:00 PM");
  });

  it("offers seven weekdays and never a weekend", () => {
    const days = [...new Set(buildSlots(MONDAY_10AM_IST).map((slot) => slot.dayKey))];
    expect(days).toHaveLength(7);
    expect(days).toEqual([...days].sort());
    for (const day of days) {
      const weekday = new Date(`${day}T00:00:00Z`).getUTCDay();
      expect([0, 6]).not.toContain(weekday);
    }
  });

  it("skips to Monday when the working day is already over", () => {
    const [first] = buildSlots(FRIDAY_5PM_IST);
    expect(first.dayKey).toBe("2026-11-02");
    expect(plain(first.timeLabel)).toBe("10:00 AM");
  });

  it("only produces half-hourly times inside business hours", () => {
    for (const slot of buildSlots(MONDAY_10AM_IST)) {
      expect(EXPECTED_TIMES).toContain(plain(slot.timeLabel));
    }
  });

  it("never returns a time earlier than the lead time", () => {
    const now = MONDAY_10AM_IST;
    for (const slot of buildSlots(now)) {
      expect(Date.parse(slot.start)).toBeGreaterThanOrEqual(now + 2 * 3_600_000);
    }
  });
});
