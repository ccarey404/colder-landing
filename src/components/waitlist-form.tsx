"use client";

import Link from "next/link";
import { useId, useState } from "react";

type Audience = "individual" | "agency";
type Status = "idle" | "sending" | "done" | "error";

export function WaitlistForm({
  source,
  defaultAudience = "individual",
  layout = "inline",
}: {
  source: string;
  defaultAudience?: Audience;
  layout?: "inline" | "stacked";
}) {
  const id = useId();
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          website: data.get("website"),
          audience,
          source,
        }),
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
      <div role="status" className="card flex items-start gap-3 p-5 animate-rise">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ok/15 text-ok">
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8.5l3.2 3L13 4.5" />
          </svg>
        </span>
        <div>
          <p className="font-medium">You&apos;re on the list.</p>
          <p className="mt-1 text-sm text-muted">
            We&apos;ll email you when access opens. No account or payment was created.
          </p>
        </div>
      </div>
    );
  }

  const stacked = layout === "stacked";

  return (
    <form onSubmit={onSubmit} aria-busy={status === "sending"} className="w-full">
      <fieldset className="mb-3 flex items-center gap-3">
        <legend className="sr-only">I&apos;m joining as</legend>
        <span aria-hidden className="text-sm text-muted">
          I&apos;m joining as
        </span>
        <div className="inline-flex rounded-full border border-line-strong p-0.5 text-sm">
          {(["individual", "agency"] as const).map((a) => (
            <label
              key={a}
              className={`cursor-pointer rounded-full px-3 py-1 transition-colors ${
                audience === a ? "bg-fg text-ink" : "text-muted hover:text-fg"
              }`}
            >
              <input
                type="radio"
                name="audience"
                value={a}
                checked={audience === a}
                onChange={() => setAudience(a)}
                className="sr-only"
              />
              {a === "individual" ? "A caller" : "A team"}
            </label>
          ))}
        </div>
      </fieldset>

      <div
        className={
          stacked
            ? "flex flex-col gap-3"
            : "flex flex-col gap-2 rounded-[1.75rem] border border-line-strong bg-white/[0.03] p-1.5 transition-colors focus-within:border-brand/70 sm:flex-row sm:rounded-full"
        }
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className={
            stacked
              ? "h-12 rounded-xl border border-line-strong bg-white/[0.03] px-4 text-base outline-none transition-colors placeholder:text-faint focus:border-brand/70"
              : "h-11 min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-faint"
          }
        />
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor={`${id}-website`}>Leave this field empty</label>
          <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`btn btn-brand disabled:opacity-60 ${stacked ? "h-12" : "h-11"}`}
        >
          {status === "sending" ? "Joining…" : "Get free access"}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-faint">
        {status === "error" ? (
          <span role="alert" className="text-warm">
            {message}
          </span>
        ) : (
          <>
            Free plan at launch. No card required. By joining you agree to availability emails.{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
              Privacy
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
