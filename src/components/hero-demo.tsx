"use client";

import { useEffect, useRef, useState } from "react";

const leads = [
  { name: "Alex Smith", biz: "Northside Roofing", note: "Asked about the estimate form. Prefers mornings.", next: "Tomorrow · 10:30 AM", owner: "Mia" },
  { name: "Mia Chen", biz: "Harbor Realty", note: "Uses a shared inbox for inquiries.", next: "Thu · 2:00 PM", owner: "Jordan" },
  { name: "Jordan Lee", biz: "Peak Plumbing Co.", note: "Busy season ends next week.", next: "Mon · 9:15 AM", owner: "Alex" },
  { name: "Sam Rivera", biz: "Brightline Dental", note: "Office manager handles vendors.", next: "Fri · 11:00 AM", owner: "Mia" },
];

const PHASE_SECONDS = 3;
const PHASES = ["Ready", "On call", "Outcome", "Next step"] as const;
const CYCLE = PHASE_SECONDS * PHASES.length;

export function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(CYCLE - 1);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(() => setT((v) => v + 1), 1000);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  const cycle = Math.floor(t / CYCLE);
  const phase = Math.floor((t % CYCLE) / PHASE_SECONDS);
  const lead = leads[cycle % leads.length];
  const queue = [1, 2, 3].map((i) => leads[(cycle + i) % leads.length]);
  const callSeconds = 128 + (phase === 1 ? (t % CYCLE) - PHASE_SECONDS : phase > 1 ? PHASE_SECONDS : 0);
  const done = 12 + (cycle % 8) + (phase === 3 ? 1 : 0);
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-brand/25 blur-3xl" />
      <figure
        aria-label="Illustrative Colder workflow with fictional sample data"
        className="overflow-hidden rounded-2xl border border-line-strong bg-panel/90 shadow-2xl shadow-black/60 backdrop-blur"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[11px] text-faint">colder / today</span>
          <span className="chip py-0.5 text-[10px]">Concept · sample data</span>
        </div>

        <div className="grid sm:grid-cols-[11rem_1fr]">
          {/* queue */}
          <div className="hidden border-r border-line p-3 sm:block">
            <p className="eyebrow px-2 pb-2 text-[10px]">Queue</p>
            <ul className="space-y-1">
              <li className="rounded-lg bg-white/[0.06] px-2 py-2">
                <p className="truncate text-[13px] font-medium">{lead.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-brand-soft">
                  <span className="size-1.5 rounded-full bg-brand-soft animate-pulse-dot" />
                  {phase === 0 ? "Next up" : phase === 1 ? "Calling" : "Saving"}
                </p>
              </li>
              {queue.map((q) => (
                <li key={q.name} className="px-2 py-2">
                  <p className="truncate text-[13px] text-muted">{q.name}</p>
                  <p className="text-[11px] text-faint">Queued</p>
                </li>
              ))}
            </ul>
          </div>

          {/* active lead */}
          <div className="p-4 sm:p-5">
            <div className="mb-4 flex gap-1" role="list" aria-label="Workflow stage">
              {PHASES.map((p, i) => (
                <span
                  key={p}
                  role="listitem"
                  aria-current={i === phase ? "step" : undefined}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= phase ? "bg-brand" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold tracking-tight">{lead.name}</p>
                <p className="truncate text-sm text-muted">{lead.biz}</p>
              </div>
              {phase === 1 ? (
                <span className="flex shrink-0 items-center gap-2 rounded-full bg-red-500/15 px-2.5 py-1 font-mono text-xs text-red-300">
                  <span className="size-1.5 rounded-full bg-red-400 animate-pulse-dot" />
                  {fmt(callSeconds)}
                </span>
              ) : (
                <span className="chip shrink-0 text-[11px]">{PHASES[phase]}</span>
              )}
            </div>

            <div key={`${cycle}-${phase}`} className="mt-4 min-h-[8.5rem] animate-rise">
              {phase === 0 && (
                <div className="space-y-2">
                  <Row label="Last note" value={lead.note} />
                  <Row label="Attempts" value="1 · no answer Monday" />
                  <div className="pt-2">
                    <span className="btn btn-brand h-9 w-full text-sm">Call {lead.name.split(" ")[0]}</span>
                  </div>
                </div>
              )}
              {phase === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-faint">Call in progress · context stays open</p>
                  <div className="rounded-lg border border-line bg-white/[0.02] p-3 text-sm text-muted">
                    {lead.note}
                    <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-fg animate-pulse-dot" />
                  </div>
                  <Row label="Opener" value="Relevant observation, one question" />
                </div>
              )}
              {phase === 2 && (
                <div className="space-y-3">
                  <p className="text-xs text-faint">What happened?</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip border-ok/40 bg-ok/10 text-ok">✓ Reached</span>
                    <span className="chip border-brand/50 bg-brand/15 text-brand-soft">Callback requested</span>
                    <span className="chip">Voicemail</span>
                    <span className="chip">Not a fit</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip border-warm/40 bg-warm/10 text-warm">Warm lead</span>
                    <span className="chip">Do not contact</span>
                  </div>
                </div>
              )}
              {phase === 3 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border border-ok/30 bg-ok/[0.07] p-3">
                    <span className="grid size-7 place-items-center rounded-full bg-ok/20 text-ok">✓</span>
                    <div>
                      <p className="text-sm font-medium">Callback saved</p>
                      <p className="text-xs text-muted">
                        {lead.next} · owner {lead.owner}
                      </p>
                    </div>
                  </div>
                  <Row label="Next up" value={queue[0].name} />
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-line pt-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted">Daily goal</span>
                <span className="font-mono text-fg">
                  {done} <span className="text-faint">/ 20</span>
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-brand-soft transition-[width] duration-700"
                  style={{ width: `${(done / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-20 shrink-0 text-faint">{label}</span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
