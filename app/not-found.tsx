import Link from "next/link";
import { site } from "@/lib/config";
import { CtaButton } from "@/components/CtaButton";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[2rem] leading-tight sm:text-4xl">
        Sidan kunde tyvärr inte <span className="emph">hittas</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Länken kan vara fel eller så har sidan flyttat. Hör gärna av dig så hjälper vi dig vidare.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-accent">
          Till startsidan
        </Link>
        <a href={site.phoneTel} className="btn-outline">
          Ring {site.phone}
        </a>
      </div>
      <div className="mt-6">
        <CtaButton variant="ghost">Få kostnadsfri analys</CtaButton>
      </div>
    </section>
  );
}
