"use client";

import { CalendarCheck, Mail, MessageCircle, PhoneCall, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Pages that already are the conversion, so the widget would only add noise. */
const HIDDEN_ON = ["/book-a-demo", "/get-a-call", "/start-pilot", "/thank-you"];

/**
 * Floating "talk to us" widget (SOP §6.3: "chat and call option"). Offers an AI call and a
 * booking, plus WhatsApp chat and email when those contact details are configured.
 */
export function FloatingContact() {
  const pathname = usePathname();
  const [state, setState] = useState({ open: false, path: pathname });
  const open = state.open && state.path === pathname;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setState({ open: false, path: pathname });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setState({ open: false, path: pathname });
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, pathname]);

  if (HIDDEN_ON.some((prefix) => pathname.startsWith(prefix))) return null;

  const { whatsappUrl, salesEmail } = siteConfig.contact;
  const itemClass =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2";

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] sm:right-6 sm:bottom-6"
    >
      <div
        id="floating-contact-menu"
        role="menu"
        aria-label="Talk to Reseny"
        inert={!open}
        className={cn(
          "w-64 origin-bottom-right rounded-2xl border border-border bg-card p-2 shadow-pop transition-[opacity,transform,visibility] duration-200",
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <Link role="menuitem" href="/get-a-call" className={itemClass}>
          <PhoneCall aria-hidden className="size-5 text-primary-text" />
          Get a call from Reseny now
        </Link>
        <Link role="menuitem" href="/book-a-demo" className={itemClass}>
          <CalendarCheck aria-hidden className="size-5 text-primary-text" />
          Book a demo
        </Link>
        {whatsappUrl ? (
          <a role="menuitem" href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={itemClass}>
            <MessageCircle aria-hidden className="size-5 text-green" />
            Chat on WhatsApp
          </a>
        ) : null}
        {salesEmail ? (
          <a role="menuitem" href={`mailto:${salesEmail}`} className={itemClass}>
            <Mail aria-hidden className="size-5 text-primary-text" />
            Email sales
          </a>
        ) : null}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="floating-contact-menu"
        onClick={() => setState({ open: !open, path: pathname })}
        className="inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-5 text-sm font-bold text-primary-foreground shadow-glow transition-[filter,transform] hover:brightness-110 active:scale-95"
      >
        {open ? <X aria-hidden className="size-5" /> : <PhoneCall aria-hidden className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Talk to Reseny"}</span>
        <span className="sr-only sm:hidden">{open ? "Close menu" : "Talk to Reseny"}</span>
      </button>
    </div>
  );
}
