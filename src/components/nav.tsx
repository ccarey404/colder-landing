"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { APP_URL, nav } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-frame">
      <div className="flex h-16 items-center justify-between px-5 md:px-7">
        <div className="flex items-center gap-10">
          <Logo href="/" />
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[0.9375rem] text-ink/80 transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/help" className="px-2 text-[0.9375rem] text-ink/80 transition-colors hover:text-ink">
            Help
          </Link>
          <Link href="/waitlist?as=agency" className="btn btn-sm btn-line !bg-transparent hover:!bg-ink/5">
            For agencies
          </Link>
          <a href={APP_URL} className="btn btn-sm btn-dark">
            Get started
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
          </svg>
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-4rem)] overflow-y-auto bg-frame px-5 lg:hidden">
        <nav aria-label="Mobile" className="flex flex-col pb-10 pt-2">
          {[...nav, { href: "/help", label: "Help" }].map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-line-strong/60 py-4 text-xl">
              {item.label}
            </Link>
          ))}
          <a href={APP_URL} className="btn btn-dark mt-8">
            Get started
          </a>
          <Link href="/waitlist?as=agency" className="btn btn-line mt-3 !bg-transparent">
            Join as an agency
          </Link>
        </nav>
      </div>
    </header>
  );
}
