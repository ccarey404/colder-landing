"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE, useLive } from "@/lib/motion";
import { Face, LookArea, agentColors } from "./mocks/face";
import { Logo } from "./logo";
import { Icon, Rail, app, icons } from "./mocks/kit";

type Msg = { from: "user" | "agent"; text: string };

// Scripted sample conversations with fictional businesses.
const agents: { name: string; role: string; color: string; script: Msg[] }[] = [
  {
    name: "Caller",
    role: "Calls & callbacks",
    color: agentColors.caller,
    script: [
      { from: "user", text: "Make me a lead list of 10 roofing companies in Austin" },
      { from: "agent", text: "Done. I found 10 roofing companies in Austin with a listed phone number and saved them as “Austin roofers.” Want me to add them to today’s queue?" },
      { from: "user", text: "Yes, start with the ones that open earliest" },
      { from: "agent", text: "Queued. Northside Roofing opens at 7:00 AM, so they’re up first. I’ll remind you at 6:55." },
    ],
  },
  {
    name: "Mailer",
    role: "Email & meetings",
    color: agentColors.mailer,
    script: [
      { from: "user", text: "Write a follow-up to Oak Realty after today’s call" },
      { from: "agent", text: "Here’s a draft: “Thanks for your time today, Dana. As promised, here’s a one-page overview. Would Thursday at 10:00 work for a short walkthrough?” Send it now or tomorrow morning?" },
      { from: "user", text: "Tomorrow at 9" },
      { from: "agent", text: "Scheduled for tomorrow at 9:00 AM. I’ll let you know as soon as Dana replies." },
    ],
  },
  {
    name: "Chatter",
    role: "Text follow-ups",
    color: agentColors.chatter,
    script: [
      { from: "user", text: "Text Clearwater Plumbing a reminder about tomorrow’s 10:30 call" },
      { from: "agent", text: "Drafted: “Hi Sam, it’s Alex. Just confirming our call tomorrow at 10:30. Reply 1 to confirm or 2 to pick a new time.” Want me to send it?" },
      { from: "user", text: "Send it" },
      { from: "agent", text: "Sent. If they ask to reschedule, I’ll put it on your Home screen." },
    ],
  },
];

const HOLD_MS = 2400;

