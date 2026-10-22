export const site = {
  name: "Colder",
  url: "https://trycolder.com",
  description:
    "Cold call tracking with a clear next move.",
  email: "contact@colder.com",
  company: "Colder Inc.",
};

// Where "Get started" sends people, and the Enterprise "Contact sales" link.
export const APP_URL = "https://app.trycolder.com/";
export const SALES_HREF = `mailto:${site.email}?subject=Colder%20Enterprise`;

// Operator named in the legal, help and about copy. Still Provarion until those pages are reviewed.
export const operator = {
  name: "Provarion LLC",
  email: "contact@provarion.ai",
};

export const nav = [
  { href: "/#workflow", label: "Products" },
  { href: "/#teams", label: "Solutions" },
  { href: "/about", label: "Company" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
];

// Footer columns. Every link points at a real page or homepage section.
export const footerNav = [
  {
    title: "Products",
    links: [
      { href: "/#leads", label: "Leads" },
      { href: "/#agents", label: "Agents" },
      { href: "/#campaigns", label: "Campaigns" },
      { href: "/#teams", label: "Team" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/cold-call-tracker", label: "For individuals" },
      { href: "/#teams", label: "For teams" },
      { href: "/waitlist?as=agency", label: "For agencies" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/help", label: "Help center" },
      { href: `mailto:${site.email}`, label: "Contact" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/guides/how-to-start-cold-calling", label: "How to start cold calling" },
      { href: "/guides/how-to-track-cold-calls", label: "How to track cold calls" },
      { href: "/guides/how-to-track-cold-calls#template", label: "Free call tracker" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];
