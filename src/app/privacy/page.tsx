import type { Metadata } from "next";
import { Article } from "@/components/article";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Colder website and waitlist handle your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Article
      eyebrow="Your information"
      title="Privacy, clearly."
      meta="Effective October 22, 2026"
      deck="This policy covers the Colder public website and waitlist, operated by Provarion LLC. The product is coming soon. This site does not record calls or collect prospect lists."
    >
      <h2 className="!mt-0">What we collect</h2>
      <p>
        When you join, we collect your email address, whether you are interested as an individual caller or a team, the entry point you used on
        this site, and the time and version of your consent. You do not need to provide a name, phone number, payment details or an account
        password.
      </p>
      <p>
        Our hosting provider processes technical request information, including IP addresses and browser information, to deliver and protect the
        website. To limit automated submissions, our waitlist uses a rotating, keyed hash of your IP address. We do not store your raw IP address
        in the waitlist database.
      </p>

      <h2>How we use it</h2>
      <p>
        We use waitlist information to manage interest in Colder, understand whether people are joining individually or as teams, contact you
        about availability, and respond to support or privacy requests. We do not sell your waitlist information or use it for advertising
        profiles.
      </p>

      <h2>Who processes it</h2>
      <p>
        Vercel hosts the website and Supabase stores waitlist entries. These service providers process information on our behalf. Authorized
        Provarion LLC personnel may access entries to operate the waitlist. Information may be processed in the United States. If you email
        support, our email provider processes that correspondence.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not use analytics, advertising cookies, session replay or third-party tracking scripts. Fonts and images are served from
        our own domain. The product previews use fictional data and run entirely in your browser. If we add measurement in the future, we will
        update this policy first and ask for your permission where required.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your waitlist entry while we manage the pre-launch list and access invitations, unless you ask us to remove it sooner. If the
        waitlist is retired, we will remove entries that are no longer needed. Short-lived abuse-prevention data is pruned regularly. Hosting
        providers may retain operational logs and backups under their own retention schedules.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to access, correct or delete your waitlist information, or stop receiving availability emails, by contacting{" "}
        <a href={`mailto:${site.email}?subject=Colder%20privacy%20request`}>{site.email}</a>. Please write from the address you used to join so we
        can verify the request. Privacy rights depend on your location. We will review and respond to requests as applicable.
      </p>

      <h2>Security and updates</h2>
      <p>
        We use encrypted transport, restricted database access and submission controls. No online service can guarantee absolute security. This
        website is intended for adults. If our collection or use changes as the product launches, we will update this policy and provide any
        required notice or choices.
      </p>
      <p>
        Questions? Contact Provarion LLC at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </Article>
  );
}
