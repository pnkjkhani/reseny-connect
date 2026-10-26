"use client";

import { Check, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Waveform } from "@/components/ui/waveform";
import { events, trackEvent } from "@/lib/analytics";
import type { SampleCall } from "@/lib/content/types";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface SampleCallItem {
  call: SampleCall;
  /** A server-rendered icon element: passing the element (not a name) keeps the icon registry out of this bundle. */
  icon: ReactNode;
}

/** How long a line stays on screen before the next appears: longer lines take longer to "speak". */
const lineDelay = (text: string) => 800 + Math.min(2400, text.length * 26);

type HeadingLevel = "h2" | "h3";

function SampleCallCard({
  call,
  icon,
  active,
  onActivate,
  Heading,
}: {
  call: SampleCall;
  icon: ReactNode;
  active: boolean;
  onActivate: () => void;
  Heading: HeadingLevel;
}) {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState({ playing: false, shown: 0 });
  const transcriptRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const total = call.lines.length;
  const playing = active && state.playing;
  const shown = active ? state.shown : 0;
  const finished = active && !state.playing && state.shown >= total;

  // Without a recording, "play" reveals the transcript line by line on a timer.
  useEffect(() => {
    if (!playing || call.audioSrc || state.shown >= total) return;
    const timer = window.setTimeout(() => {
      setState((current) =>
        current.shown + 1 >= total
          ? { playing: false, shown: total }
          : { ...current, shown: current.shown + 1 },
      );
    }, lineDelay(call.lines[state.shown - 1]?.text ?? ""));
    return () => window.clearTimeout(timer);
  }, [playing, state.shown, total, call]);

  // Keep the newest line in view.
  useEffect(() => {
    const element = transcriptRef.current;
    if (element) element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  }, [shown]);

  function start() {
    onActivate();
    trackEvent(events.sampleCallPlay, { id: call.id });
    if (reducedMotion && !call.audioSrc) {
      setState({ playing: false, shown: total });
      return;
    }
    setState({ playing: true, shown: 1 });
    if (call.audioSrc && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => setState({ playing: false, shown: total }));
    }
  }

  function toggle() {
    if (!active || finished || state.shown === 0) return start();
    if (playing) {
      setState((current) => ({ ...current, playing: false }));
      audioRef.current?.pause();
    } else {
      setState((current) => ({ ...current, playing: true }));
      if (call.audioSrc) void audioRef.current?.play();
    }
  }

  const label = finished ? "Replay sample call" : playing ? "Pause sample call" : active && shown > 0 ? "Resume sample call" : "Play sample call";

  return (
    <article className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-pop">
      <header className="flex min-h-17 items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-text">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <Heading className="text-base font-bold text-foreground">{call.title}</Heading>
          <p className="line-clamp-2 text-sm text-muted-foreground">{call.scenario}</p>
        </div>
        <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          {call.language}
        </span>
      </header>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface px-3 py-2.5">
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-glow transition-[filter,transform] hover:brightness-110 active:scale-95"
        >
          {finished ? (
            <RotateCcw aria-hidden className="size-5" />
          ) : playing ? (
            <Pause aria-hidden className="size-5" />
          ) : (
            <Play aria-hidden className="size-5 translate-x-px" />
          )}
        </button>
        <Waveform active={playing} bars={30} className="h-8 min-w-0 flex-1 text-primary" />
      </div>

      <div
        ref={transcriptRef}
        role="log"
        aria-label={`Transcript: ${call.title}`}
        className="mt-4 h-52 space-y-2.5 overflow-y-auto pr-1"
      >
        {shown === 0 ? (
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              &ldquo;{call.lines[0]?.text}&rdquo;
            </p>
            <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary-text">
              <Play aria-hidden className="size-3.5" />
              Press play to follow the call with a live transcript
            </p>
          </div>
        ) : (
          call.lines.slice(0, shown).map((line, index) => (
            <div key={index} className={cn("flex animate-slide-up flex-col", line.speaker === "lead" && "items-end")}>
              <span className="mb-0.5 text-[0.65rem] font-bold tracking-wider text-subtle-foreground uppercase">
                {line.speaker === "agent" ? "Reseny AI" : "Lead"}
              </span>
              <p
                className={cn(
                  "max-w-[92%] rounded-2xl px-3.5 py-2 text-sm leading-snug",
                  line.speaker === "agent"
                    ? "rounded-tl-md bg-primary-soft text-foreground"
                    : "rounded-tr-md bg-surface-2 text-foreground",
                )}
              >
                {line.text}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 min-h-10">
        {finished ? (
          <p className="flex items-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-sm font-semibold text-success">
            <Check aria-hidden className="size-4 shrink-0" />
            {call.outcome}
          </p>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-subtle-foreground">Synthetic example call with a fictional business and people.</p>
      {call.audioSrc ? (
        <audio
          ref={audioRef}
          src={call.audioSrc}
          preload="none"
          onEnded={() => setState({ playing: false, shown: total })}
          onTimeUpdate={(event) => {
            const { currentTime, duration } = event.currentTarget;
            if (duration > 0) {
              const next = Math.max(1, Math.min(total, Math.ceil((currentTime / duration) * total)));
              setState((current) => (current.shown === next ? current : { ...current, shown: next }));
            }
          }}
        />
      ) : null}
    </article>
  );
}

/**
 * A set of sample calls where only one plays at a time. `headingLevel` keeps the document
 * outline valid: use "h2" directly under a page's h1 (e.g. in a hero) and "h3" under a section heading.
 */
export function SampleCallGroup({
  items,
  className,
  headingLevel = "h3",
}: {
  items: SampleCallItem[];
  className?: string;
  headingLevel?: HeadingLevel;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <div className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map(({ call, icon }) => (
        <SampleCallCard
          key={call.id}
          call={call}
          icon={icon}
          active={activeId === call.id}
          onActivate={() => setActiveId(call.id)}
          Heading={headingLevel}
        />
      ))}
    </div>
  );
}