/** The Agents screen from the app, playing a short scripted conversation per agent. */
export function AgentsPanel() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // The conversation and auto-cycle only advance while the panel is on screen and the tab is visible.
  const inView = useLive(ref, 0.4);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [manual, setManual] = useState(false);
  const [hello, setHello] = useState(0);
  const script = agents[active].script;
  const shown = reduce ? script.length : step;

  function select(i: number, byUser: boolean) {
    if (byUser) setManual(true);
    if (i === active) return;
    setActive(i);
    setStep(0);
    setTyping(false);
    setHello((h) => h + 1);
  }

  // Play the script one message at a time; then hold and move to the next agent until someone clicks.
  useEffect(() => {
    if (reduce || !inView) return;
    let id: ReturnType<typeof setTimeout>;
    if (step >= script.length) {
      if (!manual) id = setTimeout(() => select((active + 1) % agents.length, false), HOLD_MS);
    } else if (script[step].from === "user") {
      id = setTimeout(() => setStep((s) => s + 1), step === 0 ? 400 : 900);
    } else {
      setTyping(true);
      id = setTimeout(() => {
        setTyping(false);
        setStep((s) => s + 1);
      }, 1100);
    }
    return () => clearTimeout(id);
  }, [step, active, inView, reduce, manual]);

  const fade = { duration: reduce ? 0 : DURATION.card, ease: EASE };
  const fadeOut = { duration: reduce ? 0 : DURATION.ui, ease: EASE };
  const agent = agents[active];

  return (
    <div ref={ref}>
      <LookArea className="app-ui relative overflow-hidden rounded-xl border border-dark-line text-[14px] text-white">
        <div className="flex flex-col p-3 sm:p-4" style={{ backgroundColor: app.bg }}>
          <div className="mb-3 hidden items-center justify-between text-[16px] md:flex">
            <Logo size={26} />
            <span className="grid size-8 place-items-center rounded-full text-[11px] font-semibold" style={{ backgroundColor: app.avatar }}>
              AM
            </span>
          </div>

          <div className="flex gap-4 md:pr-14">
            <div className="hidden text-[15px] md:flex">
              <Rail active="agents" />
            </div>

            <div
              className="grid h-[32rem] min-w-0 flex-1 overflow-hidden rounded-2xl border md:h-[34rem] md:grid-cols-[14rem_1fr]"
              style={{ backgroundColor: app.card, borderColor: app.edge }}
            >
              {/* Sidebar (desktop) */}
              <aside className="hidden flex-col border-r p-3 md:flex" style={{ backgroundColor: app.raised, borderColor: app.edge }}>
                <p className="px-2 pb-3 pt-1 text-[13px]" style={{ color: app.muted }}>
                  Your agents
                </p>
                <div role="tablist" aria-label="Agents" className="space-y-1">
                  {agents.map((a, i) => (
                    <button
                      key={a.name}
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => select(i, true)}
                      className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-white/[0.04]"
                      style={i === active ? { backgroundColor: app.row } : undefined}
                    >
                      <Face color={a.color} className="size-10" />
                      <span className="min-w-0">
                        <span className="block font-semibold">{a.name}</span>
                        <span className="block truncate text-[13px]" style={{ color: app.muted }}>
                          {a.role}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <span className="mt-auto flex h-11 items-center justify-center gap-2 rounded-xl border font-semibold" style={{ borderColor: app.edge }}>
                  <Icon d={icons.plus} className="size-4" /> Campaign
                </span>
              </aside>

              <section aria-label={`${agent.name} chat`} className="flex min-h-0 flex-col">
                {/* Faces row (mobile) */}
                <div role="tablist" aria-label="Agents" className="flex justify-around border-b px-3 py-3 md:hidden" style={{ borderColor: app.edge }}>
                  {agents.map((a, i) => (
                    <button
                      key={a.name}
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => select(i, true)}
                      className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px]"
                      style={i === active ? { backgroundColor: app.row } : { color: app.muted }}
                    >
                      <Face color={a.color} className="size-9" />
                      {a.name}
                    </button>
                  ))}
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: app.edge }}>
                  <Face color={agent.color} className="size-9" hello={hello} />
                  <div className="grid flex-1">
                  <AnimatePresence initial={false}>
                    <motion.div key={agent.name} className="col-start-1 row-start-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: fadeOut }} transition={fade}>
                      <p className="text-[17px] font-semibold leading-tight">{agent.name}</p>
                      <p className="text-[13px]" style={{ color: app.muted }}>
                        {agent.role}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  </div>
                  <Icon d={icons.settings} className="size-5 text-dark-muted" />
                </div>

                {/* Conversation */}
                <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={agent.name}
                    aria-live="polite"
                    className="col-start-1 row-start-1 flex min-h-0 flex-col justify-end gap-4 overflow-hidden px-4 py-4 sm:px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: fadeOut }}
                    transition={fade}
                  >
                    {script.slice(0, shown).map((m, i) =>
                      m.from === "user" ? (
                        <motion.p
                          key={i}
                          className="ml-auto max-w-[80%] rounded-2xl px-4 py-2.5"
                          style={{ backgroundColor: app.row }}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: DURATION.card, ease: EASE }}
                        >
                          {m.text}
                        </motion.p>
                      ) : (
                        <motion.div key={i} className="max-w-[90%]" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DURATION.card, ease: EASE }}>
                          <p className="leading-relaxed">{m.text}</p>
                          <button
                            type="button"
                            aria-label="Copy reply"
                            onClick={() => navigator.clipboard?.writeText(m.text).catch(() => {})}
                            className="mt-2 grid size-7 place-items-center rounded-md transition-colors hover:bg-white/5"
                            style={{ color: app.muted }}
                          >
                            <Icon d={icons.copy} className="size-4" />
                          </button>
                        </motion.div>
                      ),
                    )}
                    {typing && (
                      <div className="flex gap-1.5 py-2" aria-label={`${agent.name} is typing`}>
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="size-1.5 rounded-full bg-white/70"
                            animate={{ opacity: [0.25, 1, 0.25] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                </div>

                {/* Composer */}
                <div className="m-3 flex items-center gap-3 rounded-full py-1.5 pl-4 pr-1.5 sm:mx-8 sm:mb-4" style={{ backgroundColor: app.raised }}>
                  <Icon d={icons.clip} className="size-[18px] text-dark-muted" />
                  <span className="flex-1 truncate" style={{ color: app.faint }}>
                    Message {agent.name}…
                  </span>
                  <Icon d={icons.mic} className="size-[18px] text-dark-muted" />
                  <span className="grid size-9 place-items-center rounded-full" style={{ backgroundColor: "#383e85" }}>
                    <Icon d={icons.up} className="size-4 text-white/70" />
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>

        <span className="absolute bottom-4 right-3 hidden md:block">
          <Face color={agentColors.caller} className="size-11" />
        </span>
      </LookArea>
    </div>
  );
}
