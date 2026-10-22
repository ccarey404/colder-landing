import Link from "next/link";
import { Reveal } from "./reveal";
import { Screenshot, type Shot } from "./screenshot";
import { Arrow } from "./ui";

export type Feature = {
  id?: string;
  title: string;
  body: string;
  file: string;
  hint: string;
  shot: Shot | null;
  mock: React.ReactNode;
  link: { href: string; label: string };
};

export function FeatureCards({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((f, i) => (
        <article key={f.file} id={f.id} className="flex flex-col">
          <Reveal delay={i * 0.12} className="rounded-xl bg-surface p-3">
            <Screenshot
              shot={f.shot}
              mock={f.mock}
              file={f.file}
              hint={f.hint}
              alt={f.title}
              sizes="(min-width: 768px) 30vw, 92vw"
              aspect="4 / 3"
              className="h-auto w-full rounded-lg ring-1 ring-ink/5"
            />
          </Reveal>
          <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">{f.title}</h3>
          <p className="mt-2 flex-1 leading-relaxed text-muted">{f.body}</p>
          <Link href={f.link.href} className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium hover:text-brand">
            {f.link.label} <Arrow />
          </Link>
        </article>
      ))}
    </div>
  );
}
