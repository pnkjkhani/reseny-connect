"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { applyTheme, currentTheme, persistTheme, readStoredTheme, systemTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch. Both icons are always rendered and CSS picks the right one from
 * `data-theme`, so the button is correct from the very first paint (the server cannot
 * know the visitor's theme) and nothing flashes or mismatches on hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // React Strict Mode (dev only) remounts and clears attributes set by the inline
  // script; re-apply before paint. No-op in production.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme() ?? systemTheme());
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    persistTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-2",
        className,
      )}
    >
      <Sun aria-hidden className="size-5 dark:hidden" />
      <Moon aria-hidden className="hidden size-5 dark:block" />
    </button>
  );
}
