import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80dvh] place-items-center overflow-hidden px-5 pt-16 text-center">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="relative">
        <p className="eyebrow">404 · No answer</p>
        <h1 className="display mt-4 text-6xl sm:text-8xl">Wrong number.</h1>
        <p className="mt-6 text-lg text-muted">This page doesn&apos;t exist. Let&apos;s get you back to the next call.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/guides" className="btn btn-ghost">
            Read the guides
          </Link>
        </div>
      </div>
    </section>
  );
}
