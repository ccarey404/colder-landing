import Link from "next/link";
import { PageHeader } from "./ui";

export function Article({
  eyebrow,
  title,
  deck,
  meta,
  back,
  toc,
  children,
}: {
  eyebrow?: string;
  title: string;
  deck?: React.ReactNode;
  meta?: React.ReactNode;
  back?: { href: string; label: string };
  toc?: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} body={deck} back={back}>
        {meta && <p className="mt-8 text-sm text-faint">{meta}</p>}
        {toc && (
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
            {toc.map((t) => (
              <Link key={t.href} href={t.href} className="chip transition-colors hover:border-white/30 hover:text-fg">
                {t.label}
              </Link>
            ))}
          </nav>
        )}
      </PageHeader>
      <article className="container-x max-w-3xl py-16 sm:py-20">
        <div className="prose-colder">{children}</div>
      </article>
    </>
  );
}

export function Callout({ title, children, action }: { title: string; children: React.ReactNode; action?: { href: string; label: string } }) {
  return (
    <aside className="not-prose relative mt-12 overflow-hidden rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/[0.14] to-transparent p-8">
      <h2 className="!mt-0 text-2xl font-semibold tracking-tight text-fg">{title}</h2>
      <div className="mt-3 text-muted">{children}</div>
      {action && (
        <Link href={action.href} className="btn btn-brand mt-6 !text-white !no-underline">
          {action.label}
        </Link>
      )}
    </aside>
  );
}
