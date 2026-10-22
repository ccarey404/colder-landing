import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cold calling guides",
  description: "Practical help for your next calling session: how to start cold calling, and how to track every call with a free template.",
  alternates: { canonical: "/guides" },
};

const guides = [
  {
    href: "/guides/how-to-start-cold-calling",
    tag: "01 / Start",
    title: "Make your first cold call.",
    body: "A relevant opener. A manageable session. A clear next step.",
    meta: "6 minute read",
  },
  {
    href: "/guides/how-to-track-cold-calls",
    tag: "02 / Track",
    title: "Keep every call moving.",
    body: "What to log, what to measure, and who to follow up with.",
    meta: "7 minute read · Free template",
  },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M5 11l6-6M6 5h5v5" />
    </svg>
  );
}

export default function GuidesPage() {
  return (
    <>
      <PageHeader title="Start. Track. Repeat." body="Practical help for your next calling session." />

      <section className="wrap max-w-[52rem] py-10 sm:py-14">
        <ul>
          {guides.map((g) => (
            <li key={g.href} className="border-b border-line">
              <Link href={g.href} className="group grid gap-3 py-10 sm:grid-cols-[11rem_1fr_auto] sm:gap-8 sm:py-12">
                <p className="label pt-2">{g.tag}</p>
                <div>
                  <h2 className="display text-[2rem] transition-colors group-hover:text-brand sm:text-[2.5rem]">{g.title}</h2>
                  <p className="mt-3 text-lg text-muted">{g.body}</p>
                  <p className="mt-6 text-sm text-muted">{g.meta}</p>
                </div>
                <ArrowUpRight className="hidden size-6 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col justify-between gap-6 rounded-xl bg-surface p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display text-[2rem]">Your first call tracker.</h2>
            <p className="mt-2 text-muted">Calls, follow-ups and clear totals. Excel or Google Sheets. No signup.</p>
          </div>
          <a href="/downloads/cold-call-tracker.xlsx" download className="btn btn-line shrink-0">
            Download template
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" />
            </svg>
          </a>
        </div>

        <div className="mt-8 space-y-4 text-[0.9375rem]">
          <p>
            <Link href="/guides/how-to-track-cold-calls#template" className="link">
              Setup instructions and a plain CSV version
            </Link>
          </p>
          <p className="text-muted">
            Looking for product details?{" "}
            <Link href="/help" className="inline-flex items-center gap-1 font-medium text-ink hover:text-brand">
              Visit Colder help <ArrowUpRight className="size-3.5" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
