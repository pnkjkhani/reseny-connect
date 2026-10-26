import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}

type Tone = "default" | "subtle" | "brand";

const tones: Record<Tone, string> = {
  default: "bg-background",
  subtle: "bg-surface",
  brand: "bg-[linear-gradient(135deg,#14092f_0%,#2b0f73_55%,#4510c4_100%)] text-white",
};

interface SectionProps extends ComponentProps<"section"> {
  tone?: Tone;
  /** Vertical rhythm. */
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
};

/**
 * A full-width page band. Give it an `aria-label` (not `aria-labelledby`: Next keeps previous routes
 * mounted but hidden, so heading ids can collide across pages) to expose it as a named landmark.
 */
export function Section({ tone = "default", size = "md", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("relative", tones[tone], sizes[size], className)} {...props}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  /** For dark bands. */
  inverse?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase",
        inverse ? "text-[#c9b6ff]" : "text-primary-text",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", inverse ? "bg-[#c9b6ff]" : "bg-primary")} />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Heading level. Page titles use "h1" via PageHero instead. */
  as?: "h2" | "h3";
  inverse?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "mt-3 text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          inverse ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            inverse ? "text-[#d9ceff]" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
