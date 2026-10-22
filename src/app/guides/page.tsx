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

export default function GuidesPage() {
  return (
    <>
      <PageHeader eyebrow="The calling playbook" title="Start. Track. Repeat." body="Practical help for your next calling session." />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <Link key={g.href} href={g.href} className="card group flex min-h-72 flex-col p-8 transition-colors hover:border-line-strong hover:bg-white/[0.03]">
              <p className="eyebrow">{g.tag}</p>
              <h2 className="mt-auto pt-12 text-3xl font-semibold tracking-tight sm:text-4xl">{g.title}</h2>
              <p className="mt-3 text-muted">{g.body}</p>
              <p className="mt-8 flex items-center justify-between text-sm text-faint">
                {g.meta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1 group-hover:text-fg">→</span>
              </p>
            </Link>
          ))}
        </div>

        <div className="relative mt-4 overflow-hidden rounded-[1.25rem] border border-brand/40 bg-gradient-to-br from-brand/[0.14] to-transparent p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">Free template</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Your first call tracker.</h2>
              <p className="mt-3 max-w-md text-muted">Calls, follow-ups and clear totals. Excel or Google Sheets. No signup.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href="/downloads/cold-call-tracker.xlsx" download className="btn btn-brand">
                Download template
              </a>
              <Link href="/guides/how-to-track-cold-calls#template" className="btn btn-ghost">
                Setup and CSV version
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted">
          Looking for product details?{" "}
          <Link href="/help" className="text-fg underline decoration-brand underline-offset-4">
            Visit Colder help
          </Link>
        </p>
      </section>
    </>
  );
}
