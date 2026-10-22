import Link from "next/link";

export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="24" fill="#2f5bff" />
      <path
        fill="#f6f7fb"
        d="M42 28.3h40.5L73 40.9H43.7c-1.7 0-3.1 1.1-3.7 2.8l-3.7 12.1c-.5 1.7.5 3.1 2.1 3.1h38.2l-9.8 12.7H32.5c-9 0-15.5-8.1-13.4-16.6l4.5-13.5C26.5 33.5 34 28.3 42 28.3z"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Colder home">
      <Mark />
      <span className="text-[1.0625rem] font-semibold tracking-tight">
        colder<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
