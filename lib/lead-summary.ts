"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Remembers what the visitor just submitted so the thank-you page can confirm it
 * ("You're booked for Tue, 27 Oct, 4:30 PM IST"). Session-only, and contains no more
 * than the visitor typed a moment ago.
 */
const KEY = "reseny:last-lead";

export interface LeadSummary {
  intent: string;
  name?: string;
  phone?: string;
  email?: string;
  slotLabel?: string;
  language?: string;
}

export function saveLeadSummary(summary: LeadSummary) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(summary));
  } catch {
    // Storage blocked: the thank-you page simply shows its generic message.
  }
}

const subscribe = () => () => {};

function readRaw(): string | null {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function useLeadSummary(): LeadSummary | null {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  return useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as LeadSummary;
    } catch {
      return null;
    }
  }, [raw]);
}
