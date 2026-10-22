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
src/components/     nav, footer, waitlist form, hero demo, workflow tabs, shared UI
src/lib/site.ts     site name, URLs, email, nav + footer links
public/             favicons, founder photo, tracker downloads (xlsx/csv)
```

Only four components ship JavaScript: `nav`, `waitlist-form`, `hero-demo`, `workflow-tabs`. Everything else is server-rendered static HTML.

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
