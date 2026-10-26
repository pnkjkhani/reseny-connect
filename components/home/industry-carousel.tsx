import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { industries, solutionHref } from "@/lib/content/solutions";
import { CarouselControls } from "./carousel-controls";

const TRACK_ID = "industry-track";

/**
 * Industry carousel (SOP §7.2 #7 and §8): a card per sector linking to its page, with a
 * hover lift, an icon animation and a preview of that sector's sample call. Pure CSS
 * scroll-snap, so it works with touch, trackpad, keyboard and without JavaScript. `scroll-px-*`
 * mirrors the padding: without it, snapping aligns the first card to the screen edge and ignores the padding.
 */
export function IndustryCarousel() {
  return (
    <Section id="industry-carousel" aria-label="Ready-made for your industry" className="overflow-hidden">
      <Container className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="Solutions"
          title="Ready-made for your industry"
          description="Every sector gets its own agent template, workflow and compliance notes, written in that industry's own words."
        />
        <CarouselControls targetId={TRACK_ID} />
      </Container>

      <div
        id={TRACK_ID}
        tabIndex={0}
        role="region"
        aria-label="Industries"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 pt-2 pb-8 sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {industries.map((industry) => {
          const preview = industry.sampleCall.lines[0]?.text ?? "";
          return (
            <Link
              key={industry.slug}
              href={solutionHref(industry)}
              className="group relative flex h-72 w-[17rem] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-pop focus-visible:-translate-y-1.5 sm:w-72"
            >
              <IconTile
                name={industry.icon}
                size="lg"
                className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              />
              <h3 className="mt-5 text-lg leading-snug font-bold text-foreground">{industry.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{industry.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary-text">
                See how it works
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>

              {/* Hover / focus preview of the sector's sample call. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(135deg,#14092f,#3a12a0)] p-5 text-white transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0"
              >
                <span className="block text-[0.65rem] font-bold tracking-[0.16em] text-[#c9b6ff] uppercase">
                  Sample call preview
                </span>
                <span className="mt-2 line-clamp-4 block text-sm leading-snug">&ldquo;{preview}&rdquo;</span>
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
