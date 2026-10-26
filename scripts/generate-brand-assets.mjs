/**
 * Derives the web-optimised brand assets from the original logo files in
 * `docs/source-assets/`. Re-run after replacing the originals:
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Outputs:
 *   public/brand/reseny-mark.webp       shield mark only (square)
 *   public/brand/reseny-logo.webp       full lock-up (mark + wordmark + descriptor)
 *   public/brand/astransys-logo.webp    Astransys Group logo
 *   app/icon.png, app/apple-icon.png    favicon / touch icon
 *   app/opengraph-image.png (+ .alt.txt) 1200x630 social share card
 *
 * Crop boxes were measured on the supplied 1600x1600 / 500x500 originals.
 * If you swap in artwork with a different layout, update the boxes below.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sharp = createRequire(import.meta.url)("sharp");

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const SOURCES = {
  reseny: path.join(ROOT, "docs/source-assets/reseny-logo-original.jpeg"),
  astransys: path.join(ROOT, "docs/source-assets/astransys-logo-original.jpeg"),
};
const BOXES = {
  mark: { x0: 559, y0: 254, x1: 1040, y1: 819 },
  full: { x0: 172, y0: 254, x1: 1427, y1: 1106 },
  astransys: { x0: 48, y0: 75, x1: 457, y1: 424 },
};

/** Crop `box` (+ padding) out of `src` and return a raw RGB PNG buffer. */
function crop(src, box, pad) {
  return sharp(src)
    .extract({
      left: box.x0 - pad,
      top: box.y0 - pad,
      width: box.x1 - box.x0 + 1 + pad * 2,
      height: box.y1 - box.y0 + 1 + pad * 2,
    })
    .flatten({ background: WHITE })
    .png()
    .toBuffer();
}

/** Snap near-white pixels (JPEG speckle) to pure white so edges blend into white pages. */
async function snapWhite(input) {
  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    if (data[i] >= 244 && data[i + 1] >= 244 && data[i + 2] >= 244) {
      data[i] = data[i + 1] = data[i + 2] = 255;
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } });
}

const webp = (img) => img.webp({ quality: 92, effort: 6, smartSubsample: true });
/** Quantised PNG: gradient artwork shrinks ~4x with no visible banding at these sizes. */
const PNG_OPTIONS = { palette: true, quality: 92, effort: 10, compressionLevel: 9 };

async function squareMark() {
  const cropped = await crop(SOURCES.reseny, BOXES.mark, 18);
  const { width, height } = await sharp(cropped).metadata();
  const side = Math.max(width, height);
  const padded = await sharp(cropped)
    .extend({
      top: Math.floor((side - height) / 2),
      bottom: Math.ceil((side - height) / 2),
      left: Math.floor((side - width) / 2),
      right: Math.ceil((side - width) / 2),
      background: WHITE,
    })
    .png()
    .toBuffer();
  const resized = await sharp(padded).resize(512, 512).png().toBuffer();
  return resized;
}

async function iconTile(mark, size, markSize) {
  const inner = await sharp(mark).resize(markSize, markSize).toBuffer();
  const offset = Math.round((size - markSize) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: inner, left: offset, top: offset }])
    .png(PNG_OPTIONS)
    .toBuffer();
}

async function ogCard(fullLogo) {
  const W = 1200;
  const H = 630;
  const cardW = 470;
  const cardH = 470;
  const cardX = 70;
  const cardY = (H - cardH) / 2;

  const logo = await sharp(fullLogo)
    .resize({ width: cardW - 70, height: cardH - 70, fit: "inside" })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#14092f"/>
          <stop offset="0.6" stop-color="#2b0f73"/>
          <stop offset="1" stop-color="#5c17e9"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.92" cy="0.05" r="0.7">
          <stop offset="0" stop-color="#f0892e" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#f0892e" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#d97275"/>
          <stop offset="0.35" stop-color="#e6924d"/>
          <stop offset="0.65" stop-color="#f5cb06"/>
          <stop offset="1" stop-color="#2eaf53"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>
      <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="36" fill="#ffffff"/>
      <g font-family="Segoe UI, Arial, Helvetica, sans-serif" fill="#ffffff">
        <text x="620" y="215" font-size="26" font-weight="700" letter-spacing="3" fill="#cdbbff">RESENY CONNECT</text>
        <text x="620" y="290" font-size="62" font-weight="800">Every lead called.</text>
        <text x="620" y="364" font-size="62" font-weight="800">Every appointment</text>
        <text x="620" y="438" font-size="62" font-weight="800">booked.</text>
        <rect x="620" y="470" width="150" height="8" rx="4" fill="url(#bar)"/>
        <text x="620" y="530" font-size="30" fill="#d9ceff">From lead to booked meeting, on autopilot.</text>
      </g>
    </svg>`);

  return sharp(background)
    .composite([
      {
        input: logo,
        left: cardX + Math.round((cardW - logoMeta.width) / 2),
        top: cardY + Math.round((cardH - logoMeta.height) / 2),
      },
    ])
    .png(PNG_OPTIONS)
    .toBuffer();
}

async function main() {
  await mkdir(path.join(ROOT, "public/brand"), { recursive: true });

  const mark = await squareMark();
  await webp(await snapWhite(mark)).toFile(path.join(ROOT, "public/brand/reseny-mark.webp"));

  const full = await crop(SOURCES.reseny, BOXES.full, 30);
  const fullResized = await sharp(full).resize({ width: 1100 }).png().toBuffer();
  await webp(await snapWhite(fullResized)).toFile(path.join(ROOT, "public/brand/reseny-logo.webp"));

  const astransys = await crop(SOURCES.astransys, BOXES.astransys, 14);
  await webp(await snapWhite(astransys)).toFile(path.join(ROOT, "public/brand/astransys-logo.webp"));

  await writeFile(path.join(ROOT, "app/icon.png"), await iconTile(mark, 192, 164));
  await writeFile(path.join(ROOT, "app/apple-icon.png"), await iconTile(mark, 180, 150));

  await writeFile(path.join(ROOT, "app/opengraph-image.png"), await ogCard(fullResized));
  await writeFile(
    path.join(ROOT, "app/opengraph-image.alt.txt"),
    "Reseny Connect: every lead called, every appointment booked.\n",
  );

  for (const f of [
    "public/brand/reseny-mark.webp",
    "public/brand/reseny-logo.webp",
    "public/brand/astransys-logo.webp",
    "app/icon.png",
    "app/apple-icon.png",
    "app/opengraph-image.png",
  ]) {
    const meta = await sharp(path.join(ROOT, f)).metadata();
    console.log(f.padEnd(36), `${meta.width}x${meta.height}`, meta.format);
  }
}

await main();
