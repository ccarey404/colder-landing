import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";

export function SectionHead({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{body}</p>}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex items-center justify-between gap-6 py-6 text-lg font-medium tracking-tight transition-colors hover:text-brand-soft">
            {item.q}
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-6 pr-12 leading-relaxed text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Your next call starts here.",
  body = "Join the waitlist for free early access when Colder opens.",
  source,
}: {
  title?: string;
  body?: string;
  source: string;
}) {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-panel px-6 py-16 sm:px-16 sm:py-24">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
        <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative mx-auto max-w-xl text-center">
          <h2 className="display text-5xl text-balance sm:text-7xl">{title}</h2>
          <p className="mt-5 text-lg text-muted">{body}</p>
          <div className="mx-auto mt-10 max-w-lg text-left">
            <WaitlistForm source={source} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  body,
  back,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-16 pt-32 sm:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" />
      <div className="container-x relative max-w-3xl">
        {back && (
          <Link href={back.href} className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <span aria-hidden>←</span> {back.label}
          </Link>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display mt-4 text-5xl text-balance sm:text-6xl">{title}</h1>
        {body && <div className="mt-6 text-lg leading-relaxed text-muted text-pretty">{body}</div>}
        {children}
      </div>
    </header>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}
