import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

const CONSENT_VERSION = "2026-10-22";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const AUDIENCES = new Set(["individual", "agency"]);

// Daily-rotating keyed hash so abuse can be limited without storing raw IPs.
function hashIp(ip: string) {
  const secret = process.env.WAITLIST_HASH_SECRET;
  if (!secret) return null;
  const day = new Date().toISOString().slice(0, 10);
  return createHmac("sha256", `${secret}:${day}`).update(ip).digest("hex");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success so they move on.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const audience = AUDIENCES.has(body.audience as string) ? body.audience : "individual";
  const source = typeof body.source === "string" ? body.source.slice(0, 40) : "unknown";

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist] Supabase not configured; would store:", { email, audience, source });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "The waitlist is temporarily unavailable." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({
      email,
      audience,
      source,
      consent_version: CONSENT_VERSION,
      consented_at: new Date().toISOString(),
      ip_hash: ip ? hashIp(ip) : null,
    }),
    cache: "no-store",
  });

  // 409 = already on the list; treat as success so we don't leak membership.
  if (!res.ok && res.status !== 409) {
    console.error("[waitlist] insert failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
