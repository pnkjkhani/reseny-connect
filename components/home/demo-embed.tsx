"use client";

import { ExternalLink, LoaderCircle, Mic } from "lucide-react";
import { useState } from "react";
import { events, trackEvent } from "@/lib/analytics";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Waveform } from "@/components/ui/waveform";

interface DemoEmbedProps {
  src: string;
  height: number;
  className?: string;
}

/**
 * The live voice demo, embedded as an iframe (it needs `allow="microphone"`).
 *
 * The iframe is mounted after hydration on purpose: a server-rendered iframe can finish
 * loading before React attaches `onLoad`, which would leave the loading skeleton stuck
 * over a working demo. A `preconnect` hint in the hero warms the connection meanwhile.
 */
export function DemoEmbed({ src, height, className }: DemoEmbedProps) {
  const mounted = useMounted();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-pop", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-green" />
          </span>
          <p className="text-sm font-bold text-foreground">Live demo: talk to a Reseny AI agent</p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-text sm:inline-flex">
          <Mic aria-hidden className="size-3.5" />
          Uses your microphone
        </span>
      </div>

      <div className="relative bg-surface" style={{ height }}>
        {!loaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <Waveform active bars={22} className="h-10 text-primary" />
            <p className="flex items-center gap-2 text-sm font-medium">
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Loading the live demo…
            </p>
          </div>
        ) : null}
        {mounted ? (
          <iframe
            src={src}
            title="Reseny AI voice agent live demo"
            width="100%"
            height={height}
            allow="microphone"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 block size-full border-0"
            onLoad={() => {
              setLoaded(true);
              trackEvent(events.demoLoaded);
            }}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-border bg-surface px-4 py-3 text-xs text-muted-foreground">
        <p>Your browser will ask for microphone access.</p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-primary-text hover:underline"
        >
          Open in a new tab
          <ExternalLink aria-hidden className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
