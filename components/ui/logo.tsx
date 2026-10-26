import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import astransysLogo from "@/public/brand/astransys-logo.webp";
import resenyFullLogo from "@/public/brand/reseny-logo.webp";
import resenyMark from "@/public/brand/reseny-mark.webp";
import { cn } from "@/lib/utils";

/**
 * The supplied logo files have a white background, so on dark surfaces they sit on a
 * white rounded tile (it reads like an app icon) rather than being force-recoloured.
 */

/** Header lock-up: shield mark + "Reseny Connect" set in the site font for crisp small sizes. */
export function Logo({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Reseny Connect home"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
    >
      <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <Image
          src={resenyMark}
          alt=""
          width={40}
          height={40}
          preload={preload}
          className="size-9 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="leading-none">
        <span className="block text-lg font-extrabold tracking-tight text-foreground">Reseny</span>
        <span className="mt-0.5 block text-[0.65rem] font-semibold tracking-[0.2em] text-primary-text uppercase">
          Connect
        </span>
      </span>
    </Link>
  );
}

/**
 * Explicit integer pixel size for a logo of the given width. Letting CSS derive the height
 * (`height: auto`) can round differently from the `height` attribute (the optimiser serves a
 * resized file with a slightly different ratio), which makes Next warn in development.
 */
function logoSize(image: StaticImageData, width: number) {
  return { width, height: Math.round((width * image.height) / image.width) };
}

/** Full brand lock-up (mark + wordmark + descriptor) on a white tile. */
export function ResenyLockup({ className, width = 220 }: { className?: string; width?: number }) {
  return (
    <span className={cn("inline-block shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5", className)}>
      <Image src={resenyFullLogo} alt="Reseny Business Mercantech" {...logoSize(resenyFullLogo, width)} style={logoSize(resenyFullLogo, width)} />
    </span>
  );
}

/** Astransys Group logo on a white tile. */
export function AstransysLogo({ className, width = 120 }: { className?: string; width?: number }) {
  return (
    <span className={cn("inline-block shrink-0 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5", className)}>
      <Image src={astransysLogo} alt="Astransys Group" {...logoSize(astransysLogo, width)} style={logoSize(astransysLogo, width)} />
    </span>
  );
}
