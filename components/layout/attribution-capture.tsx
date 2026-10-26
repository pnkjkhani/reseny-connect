"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records first-touch campaign tags once per session so forms can attach them to leads. Renders nothing. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
