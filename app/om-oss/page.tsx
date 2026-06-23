import type { Metadata } from "next";
import { site } from "@/lib/config";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Om oss — Byggmedia",
  description:
    "Byggmedia drivs av Marklund Sales & Marketing AB och gör marknadsföring enbart för bygg- och hantverksföretag i hela Sverige. Lär känna oss.",
  alternates: { canonical: "/om-oss" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Om oss"
        title={
          <>
            Vi gör en sak — och gör den för <span className="emph">hantverkare</span>
          </>
        }
        intro="Byggmedia drivs av Marklund Sales & Marketing AB. Vi gör marknadsföring enbart för bygg- och hantverksföretag, i hela Sverige."
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Om oss", path: "/om-oss" },
        ]}
      />

      <section className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Founder presence — typographic placeholder, no generated face */}
          <Reveal>
            <div>
              <div
                className="flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-card border border-dashed border-line bg-soft text-center text-sm font-medium text-muted"
                aria-label="Plats för foto på grundaren"
              >
                {/* Replace with a real founder photo in /public/images/ — do not generate a face. */}
                [Foto på grundaren
                <br />
                kommer inom kort]
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted">
                Här lägger vi upp ett riktigt foto. Vi använder inga påhittade bilder eller
                stockfoton på personer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="max-w-prose">
              <h2 className="text-2xl sm:text-3xl">Ett löfte från oss</h2>
              <p className="mt-4 text-muted">
                Jag startade Byggmedia för att hjälpa bygg- och hantverksföretag att få fler kunder
                utan krångel. Du är expert på ditt hantverk — min uppgift är att se till att de som
                behöver dig faktiskt hittar dig.
              </p>
              <p className="mt-4 text-muted">
                Vi är nystartade och ärliga med det. Vi visar hellre riktiga resultat när de finns
                än hittar på siffror och kundcase som inte stämmer. Det du ser här är som det är —
                och det fyller vi på med verkliga resultat efter hand.
              </p>

              <h3 className="mt-8 text-xl">Det här kan du räkna med</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  "Vi jobbar bara med bygg och hantverk — vi kan din vardag",
                  "Raka besked, inga magiska löften eller påhittade siffror",
                  "Fast offert innan start och ingen bindningstid",
                  `${site.responsePromise.toLowerCase()} på din förfrågan`,
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-ink">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-card border border-line bg-soft p-6 text-sm text-muted">
                <p className="font-semibold text-ink">{site.legalName}</p>
                <p className="mt-1">
                  Org.nr {site.orgNr}
                  {site.fSkatt && " · Godkänd för F-skatt"}
                </p>
                <p className="mt-1">{site.region}</p>
                <p className="mt-1">
                  {site.phone} ·{" "}
                  <a href={`mailto:${site.email}`} className="text-accent underline">
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection title="Låt oss visa vad vi kan göra för dig" />
    </>
  );
}
