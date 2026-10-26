import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,box-shadow,transform,color,border-color,filter] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-primary-foreground shadow-glow hover:brightness-110 hover:shadow-[0_16px_38px_-8px_rgb(92_23_233/0.7)]",
  secondary:
    "border border-border-strong bg-card text-foreground hover:border-primary hover:text-primary-text",
  ghost: "text-foreground hover:bg-surface-2",
  light: "bg-white text-[#2a0f73] shadow-lg hover:bg-white/90",
  "outline-light": "border border-white/35 text-white hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** A link that looks like a button. Internal paths use next/link; others a plain anchor. */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & StyleProps & { href: string }) {
  const classes = buttonStyles({ variant, size, className });
  if (isExternal(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(props as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}
