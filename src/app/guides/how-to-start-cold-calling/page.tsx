import type { Metadata } from "next";
import Link from "next/link";
import { Article, Callout } from "@/components/article";

export const metadata: Metadata = {
  title: "How to Start Cold Calling: A Beginner's Guide",
  description:
    "Choose one kind of customer, prepare a relevant reason to call, and make a short list. A practical first-session plan with an honest opener and script.",
  alternates: { canonical: "/guides/how-to-start-cold-calling" },
  openGraph: { type: "article", publishedTime: "2026-10-16" },
};

export default function StartGuide() {
  return (
    <Article
      back={{ href: "/guides", label: "Cold calling guides" }}
      title="How to start cold calling"
      deck="Pick one audience, prepare a relevant reason to call, and record the next step after each call."
      meta={
        <>
          By <Link href="/about" className="text-muted hover:text-ink">Colder team</Link> · October 16, 2026 · 6 minute read
        </>
      }
      toc={[
        { href: "#opener", label: "What to say" },
        { href: "#first-session", label: "A first session" },
        { href: "#responses", label: "Common responses" },
        { href: "#checklist", label: "Checklist" },
        { href: "#beginner-questions", label: "Beginner questions" },
      ]}
    >
      <p>
        Cold calling means starting a phone conversation with a potential customer who has not asked you to call. For a new agency, the useful
        first goal is to find out whether there is a fit and agree on a next step. You do not need to close a sale in the opening sentence.
      </p>

      <h2>1. Know who you can help</h2>
      <p>
        Write down one audience and one concrete problem your service can address. &ldquo;Small roofing businesses that need a clearer estimate
        request process&rdquo; is more useful than &ldquo;any business that wants more revenue.&rdquo; It gives you something specific to check
        before calling.
      </p>
      <p>
        Make the offer match what you can actually deliver. If you are starting an agency, avoid promising client results you have not earned. A
        short, relevant observation is enough to open a conversation.
      </p>

      <h2>2. Build a small, appropriate list</h2>
      <p>
        Choose a list you can review before the session. Check the business, contact details, location and relevance to your offer. Remove
        duplicates and anyone who has asked not to be contacted. A public phone number is not a blanket permission to call or record.
      </p>
      <p>
        Check the rules that apply to your location, the recipient and your calling method before you start. Requirements can differ for consumer
        and business calls, automated calling and recording. This guide is about a working routine; it does not establish whether a particular call
        is permitted.
      </p>

      <h2 id="opener">3. Prepare an opener, not a monologue</h2>
      <p>Introduce yourself, say why you are calling and ask a relevant question. For example:</p>
      <blockquote>
        &ldquo;Hi Alex, this is Jordan. I help roofing businesses improve how they handle quote requests. I noticed your site asks people to call
        for an estimate—how do you currently keep track of those requests?&rdquo;
      </blockquote>
      <p>
        Use an observation you have actually checked. Let the person answer. If they are busy, ask whether there is a better time; if they are not
        interested or ask you to stop, respect that.
      </p>

      <h3>A simple script for a new agency</h3>
      <p>
        Replace the brackets with facts about your service. These are written examples, not tested conversion claims. Pick one question and listen
        before moving on.
      </p>
      <ol>
        <li>
          <strong>Open:</strong> &ldquo;Hi [name], this is [your name] from [agency]. We help [type of business] with [specific problem]. Have you
          got a moment for a quick question?&rdquo;
        </li>
        <li>
          <strong>Understand:</strong> &ldquo;How are you handling [that problem] today?&rdquo; If they want to continue: &ldquo;What would you want
          to improve about that?&rdquo;
        </li>
        <li>
          <strong>Agree on the next step:</strong> &ldquo;It sounds like [their actual concern] is worth a closer look. Would a short conversation
          about [specific topic] be useful?&rdquo; Confirm the time, timezone and who will follow up.
        </li>
      </ol>
      <p>
        For web design, the topic could be getting estimate requests through a mobile form. For automation, it could be handling enquiries that
        currently get copied between tools. Only use a problem you can help solve; avoid pretending you have found a fault you have not checked.
      </p>

      <h2>4. Make the first session manageable</h2>
      <p>
        For a first session, you might choose 20 minutes and a short list of eligible contacts. That is a practical starting example, not a
        required quota or a result guarantee. Open your notes before the first call and keep the next contact easy to find.
      </p>
      <p>
        Your job during the session is to start conversations and learn. Some people will not answer, some will not be a fit, and some will want a
        next step. Record those outcomes separately.
      </p>

      <h2>5. Agree on a specific next step</h2>
      <p>
        &ldquo;I&apos;ll follow up sometime&rdquo; is hard to act on. A useful next step has an action, a time and, for teams, an owner. Repeat it
        back before the conversation ends: &ldquo;I&apos;ll send the details today, then call tomorrow at 10:30.&rdquo; Only promise what you will
        actually do.
      </p>
      <p>
        After the attempt, save the outcome and one concise note. <Link href="/guides/how-to-track-cold-calls">Use a cold call tracker</Link> so a
        warm conversation does not disappear into memory.
      </p>

      <h2>6. Review one thing</h2>
      <p>
        At the end, look at how many calls you attempted, how many conversations you had and which follow-ups are due. Pick one change for the
        next session: a shorter introduction, a more relevant question, or more time for the other person to answer.
      </p>
      <p>
        If you use recordings for review, use a calling setup with the required disclosure and consent handling. Do not assume an app can listen
        to ordinary cellular calls automatically.
      </p>

      <h2 id="first-session">A realistic first session for a new agency</h2>
      <p>
        Suppose you build websites for local roofing companies. Before dialing, choose a small set of relevant businesses and verify one useful
        observation for each. &ldquo;Your estimate form is difficult to use on a phone&rdquo; is only appropriate if you have actually checked it.
      </p>
      <div className="table-wrap">
        <table>
          <caption>An example 30-minute session, not a required quota</caption>
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Focus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First 5 minutes</td>
              <td>Review due callbacks, the list and your opener. Open the tracker.</td>
            </tr>
            <tr>
              <td>Next 20 minutes</td>
              <td>Make eligible calls. Pause after each attempt to save the outcome and next action.</td>
            </tr>
            <tr>
              <td>Last 5 minutes</td>
              <td>Check promised follow-ups, choose one improvement and schedule your next session.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If a useful conversation takes longer, finish it. The timer is a starting structure, not a reason to rush someone or inflate your call
        count. A quiet session still produces information if the records are accurate.
      </p>

      <h2 id="responses">Know what to do with the answer</h2>
      <ul>
        <li>
          <strong>&ldquo;I&apos;m busy.&rdquo;</strong> Ask whether they want a callback. If they agree, confirm the day, time and timezone. If they
          decline, close respectfully.
        </li>
        <li>
          <strong>&ldquo;Send something over.&rdquo;</strong> Clarify what would be useful and where they want it sent. Record only the follow-up
          they actually agreed to; a request for information is not a booked meeting.
        </li>
        <li>
          <strong>&ldquo;We already have someone.&rdquo;</strong> Acknowledge it. Ask a relevant question only if they are open to continuing. Do
          not manufacture urgency.
        </li>
        <li>
          <strong>&ldquo;Don&apos;t call again.&rdquo;</strong> End the pitch and mark the contact as do not contact before moving on.
        </li>
        <li>
          <strong>No answer.</strong> Save the attempt. Do not mark the person uninterested just because you did not reach them.
        </li>
      </ul>

      <h2 id="checklist">A first-session checklist</h2>
      <ul>
        <li>One audience and an offer you can explain honestly.</li>
        <li>A reviewed contact list with timezones and exclusions checked.</li>
        <li>A short introduction and one useful question.</li>
        <li>A place to save outcomes, notes and dated follow-ups.</li>
        <li>A specific time for the next calling session.</li>
      </ul>

      <h2 id="beginner-questions">Questions before your first call</h2>
      <h3>Can I start cold calling without sales experience?</h3>
      <p>
        You can prepare a first session without a previous sales role. Start with a service you understand, a relevant audience and a short
        introduction you have rehearsed aloud. Track what happens and change one thing at a time. Experience comes from reviewing real attempts,
        not treating every unanswered call as a failure.
      </p>
      <h3>How many calls should I make on my first day?</h3>
      <p>
        There is no universal first-day quota. Begin with a short session you can complete while checking each contact and recording every
        outcome. Measure attempts and actual conversations separately. Use your own results to set the next session&apos;s goal rather than
        borrowing someone else&apos;s headline number.
      </p>
      <h3>Do I need a paid dialer to start?</h3>
      <p>
        A small manual session needs an appropriate calling setup, an eligible contact list and somewhere to record the result. A dialer or CRM can
        help as the workflow grows, but buying software is not a prerequisite for planning your first session. The{" "}
        <Link href="/guides/how-to-track-cold-calls#template">free Excel and Google Sheets tracker</Link> works independently of Colder and needs no
        signup.
      </p>
      <h3>What should I do immediately after a call?</h3>
      <p>
        Save the outcome, a concise factual note and any agreed follow-up with its due time and owner. If the person asks not to be contacted,
        record that before moving to another lead. See <Link href="/guides/how-to-track-cold-calls">how to track cold calls</Link> for a worked
        example and clear metric definitions.
      </p>

      <Callout title="Make the next call easier to start." action={{ href: "/waitlist", label: "Join the waitlist" }}>
        Colder is built around that routine. You can use the{" "}
        <Link href="/guides/how-to-track-cold-calls#template">free tracker</Link> today.
      </Callout>

      <p className="text-sm">
        Next: <Link href="/guides/how-to-track-cold-calls">How to track cold calls, with a free Excel and Google Sheets template</Link>.
      </p>
    </Article>
  );
}
