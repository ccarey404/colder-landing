import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70dvh] place-items-center px-5 py-24 text-center">
      <div>
        <h1 className="display text-6xl sm:text-8xl">Wrong number.</h1>
        <p className="mt-6 text-lg text-muted">This page doesn&apos;t exist. Let&apos;s get you back to the next call.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn btn-dark">
            Go home
          </Link>
          <Link href="/guides" className="btn btn-line">
            Read the guides
          </Link>
        </div>
      </div>
    </section>
  );
}
