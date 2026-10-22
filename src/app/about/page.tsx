import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { operator } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Colder",
  description: "Colder is a product from Provarion LLC: a simpler way to track cold calls and follow through.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Make progress visible."
        body="Colder is a product from Provarion LLC: a simpler way to track cold calls and follow through."
      />

      <section className="wrap max-w-5xl py-16 sm:py-20">
        <div className="grid gap-8 rounded-xl bg-surface p-6 sm:grid-cols-[13rem_1fr] sm:items-center sm:p-10">
          <Image
            src="/team/rocco-stoney.webp"
            alt="Rocco Stoney"
            width={416}
            height={416}
            sizes="(max-width: 640px) 160px, 208px"
            className="size-40 rounded-lg object-cover sm:size-52"
            priority
          />
          <div>
            <p className="label">The founder</p>
            <h2 className="display mt-3 text-4xl">Rocco Stoney</h2>
            <p className="mt-1 text-muted">Founder of Provarion &amp; JBI Group</p>
            <p className="mt-5 leading-relaxed text-body">
              Three-time agency founder and a student at the University of Michigan&apos;s Ross School of Business.
            </p>
            <a href="https://www.linkedin.com/in/roccostoney/" className="btn btn-sm btn-line mt-6" rel="noopener" target="_blank">
              Rocco on LinkedIn <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2">
          <Block title="Built for the next conversation">
            <p>
              The next step should be obvious: who to call, what to remember, what to follow up. That&apos;s the focus of our{" "}
              <Link href="/cold-call-tracker">cold call tracker</Link>.
            </p>
          </Block>
          <Block title="Where the product stands">
            <p>Colder is in a private pilot. The previews on this site use fictional records.</p>
          </Block>
          <Block title="How we write the guides">
            <p>
              Our <Link href="/guides">calling playbook</Link> uses labelled teaching examples, not testimonials or benchmarks. We update a guide
              when its advice changes.
            </p>
          </Block>
          <Block title="A real point of contact">
            <p>
              Questions, corrections or privacy requests: <a href={`mailto:${operator.email}`}>{operator.email}</a>. Colder is operated by
              Provarion LLC; the public website was designed by <a href="https://jbinvestments.xyz/">JBI</a>.
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
      <h2 className="display text-2xl">{title}</h2>
      <div className="prose-colder mt-4 !text-base">{children}</div>
    </div>
  );
}
