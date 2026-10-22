"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    tag: "Get ready",
    title: "Your next lead. Ready.",
    body: "One contact. Everything you need. The person, the business and what you learned last time, before you dial.",
    points: ["Due callbacks come first", "Context from every past attempt", "Timezones and opt-outs checked"],
  },
  {
    tag: "Make the call",
    title: "Stay in the conversation.",
    body: "Keep the context with the call. Notes stay attached to the contact, so you can listen instead of searching.",
    points: ["Live call timer", "Notes beside the call", "One honest opener, one question"],
  },
  {
    tag: "Follow through",
    title: "Keep warm leads warm.",
    body: "A clear next step. Right on time. Every follow-up gets an action, a due time and an owner.",
    points: ["Callbacks as dated tasks", "Outcome separate from interest", "Do-not-contact always wins"],
  },
  {
    tag: "Build momentum",
    title: "See yourself improve.",
    body: "Progress you can pick up tomorrow. Attempts, conversations and next steps, measured separately.",
    points: ["Daily goals and streaks", "Honest conversion rates", "One thing to improve next session"],
  },
];

const DURATION = 7000;

export function WorkflowTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), DURATION);
    return () => clearTimeout(id);
  }, [active, paused, visible]);

  const running = visible && !paused;

  return (
    <div
      ref={ref}
      className="grid gap-6 lg:grid-cols-[22rem_1fr] lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div role="tablist" aria-label="Workflow steps" aria-orientation="vertical" className="flex flex-col gap-2">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.tag}
              role="tab"
              id={`wf-tab-${i}`}
              aria-selected={on}
              aria-controls="wf-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = (i + (e.key === "ArrowDown" ? 1 : steps.length - 1)) % steps.length;
                  setActive(next);
                  document.getElementById(`wf-tab-${next}`)?.focus();
                }
              }}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-colors ${
                on ? "border-line-strong bg-white/[0.04]" : "border-line hover:bg-white/[0.02]"
              }`}
            >
              <span className={`font-mono text-xs ${on ? "text-brand-soft" : "text-faint"}`}>
                0{i + 1} / {s.tag.toUpperCase()}
              </span>
              <span className={`mt-1 block text-lg font-medium tracking-tight ${on ? "text-fg" : "text-muted"}`}>
                {s.title}
              </span>
              {on && (
                <span
                  key={`${active}-${running}`}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
                  style={{
                    animation: running ? `wf-progress ${DURATION}ms linear forwards` : undefined,
                    transform: running ? undefined : "scaleX(0)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="wf-panel"
        role="tabpanel"
        aria-labelledby={`wf-tab-${active}`}
        className="card relative overflow-hidden p-6 sm:p-10"
      >
        <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-brand/20 blur-3xl" />
        <div key={active} className="relative grid gap-8 animate-rise md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Step 0{active + 1}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{steps[active].title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{steps[active].body}</p>
            <ul className="mt-6 space-y-2.5">
              {steps[active].points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <span className="grid size-5 place-items-center rounded-full bg-brand/15 text-[10px] text-brand-soft">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <StepVisual step={active} />
        </div>
      </div>
    </div>
  );
}

function StepVisual({ step }: { step: number }) {
  const shell = "rounded-xl border border-line bg-ink/70 p-4 text-sm";
  if (step === 0)
    return (
      <div className={shell}>
        <p className="eyebrow text-[10px]">Next up</p>
        <p className="mt-2 text-lg font-semibold">Alex Smith</p>
        <p className="text-muted">Northside Roofing · ET</p>
        <div className="mt-4 space-y-2 border-t border-line pt-4 text-xs text-muted">
          <p>Mon 10:00 · No answer</p>
          <p>Note · Estimate form hard to use on mobile</p>
        </div>
      </div>
    );
  if (step === 1)
    return (
      <div className={shell}>
        <div className="flex items-center justify-between">
          <span className="text-muted">Call in progress</span>
          <span className="flex items-center gap-2 font-mono text-red-300">
            <span className="size-1.5 rounded-full bg-red-400 animate-pulse-dot" />
            02:14
          </span>
        </div>
        <div className="mt-4 flex h-12 items-end gap-1" aria-hidden>
          {[40, 70, 30, 90, 55, 80, 35, 60, 95, 45, 70, 25, 85, 50, 65, 30, 75, 40].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-brand/60 animate-pulse-dot"
              style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
            />
          ))}
        </div>
        <span className="chip mt-4 border-warm/40 bg-warm/10 text-warm">Warm lead</span>
      </div>
    );
  if (step === 2)
    return (
      <div className={shell}>
        <p className="eyebrow text-[10px]">Follow-ups</p>
        {[
          ["Alex Smith", "Tomorrow · 10:30 AM", "Callback saved", true],
          ["Mia Chen", "Thu · 2:00 PM", "Send details", false],
          ["Jordan Lee", "Mon · 9:15 AM", "Retry", false],
        ].map(([n, d, a, hi]) => (
          <div key={n as string} className={`mt-3 flex items-center justify-between rounded-lg p-2.5 ${hi ? "bg-ok/[0.08]" : ""}`}>
            <div>
              <p className="font-medium">{n}</p>
              <p className="text-xs text-muted">{d}</p>
            </div>
            <span className={`text-xs ${hi ? "text-ok" : "text-faint"}`}>{a}</span>
          </div>
        ))}
      </div>
    );
  return (
    <div className={shell}>
      <div className="flex items-baseline justify-between">
        <p className="eyebrow text-[10px]">Daily goal</p>
        <p className="font-mono">13 / 20</p>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10">
        <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-brand to-brand-soft" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        {[
          ["13", "Attempts"],
          ["4", "Reached"],
          ["2", "Next steps"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-lg border border-line py-3">
            <p className="text-xl font-semibold">{v}</p>
            <p className="text-[11px] text-faint">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-faint">Illustrative numbers, not benchmarks.</p>
    </div>
  );
}
