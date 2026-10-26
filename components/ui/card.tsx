import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

/** Base surface for content cards. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-2xl border border-border bg-card shadow-card", className)} {...props} />;
}

type Tone = "primary" | "rose" | "orange" | "green" | "amber";

const tones: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary-text",
  rose: "bg-rose/12 text-rose",
  orange: "bg-orange/14 text-orange",
  green: "bg-green/14 text-green",
  amber: "bg-amber/16 text-[#8a6500] dark:text-amber",
};

/** Rounded tile that holds an icon. */
export function IconTile({
  name,
  tone = "primary",
  size = "md",
  className,
}: {
  name: IconName;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = { sm: "size-9 rounded-lg", md: "size-11 rounded-xl", lg: "size-14 rounded-2xl" }[size];
  const glyph = { sm: "size-4.5", md: "size-5.5", lg: "size-7" }[size];
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center", box, tones[tone], className)}>
      <Icon name={name} className={glyph} strokeWidth={1.9} />
    </span>
  );
}
