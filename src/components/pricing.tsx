"use client";

import Link from "next/link";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { TEAM_SIZES, enterprise, everyPlanIncludes, individual, notes, teams, teamsAlsoGet, type Tier } from "@/lib/pricing";
import { APP_URL, SALES_HREF } from "@/lib/site";
import { Arrow, Check } from "./ui";

type Mode = "individual" | "teams";

/** Counts to `value` whenever it changes (instant with reduced motion). */
function Price({ value, className = "" }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    from.current = value;
    if (reduce) return setShown(value);
    const controls = animate(start, value, { duration: DURATION.card, ease: EASE, onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [value, reduce]);
  return <span className={`tabular-nums ${className}`}>${shown.toLocaleString("en-US")}</span>;
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div role="group" aria-label="Plan type" className="inline-flex rounded-lg border border-line bg-surface p-1">
      {(["individual", "teams"] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={mode === m}
          onClick={() => onChange(m)}
          className={`rounded-md px-4 py-1.5 text-[0.9375rem] font-medium transition-colors ${
            mode === m ? "bg-paper text-ink shadow-[0_1px_2px_rgb(31_32_35/0.08)] ring-1 ring-line" : "text-muted hover:text-ink"
          }`}
        >
          {m === "individual" ? "Individual" : "Teams"}
        </button>
      ))}
    </div>
  );
}

/** A plan card: two subgrid rows (header, list) so headers, buttons and check lists line up across cards. */
function PlanCard({ name, children, items }: { name: string; children: React.ReactNode; items: string[] }) {
  return (
    <article className="row-span-2 grid grid-rows-subgrid gap-0 rounded-xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgb(31_32_35/0.04)]">
      <div className="flex flex-col">
        <h3 className="label">{name}</h3>
        {children}
      </div>
      <ul className="mt-7 space-y-2.5 border-t border-line pt-6 text-[0.9375rem] text-body">
        {items.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className="mt-1 text-muted" /> {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

function TierCard({ tier, team, sizePicker }: { tier: Tier; team: boolean; sizePicker: boolean }) {
  const [size, setSize] = useState(TEAM_SIZES[0]);
  const sizeId = `size-${tier.name.toLowerCase().replace(/\s+/g, "-")}`;
  const items = [tier.credits, tier.leads, ...everyPlanIncludes, ...(team ? teamsAlsoGet : [])];

  return (
    <PlanCard name={tier.name} items={items}>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">
          <Price value={tier.price} />
        </span>
        <span className="text-sm text-muted">{team ? "/ person / month" : "/ month"}</span>
      </p>
      <p className="mt-1.5 text-sm text-muted">Billed monthly</p>

      {sizePicker && (
        <div className="mt-6 border-t border-line pt-5">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor={sizeId} className="text-sm">
              Team members
            </label>
            <select
              id={sizeId}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="h-9 rounded-md border border-line-strong bg-paper px-2.5 text-sm outline-none focus:border-ink"
            >
              {TEAM_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n} people
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3" aria-live="polite">
            <span className="text-xl font-semibold">
              {/* Fixed width so the total's digits never push the suffix around. */}
              <Price value={tier.price * size} className="inline-block min-w-[3.6em]" />
            </span>
            <span className="text-sm text-muted"> / month total</span>
          </p>
        </div>
      )}

      <div className="mt-auto pt-6">
        <a href={APP_URL} className="btn btn-line btn-plan w-full">
          Get started
        </a>
      </div>
    </PlanCard>
  );
}

/**
 * The plan picker. `full` (the /pricing page) adds team-size totals and Enterprise;
 * the homepage version keeps to the three tiers.
 */
export function Pricing({ full = false }: { full?: boolean }) {
  const [mode, setMode] = useState<Mode>("individual");
  const reduce = useReducedMotion();
  const team = mode === "teams";
  const tiers = team ? teams : individual;

  return (
    <div>
      <ModeToggle mode={mode} onChange={setMode} />

      <div className="grid">
      <AnimatePresence initial={false}>
        <motion.div
          key={mode}
          className="col-start-1 row-start-1"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: DURATION.ui, ease: EASE } }}
          transition={{ duration: DURATION.card, ease: EASE }}
        >
          <div className={`mt-6 grid gap-x-4 gap-y-4 ${full && team ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
            {tiers.map((t) => (
              <TierCard key={t.name} tier={t} team={team} sizePicker={full && team} />
            ))}
            {full && team && (
              <PlanCard name="Enterprise" items={enterprise}>
                <p className="mt-5 text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">Custom</p>
                <div className="mt-auto pt-6">
                  <a href={SALES_HREF} className="btn btn-line btn-plan w-full">
                    Contact sales
                  </a>
                </div>
              </PlanCard>
            )}
          </div>

          <p className="mt-4 text-[0.8125rem] text-muted">
            {notes.individual}
            {team && ` ${notes.teams}`}
          </p>
        </motion.div>
      </AnimatePresence>
      </div>

      {!full && (
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.9375rem]">
          <Link href="/pricing" className="inline-flex items-center gap-1.5 font-medium hover:text-brand">
            Compare plans <Arrow />
          </Link>
          <p className="text-muted">
            Need more than 10 seats?{" "}
            <a href={SALES_HREF} className="link">
              Contact sales
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
