import Image from "next/image";

export type Shot = { src: string; width: number; height: number };

/**
 * A real app screenshot when the file exists; otherwise the `mock` component standing in for it,
 * or a labelled placeholder naming the file that belongs here.
 */
export function Screenshot({
  shot,
  mock,
  file,
  hint,
  alt,
  sizes,
  priority = false,
  aspect = "16 / 10",
  className = "",
}: {
  shot: Shot | null;
  mock?: React.ReactNode;
  file: string;
  hint: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
}) {
  if (shot) {
    return <Image src={shot.src} width={shot.width} height={shot.height} alt={alt} sizes={sizes} priority={priority} className={className} />;
  }
  if (mock) {
    return (
      <div style={{ aspectRatio: aspect }} className={`overflow-hidden ${className}`}>
        {mock}
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder: screenshot ${file} needed`}
      style={{ aspectRatio: aspect }}
      className={`grid place-items-center border-2 border-dashed border-line-strong bg-surface p-4 text-center ${className}`}
    >
      <div>
        <p className="text-sm font-semibold text-ink">Screenshot needed</p>
        <p className="mt-1 break-all text-xs text-body">public/screenshots/{file}</p>
        <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted">{hint}</p>
      </div>
    </div>
  );
}
