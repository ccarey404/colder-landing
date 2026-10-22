import Link from "next/link";
import { FeatureCards, type Feature } from "@/components/feature-cards";
import { AgentsPanel } from "@/components/agents-panel";
import { HeroShots } from "@/components/hero-shots";
import { HowItWorks, type Step } from "@/components/how-it-works";
import { CampaignsScreen } from "@/components/mocks/campaigns";
import { CallStep, DueTodayStep, HomeDashboard, RecentCallsFeature } from "@/components/mocks/home";
import { LeadsFeature, LeadsStep } from "@/components/mocks/leads";
import { CallersFeature, TeamStep } from "@/components/mocks/team";
import { Pricing } from "@/components/pricing";
import { Reveal } from "@/components/reveal";
import { Screenshot } from "@/components/screenshot";
import { WaitlistForm } from "@/components/waitlist-form";
import { Arrow, CtaBand, Faq, SectionHead } from "@/components/ui";
import { getShot } from "@/lib/screenshots";

const icons = {
  block: "M10 17a7 7 0 100-14 7 7 0 000 14zM5 5l10 10",
  phone: "M5 3h3l1.5 4-2 1.5a9 9 0 004 4l1.5-2 4 1.5v3a1 1 0 01-1 1A14 14 0 014 4a1 1 0 011-1z",
  eye: "M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10zm8 2a2 2 0 100-4 2 2 0 000 4z",
  lock: "M5 9V7a5 5 0 0110 0v2M4 9h12v8H4z",
};

