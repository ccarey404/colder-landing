import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CtaBand, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cold call tracker for callers and agencies",
  description: "Keep the person, the call and the follow-up together. A cold call tracker for callers and agency teams.",
  alternates: { canonical: "/cold-call-tracker" },
};

const steps = [
  ["Prepare your next contact.", "A relevant list, a clear owner and enough context."],
  ["Save the outcome.", "Who you reached, a short note and the next step."],
  ["Work the follow-up queue.", "See what's due and who owns it."],
  ["Review useful progress.", "Attempts, conversations and next steps, counted separately."],
];

export default function TrackerPage() {
  return (
    <>
      <PageHeader back={{ href: "/", label: "Colder" }} title="A cold call tracker. A clearer next step." body="For individual callers and agency teams.">
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/guides/how-to-track-cold-calls#template" className="btn btn-dark">
            Get the free tracker
          </Link>
          <Link href="/waitlist" className="btn btn-line">
            Join the waitlist
          </Link>
        </div>
      </PageHeader>

      <section className="wrap py-20 sm:py-28">
        <p className="display max-w-3xl text-3xl leading-snug text-pretty sm:text-[2.5rem]">
          Each attempt stays on one contact. <span className="text-muted">What happened stays separate from what&apos;s next.</span>
        </p>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, b], i) => (
            <li key={t} className="bg-paper p-7">
              <span className="label tabular-nums">0{i + 1}</span>
              <h2 className="mt-8 text-lg font-semibold tracking-[-0.01em]">{t}</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-3 sm:px-4">
        <div className="rounded-xl bg-surface px-5 py-16 sm:px-12 sm:py-24 lg:px-16">
          <h2 className="display max-w-2xl text-[2.5rem]">One record, whoever picks up the phone.</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">Shared history and clear ownership matter more than a bigger dashboard.</p>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28">
        <p className="label">Start with the routine</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["/guides/how-to-start-cold-calling", "Need a starting point?", "Use the first-session guide."],
            ["/guides/how-to-track-cold-calls", "Already calling?", "Use the tracking guide."],
          ].map(([href, t, b]) => (
            <Link key={href} href={href} className="group flex items-end justify-between gap-6 rounded-xl border border-line p-7 transition-colors hover:border-line-strong hover:bg-surface">
              <span>
                <span className="display block text-2xl">{t}</span>
                <span className="mt-2 block text-muted">{b}</span>
              </span>
              <Arrow className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title="Keep your next move clear." source="tracker-page" />
    </>
  );
}
