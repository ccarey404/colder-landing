"use client";

import { animate, motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { DURATION, EASE, VIEWPORT, usePageVisible } from "@/lib/motion";
import { Logo } from "../logo";
import { Face, LookArea, agentColors } from "./face";

/*
 * Building blocks for HTML/CSS recreations of the Colder desktop app (fictional sample data only).
 * Sizes are in em off a container-relative font size, so a screen scales with its slot like a screenshot would.
 * Animations start once the screen scrolls into view; with reduced motion everything renders in its final state.
 */

// The desktop app's layers on the site's charcoal tokens (same relative contrast as the app). Accent sampled from the app.
export const app = {
  accent: "#4f5bf5",
  bg: "var(--color-dark)",
  card: "var(--color-dark-card)",
  raised: "var(--color-dark-raised)",
  row: "var(--color-dark-row)",
  pill: "var(--color-dark-pill)",
  edge: "var(--color-dark-line)",
  pillText: "#b4b4bb",
  avatar: "#2e3150",
  avatarText: "#c7cbfa",
  muted: "var(--color-dark-muted)",
  faint: "#85858f",
  calls: "#9aa1fa",
  reached: "#a7e3cf",
  green: "#86efac",
};

export const icons = {
  sidebar: "M4 4h16v16H4zM9 4v16m4-9 2 1-2 1",
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  leads: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6a5 5 0 0 1 10 0",
  agents: "M12 4v3M5 8h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm4 5v1m6-1v1M2 12v3m20-3v3",
  campaigns: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zm12-3a5 5 0 0 1 0 8m3-11a9 9 0 0 1 0 14",
  history: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5m4-1v5l3 2",
  team: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 10a7 7 0 0 1 14 0m0-17.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4-6.3",
  settings: "M3 7h11m4 0h3M3 17h5m4 0h9M16 5v4M10 15v4",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  upRight: "M7 17 17 7M8 7h9v9",
  calendar: "M4 6h16v14H4zm0 4h16M8 3v4m8-4v4",
  flame: "M12 3c1 3 4.5 4.5 4.5 9a4.5 4.5 0 0 1-9 0c0-2 1-3.5 1-3.5s.5 1.8 2 1.8c0-3-.5-5 1.5-7.3z",
  chevron: "m6 9 6 6 6-6",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10 3-4.3-4.3",
  plus: "M12 5v14m-7-7h14",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
  mail: "M4 6h16v12H4zm0 0 8 7 8-7",
  copy: "M8 8h12v12H8zM4 16V4h12",
  clip: "m21 11-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0m-7 7v3",
  up: "M12 19V5m-6 6 6-6 6 6",
};

export function Icon({ d, className = "size-[1em]" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: DURATION.card, delay, ease: EASE } }),
};

/** Root animation state for a screen: `on` flips once it is in view (immediately with reduced motion). */
export function useStage() {
  const reduce = !!useReducedMotion();
  const [entered, setEntered] = useState(false);
  const root = reduce
    ? { initial: false as const, animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: VIEWPORT, onViewportEnter: () => setEntered(true) };
  return { reduce, on: entered || reduce, root };
}

export type RailItem = "home" | "leads" | "agents" | "campaigns" | "history" | "team";
const RAIL: RailItem[] = ["home", "leads", "agents", "campaigns", "history", "team"];

/**
 * A screen of the desktop app. `chrome` controls how much of the app frame shows:
 * "full" = logo, avatar and icon rail; "rail" = icon rail only; "bare" = just the content.
 * Every variant has the floating agent face bottom-right.
 */
export function AppFrame({
  label,
  fontSize,
  root,
  chrome = "rail",
  active,
  children,
}: {
  label: string;
  /** Base font size as a % of the screen width (cqw). */
  fontSize: number;
  root: ReturnType<typeof useStage>["root"];
  chrome?: "full" | "rail" | "bare";
  active?: RailItem;
  children: React.ReactNode;
}) {
  return (
    <motion.figure
      {...root}
      aria-label={`${label} (sample data)`}
      className="app-ui relative h-full w-full overflow-hidden rounded-[inherit] border text-white [contain:content] [container-type:inline-size]"
      style={{ backgroundColor: app.bg, borderColor: app.edge }}
    >
      <LookArea className="h-full">
        <div className="flex h-full flex-col p-[1.1em]" style={{ fontSize: `clamp(3px, ${fontSize}cqw, 20px)` }}>
          {chrome === "full" && (
            <div className="mb-[0.6em] flex shrink-0 items-center justify-between">
              <Logo size="1.75em" />
              <span className="flex items-center gap-[0.35em]" style={{ color: app.muted }}>
                <span className="grid size-[2.1em] place-items-center rounded-full text-[0.7em] font-semibold text-white" style={{ backgroundColor: app.avatar }}>
                  AM
                </span>
                <Icon d={icons.chevron} className="size-[0.85em]" />
              </span>
            </div>
          )}
          <div className="flex min-h-0 flex-1 gap-[1.2em]">
            {chrome !== "bare" && <Rail active={active} />}
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
          </div>
        </div>
        <span className="absolute bottom-[0.9em] right-[0.9em]" style={{ fontSize: `clamp(3px, ${fontSize}cqw, 20px)` }}>
          <Face color={agentColors.caller} className={chrome === "bare" ? "size-[2.1em]" : "size-[2.8em]"} />
        </span>
      </LookArea>
    </motion.figure>
  );
}

