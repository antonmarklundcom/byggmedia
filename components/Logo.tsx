import Link from "next/link";

/** Typographic wordmark — no image asset needed. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Byggmedia — till startsidan"
      className={`font-display text-xl font-semibold tracking-tight text-ink ${className}`}
    >
      Bygg<span className="text-accent">media</span>
    </Link>
  );
}
