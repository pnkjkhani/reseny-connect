import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui/card";
import { solutionHref } from "@/lib/content/solutions";
import type { Solution } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/** Linked cards for a list of solution pages (industries, use cases or team sizes). */
export function SolutionGrid({ items, className }: { items: Solution[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <li key={`${item.category}-${item.slug}`}>
          <Link
            href={solutionHref(item)}
            className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop"
          >
            <IconTile
              name={item.icon}
              size="lg"
              className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            />
            <h3 className="mt-5 text-lg leading-snug font-bold text-foreground">{item.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-text">
              Explore
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
