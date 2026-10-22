import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { Arrow, Check } from "@/components/ui";
import { operator } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Join the waitlist for Colder, the cold call tracker for callers and agencies.",
  alternates: { canonical: "/waitlist" },
};

export default async function WaitlistPage({ searchParams }: { searchParams: Promise<{ as?: string }> }) {
  const { as } = await searchParams;
  const agency = as === "agency";

  return (
    <section className="wrap grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_28rem] lg:gap-24">
      <div>
        <Link href="/" className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
          <Arrow className="rotate-180" /> Back to Colder
        </Link>
        <h1 className="display text-[3.25rem] text-balance sm:text-7xl">Join the waitlist.</h1>
        <p className="mt-6 max-w-md text-xl leading-relaxed text-muted">We&apos;ll email you when access opens.</p>
        <ul className="mt-10 space-y-3 text-body">
          {["No card or payment to join", "Leave the list anytime"].map((p) => (
            <li key={p} className="flex items-center gap-3">
              <Check />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-line-strong p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-[-0.01em]">{agency ? "Register team interest" : "Join the waitlist"}</h2>
        <p className="mb-7 mt-2 text-[0.9375rem] text-muted">
          We save your email, caller or team, and your consent. Nothing else.
        </p>
        <WaitlistForm source={agency ? "waitlist-agency" : "waitlist"} defaultAudience={agency ? "agency" : "individual"} askAudience />
        <p className="mt-7 border-t border-line pt-6 text-[0.8125rem] text-muted">
          Joining doesn&apos;t create an account. To leave,{" "}
          <a href={`mailto:${operator.email}`} className="link">
            email us
          </a>{" "}
          from the address you used.
        </p>
      </div>
    </section>
  );
}
