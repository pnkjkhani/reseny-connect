"use client";

import { ArrowRight, Calculator, Headphones, Rocket, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { events, trackEvent } from "@/lib/analytics";

const SESSION_KEY = "reseny:exit-intent";
/** Never interrupt people who are already converting. */
const SUPPRESSED_ON = ["/book-a-demo", "/get-a-call", "/start-pilot", "/thank-you", "/lp/"];
/** Visitors must spend a moment on the page before the offer can appear. */
const ARM_DELAY_MS = 8_000;

const options = [
  { href: "/start-pilot", icon: Rocket, title: "Start a free pilot", body: "Try Reseny on a slice of your real leads." },
  { href: "/pricing/roi-calculator", icon: Calculator, title: "Get your ROI estimate", body: "See what faster follow-up could be worth." },
  { href: "/resources/sample-calls", icon: Headphones, title: "Hear a sample call", body: "Synthetic example calls for every sector." },
] as const;

/**
 * Exit-intent offer (SOP §6.3: free pilot, ROI report or sample call). Desktop pointers
 * only, once per session, never on conversion pages, and only after a short dwell, so it
 * reads as help rather than an interruption.
 */
export function ExitIntentOffer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const enabled = !SUPPRESSED_ON.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    if (!enabled) return;
    // Touch devices have no cursor to "leave" with.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const onMouseOut = (event: MouseEvent) => {
      // Cursor left through the top edge of the window.
      if (!armed || event.clientY > 0 || event.relatedTarget) return;
      try {
        if (window.sessionStorage.getItem(SESSION_KEY)) return;
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Storage blocked: fall through and show once per page view.
      }
      trackEvent(events.exitIntentShown, { page: window.location.pathname });
      setOpen(true);
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [enabled]);

  return (
    <ModalDialog open={open} onClose={() => setOpen(false)} labelledBy="exit-intent-title" className="max-w-xl p-4">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-pop sm:p-8">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-rainbow" />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2"
        >
          <X aria-hidden className="size-5" />
        </button>
        <h2 id="exit-intent-title" className="pr-10 text-2xl font-extrabold tracking-tight text-foreground">
          Before you go: see Reseny on your own leads
        </h2>
        <p className="mt-2 text-muted-foreground">Pick whichever is most useful. No pressure.</p>
        <ul className="mt-6 grid gap-3">
          {options.map(({ href, icon: OptionIcon, title, body }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-primary hover:bg-primary-soft"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
                  <OptionIcon aria-hidden className="size-5.5" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold text-foreground">{title}</span>
                  <span className="block text-sm text-muted-foreground">{body}</span>
                </span>
                <ArrowRight aria-hidden className="size-5 text-subtle-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary-text" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ModalDialog>
  );
}
