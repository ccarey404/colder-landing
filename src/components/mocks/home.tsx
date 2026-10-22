"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE, useLive } from "@/lib/motion";
import { AppFrame, Bar, Card, Icon, Initials, Pill, app, icons, useAfter, useClock, useCountUp, useStage } from "./kit";

// Fictional businesses and 555-01xx numbers only.
const leads = [
  { initials: "NR", name: "Northside Roofing", phone: "(555) 014-2231" },
  { initials: "OR", name: "Oak Realty", phone: "(555) 016-8840" },
  { initials: "CP", name: "Clearwater Plumbing", phone: "(555) 019-3302" },
  { initials: "HD", name: "Harbor Dental", phone: "(555) 012-7718" },
  { initials: "SE", name: "Summit Exteriors", phone: "(555) 018-0456" },
];

type Call = { id: number; name: string; time: string };
const firstCalls: Call[] = [
  { id: 4, name: "Brightline HVAC", time: "10:05 AM" },
  { id: 3, name: "Maple Street Bakery", time: "9:48 AM" },
  { id: 2, name: "Pine Hill Landscaping", time: "9:31 AM" },
  { id: 1, name: "Riverside Auto Glass", time: "9:12 AM" },
];

const GOAL = 25;
const ROWS = 4;
// One full cycle (wait + button press) every ~2.6s.
const LOOP_MS = 2600;
const PRESS_MS = 220;
const WEEK = ["F", "S", "S", "M", "T", "W", "T"];
const STREAK = [4, 5]; // Tuesday and Wednesday hit the goal

function addMinutes(time: string, add: number) {
  const [, h, m, ap] = time.match(/(\d+):(\d+) (AM|PM)/)!;
  const mins = (((Number(h) % 12) + (ap === "PM" ? 12 : 0)) * 60 + Number(m) + add) % (24 * 60);
  const hh = Math.floor(mins / 60);
  return `${hh % 12 || 12}:${String(mins % 60).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`;
}

// The hero counts a touch quicker than the other mocks.
const QUICK = { duration: 0.6 };

