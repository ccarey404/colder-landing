export const site = {
  name: "Colder",
  url: "https://trycolder.com",
  description:
    "Cold call tracking with a clear next move. Keep your leads, call outcomes, notes and follow-ups together. Join the waitlist for free early access.",
  email: "contact@provarion.ai",
  company: "Provarion LLC",
};

export const nav = [
  { href: "/#workflow", label: "How it works" },
  { href: "/#teams", label: "For teams" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/guides", label: "Guides" },
];

export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/cold-call-tracker", label: "Cold call tracker" },
      { href: "/#teams", label: "For agencies" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/waitlist", label: "Join the waitlist" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides", label: "Cold calling guides" },
      { href: "/guides/how-to-track-cold-calls#template", label: "Free tracker template" },
      { href: "/help", label: "Help center" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Colder" },
      { href: `mailto:${site.email}`, label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];
