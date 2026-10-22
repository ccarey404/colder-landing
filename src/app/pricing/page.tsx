import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
import { Faq, PageHeader } from "@/components/ui";
import { SALES_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Core, Growth and Scale plans from $18 a month, billed monthly. Team plans for 2–10 people, and Enterprise.",
  alternates: { canonical: "/pricing" },
};

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. Plans are billed monthly and you can cancel anytime." },
  { q: "How does team billing work?", a: "Team plans are priced per person per month, for 2–10 people. Admins are included at the same price." },
  {
    q: "Need more than 10 seats?",
    a: (
      <>
        Enterprise offers custom seats and agreed usage.{" "}
        <a href={SALES_HREF} className="link">
          Contact sales
        </a>
        .
      </>
    ),
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader title="Pricing." body="Billed monthly. Cancel anytime." />

      <section className="wrap py-16 sm:py-20">
        <Pricing full />
      </section>

      <section className="wrap max-w-[52rem] pb-24">
        <h2 className="display text-[2.25rem]">Questions</h2>
        <div className="mt-8">
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