/** Owns its count-up, so each tick re-renders only this card. `made` adds calls placed since. */
function DailyGoal({ on, reduce, made }: { on: boolean; reduce: boolean; made: number }) {
  const calls = Math.min(GOAL, useCountUp(13, on, reduce, QUICK) + made);
  return (
    <div className="flex flex-col rounded-[1em] p-[1.1em]" style={{ backgroundColor: app.accent }}>
      <div className="flex items-center justify-between">
        <p className="text-[0.82em] font-semibold">Daily goal</p>
        <span className="flex items-center gap-[0.3em] rounded-full bg-white px-[0.65em] py-[0.3em] text-[0.66em] font-semibold text-ink">
          <Icon d={icons.flame} className="size-[1.1em] text-[#ef4444]" /> 2 days
        </span>
      </div>
      <p className="mt-[0.5em]">
        <span className="inline-block min-w-[1.2em] text-[2.7em] font-semibold leading-none tabular-nums">{calls}</span>
        <span className="text-[0.95em] text-white/85"> / {GOAL} calls</span>
      </p>
      <div className="mt-[0.8em]">
        <Bar value={calls} total={GOAL} track="rgb(255 255 255 / 0.25)" fill="#fff" />
      </div>
      <div className="mt-[0.55em] flex justify-between text-[0.6em]">
        <span>4 reached · 2 interested</span>
        <span className="font-semibold tabular-nums">{GOAL - calls} to go</span>
      </div>
      <div className="mt-auto grid grid-cols-7 pt-[0.7em] text-center text-[0.56em]">
        {WEEK.map((d, i) => {
          const today = i === WEEK.length - 1;
          const flame = STREAK.includes(i);
          return (
            <span key={i} className="flex flex-col items-center gap-[0.5em]">
              <span className={`grid size-[2.5em] place-items-center rounded-full ${flame ? "bg-white/25" : ""} ${today ? "rounded-[0.6em] ring-1 ring-white/60" : ""}`}>
                {flame ? (
                  <svg viewBox="0 0 24 24" className="size-[1.5em]" aria-hidden>
                    <path d={icons.flame} fill="#ff8a1f" stroke="#ff5a1f" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="size-[0.45em] rounded-full bg-white/50" />
                )}
              </span>
              <span className={today ? "font-bold" : "text-white/80"}>{d}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function KeepCalling({ pressed = false }: { pressed?: boolean }) {
  return (
    <motion.div
      className="flex h-[2.9em] items-center rounded-[0.65em] px-[1em]"
      style={{ backgroundColor: app.accent }}
      animate={{ scale: pressed ? 0.97 : 1 }}
      transition={{ duration: DURATION.ui, ease: EASE }}
    >
      <Icon d={icons.phone} className="size-[1.05em]" />
      <span className="flex-1 text-center text-[0.8em] font-semibold">Keep calling</span>
      <Icon d={icons.arrow} className="size-[1.05em]" />
    </motion.div>
  );
}

function UpNext({
  lead,
  pressed = false,
  status = "Cold",
  footer,
  className = "",
}: {
  lead: (typeof leads)[number];
  pressed?: boolean;
  status?: string;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-[0.78em]" style={{ color: app.muted }}>
          Up next
        </p>
        <Pill tone={status === "Cold" ? "cold" : "accent"}>{status}</Pill>
      </div>
      {/* Old and new lead share one grid cell, so the swap cross-fades without an empty frame. */}
      <div className="mt-[0.9em] grid">
        <AnimatePresence initial={false}>
          <motion.div
            key={lead.name}
            className="col-start-1 row-start-1 flex items-center gap-[0.8em]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: DURATION.card, ease: EASE }}
          >
          <Initials text={lead.initials} className="size-[2.7em]" />
          <div className="min-w-0">
            <p className="truncate text-[1.05em] font-semibold">{lead.name}</p>
            <p className="text-[0.68em] tabular-nums" style={{ color: app.muted }}>
              {lead.phone}
            </p>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-auto pt-[1em]">{footer ?? <KeepCalling pressed={pressed} />}</div>
    </Card>
  );
}

function CallbackRow({ name, initials, when }: { name: string; initials: string; when: string }) {
  return (
    <div className="flex items-center gap-[0.7em] rounded-[0.65em] px-[0.8em] py-[0.6em]" style={{ backgroundColor: app.row }}>
      <Initials text={initials} className="size-[2.2em]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.75em] font-semibold">{name}</p>
        <p className="text-[0.62em]" style={{ color: app.muted }}>
          Callback · {when}
        </p>
      </div>
    </div>
  );
}

function ConnectCalendar() {
  return (
    <div className="mt-[0.5em] flex items-center gap-[0.7em] rounded-[0.65em] px-[0.8em] py-[0.65em]" style={{ backgroundColor: app.row }}>
      <Icon d={icons.calendar} className="size-[1.05em] text-[#c3c8fd]" />
      <div className="min-w-0 flex-1">
        <p className="text-[0.72em] font-semibold text-[#d6d9fe]">Connect calendar</p>
        <p className="text-[0.6em]" style={{ color: app.muted }}>
          Google or Outlook
        </p>
      </div>
      <Icon d={icons.arrow} className="size-[0.95em]" />
    </div>
  );
}

function DueToday({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <p className="text-[0.85em] font-semibold">Due today</p>
        <span className="flex items-center gap-[0.35em] text-[0.65em]" style={{ color: app.muted }}>
          <Icon d={icons.calendar} className="size-[1.15em]" /> Calendar
        </span>
      </div>
      <div className="mt-[0.8em]">{children}</div>
    </Card>
  );
}

function CallRow({ call, reduce }: { call: Call; reduce: boolean }) {
  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.card, ease: EASE }}
      className="flex h-[3.1em] w-full items-center gap-[0.75em]"
    >
      <span className="grid size-[2.2em] shrink-0 place-items-center rounded-[0.55em]" style={{ backgroundColor: app.avatar, color: app.avatarText }}>
        <Icon d={icons.phone} className="size-[1em]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.75em] font-semibold">{call.name}</p>
        <p className="flex items-center gap-[0.35em] text-[0.6em]" style={{ color: app.muted }}>
          <Icon d={icons.star} className="size-[1em]" /> —
          <Icon d={icons.mail} className="ml-[0.4em] size-[1em]" /> Not sent
        </p>
      </div>
      <span className="text-[0.65em]" style={{ color: app.muted }}>
        Completed
      </span>
      <span className="w-[4.6em] text-right text-[0.65em] tabular-nums" style={{ color: app.muted }}>
        {call.time}
      </span>
    </motion.li>
  );
}

function RecentCalls({ calls, reduce, className = "" }: { calls: Call[]; reduce: boolean; className?: string }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <p className="text-[0.85em] font-semibold">Recent calls</p>
        <span className="text-[0.65em] font-medium">View all</span>
      </div>
      {/* A fixed window of four rows: new calls slide in at the top, the oldest fades out in place at the bottom. */}
      <ul className="relative mt-[0.5em] h-[12.4em] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {calls.slice(0, ROWS).map((c) => (
            <CallRow key={c.id} call={c} reduce={reduce} />
          ))}
        </AnimatePresence>
      </ul>
    </Card>
  );
}

