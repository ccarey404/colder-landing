"use client";

import Link from "next/link";
import { useId, useState } from "react";

type Audience = "individual" | "agency";
type Status = "idle" | "sending" | "done" | "error";

export function WaitlistForm({
  source,
  defaultAudience = "individual",
  askAudience = false,
  tone = "light",
  className = "",
}: {
  source: string;
  defaultAudience?: Audience;
  askAudience?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const id = useId();
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website"), audience, source }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className={`rounded-lg border p-4 text-left animate-fade ${dark ? "border-white/15 text-white" : "border-line bg-ok-wash"} ${className}`}>
        <p className="font-medium">You&apos;re on the list.</p>
        <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-muted"}`}>
          We&apos;ll email you when access opens. No account or payment was created.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-busy={status === "sending"} className={`relative text-left ${className}`}>
      {askAudience && (
        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-medium">I&apos;m joining as</legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["individual", "A caller", "Just me"],
                ["agency", "A team", "Agency or sales team"],
              ] as const
            ).map(([value, title, sub]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-md border px-3.5 py-3 transition-colors ${
                  audience === value ? "border-ink ring-1 ring-ink" : "border-line-strong hover:border-muted"
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value={value}
                  checked={audience === value}
                  onChange={() => setAudience(value)}
                  className="sr-only"
                />
                <span className="block text-[0.9375rem] font-medium">{title}</span>
                <span className="block text-[0.8125rem] text-muted">{sub}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <label htmlFor={`${id}-email`} className={askAudience ? "mb-2 block text-sm font-medium" : "sr-only"}>
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email"
          className={`field sm:flex-1 ${dark ? "!border-white/20 !bg-white/5 !text-white placeholder:!text-white/40 focus:!border-white" : ""}`}
        />
        <button type="submit" disabled={status === "sending"} className={`btn disabled:opacity-60 ${dark ? "btn-light" : "btn-dark"}`}>
          {status === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <div aria-hidden className="absolute -left-[9999px] top-0">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={`mt-3 text-[0.8125rem] ${dark ? "text-white/50" : "text-muted"}`}>
        {status === "error" ? (
          <span role="alert" className={dark ? "text-[#ffb4a8]" : "text-[#b42318]"}>
            {message}
          </span>
        ) : (
          <>
            By joining, you agree to availability emails. No payment required.{" "}
            <Link href="/privacy" className={`underline underline-offset-2 ${dark ? "hover:text-white" : "hover:text-ink"}`}>
              Privacy Policy
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
