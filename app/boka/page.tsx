import type { Metadata } from "next";
import { site } from "@/lib/config";
import { PageHeader } from "@/components/PageHeader";
import { CalendarPlaceholder } from "@/components/CalendarPlaceholder";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Boka ett samtal — Byggmedia",
  description:
    "Boka ett kostnadsfritt samtal med Byggmedia om marknadsföring för ditt bygg- eller hantverksföretag. Ring eller mejla så hittar vi en tid.",
  alternates: { canonical: "/boka" },
};

export default function BokaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Boka samtal"
        title={
          <>
            Boka ett <span className="emph">kostnadsfritt</span> samtal
          </>
        }
        intro="Ett kort samtal där vi går igenom var du står och vad som skulle ge dig flest jobb. Utan kostnad och utan förpliktelser."
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Boka samtal", path: "/boka" },
        ]}
      />

      <section className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <CalendarPlaceholder />
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-card border border-line bg-soft p-6 sm:p-8">
              <h2 className="text-xl">Vad du får ut av samtalet</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  "En ärlig bild av var du står idag",
                  "Konkreta råd om vad som skulle ge dig flest förfrågningar",
                  "Inget säljsnack — du bestämmer själv om du vill gå vidare",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-ink">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Föredrar du att vi hör av oss? Fyll i formuläret så återkommer vi inom 24 timmar.
              </p>
              <CtaButton className="mt-4 w-full sm:w-auto" withArrow>
                Skicka en förfrågan
              </CtaButton>
              <p className="mt-4 text-sm text-muted">Eller ring {site.phone} direkt.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
