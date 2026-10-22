import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colder help — access, calling and teams",
  description: "What you can expect from Colder, and what's still coming: access, pricing, calling, follow-ups, teams and privacy.",
  alternates: { canonical: "/help" },
};

const mail = `mailto:${site.email}`;

type QA = { q: string; a: string[]; link?: { href: string; label: string } };

const sections: { id: string; title: string; items: QA[] }[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "What is Colder?",
        a: [
          "Colder is a cold calling workspace in development. It is being built to keep your leads, call outcomes, notes, follow-ups and daily progress together, so you know who to call and what to do next.",
          "Individual callers come first. Shared lead ownership and activity views are also planned for agency and sales teams.",
        ],
      },
      {
        q: "Can I download Colder yet?",
        a: [
          "Not yet. Public access is coming soon. Join the waitlist and we will email you when access is available. There is no confirmed public launch date.",
          "The product previews on this site show planned workflows with fictional data. They are concept demonstrations, not footage of a finished or publicly available app.",
        ],
        link: { href: "/waitlist", label: "Join the waitlist" },
      },
      {
        q: "Can I start for free?",
        a: [
          "Yes. The launch offer includes a free plan. You can join the waitlist without paying or entering card details.",
          "The free plan will have a calling allowance. The exact limit, what counts toward it and when it resets will be published before launch. Free access does not mean unlimited calling.",
        ],
      },
      {
        q: "Will there be a paid plan?",
        a: [
          "The announced individual plan is $18 per month. Included usage, any additional charges and billing and cancellation terms will be shown before purchase.",
          "Team pricing has not been announced. The waitlist does not charge you or start a subscription.",
        ],
      },
      {
        q: "Who is Colder for?",
        a: [
          "Colder is being built for people who use cold calls to win clients: first-time callers, solo agency owners and sales professionals who want a clear daily routine.",
          "For agencies, the planned team workflow adds lead ownership, caller attribution and shared follow-up context. You do not need a team to express interest.",
        ],
      },
      {
        q: "Will it work on my iPhone?",
        a: [
          "An iPhone calling experience is planned, alongside web access. There is no public mobile download yet, and supported devices and release timing have not been finalized.",
          "You can browse this website and join the waitlist from your phone today.",
        ],
      },
      {
        q: "What happens when I join the waitlist?",
        a: [
          "We save your email address, your individual or team interest, and your consent to receive availability updates. A successful submission shows an on-screen confirmation.",
          `Joining does not create an app account, guarantee an invitation or start a paid subscription. To correct your address or leave the list, email ${site.email} from the address you used.`,
        ],
      },
      {
        q: "How do I get an account or sign in?",
        a: [
          "Public registration is not open yet. Join the waitlist for availability updates; joining the list does not create a Colder account.",
          `If you have already been invited to private testing, use the access instructions supplied with your invitation. For a missing invitation, sign-in problem or account question, email ${site.email}. Never send your verification code or password.`,
        ],
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
        a: [
          "The planned workflow is to choose a lead, make the call through Colder, review the saved outcome and set the next step. Notes, attempts and due follow-ups stay attached to the contact.",
          "Automatic call tracking and eligible recording require calls routed through Colder. The calling workflow is still in development.",
        ],
        link: { href: "/guides/how-to-track-cold-calls", label: "How to track cold calls" },
      },
      {
        q: "Does Colder record normal phone calls?",
        a: [
          "No. Colder is not designed to passively capture ordinary cellular calls from your phone's dialer. Eligible recording requires calls routed through Colder and the required disclosure and consent handling.",
          "Calling, recording and transcript features are planned. Do not assume an ordinary Phone-app call will be available in Colder.",
        ],
      },
      {
        q: "How will callbacks and follow-ups work?",
        a: [
          "The intended workflow gives each next step an action, a due time and an owner. You should be able to see the last conversation and what was agreed before calling again.",
          "Callbacks, reminders and automatic suggestions are planned features. A request to stop contact should override a follow-up; do not keep a person in a calling queue after an opt-out.",
        ],
      },
      {
        q: "Can I bring my own leads?",
        a: [
          "CSV import and separate niche lists are part of the planned scope. The aim is to keep repeated attempts and notes linked to the same contact while avoiding duplicate records.",
          "Import is not publicly available yet. For now, the free tracker CSV is a standalone spreadsheet template you can download without joining the waitlist.",
        ],
        link: { href: "/guides/how-to-track-cold-calls", label: "Get the free tracker template" },
      },
      {
        q: "Will Colder find leads for me?",
        a: [
          "Bounded business discovery is planned, alongside importing your own lists. Available sources, coverage and usage allowances have not been announced.",
          "Colder does not currently provide a live prospect database or an unlimited lead supply through this website.",
        ],
      },
      {
        q: "How do I start making cold calls?",
        a: [
          "Choose one audience, prepare a relevant reason to call and review a small contact list. Use an honest introduction, ask a useful question and leave space for the person to answer.",
          "After every attempt, save the outcome and the next action. At the end of a short session, review one thing to improve. Check the rules that apply to your calls and honor requests not to be contacted.",
        ],
        link: { href: "/guides/how-to-start-cold-calling", label: "Read the first-session guide" },
      },
      {
        q: "Can I use my existing phone number?",
        a: [
          "Number setup, supported calling destinations and inbound callback routing have not been announced. These details will be explained before the calling service launches.",
          "Verifying caller ID is different from capturing calls made outside Colder. We will not promise number portability or a particular carrier setup before it is supported.",
        ],
      },
      {
        q: "Does Colder make AI calls for me?",
        a: [
          "Colder is being built around a person making calls and reviewing the outcome. Autonomous AI calling, predictive dialing and automated outreach are not publicly available features.",
          `If you need a particular dialer workflow or capacity, email ${site.email} so the team can confirm whether it is supported. Do not assume the free plan includes unlimited or unattended calling.`,
        ],
      },
      {
        q: "Can I use a cold call tracker today?",
        a: [
          "Yes. The free tracker template is available now, without joining the waitlist. Open the tracking guide and download the workbook or CSV for Excel, Google Sheets or another spreadsheet app.",
          "Use it to record the business, contact, call outcome, notes and next follow-up. The file is a standalone template; it does not sync to a Colder account or make calls for you.",
        ],
        link: { href: "/guides/how-to-track-cold-calls#template", label: "Get the free tracker" },
      },
    ],
  },
  {
    id: "teams-progress",
    title: "Teams & progress",
    items: [
      {
        q: "How will agency teams use Colder?",
        a: [
          "The planned team experience assigns a lead to a caller and keeps the contact history and next step together. Owners should be able to see activity and follow-ups without asking every caller for a separate report.",
          "Public agency access and team pricing are not available yet. Join as a sales agency to register team interest.",
        ],
        link: { href: "/waitlist?as=agency", label: "Register team interest" },
      },
      {
        q: "How do I get an enterprise account?",
        a: [
          `Email ${site.email} to discuss enterprise or agency access. Include your company name, number of callers, estimated monthly call volume and any integrations you need.`,
          "You can also join the waitlist as a sales agency. Enterprise self-service signup, team pricing and dedicated support terms have not been published; the announced $18/month price is for the individual plan.",
        ],
        link: { href: mail, label: "Discuss enterprise access" },
      },
      {
        q: "Can I book a product demo?",
        a: [
          `Email ${site.email} to request a walkthrough. Tell us whether you call on your own or manage a team, and which part of your workflow you want to see.`,
          "The previews on this site are concept demonstrations with fictional data. A demo request does not create an account, book an appointment or guarantee immediate access.",
        ],
        link: { href: mail, label: "Request a walkthrough" },
      },
      {
        q: "What progress will I be able to see?",
        a: [
          "Daily goals, streaks and clear measures of call attempts, reached conversations and follow-up completion are planned. Teams also need caller attribution and understandable conversion rates.",
          "Activity and results are different. Sample numbers in the previews are illustrative, and Colder does not guarantee appointments, clients or revenue.",
        ],
      },
      {
        q: "What does the coaching feature do?",
        a: [
          "The planned coaching experience highlights one useful improvement grounded in a call, such as leaving more space after an opener. The idea is to make the next session easier to improve.",
          "Coaching is not publicly available yet. Suggestions and interest labels need to be reviewable and correctable; they are not guaranteed assessments of a prospect.",
        ],
      },
      {
        q: "Will it connect to my CRM?",
        a: [
          "Public CRM integrations and synchronization behavior have not been announced. Do not assume Colder currently syncs with HubSpot, Salesforce or another tool.",
          `CSV import is planned. If a specific integration matters to your team, tell us at ${site.email}.`,
        ],
      },
    ],
  },
  {
    id: "privacy-support",
    title: "Privacy & support",
    items: [
      {
        q: "Can my company request a security review?",
        a: [
          `Yes. Email ${site.email} with your company's security or procurement requirements. Ask about access controls, data handling, retention and any documentation you need before deciding whether Colder fits your team.`,
          "Colder has not announced SOC 2 certification, enterprise SSO, a service-level agreement or a standard enterprise contract. The team must confirm any required assurance in writing.",
        ],
        link: { href: mail, label: "Contact the Colder team" },
      },
      {
        q: "What information does this website collect?",
        a: [
          "The waitlist collects your email, audience selection and consent details. This website does not collect prospect lists, record calls or ask for payment details. Hosting and abuse prevention process technical request information.",
          "This website does not use analytics or advertising cookies.",
        ],
        link: { href: "/privacy", label: "Read the privacy policy" },
      },
      {
        q: "How can I contact Colder?",
        a: [
          `Email ${site.email} for product questions, team interest, accessibility issues or waitlist support.`,
          "For a waitlist correction, removal or privacy request, write from the address you used to join so we can verify your request. A support response time has not been promised.",
        ],
        link: { href: mail, label: "Email Colder" },
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader eyebrow="Colder help" title="Good questions. Clear answers." body="What you can expect. What's still coming.">
        <nav aria-label="Help sections" className="mt-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="chip transition-colors hover:border-white/30 hover:text-fg">
              {s.title}
            </a>
          ))}
          <Link href="/guides" className="chip transition-colors hover:border-white/30 hover:text-fg">
            Cold calling guides
          </Link>
        </nav>
      </PageHeader>

      <div className="container-x grid gap-16 py-16 sm:py-20 lg:grid-cols-[14rem_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Help sections" className="sticky top-28 space-y-1">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-fg">
                {s.title}
              </a>
            ))}
            <a href={mail} className="mt-4 block px-3 py-2 text-sm text-brand-soft hover:text-fg">
              Contact Colder →
            </a>
          </nav>
        </aside>

        <div className="space-y-20">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-3xl font-semibold tracking-tight">{s.title}</h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {s.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium transition-colors hover:text-brand-soft">
                      {item.q}
                      <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="space-y-3 pb-6 pr-10 leading-relaxed text-muted">
                      {item.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {item.link && (
                        <Link href={item.link.href} className="inline-block pt-1 text-sm font-medium text-fg underline decoration-brand underline-offset-4">
                          {item.link.label} →
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
