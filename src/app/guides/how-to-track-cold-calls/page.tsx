import type { Metadata } from "next";
import Link from "next/link";
import { Article, Callout } from "@/components/article";

export const metadata: Metadata = {
  title: "How to track cold calls",
  description:
    "Log who you called, when, what happened and what to do next. Includes a free Excel and Google Sheets cold call tracker, a worked example and clear metrics.",
  alternates: { canonical: "/guides/how-to-track-cold-calls" },
  openGraph: { type: "article", publishedTime: "2026-10-16" },
};

const fields = [
  ["Contact ID", "A stable identifier shared by every attempt for this contact.", "LEAD-001"],
  ["Contact and business", "The person you intend to reach and their business.", "Alex Smith · Northside Roofing"],
  ["Called at and caller", "Date, time, timezone and who made the call.", "October 16, 10:00 AM ET · Jordan"],
  ["Outcome", "What actually happened on this attempt.", "Reached — callback requested"],
  ["Interest", "A separate, reviewable assessment of fit or interest.", "Interested"],
  ["Short note", "Only the context needed for the next conversation.", "Asked for pricing; prefers mornings"],
  ["Next action and due time", "A concrete step with a time and an owner.", "Mia to call October 17 at 10:30 AM ET"],
  ["Do not contact", "An explicit opt-out or reason to exclude the contact.", "Yes — requested no further calls"],
];

const history = [
  ["Monday, 10:00", "No answer.", "Keep interest Unknown. Set an appropriate retry."],
  ["Tuesday, 10:30", "Reached. Asked about the estimate form.", "Set interest Interested. Mia owns the callback for Wednesday at 11:00."],
  ["Wednesday, 11:00", "No answer.", "Save another attempt. Preserve the previous note and interest; review the next action."],
];

const metrics = [
  ["Attempts", "Count nonempty Contact ID cells in the call log."],
  ["Connection rate", "Answered attempts ÷ all attempts. Blank when there are no attempts."],
  ["Next-step rate", "Answered attempts with an agreed next step ÷ answered attempts. Blank when none were reached."],
  ["Due follow-ups", "Open tasks with a due time at or before the review time, excluding do-not-contact records."],
];

