import Link from "next/link";

/** Typographic wordmark — accent dot + serif wordmark (matches the design mock). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Byggmedia — till startsidan"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="h-[18px] w-[18px] rounded-full bg-accent" aria-hidden />
      <span className="font-display text-xl font-semibold tracking-tight text-ink">Byggmedia</span>
    </Link>
  );
}