function TeamToday({ on, reduce, made }: { on: boolean; reduce: boolean; made: number }) {
  const calls = useCountUp(31, on, reduce, QUICK) + made;
  const reached = useCountUp(9, on, reduce, QUICK);
  const interested = useCountUp(4, on, reduce, QUICK);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-[0.85em] font-semibold">The team today</p>
        <span className="flex items-center gap-[0.25em] text-[0.65em] font-medium">
          View team <Icon d={icons.upRight} className="size-[1em]" />
        </span>
      </div>
      <div className="mt-[0.9em] grid grid-cols-3">
        {[
          [calls, "Calls", app.calls],
          [reached, "Reached", app.reached],
          [interested, "Interested", app.green],
        ].map(([v, l, color]) => (
          <div key={l}>
            <p className="text-[1.7em] font-semibold leading-none tabular-nums" style={{ color: color as string }}>
              {v}
            </p>
            <p className="mt-[0.4em] text-[0.62em]" style={{ color: app.muted }}>
              {l}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/**
 * hero: the Home dashboard. Counts up on entry, then every few seconds "Keep calling" is pressed,
 * the call lands at the top of Recent calls and Up next moves to the next lead.
 */
export function HomeDashboard() {
  const { reduce, on, root } = useStage();
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref, 0.3);
  const shown = useCountUp(firstCalls.length, on, reduce, { ...QUICK, delay: 0.2 });
  const [calls, setCalls] = useState(firstCalls);
  const [lead, setLead] = useState(0);
  const [pressed, setPressed] = useState(false);
  const made = calls.length - firstCalls.length;

  useEffect(() => {
    if (!on || reduce || !live) return;
    let release: ReturnType<typeof setTimeout>;
    const press = setTimeout(() => {
      setPressed(true);
      release = setTimeout(() => {
        setPressed(false);
        setCalls((cs) => [{ id: cs[0].id + 1, name: leads[lead].name, time: addMinutes(cs[0].time, 16) }, ...cs]);
        setLead((l) => (l + 1) % leads.length);
      }, PRESS_MS);
    }, LOOP_MS - PRESS_MS);
    return () => {
      clearTimeout(press);
      clearTimeout(release);
    };
  }, [lead, on, reduce, live]);

  return (
    <div ref={ref} className="h-full">
      <AppFrame label="Colder home dashboard" fontSize={1.6} root={root} chrome="full" active="home">
        <div className="grid grid-cols-3 gap-[0.9em]">
          <DailyGoal on={on} reduce={reduce} made={made} />
          <UpNext lead={leads[lead]} pressed={pressed} />
          <DueToday>
            <CallbackRow name="Oak Realty" initials="OR" when="Today · 2:00 PM" />
            <ConnectCalendar />
          </DueToday>
        </div>
        <div className="mt-[0.9em] grid grid-cols-[1.7fr_1fr] items-start gap-[0.9em]">
          <RecentCalls calls={calls.slice(0, made + shown)} reduce={reduce} />
          <TeamToday on={on} reduce={reduce} made={made} />
        </div>
      </AppFrame>
    </div>
  );
}

/** step-2: the Up next card switching into a call, with a running timer. */
export function CallStep() {
  const { reduce, on, root } = useStage();
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive(ref);
  const calling = useAfter(on, reduce, 700);
  const time = useClock(reduce ? 134 : 0, calling && live, reduce);
  return (
    <div ref={ref} className="h-full">
      <AppFrame label="Colder call in progress" fontSize={2.4} root={root} active="home">
      <div className="flex flex-1 items-center justify-center">
        <UpNext
          lead={leads[0]}
          status={calling ? "On call" : "Cold"}
          className="w-[75%]"
          footer={
            <div className="grid">
              <AnimatePresence initial={false}>
              {calling ? (
                <motion.div
                  key="call"
                  className="col-start-1 row-start-1 flex h-[2.9em] items-center gap-[0.8em] rounded-[0.65em] px-[0.6em]"
                  style={{ backgroundColor: app.row }}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DURATION.card, ease: EASE }}
                >
                  <span className="grid size-[2em] place-items-center rounded-full" style={{ backgroundColor: app.accent }}>
                    <Icon d={icons.phone} className="size-[0.95em]" />
                  </span>
                  <span className="inline-block w-[2.9em] text-[0.95em] font-semibold tabular-nums">{time}</span>
                  <span className="text-[0.66em]" style={{ color: app.muted }}>
                    On call
                  </span>
                  <span className="ml-auto">
                    <Pill tone="red">End call</Pill>
                  </span>
                </motion.div>
              ) : (
                <motion.div key="idle" className="col-start-1 row-start-1" exit={{ opacity: 0 }} transition={{ duration: DURATION.ui, ease: EASE }}>
                  <KeepCalling />
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          }
        />
      </div>
      </AppFrame>
    </div>
  );
}

/** step-3: Due today. A callback drops in above "Connect calendar". */
export function DueTodayStep() {
  const { reduce, on, root } = useStage();
  const landed = useAfter(on, reduce, 400);
  return (
    <AppFrame label="Colder due today" fontSize={2.4} root={root} active="home">
      <div className="flex flex-1 items-center justify-center">
        <DueToday className="w-[75%]">
          {/* The empty state fades out under the arriving callback; one grid cell, so nothing jumps. */}
          <div className="grid min-h-[3.2em]">
            <AnimatePresence initial={false}>
              {landed ? (
                <motion.div
                  key="callback"
                  className="col-start-1 row-start-1"
                  initial={reduce ? false : { opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DURATION.card, ease: EASE }}
                >
                  <CallbackRow name="Northside Roofing" initials="NR" when="Tomorrow · 10:30 AM" />
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  className="col-start-1 row-start-1 pt-[0.6em] text-[0.68em]"
                  style={{ color: app.muted }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.ui, ease: EASE }}
                >
                  Nothing scheduled today
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <ConnectCalendar />
        </DueToday>
      </div>
    </AppFrame>
  );
}

/** feature-history: Recent calls, with Completed rows and their times appearing one by one. */
export function RecentCallsFeature() {
  const { reduce, on, root } = useStage();
  const shown = useCountUp(firstCalls.length, on, reduce, { delay: 0.2 });
  return (
    <AppFrame label="Colder recent calls" fontSize={3.6} root={root} chrome="bare">
      <RecentCalls calls={firstCalls.slice(0, shown)} reduce={reduce} className="flex-1" />
    </AppFrame>
  );
}
