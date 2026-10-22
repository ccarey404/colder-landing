// Colder's plans, exactly as listed in the app. Billed monthly; no annual pricing.

export type Tier = { name: string; price: number; credits: string; leads: string };

export const individual: Tier[] = [
  { name: "Core", price: 18, credits: "1,500 credits / week", leads: "100 leads per search" },
  { name: "Growth", price: 78, credits: "7,500 credits / week", leads: "200 leads per search" },
  { name: "Scale", price: 148, credits: "15,000 credits / week", leads: "200 leads per search" },
];

export const teams: Tier[] = [
  { name: "Core for Teams", price: 18, credits: "1,500 credits / week per person", leads: "100 leads per search" },
  { name: "Growth for Teams", price: 78, credits: "7,500 credits / week per person", leads: "200 leads per search" },
  { name: "Scale for Teams", price: 148, credits: "15,000 credits / week per person", leads: "200 leads per search" },
];

export const everyPlanIncludes = [
  "5,000 saved leads per workspace",
  "Lead generation & CSV imports",
  "Calling & saved call review",
  "Caller, Mailer & Chatter",
  "Email campaigns & calendar follow-ups",
];

export const teamsAlsoGet = ["Team assignments & activity", "Owner and admin access included"];

export const enterprise = ["Custom seats & agreed usage", "Assisted team setup", "Invoice and quote billing", "Discuss your integration requirements"];

export const TEAM_SIZES = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const notes = {
  individual: "Billed monthly. Cancel anytime.",
  teams: "2–10 people. Admins included at the same price per person.",
};
