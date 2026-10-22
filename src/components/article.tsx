import Link from "next/link";
import { PageHeader } from "./ui";

export function Article({
  title,
  deck,
  meta,
  back,
  toc,
  children,
}: {
  title: string;
  deck?: React.ReactNode;
  meta?: React.ReactNode;
  back?: { href: string; label: string };
  toc?: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} body={deck} back={back}>
        {meta && <p className="mt-8 text-sm text-muted">{meta}</p>}
        {toc && (
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.9375rem]">
            {toc.map((t) => (
              <Link key={t.href} href={t.href} className="link">
                {t.label}
              </Link>
            ))}
          </nav>
        )}
      </PageHeader>
      <article className="wrap max-w-[52rem] py-16 sm:py-20">
        <div className="prose-colder">{children}</div>
      </article>
    </>
  );
}

export function Callout({
  title,
  children,
  action,
  id,
}: {
  title: string;
  children: React.ReactNode;
  action?: { href: string; label: string; download?: boolean };
  id?: string;
}) {
  return (
    <aside id={id} className="!mt-12 rounded-xl bg-surface p-7 sm:p-9">
      <h2 className="!mt-0">{title}</h2>
      <div className="mt-3 text-muted">{children}</div>
      {action &&
        (action.download ? (
          <a href={action.href} download className="btn btn-dark mt-6 !text-white !no-underline">
            {action.label}
          </a>
        ) : (
          <Link href={action.href} className="btn btn-dark mt-6 !text-white !no-underline">
            {action.label}
          </Link>
        ))}
    </aside>
  );
}