/**
 * The app's left icon rail. Even padding, square buttons and spacers that shrink proportionally,
 * so a short mock tightens the spacing instead of clipping the settings icon. Hidden in narrow mocks.
 */
export function Rail({ active }: { active?: RailItem }) {
  return (
    <div className="flex shrink-0 flex-col justify-center self-stretch @max-md:hidden">
      <nav aria-label="App navigation" className="flex max-h-full flex-col items-center rounded-[1.1em] border p-[0.55em]" style={{ backgroundColor: app.card, borderColor: app.edge }}>
        <RailButton d={icons.sidebar} />
        <Gap />
        <span className="h-px w-[70%] shrink-0" style={{ backgroundColor: app.edge }} />
        <Gap />
        {RAIL.map((r, i) => (
          <Fragment key={r}>
            {i > 0 && <Gap />}
            <RailButton d={icons[r]} on={r === active} />
          </Fragment>
        ))}
        <Gap size="1.4em" />
        <RailButton d={icons.settings} />
      </nav>
    </div>
  );
}

function Gap({ size = "0.55em" }: { size?: string }) {
  return <span aria-hidden className="block min-h-0 shrink" style={{ flexBasis: size }} />;
}

function RailButton({ d, on = false }: { d: string; on?: boolean }) {
  return (
    <span className="grid size-[2.2em] shrink-0 place-items-center rounded-[0.5em]" style={on ? { backgroundColor: app.accent, color: "#fff" } : { color: app.muted }}>
      <Icon d={d} className="size-[1.1em]" />
    </span>
  );
}

export function Card({ className = "", style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={`rounded-[1em] border p-[1.1em] ${className}`} style={{ backgroundColor: app.card, borderColor: app.edge, ...style }}>
      {children}
    </div>
  );
}

export function Initials({ text, className = "size-[2.4em]" }: { text: string; className?: string }) {
  return (
    <span aria-hidden className={`grid shrink-0 place-items-center rounded-[0.55em] text-[0.75em] font-semibold ${className}`} style={{ backgroundColor: app.avatar, color: app.avatarText }}>
      {text}
    </span>
  );
}

export function Pill({ tone = "cold", children }: { tone?: "cold" | "accent" | "green" | "red"; children: React.ReactNode }) {
  const tones = {
    cold: { backgroundColor: app.pill, color: app.pillText },
    accent: { backgroundColor: "#343a78", color: "#c3c8fd" },
    green: { backgroundColor: "#1d3b2a", color: app.green },
    red: { backgroundColor: "#4a2224", color: "#f87171" },
  };
  return (
    <span className="inline-block shrink-0 whitespace-nowrap rounded-[0.35em] px-[0.6em] py-[0.2em] text-[0.62em] font-medium" style={tones[tone]}>
      {children}
    </span>
  );
}

/** Fades and rises 8px into place when its screen enters view; `delay` in seconds. */
export function Item({
  as = "div",
  delay = 0,
  className = "",
  style,
  children,
}: {
  as?: "div" | "li";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag data-reveal variants={rise} custom={delay} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Counts from `from` to `to` over ≤0.8s once `on`; jumps straight to `to` with reduced motion. */
export function useCountUp(to: number, on: boolean, reduce: boolean, { from = 0, delay = 0, duration = 0.8 } = {}) {
  const [value, setValue] = useState(reduce ? to : from);
  useEffect(() => {
    if (reduce) return setValue(to);
    if (!on) return;
    const controls = animate(from, to, { duration, delay, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [on, reduce, to, from, delay, duration]);
  return value;
}

/** A call timer that ticks once a second while `on` and the tab is visible, resuming where it left off. Static with reduced motion. */
export function useClock(start: number, on: boolean, reduce: boolean) {
  const [s, setS] = useState(start);
  const page = usePageVisible();
  useEffect(() => {
    if (!on || reduce || !page) return;
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [on, reduce, page]);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Flips true `ms` after `on` (immediately with reduced motion). */
export function useAfter(on: boolean, reduce: boolean, ms: number) {
  const [done, setDone] = useState(reduce);
  useEffect(() => {
    if (reduce) return setDone(true);
    if (!on) return;
    const id = setTimeout(() => setDone(true), ms);
    return () => clearTimeout(id);
  }, [on, reduce, ms]);
  return done;
}

export function Bar({ value, total, track = app.row, fill = app.accent, height = "0.4em" }: { value: number; total: number; track?: string; fill?: string; height?: string }) {
  return (
    <div className="overflow-hidden rounded-full" style={{ backgroundColor: track, height }}>
      {/* Filled with a transform, not width, so progress never triggers layout. */}
      <div className="h-full origin-left rounded-full" style={{ transform: `scaleX(${Math.min(1, value / total)})`, backgroundColor: fill }} />
    </div>
  );
}
