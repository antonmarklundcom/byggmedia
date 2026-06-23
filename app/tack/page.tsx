import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";
import { CalendarPlaceholder } from "@/components/CalendarPlaceholder";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tack — vi hör av oss",
  description: "Tack för din förfrågan. Vi återkommer inom 24 timmar.",
  alternates: { canonical: "/tack" },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="shell py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accsoft text-accent">
            <CheckIcon className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-[2rem] leading-tight sm:text-4xl">
            Tack! Vi hör av oss <span className="emph">inom 24 timmar</span>.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Vi har tagit emot din förfrågan och återkommer med din kostnadsfria analys. Vill du
            hellre prata direkt når du oss på {site.phone}.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <CalendarPlaceholder />
        </Reveal>

        <Reveal delay={2} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneTel} className="btn-accent">
              <PhoneIcon className="h-4 w-4" />
              Ring {site.phone}
            </a>
            <Link href="/" className="btn-outline">
              Till startsidan
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
