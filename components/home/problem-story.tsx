"use client";

import { AlertCircle, Bell, Hourglass, ListChecks, PhoneMissed, type LucideIcon } from "lucide-react";
import { problemCards } from "@/lib/content/home";
import { useCycle } from "@/lib/hooks/use-cycle";
import { useInView } from "@/lib/hooks/use-in-view";
import { cn } from "@/lib/utils";

/*
 * SOP §7.2 #3: "a short, animated counter story". The SOP also says counters must show
 * only real figures, so these are *illustrations* of the three problems (clearly labelled)
 * and carry no statistics. Real numbers belong in case studies once pilots finish.
 */

const COOLING_STAGES = [
  { label: "Just enquired", heat: 100 },
  { label: "After 5 minutes", heat: 74 },
  { label: "After an hour", heat: 42 },
  { label: "Next day", heat: 18 },
  { label: "Next week", heat: 6 },
] as const;

function CoolingLead() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  const stage = useCycle(COOLING_STAGES.length, { active: inView, intervalMs: 1000, holdSteps: 2 });
  const { label, heat } = COOLING_STAGES[stage];
  return (
    <div ref={ref} aria-hidden className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-foreground">{label}</span>
        <span className={cn("transition-colors duration-700", heat > 50 ? "text-orange" : "text-subtle-foreground")}>
          {heat > 50 ? "Hot lead" : heat > 15 ? "Cooling" : "Gone cold"}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${heat}%`,
            background: heat > 50 ? "linear-gradient(90deg,#f0892e,#d9467a)" : "#8f8aaf",
          }}
        />
      </div>
      <p className="text-xs text-subtle-foreground">Interest in your offer (illustration)</p>
    </div>
  );
}

const MISSED = ["Missed · 11:04 pm", "Missed · in a meeting", "Missed · Sunday"] as const;

function MissedCalls() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  const count = useCycle(MISSED.length + 1, { active: inView, intervalMs: 1000, holdSteps: 2 });
  return (
    <div ref={ref} aria-hidden className="flex h-full items-center gap-5">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-rose/12 text-rose">
          <PhoneMissed className={cn("size-7", count === 0 && "animate-ring-shake")} />
        </span>
        <span className="text-2xl font-extrabold text-foreground tabular-nums">{count}</span>
        <span className="text-[0.65rem] font-semibold tracking-wide text-subtle-foreground uppercase">Missed</span>
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {MISSED.slice(0, count).map((item) => (
          <li
            key={item}
            className="animate-pop-in rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground"
          >
            {item}
          </li>
        ))}
        {count === 0 ? <li className="text-sm text-subtle-foreground">Ringing, nobody free to answer…</li> : null}
      </ul>
    </div>
  );
}

const TASKS = ["Call back Rohan", "Send quote to Meera", "Check in with Arjun", "Confirm demo with Sana"] as const;

function ForgottenFollowUps() {
  const { ref, inView } = useInView<HTMLUListElement>({ once: false });
  const overdue = useCycle(TASKS.length + 1, { active: inView, intervalMs: 900, holdSteps: 2 });
  return (
    <ul ref={ref} aria-hidden className="flex h-full flex-col justify-center gap-2">
      {TASKS.map((task, index) => {
        const late = index < overdue;
        return (
          <li
            key={task}
            className={cn(
              "flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors duration-500",
              late ? "border-rose/40 bg-rose/8 text-foreground" : "border-border bg-card text-muted-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <Bell className="size-4 text-subtle-foreground" />
              {task}
            </span>
            {late ? (
              <span className="flex animate-pop-in items-center gap-1 text-xs font-bold text-rose">
                <AlertCircle className="size-3.5" />
                Overdue
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

const visuals = { wait: CoolingLead, missed: MissedCalls, forgotten: ForgottenFollowUps } as const;

/** Direct icon imports keep the shared icon registry out of this client bundle. */
const glyphs: Record<string, LucideIcon> = { wait: Hourglass, missed: PhoneMissed, forgotten: ListChecks };

export function ProblemStory() {
  return (
    <ul className="mt-14 grid gap-5 lg:grid-cols-3">
      {problemCards.map((card) => {
        const Visual = visuals[card.id as keyof typeof visuals];
        const Glyph = glyphs[card.id];
        return (
          <li key={card.id} className="reveal flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="h-48 rounded-2xl bg-surface p-4">
              <Visual />
            </div>
            <span className="mt-6 flex size-10 items-center justify-center rounded-xl bg-rose/12 text-rose">
              <Glyph aria-hidden className="size-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-foreground">{card.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{card.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
