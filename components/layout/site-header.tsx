import { PhoneCall } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { headerCtas, mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { DesktopNav, type DesktopNavItem } from "./desktop-nav";
import { MobileNav, type MobileNavItem } from "./mobile-nav";
import { DesktopPanel, MobilePanel, panelColumns } from "./nav-panels";
import { ThemeToggle } from "./theme-toggle";

const toId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * Sticky site header (SOP §6.3: a persistent "Book a demo" button plus "Get a call now").
 * A Server Component: the mega-menu panels are rendered here and handed to the small
 * client components that only manage open/close state.
 */
export function SiteHeader() {
  const desktopItems: DesktopNavItem[] = mainNav.map((item, index) => {
    const columns = panelColumns(item);
    return {
      align: index >= mainNav.length - 2 ? "right" : "left",
      id: toId(item.label),
      label: item.label,
      href: item.href,
      wide: columns >= 3,
      columns,
      panel: item.groups ? <DesktopPanel item={item} /> : undefined,
    };
  });

  const mobileItems: MobileNavItem[] = mainNav.map((item) => ({
    id: toId(item.label),
    label: item.label,
    href: item.href,
    panel: item.groups ? <MobilePanel item={item} /> : undefined,
  }));

  const loginHref = siteConfig.links.app;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page relative flex h-16 items-center gap-3 lg:h-18">
        <Logo preload />
        <div className="ml-4 hidden lg:block">
          <DesktopNav items={desktopItems} />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {loginHref ? (
            <a
              href={loginHref}
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2 xl:inline-flex"
            >
              Log in
            </a>
          ) : null}
          <ThemeToggle className="hidden lg:inline-flex" />
          <ButtonLink href={headerCtas.secondary.href} variant="secondary" size="sm" className="hidden xl:inline-flex">
            <PhoneCall aria-hidden className="size-4" />
            {headerCtas.secondary.label}
          </ButtonLink>
          <ButtonLink href={headerCtas.primary.href} size="sm" className="hidden min-[360px]:inline-flex">
            {headerCtas.primary.label}
          </ButtonLink>
          <MobileNav items={mobileItems} loginHref={loginHref} />
        </div>
      </div>
    </header>
  );
}
