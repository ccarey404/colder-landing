"use client";

import { AppFrame, Card, Icon, Item, Pill, app, icons, useCountUp, useStage } from "./kit";

// Fictional businesses, 555-01xx numbers, example.com addresses and made-up teammates only.
const rows = [
  { name: "Northside Roofing", kind: "Roofing contractors", city: "Austin, TX", phone: "(555) 014-2231", email: "office@example.com", owner: "Alex Morgan" },
  { name: "Oak Realty", kind: "Real estate agencies", city: "—", phone: "(555) 016-8840", email: "hello@example.com", owner: "Alex Morgan" },
  { name: "Clearwater Plumbing", kind: "Plumbers", city: "Round Rock, TX", phone: "(555) 019-3302", email: "dispatch@example.com", owner: "Sam Rivera" },
  { name: "Harbor Dental", kind: "Dentists", city: "—", phone: "(555) 012-7718", email: "frontdesk@example.com", owner: "Sam Rivera" },
  { name: "Summit Exteriors", kind: "Roofing contractors", city: "Cedar Park, TX", phone: "(555) 018-0456", email: "quotes@example.com", owner: "Jordan Lee" },
  { name: "Brightline HVAC", kind: "HVAC services", city: "—", phone: "(555) 013-9921", email: "service@example.com", owner: "Mia Chen" },
];

function Checkbox() {
  return <span aria-hidden className="size-[1.05em] shrink-0 rounded-[0.25em] border" style={{ borderColor: "rgb(255 255 255 / 0.18)" }} />;
}

function Table({ count, compact = false }: { count: number; compact?: boolean }) {
  const cols = compact ? "grid-cols-[1.2em_1.6fr_1.4fr_auto]" : "grid-cols-[1.2em_1.7fr_1fr_1.5fr_auto_1.1fr]";
  return (
    <div className="mt-[0.6em] text-[0.68em]">
      <div className={`grid ${cols} items-center gap-[1em] border-b px-[0.4em] pb-[0.6em]`} style={{ borderColor: app.edge, color: app.muted }}>
        <span />
        <span>Company / contact</span>
        {!compact && <span>Location</span>}
        <span>Phone / email</span>
        <span>Outcome</span>
        {!compact && <span className="text-right">Assigned to</span>}
      </div>
      <ul>
        {rows.slice(0, count).map((r, i) => (
          <Item as="li" key={r.name} delay={0.15 + i * 0.1} className={`grid ${cols} items-center gap-[1em] border-b px-[0.4em] py-[0.55em]`} style={{ borderColor: app.edge }}>
            <Checkbox />
            <span className="min-w-0">
              <span className="block truncate font-semibold">{r.name}</span>
              <span className="block truncate text-[0.9em]" style={{ color: app.muted }}>
                {r.kind}
              </span>
            </span>
            {!compact && (
              <span className="truncate" style={{ color: app.muted }}>
                {r.city}
              </span>
            )}
            <span className="min-w-0 tabular-nums">
              <span className="block truncate">{r.phone}</span>
              <span className="block truncate text-[0.9em]" style={{ color: app.muted }}>
                {r.email}
              </span>
            </span>
            <Pill>Cold</Pill>
            {!compact && (
              <span className="flex items-center justify-end gap-[0.4em] truncate" style={{ color: app.muted }}>
                {r.owner} <Icon d={icons.upRight} className="size-[1em]" />
              </span>
            )}
          </Item>
        ))}
      </ul>
    </div>
  );
}

function SearchRow() {
  return (
    <div className="mt-[0.7em] flex gap-[0.5em] text-[0.72em]">
      <div className="flex h-[2.6em] flex-1 items-center gap-[0.5em] rounded-[0.55em] border px-[0.8em]" style={{ borderColor: app.edge, color: app.faint }}>
        <Icon d={icons.search} className="size-[1em]" /> Search your leads
      </div>
      <span className="flex h-[2.6em] items-center gap-[0.4em] rounded-[0.55em] border px-[0.8em] font-semibold" style={{ borderColor: app.edge }}>
        <Icon d={icons.settings} className="size-[1.1em]" /> Filters
      </span>
    </div>
  );
}

/** Owns its own count-up, so each tick re-renders only the pager. */
function Pager({ on, reduce }: { on: boolean; reduce: boolean }) {
  const total = useCountUp(1362, on, reduce, { delay: 0.2 });
  return (
    <div className="mt-[0.7em] flex items-center justify-between text-[0.65em]">
      <span className="flex items-center gap-[0.5em]">
        <Checkbox /> Select page
      </span>
      <span className="flex items-center gap-[0.6em]">
        <span className="tabular-nums" style={{ color: app.muted }}>
          1–50 of {total.toLocaleString("en-US")}
        </span>
        <span className="rounded-[0.5em] px-[0.7em] py-[0.4em]" style={{ backgroundColor: app.raised, color: app.faint }}>
          Previous
        </span>
        <span className="rounded-[0.5em] px-[0.7em] py-[0.4em] font-semibold" style={{ backgroundColor: app.raised }}>
          Next
        </span>
      </span>
    </div>
  );
}

/** step-1: the Leads table. Toolbar on top, rows sliding in. */
export function LeadsStep() {
  const { root } = useStage();
  return (
    <AppFrame label="Colder leads" fontSize={2.3} root={root} active="leads">
      <Card className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between text-[0.72em]">
          <span className="flex w-[40%] items-center justify-between rounded-[0.55em] border px-[0.8em] py-[0.55em] font-semibold" style={{ borderColor: app.edge }}>
            All saved leads <Icon d={icons.chevron} className="size-[1em]" />
          </span>
          <span className="flex items-center gap-[0.4em] rounded-[0.55em] border px-[0.8em] py-[0.55em] font-semibold" style={{ borderColor: app.edge }}>
            <Icon d={icons.plus} className="size-[1em]" /> Add leads
          </span>
        </div>
        <div className="mt-[0.7em] flex items-center justify-between">
          <p className="text-[0.72em] font-semibold">Recommended next step</p>
          <span className="flex items-center gap-[0.35em] rounded-[0.55em] px-[0.85em] py-[0.5em] text-[0.68em] font-semibold" style={{ backgroundColor: app.accent }}>
            Review next lead <Icon d={icons.upRight} className="size-[1em]" />
          </span>
        </div>
        <SearchRow />
        <Table count={4} />
      </Card>
    </AppFrame>
  );
}

/** feature-import: the Leads table filling, with the "1–50 of 1,362" counter ticking up. */
export function LeadsFeature() {
  const { reduce, on, root } = useStage();
  return (
    <AppFrame label="Colder leads list" fontSize={3.6} root={root} chrome="bare">
      <Card className="flex-1 overflow-hidden">
        <SearchRow />
        <Pager on={on} reduce={reduce} />
        <Table count={5} compact />
      </Card>
    </AppFrame>
  );
}