function Icon({ d, className = "size-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

// Each slot shows public/screenshots/<file> when it exists, otherwise an animated recreation of that app screen.
const steps: Step[] = [
  {
    tag: "Get ready",
    title: "Your next lead. Ready.",
    body: "Due callbacks come first, with every past attempt and note on screen.",
    file: "step-1.png",
    hint: "The Leads table.",
    shot: getShot("step-1"),
    mock: <LeadsStep />,
  },
  {
    tag: "Make the call",
    title: "Stay in the conversation.",
    body: "The timer runs and your notes stay beside the contact.",
    file: "step-2.png",
    hint: "Up next during a call.",
    shot: getShot("step-2"),
    mock: <CallStep />,
  },
  {
    tag: "Follow through",
    title: "Keep warm leads warm.",
    body: "Every follow-up gets an action, a due time and an owner.",
    file: "step-3.png",
    hint: "Due today with a callback.",
    shot: getShot("step-3"),
    mock: <DueTodayStep />,
  },
  {
    tag: "Build momentum",
    title: "See yourself improve.",
    body: "Attempts, conversations and next steps, counted separately.",
    file: "step-4.png",
    hint: "Team activity.",
    shot: getShot("step-4"),
    mock: <TeamStep />,
  },
];

const features: Feature[] = [
  {
    id: "leads",
    title: "Bring the list you already have.",
    body: "Import a CSV and call from a queue, not a spreadsheet.",
    file: "feature-import.png",
    hint: "The Leads table.",
    shot: getShot("feature-import"),
    mock: <LeadsFeature />,
    link: { href: "/guides/how-to-track-cold-calls#template", label: "Free tracker template" },
  },
  {
    title: "Know where every lead stands.",
    body: "Every attempt stays on one contact. A missed call never erases interest.",
    file: "feature-history.png",
    hint: "Recent calls.",
    shot: getShot("feature-history"),
    mock: <RecentCallsFeature />,
    link: { href: "/guides/how-to-track-cold-calls", label: "Read the tracking guide" },
  },
  {
    id: "teams",
    title: "Your team. In sync.",
    body: "Every lead has an owner, and its history travels with it.",
    file: "feature-team.png",
    hint: "The Callers grid.",
    shot: getShot("feature-team"),
    mock: <CallersFeature />,
    link: { href: "/waitlist?as=agency", label: "Join as an agency" },
  },
];

const faqs = [
  {
    q: "How much does Colder cost?",
    a: (
      <>
        Plans start at $18 a month, billed monthly. Cancel anytime.{" "}
        <Link href="/pricing" className="link">
          See pricing
        </Link>
      </>
    ),
  },
  {
    q: "What does Colder keep track of?",
    a: "Your leads, call outcomes, notes and next steps, on one record per contact.",
  },
  {
    q: "Can my team use it?",
    a: "Yes. Team plans cover 2–10 people, with assignments and activity.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 sm:pt-24">
        <div className="wrap text-center">
          <h1 className="display mx-auto text-[3.75rem] leading-[0.98] sm:text-[6.5rem]">Make the call.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-body sm:text-xl">Cold call tracking with a clear next move.</p>
          <WaitlistForm source="home-hero" className="mx-auto mt-9 max-w-[30rem]" />
        </div>

        <div className="mt-16 px-3 sm:mt-20 sm:px-4">
          <div className="rounded-xl bg-surface px-3 pb-12 pt-10 sm:px-12 sm:pb-20 sm:pt-16 lg:px-20">
            <div className="mx-auto max-w-6xl">
              <HeroShots main={getShot("hero")} mainMock={<HomeDashboard />} />
            </div>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="wrap pt-24 sm:pt-32">
        <SectionHead
          title="Meet your agents."
          body="Caller, Mailer and Chatter do the prep."
        />
        <Reveal className="mt-14">
          <AgentsPanel />
          <p className="mt-3 text-[0.8125rem] text-muted">Sample conversations with fictional businesses.</p>
        </Reveal>

        <div id="campaigns" className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h3 className="display text-[2rem] text-balance sm:text-[2.5rem]">Turn a conversation into a campaign.</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Ask an agent for a plan, then launch it with Create with Agents.
            </p>
          </div>
          <Reveal className="rounded-xl bg-surface p-3">
            <Screenshot
              shot={getShot("campaigns")}
              mock={<CampaignsScreen />}
              file="campaigns.png"
              hint="The Campaigns screen."
              alt="Colder campaigns"
              sizes="(min-width: 1024px) 60vw, 92vw"
              className="h-auto w-full rounded-lg ring-1 ring-ink/5"
            />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="workflow" className="wrap py-24 sm:py-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead title="Keep it moving." body="From first dial to follow-through." />
          <Link href="/cold-call-tracker" className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium hover:text-brand">
            Explore the workflow <Arrow />
          </Link>
        </div>
        <div className="mt-10 lg:mt-0">
          <HowItWorks steps={steps} />
        </div>
      </section>

      {/* Features */}
      <section className="wrap border-t border-line py-24 sm:py-32">
        <SectionHead title="The call ends. The follow-up shouldn't." />
        <div className="mt-14">
          <FeatureCards items={features} />
        </div>
      </section>

      {/* Principles */}
      <section className="px-3 sm:px-4">
        <div className="rounded-xl bg-surface px-5 py-16 sm:px-12 sm:py-24 lg:px-16">
          <SectionHead center title="A tracker you can trust." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [icons.block, "Opt-outs respected", "A request to stop contact overrides every queue and follow-up."],
              [icons.phone, "No passive capture", "Colder never listens to ordinary phone calls."],
              [icons.eye, "No ad trackers", "No analytics, ad cookies or session replay on this site."],
              [icons.lock, "Your data stays yours", "We don't sell waitlist information."],
            ].map(([icon, title, body]) => (
              <article key={title} className="rounded-xl border border-line bg-paper p-6">
                <Icon d={icon} className="size-6" />
                <h3 className="mt-8 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="wrap py-24 sm:py-32">
        <SectionHead title="Simple monthly pricing." />
        <div className="mt-10">
          <Pricing />
        </div>
      </section>

      {/* Guides */}
      <section className="px-3 sm:px-4">
        <div className="rounded-xl bg-surface px-5 py-16 sm:px-12 sm:py-24 lg:px-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHead title="Before your next call." />
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium hover:text-brand">
              All guides <Arrow />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Get started", "Make your first cold call.", "A simple plan for the first session.", "/guides/how-to-start-cold-calling", "6 minute read"],
              ["Stay organized", "Keep track of every call.", "A clear workflow. A free tracker.", "/guides/how-to-track-cold-calls", "7 minute read"],
              ["Free template", "Your first call tracker.", "Calls, follow-ups and clear totals. Excel or Google Sheets. No signup.", "/guides/how-to-track-cold-calls#template", "Download"],
            ].map(([tag, title, body, href, meta]) => (
              <Link key={href} href={href} className="group flex min-h-64 flex-col rounded-xl border border-line bg-paper p-7 transition-colors hover:border-line-strong">
                <p className="label">{tag}</p>
                <h3 className="display mt-auto pt-10 text-[1.75rem]">{title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{body}</p>
                <p className="mt-6 flex items-center justify-between text-sm text-muted">
                  {meta}
                  <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap grid gap-10 py-24 sm:py-32 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <SectionHead title="A few answers." />
          <Link href="/help" className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium hover:text-brand">
            Visit the help center <Arrow />
          </Link>
        </div>
        <Faq items={faqs} />
      </section>

      <CtaBand source="home-footer" />
    </>
  );
}
