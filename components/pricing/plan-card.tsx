import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import type { Plan } from "@/lib/content/pricing";
import { cn, formatINR } from "@/lib/utils";

/**
 * A pricing tier (SOP §7.4: "clear tiers, what is included, and what is custom"). Shows the
 * price when one is set in `lib/content/pricing.ts`, otherwise "Get a quote".
 */
export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-card p-6 shadow-card sm:p-7",
        plan.featured ? "border-primary shadow-pop ring-1 ring-primary/40" : "border-border",
      )}
    >
      {plan.featured ? (
        <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow">
          Most popular
        </span>
      ) : null}

      <h3 className="text-xl font-extrabold text-foreground">{plan.name}</h3>
      <p className="mt-1 text-sm font-medium text-primary-text">{plan.tagline}</p>
      <p className="mt-3 min-h-10 text-sm leading-snug text-muted-foreground">{plan.forWho}</p>

      <div className="mt-5 min-h-29 border-y border-border py-5">
        {plan.price ? (
          <p className="flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold tracking-tight text-foreground">{formatINR(plan.price.amount)}</span>
            <span className="text-sm text-muted-foreground">{plan.price.unit}</span>
          </p>
        ) : (
          <p className="text-3xl font-extrabold tracking-tight text-foreground">Get a quote</p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">{plan.priceNote}</p>
      </div>

      <div className="mt-5 flex-1">
        <CheckList items={plan.features} tone={plan.featured ? "primary" : "success"} className="space-y-2.5 text-sm" />
        {plan.custom.length > 0 ? (
          <div className="mt-6">
            <p className="text-xs font-bold tracking-wider text-subtle-foreground uppercase">Scoped with you</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {plan.custom.map((item) => (
                <li key={item} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <ButtonLink
        href={plan.cta.href}
        variant={plan.featured ? "primary" : "secondary"}
        size="lg"
        className="mt-7 w-full"
      >
        {plan.cta.label}
      </ButtonLink>
    </article>
  );
}
