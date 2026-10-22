"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { AppFrame, Bar, Card, Initials, Item, app, useCountUp, useStage } from "./kit";

// Made-up teammates only.
const callers = [
  { initials: "AM", name: "Alex Morgan", calls: 13, interested: 2 },
  { initials: "SR", name: "Sam Rivera", calls: 9, interested: 1 },
  { initials: "JL", name: "Jordan Lee", calls: 6, interested: 1 },
  { initials: "MC", name: "Mia Chen", calls: 3, interested: 0 },
];

function Status({ live }: { live: boolean }) {
  return (
    <span className="grid justify-items-end">
      <AnimatePresence initial={false}>
        <motion.span
          key={String(live)}
          className="col-start-1 row-start-1 flex items-center gap-[0.35em] whitespace-nowrap text-[0.58em]"
          style={{ color: live ? app.green : app.muted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.ui, ease: EASE }}
        >
          {live && <span className="size-[0.55em] rounded-full" style={{ backgroundColor: app.green }} />}
          {live ? "On a call" : "No active call"}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CallerCard({ c, calls, live = false }: { c: (typeof callers)[number]; calls: number; live?: boolean }) {
  return (
    <div className="rounded-[0.8em] border p-[0.9em]" style={{ backgroundColor: app.raised, borderColor: app.edge }}>
      <div className="flex items-center justify-between gap-[0.5em]">
        <Initials text={c.initials} className="size-[2.2em]" />
        <Status live={live} />
      </div>
      <p className="mt-[0.8em] truncate text-[0.75em] font-semibold">{c.name}</p>
      <div className="mt-[0.5em] flex items-baseline justify-between">
        <p>
          <span className="inline-block min-w-[1.25em] text-[0.95em] font-semibold tabular-nums">{calls}</span>
          <span className="text-[0.6em]" style={{ color: app.muted }}>
            {" "}
            calls
          </span>
        </p>
        <span className="text-[0.56em]" style={{ color: app.muted }}>
          {c.interested} interested
        </span>
      </div>
      <div className="mt-[0.7em]">
        <Bar value={calls} total={25} height="0.28em" />
      </div>
    </div>
  );
}

function Updating() {
  return (
    <span className="flex items-center gap-[0.35em] text-[0.6em]" style={{ color: app.muted }}>
      <span className="size-[0.5em] rounded-full" style={{ backgroundColor: app.green }} /> Updating
    </span>
  );
}

const TILES = [
  { label: "Team calls today", value: 31, accent: true },
  { label: "Reached", value: 9 },
  { label: "Interested", value: 4, green: true },
  { label: "Connection rate", value: 29, percent: true },
];

/** A stat tile that owns its count-up, so each tick re-renders only this tile. */
function Tile({ tile, on, reduce }: { tile: (typeof TILES)[number]; on: boolean; reduce: boolean }) {
  const value = useCountUp(tile.value, on, reduce);
  return (
    <div
      className="rounded-[0.9em] border p-[0.9em]"
      style={tile.accent ? { backgroundColor: app.accent, borderColor: app.accent } : { backgroundColor: app.card, borderColor: app.edge }}
    >
      <p className="text-[0.6em]" style={{ color: tile.accent ? "rgb(255 255 255 / 0.85)" : app.muted }}>
        {tile.label}
      </p>
      <p className="mt-[0.7em] text-[1.9em] font-semibold leading-none tabular-nums" style={tile.green ? { color: app.green } : undefined}>
        {value}
        {tile.percent && <span className="text-[0.5em]">%</span>}
      </p>
    </div>
  );
}

/** A caller card whose call count and bar fill on their own. */
function CountingCaller({ c, on, reduce }: { c: (typeof callers)[number]; on: boolean; reduce: boolean }) {
  return <CallerCard c={c} calls={useCountUp(c.calls, on, reduce, { delay: 0.3 })} />;
}

/** step-4: Team activity. Stat tiles count up and each caller's progress bar fills. */
export function TeamStep() {
  const { reduce, on, root } = useStage();

  return (
    <AppFrame label="Colder team activity" fontSize={2.3} root={root} active="team">
      <p className="text-[1.2em] font-semibold tracking-[-0.02em]">Team activity</p>
      <p className="text-[0.72em] font-semibold">4 / 4 seats used</p>
      <div className="mt-[0.8em] grid grid-cols-4 gap-[0.6em]">
        {TILES.map((t) => (
          <Tile key={t.label} tile={t} on={on} reduce={reduce} />
        ))}
      </div>
      <Card className="mt-[0.7em] flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[0.85em] font-semibold">Callers</p>
          <Updating />
        </div>
        <div className="mt-[0.7em] grid grid-cols-4 gap-[0.5em]">
          {callers.map((c) => (
            <CountingCaller key={c.name} c={c} on={on} reduce={reduce} />
          ))}
        </div>
      </Card>
    </AppFrame>
  );
}

// Who is on a call at each beat of the sequence.
const BEATS = [[], [0], [0, 2], [2], [1, 2]];

/** feature-team: the Callers grid, with "No active call" / "On a call" changing as calls start and end. */
export function CallersFeature() {
  const { reduce, on, root } = useStage();
  const [beat, setBeat] = useState(reduce ? BEATS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return setBeat(BEATS.length - 1);
    if (!on || beat >= BEATS.length - 1) return;
    const id = setTimeout(() => setBeat((b) => b + 1), 900);
    return () => clearTimeout(id);
  }, [on, reduce, beat]);

  return (
    <AppFrame label="Colder callers" fontSize={3.4} root={root} chrome="bare">
      <Card className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[0.85em] font-semibold">Callers</p>
          <Updating />
        </div>
        <div className="mt-[0.7em] grid grid-cols-2 gap-[0.5em]">
          {callers.map((c, i) => (
            <Item key={c.name} delay={0.08 * i}>
              <CallerCard c={c} calls={c.calls} live={BEATS[beat].includes(i)} />
            </Item>
          ))}
        </div>
      </Card>
    </AppFrame>
  );
}

