"use client";

import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { ThemeToggle } from "./theme-toggle";

export interface MobileNavItem {
  id: string;
  label: string;
  href?: string;
  /** Server-rendered list of links. Omit for a plain link. */
  panel?: ReactNode;
}

/**
 * Slide-in menu for screens below `lg`. Built on the native <dialog> (focus trap,
 * Escape and focus restoration included). It closes itself on navigation because the
 * open flag is tied to the pathname rather than reset in an effect.
 */
export function MobileNav({
  items,
  loginHref,
}: {
  items: MobileNavItem[];
  loginHref?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState({ open: false, path: pathname });
  const open = state.open && state.path === pathname;

  return (
    <>
      <button
        type="button"
        onClick={() => setState({ open: true, path: pathname })}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-2 lg:hidden"
      >
        <Menu aria-hidden className="size-6" />
      </button>

      <ModalDialog
        open={open}
        onClose={() => setState({ open: false, path: pathname })}
        labelledBy="mobile-nav-title"
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(100vw,24rem)] max-w-none"
      >
        <div className="flex h-dvh flex-col bg-background">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 id="mobile-nav-title" className="text-base font-bold text-foreground">
              Menu
            </h2>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setState({ open: false, path: pathname })}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-surface-2"
              >
                <X aria-hidden className="size-6" />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-3">
            <ul className="divide-y divide-border">
              {items.map((item) =>
                item.panel ? (
                  <li key={item.id}>
                    <details className="group">
                      <summary className="flex items-center justify-between py-4 text-base font-semibold text-foreground">
                        {item.label}
                        <ChevronDown aria-hidden className="size-5 text-subtle-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      {item.panel}
                    </details>
                  </li>
                ) : (
                  <li key={item.id}>
                    <Link href={item.href ?? "/"} className="block py-4 text-base font-semibold text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              {loginHref ? (
                <li>
                  <a href={loginHref} className="block py-4 text-base font-semibold text-foreground">
                    Log in
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-border bg-surface px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <ButtonLink href="/book-a-demo" size="lg" className="w-full">
              Book a demo
            </ButtonLink>
            <ButtonLink href="/get-a-call" variant="secondary" size="lg" className="w-full">
              <PhoneCall aria-hidden className="size-5" />
              Get a call now
            </ButtonLink>
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
