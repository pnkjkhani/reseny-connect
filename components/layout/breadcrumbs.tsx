import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail plus BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={cn("font-semibold text-foreground")}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="transition-colors hover:text-primary-text">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5 text-subtle-foreground" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items.map((item) => ({ name: item.name, path: item.href })))} />
    </>
  );
}
