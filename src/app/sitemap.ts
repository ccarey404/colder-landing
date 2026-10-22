import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "",
  "/cold-call-tracker",
  "/guides",
  "/guides/how-to-start-cold-calling",
  "/guides/how-to-track-cold-calls",
  "/help",
  "/about",
  "/waitlist",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
