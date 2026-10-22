"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { Reveal } from "./reveal";
import { Screenshot, type Shot } from "./screenshot";

export type Step = { tag: string; title: string; body: string; file: string; hint: string; shot: Shot | null; mock: React.ReactNode };

const SIZES = "(min-width: 1024px) 600px, 92vw";

export function HowItWorks({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  // Each pinned screen mounts the first time its step is reached, so its animation plays when it's actually seen.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  // The other screens are built ahead of time while the browser is idle, but stay display:none (so their
  // entrance doesn't start) until first shown. Switching steps then only reveals an already-built screen.
  const [prebuilt, setPrebuilt] = useState(false);
  const reduce = useReducedMotion();
  const frame = steps[0].shot;

  useEffect(() => {
    setSeen((s) => (s.has(active) ? s : new Set(s).add(active)));
  }, [active]);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setPrebuilt(true));
    return () => cancel(id);
  }, []);

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
      <ol>
        {steps.map((s, i) => (
          <StepText key={s.file} step={s} index={i} active={i === active} onEnter={setActive} />
        ))}
      </ol>

      {/* Pinned screen (desktop): cross-fades to the step in the middle of the viewport */}
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-14rem)]">
          <div className="relative" style={{ aspectRatio: frame ? `${frame.width} / ${frame.height}` : "16 / 10" }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.file}
                className="absolute inset-0 will-change-[opacity]"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : DURATION.card, ease: EASE }}
                aria-hidden={i !== active}
              >
                {(seen.has(i) || prebuilt) && (
                  <div className={seen.has(i) ? "h-full" : "hidden"}>
                    <Screenshot
                      shot={s.shot}
                      mock={s.mock}
                      file={s.file}
                      hint={s.hint}
                      alt={s.title}
                      sizes={SIZES}
                      className="h-full w-full rounded-xl object-contain object-top ring-1 ring-ink/5"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepText({ step, index, active, onEnter }: { step: Step; index: number; active: boolean; onEnter: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, onEnter, index]);

  return (
    <li ref={ref} className="flex flex-col justify-center border-t border-line py-10 first:border-t-0 lg:min-h-[70vh] lg:border-t-0 lg:py-0">
      <p className="label">
        0{index + 1} / {step.tag}
      </p>
      <h3 className={`display mt-4 text-[2.25rem] transition-colors duration-300 lg:text-[2.75rem] ${active ? "text-ink" : "lg:text-faint"}`}>
        {step.title}
      </h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{step.body}</p>

      {/* Mobile: the screen sits under its own step */}
      <Reveal className="mt-8 lg:hidden">
        <Screenshot shot={step.shot} mock={step.mock} file={step.file} hint={step.hint} alt={step.title} sizes={SIZES} className="h-auto w-full rounded-xl ring-1 ring-ink/5" />
      </Reveal>
    </li>
  );
}
