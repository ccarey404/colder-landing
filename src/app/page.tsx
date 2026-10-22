import Link from "next/link";
import { HeroDemo } from "@/components/hero-demo";
import { WorkflowTabs } from "@/components/workflow-tabs";
import { WaitlistForm } from "@/components/waitlist-form";
import { Check, CtaBand, Faq, SectionHead } from "@/components/ui";

const ticker = [
  "Callback saved · Tomorrow 10:30 AM",
  "Reached · Next step agreed",
  "Voicemail · Retry Thursday",
  "Owner set · Mia",
  "Do not contact · Removed from queue",
  "Note saved · Prefers mornings",
  "Daily goal · 13 / 20",
  "Follow-up due · 9:15 AM",
];

const loop = [
  {
    n: "01",
    title: "Leads",
    body: "Your list, organized. Every attempt and note linked to one contact, with duplicates kept out.",
    tags: ["Your own CSV", "Niche lists", "Opt-outs"],
  },
  {
    n: "02",
    title: "Calls",
    body: "One primary action: the next appropriate call. The context you need stays on screen while you talk.",
    tags: ["Call timer", "Live notes", "Outcomes"],
  },
  {
    n: "03",
    title: "Follow-ups",
    body: "Every promise becomes a dated task with an owner. Due callbacks lead tomorrow's session.",
    tags: ["Callbacks", "Owners", "Progress"],
  },
];

