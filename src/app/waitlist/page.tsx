import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { Check } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Get free early access to Colder, the cold call tracker for callers and agencies.",
  alternates: { canonical: "/waitlist" },
};

export default async function WaitlistPage({ searchParams }: { searchParams: Promise<{ as?: string }> }) {
  const { as } = await searchParams;
  const agency = as === "agency";

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pb-24 pt-32 sm:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]" />

      <div className="container-x relative grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <span aria-hidden>←</span> Back to Colder
          </Link>
          <h1 className="display text-6xl text-balance sm:text-7xl">Get free early access.</h1>
          <p className="mt-6 max-w-md text-xl leading-relaxed text-muted">
            Colder is on the way. Join the waitlist for your invitation.
          </p>
          <ul className="mt-10 space-y-3">
            {["Free plan at launch", "No card or payment required", "Leave the list anytime"].map((p) => (
              <li key={p} className="flex items-center gap-3">
                <Check className="text-brand-soft" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 backdrop-blur sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">{agency ? "Register team interest" : "Join the waitlist"}</h2>
          <p className="mb-6 mt-2 text-sm text-muted">
            We save your email, whether you&apos;re a caller or a team, and your consent to availability emails. Nothing else.
          </p>
          <WaitlistForm source={agency ? "waitlist-agency" : "waitlist"} defaultAudience={agency ? "agency" : "individual"} layout="stacked" />
          <p className="mt-6 border-t border-line pt-6 text-xs text-faint">
            Joining doesn&apos;t create an account or guarantee an invitation. To correct your address or leave,{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-fg">
              email us
            </a>{" "}
            from the address you used.
          </p>
        </div>
      </div>
    </section>
  );
}
