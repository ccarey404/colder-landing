import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cold call tracker for callers and agencies",
  description:
    "Keep the person, the conversation and the follow-up together. Colder is a cold call tracker being built for individual callers and agency teams.",
  alternates: { canonical: "/cold-call-tracker" },
};

const steps = [
  ["Prepare your next contact.", "A relevant list, clear ownership and enough context to start."],
  ["Save the outcome.", "Record whether you reached someone, a short note and any agreed next step."],
  ["Work the follow-up queue.", "See what is due and who is responsible, without rereading every note."],
  ["Review useful progress.", "Separate attempts, conversations and next steps before deciding what to improve."],
];

const status = [
  {
    label: "Available now",
    tone: "text-ok border-ok/40 bg-ok/10",
    items: ["Public guides, downloadable tracker and early-access waitlist.", "A private pilot for the manual shared tracker."],
  },
  {
    label: "In development",
    tone: "text-warm border-warm/40 bg-warm/10",
    items: [
      "The public calling experience, reminders, coaching and broader team tools.",
      "Calls routed through Colder with usage and appropriate recording controls.",
    ],
  },
];

export default function TrackerPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/", label: "Colder" }}
        eyebrow="Cold call tracker"
        title="A cold call tracker. A clearer next step."
        body="Keep the person, the conversation and the follow-up together. Colder is being built for individual callers and agency teams."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/guides/how-to-track-cold-calls#template" className="btn btn-primary">
            Get the free tracker
          </Link>
          <Link href="/waitlist" className="btn btn-ghost">
            Join the waitlist
          </Link>
        </div>
        <p className="mt-4 text-sm text-faint">The public app is not open yet. The free spreadsheet is available now, no signup required.</p>
      </PageHeader>

      <section className="container-x py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">What a tracker should remember</p>
          <p className="mt-5 text-2xl leading-snug tracking-tight text-pretty sm:text-3xl">
            A cold call tracker records each attempt against the same contact. It keeps what happened separate from what you should do next.{" "}
            <span className="text-muted">A missed call does not erase yesterday&apos;s interest; a warm lead still needs an owner and a date.</span>
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, b], i) => (
            <li key={t} className="bg-ink p-7">
              <span className="font-mono text-sm text-brand-soft">0{i + 1}</span>
              <h2 className="mt-8 text-lg font-semibold tracking-tight">{t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-panel/50 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">From one caller to an agency</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">One record, whoever picks up the phone.</h2>
            <p className="mt-5 leading-relaxed text-muted">
              If you are starting out, keep one primary action in front of you: the next appropriate call. If you manage callers, the same record
              should show who owns the lead and what they promised. Shared history and explicit assignment matter more than a bigger dashboard.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {status.map((s) => (
              <div key={s.label} className="card p-6">
                <span className={`chip ${s.tone}`}>{s.label}</span>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-xs leading-relaxed text-faint sm:col-span-2">
              The website does not place or record calls. Colder does not promise passive access to ordinary cellular-call audio. Exact free-plan
              allowances and team pricing will be published before public access;{" "}
              <Link href="/help" className="underline underline-offset-2 hover:text-fg">
                the help center
              </Link>{" "}
              keeps the detailed product answers in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <p className="eyebrow">Start with the routine</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link href="/guides/how-to-start-cold-calling" className="card group p-7 transition-colors hover:border-line-strong">
            <h2 className="text-xl font-semibold tracking-tight">Need a starting point?</h2>
            <p className="mt-2 text-muted">Use the first-session guide.</p>
            <span aria-hidden className="mt-6 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link href="/guides/how-to-track-cold-calls" className="card group p-7 transition-colors hover:border-line-strong">
            <h2 className="text-xl font-semibold tracking-tight">Already calling?</h2>
            <p className="mt-2 text-muted">Use the tracking guide for fewer missed follow-ups.</p>
            <span aria-hidden className="mt-6 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <CtaBand title="Keep your next move clear." source="tracker-page" />
    </>
  );
}
