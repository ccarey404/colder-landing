import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";

export function SectionHead({
  title,
  body,
  center = false,
  className = "",
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}>
      <h2 className="display text-[2.5rem] text-balance sm:text-[3.25rem]">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{body}</p>}
    </div>
  );
}

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex items-center justify-between gap-6 py-5 text-lg font-medium transition-colors hover:text-brand">
            {item.q}
            <Chevron className="text-muted transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-6 pr-10 leading-relaxed text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Your next call starts here.",
  body = "Join the waitlist.",
  source,
}: {
  title?: string;
  body?: string;
  source: string;
}) {
  return (
    <section className="p-3 sm:p-4">
      <div className="rounded-xl bg-dark px-6 py-20 text-white sm:px-16 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="display text-[2.75rem] text-balance sm:text-6xl">{title}</h2>
          <p className="mt-5 text-lg text-white/60">{body}</p>
          <WaitlistForm source={source} tone="dark" className="mx-auto mt-10 max-w-md" />
        </div>
      </div>
    </section>
  );
}

export function PageHeader({
  title,
  body,
  back,
  children,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div className="wrap max-w-[52rem]">
        {back && (
          <Link href={back.href} className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
            <Arrow className="rotate-180" /> {back.label}
          </Link>
        )}
        <h1 className="display text-[2.75rem] text-balance sm:text-6xl">{title}</h1>
        {body && <div className="mt-6 text-lg leading-relaxed text-muted text-pretty sm:text-xl">{body}</div>}
        {children}
      </div>
    </header>
  );
}
