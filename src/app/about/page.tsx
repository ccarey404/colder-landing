import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Colder",
  description: "Colder is a product from Provarion LLC: a simpler way to keep track of cold calls, remember the conversation and know what happens next.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Colder"
        title="Make progress visible."
        body="Colder is a product from Provarion LLC. We're building a simpler way to keep track of cold calls, remember the conversation and know what happens next."
      />

      <section className="container-x max-w-5xl py-16 sm:py-20">
        <div className="card grid gap-8 p-6 sm:grid-cols-[13rem_1fr] sm:items-center sm:p-10">
          <Image
            src="/team/rocco-stoney.webp"
            alt="Rocco Stoney"
            width={416}
            height={416}
            sizes="(max-width: 640px) 160px, 208px"
            className="size-40 rounded-2xl object-cover sm:size-52"
            priority
          />
          <div>
            <p className="eyebrow">The founder</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Rocco Stoney</h2>
            <p className="mt-1 text-muted">Founder of Provarion &amp; JBI Group</p>
            <p className="mt-5 leading-relaxed text-muted">
              Three-time agency founder and a student at the University of Michigan&apos;s Ross School of Business. Building Colder around a simple
              idea: make the next call, keep the context and follow through.
            </p>
            <a href="https://www.linkedin.com/in/roccostoney/" className="btn btn-ghost mt-6 h-10 text-sm" rel="noopener" target="_blank">
              Rocco on LinkedIn <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2">
          <Block title="Built for the next conversation">
            <p>
              For someone working toward their first clients, the next step should be obvious: the person to call, the context to remember and the
              follow-up to keep. For an agency, that same clarity needs to survive a handoff between people.
            </p>
            <p>
              That is the focus of our <Link href="/cold-call-tracker">cold call tracker</Link>. We measure useful progress in recorded outcomes and
              completed follow-ups. A dial count alone does not establish appointments, revenue or clients.
            </p>
          </Block>
          <Block title="Where the product stands">
            <p>
              Colder is in a private pilot. Public access is not open yet. The product previews on this website illustrate the intended experience
              using fictional records; they include features still in development. Joining the waitlist requests an invitation, without creating a
              paid account or placing a call.
            </p>
          </Block>
          <Block title="How we write the guides">
            <p>
              The Colder team publishes our <Link href="/guides">calling playbook</Link>. Each guide separates a suggested routine from a measured
              result, labels example data and gives you something usable before the product launches. Our examples are teaching examples, not
              customer testimonials or conversion benchmarks.
            </p>
            <p>
              We update a guide when its advice or tools change. We will publish pilot results only when there is evidence we can share, with the
              time period, sample and limitations attached.
            </p>
          </Block>
          <Block title="A real point of contact">
            <p>
              For product questions, corrections or privacy requests, contact <a href={`mailto:${site.email}`}>{site.email}</a>. Colder is operated
              by Provarion LLC; the public website was designed by <a href="https://jbinvestments.xyz/">JBI</a>.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="prose-colder mt-4 !text-base">{children}</div>
    </div>
  );
}
