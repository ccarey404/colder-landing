import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Chevron, PageHeader } from "@/components/ui";
import { SALES_HREF, operator } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colder help — access, calling and teams",
  description: "Answers about access, pricing, calling, teams and privacy.",
  alternates: { canonical: "/help" },
};

const mail = `mailto:${operator.email}`;

type QA = { q: string; a: string[]; link?: { href: string; label: string } };

const sections: { id: string; title: string; items: QA[] }[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      { q: "What is Colder?", a: ["A cold calling workspace for your leads, call outcomes, notes, follow-ups and daily progress."] },
      {
        q: "Can I download Colder yet?",
        a: ["Not yet. Join the waitlist and we'll email you when access is available.", "The previews on this site use fictional data."],
        link: { href: "/waitlist", label: "Join the waitlist" },
      },
      {
        q: "How much does it cost?",
        a: ["Individual plans are $18, $78 or $148 a month, billed monthly. Team plans are per person, for 2–10 people."],
        link: { href: "/pricing", label: "See pricing" },
      },
      { q: "Who is Colder for?", a: ["People who use cold calls to win clients: first-time callers, solo agency owners and sales teams."] },
      { q: "Will it work on my iPhone?", a: ["An iPhone calling experience is planned. There's no public mobile download yet."] },
      {
        q: "What happens when I join the waitlist?",
        a: [`We save your email, your individual or team interest, and your consent. To leave, email ${operator.email}.`],
      },
      {
        q: "How do I get an account or sign in?",
        a: [`Joining the waitlist doesn't create an account. For sign-in or invitation questions, email ${operator.email}.`],
        link: { href: "/waitlist", label: "Request access" },
      },
    ],
  },
  {
    id: "calling-follow-ups",
    title: "Calling & follow-ups",
    items: [
      {
        q: "How will Colder track my cold calls?",
        a: ["Choose a lead, make the call through Colder, then save the outcome and next step."],
        link: { href: "/guides/how-to-track-cold-calls", label: "How to track cold calls" },
      },
      { q: "Does Colder record normal phone calls?", a: ["No. Recording needs calls routed through Colder, with the required disclosure and consent."] },
      { q: "How will callbacks and follow-ups work?", a: ["Each next step gets an action, a due time and an owner. An opt-out overrides any follow-up."] },
      {
        q: "Can I bring my own leads?",
        a: ["Yes. Every plan includes lead generation and CSV imports."],
        link: { href: "/pricing", label: "See what's included" },
      },
      { q: "Will Colder find leads for me?", a: ["Every plan includes lead generation, with 100 or 200 leads per search depending on the plan."] },
      {
        q: "How do I start making cold calls?",
        a: ["Pick one audience, prepare a relevant reason to call, and save the outcome after every attempt."],
        link: { href: "/guides/how-to-start-cold-calling", label: "Read the first-session guide" },
      },
      { q: "Can I use my existing phone number?", a: ["Number setup hasn't been announced yet. We'll explain it before it's supported."] },
      { q: "Does Colder make AI calls for me?", a: ["No. Colder is built around a person making the call and reviewing the outcome."] },
      {
        q: "Can I use a cold call tracker today?",
        a: ["Yes. The free spreadsheet template works in Excel or Google Sheets, with no signup."],
        link: { href: "/guides/how-to-track-cold-calls#template", label: "Get the free tracker" },
      },
    ],
  },
  {
    id: "teams-progress",
    title: "Teams & progress",
    items: [
      {
        q: "How do teams use Colder?",
        a: ["Each lead has an owner, with its history and next step attached. Team plans add assignments and activity."],
        link: { href: "/pricing", label: "See team plans" },
      },
      {
        q: "How do I get an enterprise account?",
        a: ["Enterprise offers custom seats, agreed usage and invoice billing. Contact sales to discuss it."],
        link: { href: SALES_HREF, label: "Contact sales" },
      },
      {
        q: "Can I book a product demo?",
        a: [`Email ${operator.email} and tell us which part of your workflow you'd like to see.`],
        link: { href: mail, label: "Request a walkthrough" },
      },
      { q: "What progress can I see?", a: ["Daily goals, streaks, attempts, reached conversations and follow-ups. Colder doesn't guarantee results."] },
      { q: "What does the coaching feature do?", a: ["Planned: one useful improvement drawn from a real call. It isn't available yet."] },
      { q: "Will it connect to my CRM?", a: [`CRM integrations haven't been announced. Tell us at ${operator.email} if one matters to you.`] },
    ],
  },
  {
    id: "privacy-support",
    title: "Privacy & support",
    items: [
      {
        q: "Can my company request a security review?",
        a: [`Yes. Email ${operator.email} with your requirements. SOC 2, SSO and SLAs haven't been announced.`],
        link: { href: mail, label: "Contact the Colder team" },
      },
      {
        q: "What information does this website collect?",
        a: ["The waitlist collects your email, audience and consent. This site uses no analytics or ad cookies."],
        link: { href: "/privacy", label: "Read the privacy policy" },
      },
      {
        q: "How can I contact Colder?",
        a: [`Email ${operator.email}. For waitlist changes, write from the address you joined with.`],
        link: { href: mail, label: "Email Colder" },
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Good questions. Clear answers.">
        <nav aria-label="Help sections" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.9375rem] lg:hidden">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="wrap grid gap-16 py-16 sm:py-20 lg:grid-cols-[13rem_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Help sections" className="sticky top-24 space-y-0.5">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded-md px-3 py-2 text-[0.9375rem] text-muted transition-colors hover:bg-surface hover:text-ink">
                {s.title}
              </a>
            ))}
            <div className="mt-6 border-t border-line px-3 pt-6 text-[0.9375rem]">
              <Link href="/guides" className="block py-1 text-muted hover:text-ink">
                Cold calling guides
              </Link>
              <a href={mail} className="block py-1 text-muted hover:text-ink">
                Contact Colder
              </a>
            </div>
          </nav>
        </aside>

        <div className="max-w-3xl space-y-20">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="display text-[2.25rem]">{s.title}</h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {s.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium transition-colors hover:text-brand">
                      {item.q}
                      <Chevron className="text-muted transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="space-y-3 pb-6 pr-10 leading-relaxed text-body">
                      {item.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {item.link && (
                        <Link href={item.link.href} className="inline-flex items-center gap-1.5 pt-1 text-[0.9375rem] font-medium hover:text-brand">
                          {item.link.label} <Arrow />
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
