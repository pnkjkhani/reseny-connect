import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui/card";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** How many columns a mega-menu needs (used for sizing and for deciding if it is "wide"). */
export function panelColumns(item: NavItem): number {
  const groupColumns = (item.groups ?? []).reduce((total, group) => total + (group.twoColumns ? 2 : 1), 0);
  return groupColumns + (item.feature ? 1 : 0);
}

/** Desktop dropdown content. Rendered on the server so every link is in the HTML. */
export function DesktopPanel({ item }: { item: NavItem }) {
  const columns = panelColumns(item);
  return (
    <div
      className="grid gap-x-6 gap-y-6 p-5 sm:p-6"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {item.groups?.map((group) => (
        <div key={group.title} className={cn("min-w-0", group.twoColumns && "col-span-2")}>
          <p className="mb-2 px-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-subtle-foreground uppercase">
            {group.title}
          </p>
          <ul className={cn("grid gap-0.5", group.twoColumns && "grid-cols-2")}>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-2 focus-visible:bg-surface-2"
                >
                  {link.icon ? <IconTile name={link.icon} size="sm" /> : null}
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug font-semibold text-foreground">{link.label}</span>
                    {link.description ? (
                      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{link.description}</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {group.all ? (
            <Link
              href={group.all.href}
              className="mt-2 ml-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text hover:underline"
            >
              {group.all.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          ) : null}
        </div>
      ))}
      {item.feature ? (
        <div className="flex flex-col justify-between rounded-2xl bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_60%,#4510c4_100%)] p-5 text-white">
          <div>
            <p className="text-base leading-snug font-bold">{item.feature.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#d9ceff]">{item.feature.body}</p>
          </div>
          <Link
            href={item.feature.cta.href}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline"
          >
            {item.feature.cta.label}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/** Mobile drawer content for one nav item: a flat list inside an accordion. */
export function MobilePanel({ item }: { item: NavItem }) {
  return (
    <div className="space-y-5 pb-4 pl-1">
      {item.groups?.map((group) => (
        <div key={group.title}>
          <p className="mb-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-subtle-foreground uppercase">{group.title}</p>
          <ul>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-2 py-2 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-surface-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
