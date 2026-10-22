import type { Metadata } from "next";
import Link from "next/link";
import { Article } from "@/components/article";
import { operator } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website terms",
  description: "Terms for the Colder public website and waitlist.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Article
      title="A clear starting point."
      meta="Effective October 22, 2026"
      deck="These terms cover the Colder website and waitlist operated by Provarion LLC. They are not paid product or calling-service terms."
    >
      <h2 className="!mt-0">Coming soon means coming soon</h2>
      <p>
        Colder is in development. Joining the waitlist records your interest and allows us to contact you about availability. It does not provide
        immediate product access, reserve a launch date, create a paid account or guarantee an invitation.
      </p>

      <h2>Product previews</h2>
      <p>
        Illustrations, sample leads, example conversations and progress figures on this site demonstrate a planned workflow. They are fictional
        examples, not customer results. Planned features may change before release. Nothing in the demonstration places a call or accesses your
        microphone.
      </p>

      <h2>Pricing</h2>
      <p>
        There is no free plan. Individual plans are $18 (Core), $78 (Growth) or $148 (Scale) per month. Team plans are priced per person per
        month at the same rates, for 2–10 people. Enterprise pricing is agreed individually. Plans are billed monthly and can be cancelled anytime;
        billing terms are stated before purchase. We do not take payment through the waitlist. No trial, unlimited usage or performance guarantee
        is offered here.
      </p>

      <h2>Using the website</h2>
      <p>
        Please use an email address you control. Do not submit another person&apos;s details without permission, interfere with the website,
        attempt unauthorized access or use automated requests to overwhelm it. The site is intended for adults.
      </p>

      <h2>Content and availability</h2>
      <p>
        The Colder name, branding and original website content belong to Provarion LLC or their respective rights holders. You may browse and
        share links to the site. We may update the site, planned features or waitlist. Availability may be interrupted; we do not promise that the
        website will always be error-free.
      </p>

      <h2>Privacy and contact</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains the information collected by the waitlist. For support, privacy requests or
        questions about these website terms, email <a href={`mailto:${operator.email}`}>{operator.email}</a>.
      </p>
    </Article>
  );
}
