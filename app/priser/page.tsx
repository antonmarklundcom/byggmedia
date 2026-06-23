import type { Metadata } from "next";
import { site } from "@/lib/config";
import { PageHeader } from "@/components/PageHeader";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CtaSection } from "@/components/CtaSection";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Priser — marknadsföring för bygg & hantverk",
  description:
    "Tydliga priser för marknadsföring av bygg- och hantverksföretag. Fast offert innan start, ingen bindningstid. Alla priser exkl. moms.",
  alternates: { canonical: "/priser" },
};

const faq = [
  {
    q: "Vad ingår i priset?",
    a: "Det beror på vad du behöver. Du får alltid en fast offert som specificerar exakt vad som ingår innan vi börjar — inga dolda avgifter.",
  },
  {
    q: "Är det någon bindningstid?",
    a: "Nej. Du stannar för att det fungerar, inte för att du måste. Vi tror på att leverera resultat varje månad.",
  },
  {
    q: "Tillkommer moms?",
    a: "Ja, alla priser anges exkl. moms. Moms tillkommer enligt gällande momssats för företag.",
  },
  {
    q: "Hur betalar jag annonsbudget?",
    a: "Annonsbudget till exempelvis Google betalar du direkt till plattformen. Vårt arvode är för att sätta upp och sköta annonseringen.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Priser"
        title={
          <>
            Tydligt pris, <span className="emph">ingen bindningstid</span>
          </>
        }
        intro="Du ska veta vad du betalar och vad du får. Därför får du alltid en fast offert innan vi börjar. Alla priser anges exkl. moms."
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Priser", path: "/priser" },
        ]}
      />

      <section className="shell py-14 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <div className="rounded-card border border-line bg-accsoft p-8 sm:p-10">
              {site.showPrice ? (
                <>
                  <p className="eyebrow">Riktpris</p>
                  <p className="mt-3 font-display text-4xl text-ink sm:text-5xl">{site.priceFrom}</p>
                  <p className="mt-2 text-sm text-muted">exkl. moms</p>
                  <p className="mt-5 max-w-md text-muted">
                    De flesta lösningar bygger på ett månadspris där hosting, underhåll och support
                    ingår. Du får ett exakt pris i din offert.
                  </p>
                </>
              ) : (
                <>
                  <p className="eyebrow">Pris på förfrågan</p>
                  <p className="mt-3 max-w-md text-muted">
                    Vi sätter priset efter dina behov och ger dig en fast offert innan vi börjar.
                  </p>
                </>
              )}
              <ul className="mt-6 space-y-2.5 text-sm">
                {[
                  "Fast offert innan något arbete startar",
                  "Ingen bindningstid",
                  "Hosting, underhåll och support kan ingå",
                  "Du äger din hemsida och dina konton",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-ink">
                    <CheckIcon className="h-4 w-4 flex-shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <CtaButton className="mt-7 w-full sm:w-auto" withArrow>
                Få en fast offert
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-card border border-line bg-card p-8">
              <h2 className="text-2xl">Varför vi inte har prislistor</h2>
              <p className="mt-4 text-muted">
                Ett byggföretag och en ensam elektriker behöver inte samma sak. En generisk
                prislista skulle antingen lova för mycket eller ta för mycket betalt.
              </p>
              <p className="mt-4 text-muted">
                I stället börjar vi med en kostnadsfri analys, förstår vad du faktiskt behöver och
                ger dig ett ärligt, fast pris. Du bestämmer sedan helt själv om du vill köra.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Så får du din offert</h2>
          </Reveal>
          <div className="mt-8 max-w-2xl">
            <ProcessTimeline />
          </div>
        </div>

        <div className="mt-16">
          <Faq items={faq} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