const features = [
  {
    title: "Bring your own leads",
    body: "Import a CSV and keep separate niche lists. Repeat attempts stay on the same contact instead of becoming duplicates.",
    icon: "M4 4h12v12H4zM4 8h12M8 8v8",
  },
  {
    title: "Callbacks that don't slip",
    body: "A callback is a task with an action, a due time and an owner, not a sentence buried in a note.",
    icon: "M10 4v6l4 2M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  },
  {
    title: "Context on every contact",
    body: "See the last conversation and what was agreed before you call again. A missed call never erases yesterday's interest.",
    icon: "M4 5h12M4 10h12M4 15h7",
  },
  {
    title: "Opt-outs that stick",
    body: "A request to stop contact overrides any follow-up. The person leaves the queue, for good.",
    icon: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM4.5 4.5l11 11",
  },
  {
    title: "Coaching on one thing",
    body: "One useful improvement grounded in a real call, like leaving more space after your opener.",
    icon: "M10 3l2 4.5 5 .5-3.8 3.3 1.1 4.9L10 13.7 5.7 16.2l1.1-4.9L3 8l5-.5z",
  },
  {
    title: "Calls routed through Colder",
    body: "Automatic tracking, with recording only where it's eligible and the required disclosure and consent are handled.",
    icon: "M5 3h3l1.5 4-2 1.5a9 9 0 0 0 4 4l1.5-2 4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 3 5a2 2 0 0 1 2-2z",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "at launch",
    body: "Everything you need to run a daily calling routine on your own.",
    features: ["Lead queue and call outcomes", "Notes and dated follow-ups", "Daily goals and progress", "Calling allowance included"],
    cta: "Get free access",
    href: "/waitlist",
  },
  {
    name: "Individual",
    price: "$18",
    cadence: "per month",
    body: "For callers making cold calls part of every day.",
    features: ["Everything in Free", "More room to call", "Calling and coaching tools as they launch", "Terms shown before you pay"],
    cta: "Join the waitlist",
    href: "/waitlist",
    featured: true,
  },
  {
    name: "Agency",
    price: "Custom",
    cadence: "team pricing soon",
    body: "For owners running a team of callers with shared leads.",
    features: ["Lead ownership", "Caller attribution", "Shared follow-up context", "Team activity views"],
    cta: "Register team interest",
    href: "/waitlist?as=agency",
  },
];

const principles = [
  ["Opt-outs respected", "Do-not-contact overrides every follow-up."],
  ["No passive capture", "Colder never listens to ordinary phone calls."],
  ["No ad trackers", "No advertising cookies or session replay."],
  ["Your data is yours", "We never sell waitlist or lead information."],
];

const faqs = [
  {
    q: "Can I start for free?",
    a: "Yes. The launch offer includes a free plan with a calling allowance. The exact limit will be published before launch. Join the waitlist with no card or payment.",
  },
  {
    q: "What does Colder keep track of?",
    a: "Your leads, call outcomes, notes and next steps, together on one record per contact. Calling through Colder is in development.",
  },
  {
    q: "Can my team use it?",
    a: "Shared leads, clear ownership and follow-ups are planned for agency teams. Join as a team to register interest. Team pricing hasn't been announced yet.",
  },
  {
    q: "Does Colder make AI calls for me?",
    a: "No. Colder is built around a person making the call and reviewing the outcome. There's no autonomous AI calling or predictive dialing.",
  },
  {
    q: "When can I get it?",
    a: (
      <>
        Colder is in a private pilot. Public access is on the way, and we&apos;ll email you when it opens. Until then, the{" "}
        <Link href="/guides/how-to-track-cold-calls#template" className="text-fg underline decoration-brand underline-offset-4">
          free tracker template
        </Link>{" "}
        works today.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="absolute left-1/2 top-0 h-[28rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]" />

        <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-rise">
            <Link href="/about" className="chip transition-colors hover:border-white/30 hover:text-fg">
              <span className="size-1.5 rounded-full bg-ok animate-pulse-dot" />
              Private pilot · Free early access
              <span aria-hidden>→</span>
            </Link>
            <h1 className="display mt-6 text-[clamp(3.75rem,11vw,8.5rem)]">
              Make
              <br />
              the call<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-md text-xl leading-relaxed text-muted text-pretty">
              Cold call tracking with a clear next move. Your leads, outcomes, notes and follow-ups, in one place.
            </p>
            <div className="mt-10 max-w-lg">
              <WaitlistForm source="home-hero" />
            </div>
          </div>

          <HeroDemo />
        </div>
      </section>

      {/* Ticker */}
      <section aria-label="Things Colder keeps track of" className="border-y border-line py-5">
        <div className="fade-x flex overflow-hidden">
          <ul className="flex shrink-0 animate-marquee gap-10 pr-10 hover:[animation-play-state:paused]">
            {[...ticker, ...ticker].map((t, i) => (
              <li key={i} aria-hidden={i >= ticker.length} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
                {t}
                <span className="text-faint">/</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* One loop */}
      <section className="container-x py-24 sm:py-32">
        <SectionHead
          eyebrow="How Colder works"
          title={
            <>
              One record. <span className="text-muted">Three moves.</span>
            </>
          }
          body="Every call adds context. Context sets the next step. The next step becomes the next call."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {loop.map((l) => (
            <div key={l.n} className="group relative bg-ink p-8 transition-colors hover:bg-panel">
              <p className="font-mono text-sm text-brand-soft">{l.n}</p>
              <h3 className="mt-10 text-3xl font-semibold tracking-tight">{l.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{l.body}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {l.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <span aria-hidden className="absolute inset-x-8 top-0 h-px scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow="The routine"
            title="From first dial to follow-through."
            body="Keep it moving. One contact at a time, with nothing to rebuild from memory tomorrow."
          />
          <div className="mt-16">
            <WorkflowTabs />
          </div>
          <p className="mt-6 text-xs text-faint">Illustrative workflow with fictional data. Features shown are in development.</p>
        </div>
      </section>

      {/* Features */}
      <section className="container-x py-24 sm:py-32">
        <SectionHead eyebrow="Built for after hello" title="The call ends. The follow-up shouldn't." />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="card group p-7 transition-colors hover:border-line-strong">
              <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-brand-soft transition-colors group-hover:bg-brand group-hover:text-white">
                <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={f.icon} />
                </svg>
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Teams */}
      <section id="teams" className="border-y border-line bg-panel/50 py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="For agencies"
              title="Your team. In sync."
              body="Every lead has an owner. Contact history and the next step travel together, so a handoff never loses the thread, and you see activity without chasing reports."
            />
            <ul className="mt-8 space-y-3">
              {["Assign each lead to a caller", "See who promised what, and when", "Follow-ups that survive a handoff"].map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Check className="text-brand-soft" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/waitlist?as=agency" className="btn btn-primary mt-10">
              Join as an agency <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="card overflow-hidden" role="img" aria-label="Illustrative team board with fictional callers and leads">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-sm font-medium">Team · This week</p>
              <span className="chip text-[11px]">Concept</span>
            </div>
            <div className="divide-y divide-line">
              {[
                ["Jordan", "JL", 18, 3, "Alex Smith · callback 10:30"],
                ["Mia", "MC", 14, 5, "Sam Rivera · send details"],
                ["Alex", "AS", 11, 2, "Peak Plumbing · retry Mon"],
              ].map(([name, init, calls, due, next], i) => (
                <div key={name as string} className="flex items-center gap-4 px-5 py-4">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${["bg-brand/20 text-brand-soft", "bg-ok/15 text-ok", "bg-warm/15 text-warm"][i]}`}>
                    {init}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="truncate text-xs text-muted">Next: {next}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{calls}</p>
                    <p className="text-[11px] text-faint">calls</p>
                  </div>
                  <div className="w-14 text-right">
                    <p className="font-mono text-sm text-warm">{due}</p>
                    <p className="text-[11px] text-faint">due</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-line px-5 py-4 text-xs text-faint">Handoff · Alex Smith reassigned to Mia with full history</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container-x py-24 sm:py-32">
        <SectionHead
          center
          eyebrow="Pricing"
          title="Start free. Stay simple."
          body="Joining the waitlist never charges you. Usage, billing and cancellation terms are shown before any purchase."
        />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-[1.25rem] border p-8 ${
                p.featured ? "border-brand/60 bg-gradient-to-b from-brand/[0.12] to-transparent shadow-[0_0_80px_-30px_rgb(47_91_255/0.6)]" : "border-line bg-white/[0.015]"
              }`}
            >
              {p.featured && <span className="absolute right-6 top-6 chip border-brand/50 text-brand-soft">Announced</span>}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted">{p.cadence}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.body}</p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-8 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="text-brand-soft" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className={`btn mt-10 w-full ${p.featured ? "btn-brand" : "btn-ghost"}`}>
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-faint">
          Plan contents are planned and may change before launch. Free plan allowance and team pricing will be published before public
          access. Free does not mean unlimited calling.
        </p>
      </section>

      {/* Principles */}
      <section aria-label="How Colder handles your data" className="border-y border-line">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {principles.map(([t, b], i) => (
            <div key={t} className={`py-10 pr-6 ${i % 2 ? "pl-6 border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0`}>
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="container-x py-24 sm:py-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead eyebrow="The calling playbook" title="Before your next call." />
          <Link href="/guides" className="text-sm text-muted transition-colors hover:text-fg">
            All guides →
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["01 / Start", "Make your first cold call.", "A relevant opener. A manageable session. A clear next step.", "/guides/how-to-start-cold-calling", "6 min read"],
            ["02 / Track", "Keep every call moving.", "What to log, what to measure, and who to follow up with.", "/guides/how-to-track-cold-calls", "7 min read"],
            ["Free template", "Your first call tracker.", "Calls, follow-ups and clear totals. Excel or Google Sheets. No signup.", "/guides/how-to-track-cold-calls#template", "Download"],
          ].map(([tag, title, body, href, meta]) => (
            <Link key={href} href={href} className="card group flex flex-col p-7 transition-colors hover:border-line-strong hover:bg-white/[0.03]">
              <p className="eyebrow">{tag}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
              <p className="mt-8 flex items-center justify-between text-sm text-faint">
                {meta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1 group-hover:text-fg">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x grid gap-12 border-t border-line py-24 sm:py-32 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHead eyebrow="FAQ" title="A few answers." />
          <p className="mt-6 text-muted">
            More in the{" "}
            <Link href="/help" className="text-fg underline decoration-brand underline-offset-4">
              help center
            </Link>
            .
          </p>
        </div>
        <Faq items={faqs} />
      </section>

      <CtaBand source="home-footer" />
    </>
  );
}
