import fs from "node:fs";
import path from "node:path";
import type { Shot } from "@/components/screenshot";

// Read at build time: add or replace files in public/screenshots, then rebuild.
const DIR = path.join(process.cwd(), "public", "screenshots");
const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

function readSize(buf: Buffer): { width: number; height: number } | null {
  // PNG: IHDR chunk
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: first start-of-frame marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

function load(file: string): Shot | null {
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) return null;
  const size = readSize(fs.readFileSync(full));
  return size ? { src: `/screenshots/${file}`, ...size } : null;
}

/** Looks up `name` with any supported extension, e.g. getShot("hero") finds hero.png. */
export function getShot(name: string): Shot | null {
  for (const ext of EXTENSIONS) {
    const shot = load(name + ext);
    if (shot) return shot;
  }
  return null;
}
