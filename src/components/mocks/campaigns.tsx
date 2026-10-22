"use client";

import { AnimatePresence, motion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";
import { Face, agentColors } from "./face";
import { AppFrame, Bar, Icon, Pill, app, icons, useAfter, useCountUp, useStage } from "./kit";

const filters = ["All", "Active", "Needs attention", "Finished"];

/** Campaigns: "Create with Agents" is pressed and a new campaign replaces the empty state. */
export function CampaignsScreen() {
  const { reduce, on, root } = useStage();
  const pressing = useAfter(on, reduce, 600);
  const released = useAfter(on, reduce, 800);
  const created = useAfter(on, reduce, 900);
  const pressed = pressing && !released;
  const called = useCountUp(3, created, reduce, { delay: 0.4 });

  return (
    <AppFrame label="Colder campaigns" fontSize={2.7} root={root} active="campaigns">
      <div className="flex items-center justify-between">
        <div className="flex text-[0.8em]">
          <span className="rounded-[0.6em] px-[0.8em] py-[0.5em] font-semibold" style={{ backgroundColor: app.raised }}>
            Campaigns
          </span>
          <span className="px-[0.8em] py-[0.5em]" style={{ color: app.muted }}>
            Calendar
          </span>
        </div>
        <motion.span
          className="flex items-center gap-[0.35em] rounded-[0.6em] px-[0.85em] py-[0.55em] text-[0.7em] font-semibold"
          style={{ backgroundColor: app.accent }}
          animate={{ scale: pressed ? 0.95 : 1 }}
          transition={{ duration: DURATION.ui, ease: EASE }}
        >
          <Icon d={icons.plus} className="size-[1em]" /> Create with Agents
        </motion.span>
      </div>
      <div className="mt-[0.7em] flex text-[0.68em]">
        {filters.map((f, i) => (
          <span key={f} className="rounded-[0.55em] px-[0.75em] py-[0.45em]" style={i === 0 ? { backgroundColor: app.raised } : { color: app.muted }}>
            {f}
          </span>
        ))}
      </div>
      <div className="mt-[0.7em] grid flex-1 rounded-[1em] p-[0.9em]" style={{ backgroundColor: app.raised }}>
        <AnimatePresence initial={false}>
          {created ? (
            <motion.div
              key="campaign"
              className="col-start-1 row-start-1 self-start rounded-[0.8em] border p-[0.9em]"
              style={{ backgroundColor: app.card, borderColor: app.edge }}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.card, ease: EASE }}
            >
              <div className="flex items-center justify-between gap-[0.6em]">
                <div className="flex items-center gap-[0.7em]">
                  <Face color={agentColors.caller} className="size-[2.2em]" />
                  <div>
                    <p className="text-[0.82em] font-semibold">Austin roofers</p>
                    <p className="text-[0.62em]" style={{ color: app.muted }}>
                      Created with Caller · 10 leads · Starts today
                    </p>
                  </div>
                </div>
                <Pill tone="green">Active</Pill>
              </div>
              <div className="mt-[0.9em]">
                <Bar value={called} total={10} />
              </div>
              <p className="mt-[0.5em] text-[0.62em] tabular-nums" style={{ color: app.muted }}>
                {called} of 10 called
              </p>
            </motion.div>
          ) : (
            <motion.div key="empty" className="col-start-1 row-start-1 place-self-center text-center" exit={{ opacity: 0 }} transition={{ duration: DURATION.ui, ease: EASE }}>
              <p className="text-[0.72em]" style={{ color: app.muted }}>
                No campaigns yet.
              </p>
              <p className="mt-[0.8em] flex items-center justify-center gap-[0.35em] text-[0.72em] font-medium">
                Create with Agents <Icon d={icons.upRight} className="size-[1em]" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppFrame>
  );
}
