"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DesktopNavItem {
  id: string;
  label: string;
  href?: string;
  /** Wide panels centre under the whole header; narrow ones hang from their trigger. */
  wide?: boolean;
  /** Which edge of the trigger a narrow panel aligns to: use "right" near the end of the nav so it stays on screen. */
  align?: "left" | "right";
  /** Server-rendered dropdown content. Omit for a plain link. */
  panel?: ReactNode;
  columns?: number;
}

const CLOSE_DELAY_MS = 140;

const isActive = (pathname: string, href?: string) =>
  Boolean(href) && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

/**
 * Desktop navigation with mega-menus. This component owns only the open/close state:
 * the panels arrive as server-rendered children, so every link is in the initial HTML.
 * Opens on hover (mouse) or click/Enter/Space; closes on Escape, outside click, focus
 * leaving the item, or navigation.
 */
export function DesktopNav({ items }: { items: DesktopNavItem[] }) {
  const pathname = usePathname();
  // Tie the open menu to the pathname so navigating closes it, without an effect.
  const [state, setState] = useState<{ id: string | null; path: string }>({ id: null, path: pathname });
  const openId = state.path === pathname ? state.id : null;
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);

  const open = (id: string) => {
    window.clearTimeout(closeTimer.current);
    setState({ id, path: pathname });
  };
  const close = () => setState({ id: null, path: pathname });
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(close, CLOSE_DELAY_MS);
  };

  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setState({ id: null, path: pathname });
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openId, pathname]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          if (!item.panel) {
            return (
              <li key={item.id}>
                <Link
                  href={item.href ?? "/"}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-surface-2",
                    active ? "text-primary-text" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openId === item.id;
          return (
            <li
              key={item.id}
              className={item.wide ? "static" : "relative"}
              onPointerEnter={(event) => event.pointerType === "mouse" && open(item.id)}
              onPointerLeave={(event) => event.pointerType === "mouse" && scheduleClose()}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                  close();
                  event.currentTarget.querySelector<HTMLElement>("button")?.focus();
                }
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`nav-panel-${item.id}`}
                onClick={() => (isOpen ? close() : open(item.id))}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-surface-2",
                  active || isOpen ? "text-primary-text" : "text-foreground",
                )}
              >
                {item.label}
                <ChevronDown
                  aria-hidden
                  className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
              <div
                id={`nav-panel-${item.id}`}
                inert={!isOpen}
                style={{ width: `min(calc(100vw - 2rem), ${Math.max(22, (item.columns ?? 1) * 15)}rem)` }}
                className={cn(
                  "absolute top-full z-50 pt-3 transition-[opacity,transform,visibility] duration-200",
                  item.wide ? "right-0 left-0 mx-auto" : item.align === "right" ? "right-0" : "left-0",
                  isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                )}
              >
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-pop">{item.panel}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
