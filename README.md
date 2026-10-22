# Colder website

Marketing site for [trycolder.com](https://trycolder.com). Next.js 16 (App Router) + Tailwind CSS 4. No UI libraries, no third-party scripts.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/app/            pages (one folder per route), api/waitlist, sitemap, robots, OG image
src/components/     nav, footer, waitlist form, product previews, shared UI
src/lib/site.ts     site name, URLs, email, nav + footer links
public/             favicons, founder photo, tracker downloads (xlsx/csv)
```

Client components (the only JavaScript shipped): `nav`, `waitlist-form`, `smooth-scroll`, `reveal`, the animated sections `hero-shots`, `how-it-works`, `feature-cards`, the interactive `agents-panel`, and the desktop-app recreations in `mocks/` (shared frame, rail and helpers in `mocks/kit.tsx`, animated agent face in `mocks/face.tsx`). Everything else is static HTML.

## Screenshots

Each image slot on the homepage shows a real screenshot from `public/screenshots/` when that file exists (read at build time with its real dimensions, so rebuild after adding one; `.png`, `.jpg` or `.webp`). Until then it shows an animated HTML/CSS recreation of that screen of the Colder desktop app from `src/components/mocks/` (fictional sample data only: made-up businesses, 555-01xx numbers, example.com emails).

| File | Where | What it should show |
|---|---|---|
| `hero.png` | Hero | Home dashboard |
| `step-1.png` … `step-4.png` | How it works (sticky) | Leads table · Up next during a call · Due today · Team activity |
| `feature-import.png` | Feature cards | Leads table |
| `feature-history.png` | Feature cards | Recent calls |
| `feature-team.png` | Feature cards | Callers grid |
| `campaigns.png` | Meet your agents | Campaigns |

The agents panel in "Meet your agents" (`src/components/agents-panel.tsx`) is always the interactive component, not a screenshot slot.

Animation uses `motion` and `lenis`. Movement stays under ~40px and 0.8s, and with `prefers-reduced-motion` everything renders in its final state with no smooth scrolling.

## Waitlist

`POST /api/waitlist` validates the email, drops honeypot submissions and inserts into Supabase over REST. Copy `.env.example` to `.env.local` and fill it in (set the same vars in Vercel).

Without Supabase env vars, dev mode logs the entry and returns success; production returns 503.

Expected table (adjust the column names in `src/app/api/waitlist/route.ts` if yours differ):

```sql
create table waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  audience text not null check (audience in ('individual', 'agency')),
  source text,
  consent_version text not null,
  consented_at timestamptz not null,
  ip_hash text,
  created_at timestamptz not null default now()
);
alter table waitlist enable row level security; -- service role bypasses RLS
```
