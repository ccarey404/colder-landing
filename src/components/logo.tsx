import Image from "next/image";
import Link from "next/link";
import mark from "../../public/brand/colder-mark.png";

/**
 * The Colder logo: the real mark plus the "colder." wordmark with the period in our blue.
 * `size` is the mark's height (px number, or any CSS length such as "1.6em" inside the scaled app mocks).
 * The wordmark inherits the text color, so it works on light and dark backgrounds.
 */
export function Logo({ size = 28, href, className = "" }: { size?: number | string; href?: string; className?: string }) {
  const content = (
    <span className={`inline-flex items-center gap-[0.28em] ${className}`} style={{ fontSize: typeof size === "number" ? `${size}px` : size }}>
      <span className="relative block size-[1em] shrink-0 overflow-hidden rounded-[0.22em]">
        <Image src={mark} alt="" fill sizes="64px" priority />
      </span>
      <span className="text-[0.68em] font-semibold tracking-[-0.02em]">
        colder<span className="text-brand">.</span>
      </span>
    </span>
  );
  return href ? (
    <Link href={href} aria-label="Colder home" className="inline-flex">
      {content}
    </Link>
  ) : (
    content
  );
}
