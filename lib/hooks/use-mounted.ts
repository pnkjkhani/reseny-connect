"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during server rendering and hydration, `true` afterwards. Lets a component
 * render browser-only state (stored drafts, the current time) without a hydration
 * mismatch and without a setState-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
