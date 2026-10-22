import Link from "next/link";
import { FooterArt } from "./footer-art";
import { Logo } from "./logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-frame text-ink">
      <div className="wrap">
        <div className="mx-auto max-w-4xl pt-12 sm:pt-16">
          <FooterArt />
        </div>
        <div className="border-t border-line-strong/70" />

        <div className="grid gap-12 py-14 lg:grid-cols-[21rem_1fr] lg:gap-0">
          <div className="lg:border-r lg:border-line-strong/70 lg:pr-10">
            <Logo size={26} href="/" />
            <p className="mt-5 text-sm text-muted">
              © {new Date().getFullYear()} {site.company} ·{" "}
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                {site.email}
              </a>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:pl-12">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="text-[0.9375rem] font-medium">{col.title}</h2>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[0.9375rem] text-muted transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
