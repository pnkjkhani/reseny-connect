import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { enterpriseBenefits, smallBusiness } from "@/lib/content/home";

/** "For small businesses" band (SOP §7.2 #8), with a nod to larger teams (SOP §5.4). */
export function SmallBusinessBand() {
  return (
    <Section tone="subtle" aria-label={smallBusiness.title}>
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Eyebrow>{smallBusiness.eyebrow}</Eyebrow>
          <h2
            className="mt-3 text-3xl leading-[1.12] font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            {smallBusiness.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{smallBusiness.body}</p>

          <p className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-brand px-5 py-3 text-primary-foreground shadow-glow">
            <span className="text-2xl font-extrabold">{smallBusiness.promise}</span>
            <span className="text-sm font-medium text-white/85">with a ready template for your profession</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/solutions/teams/small-business" size="lg">
              See the small-business page
            </ButtonLink>
            <ButtonLink href="/start-pilot" variant="secondary" size="lg">
              Start a free pilot
            </ButtonLink>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-bold text-foreground">Running a larger operation?</p>
            <ul className="mt-3 space-y-2">
              {enterpriseBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                  {benefit}
                </li>
              ))}
            </ul>
            <ButtonLink href="/solutions/teams/enterprise" variant="ghost" size="sm" className="mt-3 -ml-2 text-primary-text">
              Enterprise and mid-market →
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {smallBusiness.benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className="reveal rounded-3xl border border-border bg-card p-6 shadow-card first:sm:col-span-2"
              style={{ animationRange: `entry ${index * 5}% entry ${75 + index * 5}%` }}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-success-soft text-success">
                <Check aria-hidden className="size-5" strokeWidth={2.5} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">{benefit.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