export default function TrackGuide() {
  return (
    <Article
      back={{ href: "/guides", label: "Cold calling guides" }}
      eyebrow="02 / Track"
      title="How to track cold calls"
      deck="Log who you called, when you called, what happened and what to do next. Keep one record per attempt, with every attempt linked to the same contact."
      meta={
        <>
          By <Link href="/about" className="text-muted hover:text-fg">Colder team</Link> · October 16, 2026 · 7 minute read
        </>
      }
      toc={[
        { href: "#template", label: "Free template" },
        { href: "#example", label: "Worked example" },
        { href: "#metrics", label: "What to measure" },
      ]}
    >
      <h2 className="!mt-0">Start with a simple call log</h2>
      <p>
        A spreadsheet is enough for a first calling session. A useful tracker should answer two questions without making you reread every note:
        who needs a call next, and why?
      </p>

      <section id="template" className="not-prose mt-10 rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/[0.14] to-transparent p-8">
        <p className="eyebrow">Free template</p>
        <h2 className="!mt-3 text-2xl font-semibold tracking-tight text-fg">Your call tracker, ready.</h2>
        <p className="mt-3 text-muted">
          A free workbook with a call log, outcome dropdowns, a separate follow-up queue and automatic session totals. The sample names are
          fictional. No signup, macros or external connections.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href="/downloads/cold-call-tracker.xlsx" download className="btn btn-brand !text-white !no-underline">
            Download Excel tracker
          </a>
          <span className="text-sm text-muted">
            Prefer a plain file? <a href="/downloads/cold-call-tracker.csv" download>Download the CSV</a>.
          </span>
        </div>
      </section>

      <h3>Open it in Excel or Google Sheets</h3>
      <p>
        In Excel, open the downloaded workbook. In Google Sheets, use File → Import → Upload and choose the workbook. Keep the example rows while
        learning; clear the blue input cells when you are ready to use your own records. Leave the formula cells in place.
      </p>
      <p>
        Use one timezone for the workbook and enter real spreadsheet dates, not text. Set the review date and time above the follow-up list before
        each session. Filter the queue&apos;s Action column to Due, and exclude any contact marked Do not contact. This is a manual tracker, not a
        dialer or an automatic reminder service.
      </p>

      <div className="table-wrap">
        <table>
          <caption>Fields to include in a cold call tracker</caption>
          <thead>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">What to record</th>
              <th scope="col">Example</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(([f, w, e]) => (
              <tr key={f}>
                <th scope="row" className="!text-fg !normal-case !tracking-normal !text-[0.9375rem]">{f}</th>
                <td>{w}</td>
                <td className="font-mono text-[0.8125rem]">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="example">One lead, three attempts</h2>
      <p>
        Here is a fictional example. Alex stays LEAD-001 throughout, so the history remains intact even when a later attempt does not connect.
      </p>
      <div className="table-wrap">
        <table>
          <caption>A sample history for Alex at Northside Roofing</caption>
          <thead>
            <tr>
              <th scope="col">Attempt</th>
              <th scope="col">What happened</th>
              <th scope="col">What changes next</th>
            </tr>
          </thead>
          <tbody>
            {history.map(([a, h, n]) => (
              <tr key={a}>
                <td className="whitespace-nowrap">{a}</td>
                <td>{h}</td>
                <td>{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The log now has three attempts and one reached conversation, not three leads. Keep one current callback in the follow-up queue. When a new
        next step replaces it, update that task instead of leaving two people responsible for the same call.
      </p>

      <h2>Use outcomes you can act on</h2>
      <p>
        Keep the labels consistent: not reached, voicemail, reached, callback requested, meeting agreed, wrong number and do not contact. Keep
        interest separate from the call outcome. A person can answer the phone without being interested, and an interested person can miss a
        later call.
      </p>
      <p>
        Record a callback as a dated task rather than a sentence buried in a note. If someone asks not to be contacted, flag the contact so they
        are excluded from future calling lists.
      </p>

      <h2>A repeatable routine</h2>
      <ol>
        <li>
          <strong>Before the session:</strong> filter for due follow-ups and eligible new contacts. Check timezones and remove duplicates.
        </li>
        <li>
          <strong>After each attempt:</strong> save the outcome, one useful note and the next action while the conversation is fresh.
        </li>
        <li>
          <strong>Before stopping:</strong> give every open next step a due time. Teams should also name the person responsible.
        </li>
        <li>
          <strong>At the next session:</strong> start from due follow-ups instead of rebuilding a list from memory.
        </li>
      </ol>

      <h2 id="metrics">Measure progress without confusing activity with results</h2>
      <p>
        Count attempts, unique contacts reached, agreed next steps and completed follow-ups separately. Ten attempts to one person are ten calls,
        but only one unique contact.
      </p>
      <p>
        In the workbook, Answered = Yes marks a reached conversation. Next step agreed = Yes belongs only on a reached attempt. The summary uses
        those two fields, so changing a label does not silently change your denominator.
      </p>
      <div className="table-wrap">
        <table>
          <caption>Workbook calculations and their meaning</caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Calculation</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(([m, c]) => (
              <tr key={m}>
                <td className="whitespace-nowrap text-fg">{m}</td>
                <td>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For example, 20 attempts with 4 reached conversations is a 20% connection rate. If 2 of those conversations have an agreed next step, that
        is a 50% next-step rate. These are illustrative calculations, not performance benchmarks. Small samples are noisy.
      </p>

      <h2>When a spreadsheet becomes hard to maintain</h2>
      <p>
        A dedicated cold call tracker becomes useful when repeated attempts, reminders and shared ownership take more effort than the calling
        itself. Look for editable outcomes, a clear contact history, due follow-ups, export access and transparent calling limits. A team also
        needs access controls and an obvious owner for each lead.
      </p>

      <Callout title="That's the workflow we're building." action={{ href: "/waitlist", label: "Get free early access" }}>
        Colder brings that routine into one workspace. Public access is not open yet; join the waitlist for free early access.{" "}
        <Link href="/cold-call-tracker">See the planned workflow.</Link>
      </Callout>

      <p className="text-sm">
        Next: <Link href="/guides/how-to-start-cold-calling">How to start cold calling</Link>.
      </p>
    </Article>
  );
}
