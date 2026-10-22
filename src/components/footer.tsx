import Link from "next/link";
import { Logo } from "./logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A clearer next step. One conversation at a time.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-sm text-muted transition-colors hover:text-fg"
          >
            {site.email}
          </a>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h2 className="eyebrow">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.company}. Colder is in private pilot.</p>
          <p>
            Designed by{" "}
            <a href="https://jbinvestments.xyz/" className="transition-colors hover:text-fg">
              JBI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
