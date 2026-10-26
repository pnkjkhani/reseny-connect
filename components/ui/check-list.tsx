import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** A tidy list with check marks. `tone` colours the marks. */
export function CheckList({
  items,
  tone = "success",
  className,
}: {
  items: readonly string[];
  tone?: "success" | "primary";
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
          <span
            className={cn(
              "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "success" ? "bg-success-soft text-success" : "bg-primary-soft text-primary-text",
            )}
          >
            <Check aria-hidden className="size-3.5" strokeWidth={3} />
          </span>
          <span className="text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}
