"use client";

import { Bot, Check, MessageCircle } from "lucide-react";
import { Waveform } from "@/components/ui/waveform";
import { useCycle } from "@/lib/hooks/use-cycle";
import { useInView } from "@/lib/hooks/use-in-view";
import { formatClock } from "@/lib/utils";
import { cn } from "@/lib/utils";

/** A fictional call, shown as it would unfold. Illustrative, not a recording. */
const script = [
  { from: "agent", text: "Hi Priya, this is Reseny's AI assistant calling from CareFirst Clinic. Is now a good time?" },
  { from: "lead", text: "Yes, go ahead." },
  { from: "agent", text: "Are you looking for a check-up or a specific treatment?" },
  { from: "lead", text: "A check-up, this week." },
  { from: "agent", text: "I have Thursday at 6:30 PM. Shall I book it?" },
  { from: "lead", text: "Yes please." },
] as const;

const BOOKED_STEP = script.length; // calendar tile flips
const CONFIRMED_STEP = script.length + 1; // WhatsApp confirmation appears
const STEP_COUNT = script.length + 2;
const INTERVALS = [1100, 1500, 1500, 1500, 1500, 1500, 1700, 3200] as const;

/**
 * Hero-style animation from SOP §8: a phone shows a call in progress, speech bubbles
 * appear, and a calendar tile flips to "Booked". Loops while on screen; with reduced
 * motion it shows the finished state. Decorative: described once for screen readers.
 */
export function PhoneMockup({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.35 });
  const step = useCycle(STEP_COUNT, { active: inView, intervalMs: INTERVALS, holdSteps: 1 });
  const visible = script.slice(0, Math.min(step + 1, script.length));
  const booked = step >= BOOKED_STEP;
  const confirmed = step >= CONFIRMED_STEP;
  const speaking = step < BOOKED_STEP;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: Reseny's AI agent calls a lead called Priya, asks a few questions, and books an appointment for Thursday at 6:30 PM. A WhatsApp confirmation follows."
      className={cn("relative mx-auto w-[17.5rem] sm:w-[19rem]", className)}
    >
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-brand opacity-[0.14] blur-3xl" />
      <div aria-hidden className="rounded-[2.75rem] border-[9px] border-[#171230] bg-[#171230] shadow-pop dark:border-[#2c2358]">
        <div className="relative h-[33rem] overflow-hidden rounded-[2.1rem] bg-background">
          <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#171230] dark:bg-[#2c2358]" />

          {/* Call header */}
          <div className="flex items-center gap-3 border-b border-border bg-surface px-4 pt-10 pb-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <Bot className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">Reseny AI · CareFirst Clinic</p>
              <p className="text-xs text-muted-foreground">
                {booked ? "Call complete" : "On call"} · {formatClock(booked ? 41 : 4 + step * 6)}
              </p>
            </div>
            <Waveform active={speaking} bars={9} className="h-5 w-12 shrink-0 text-primary" />
          </div>

          {/* Conversation */}
          <div className="flex h-[17.5rem] flex-col justify-end gap-2 overflow-hidden px-3 py-3 [mask-image:linear-gradient(to_bottom,transparent,#000_14%)]">
            {visible.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[85%] animate-pop-in rounded-2xl px-3 py-2 text-[0.8rem] leading-snug",
                  message.from === "agent"
                    ? "self-start rounded-bl-md bg-primary-soft text-foreground"
                    : "self-end rounded-br-md bg-primary text-primary-foreground",
                )}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Calendar tile: flips to "Booked" */}
          <div className="px-3">
            <div className="relative h-[5.5rem] [perspective:900px]">
              <div
                className="relative size-full transition-transform duration-700 [transform-style:preserve-3d]"
                style={{ transform: booked ? "rotateX(180deg)" : "none" }}
              >
                <div className="absolute inset-0 flex items-center gap-3 rounded-2xl border-2 border-dashed border-border-strong bg-surface px-4 [backface-visibility:hidden]">
                  <span className="flex size-11 flex-col items-center justify-center rounded-xl bg-card text-center leading-none shadow-sm">
                    <span className="text-[0.6rem] font-bold text-rose uppercase">Thu</span>
                    <span className="text-base font-extrabold text-foreground">24</span>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">6:30 PM · Check-up</p>
                    <p className="text-xs text-muted-foreground">Open slot</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex [transform:rotateX(180deg)] items-center gap-3 rounded-2xl bg-success px-4 text-white [backface-visibility:hidden] dark:text-[#07140e]">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/20">
                    <Check className="size-6" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">Booked</p>
                    <p className="text-xs opacity-90">Thu · 6:30 PM · Check-up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow-up confirmation */}
          <div className="px-3 pt-2">
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-500",
                confirmed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              <MessageCircle className="size-4 text-green" />
              WhatsApp confirmation sent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
