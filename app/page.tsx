import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/config";
import { services } from "@/content/services";
import { branscher } from "@/lib/branscher";
import { getAllGuides } from "@/lib/guides";
import { CtaButton } from "@/components/CtaButton";
import { TrustBar } from "@/components/TrustBar";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, PhoneIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Marknadsföring för bygg- & hantverksföretag",
  description:
    "Du är bäst på ditt hantverk — vi ser till att kunderna hittar dig. Byggmedia gör marknadsföring för bygg- och hantverksföretag i hela Sverige. Kostnadsfri analys.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const guides = getAllGuides().slice(0, 3);

  return (
    <>
      {/* HERO — results/desire-led */}
      <section className="relative overflow-hidden">
        <div className="shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <Reveal>
              <p className="eyebrow">Marknadsföring för bygg & hantverk · {site.region}</p>
            </Reveal>
            <Reveal delay={1}>
              {/* H1 capped on mobile so the serif doesn't clip near 360–390px. */}
              <h1 className="mt-4 max-w-[15ch] text-[2rem] leading-[1.08] sm:text-5xl lg:text-6xl">
                Du är bäst på ditt hantverk. Vi ser till att kunderna{" "}
                <span className="emph">hittar dig</span>.
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-xl text-lg text-muted">
                Fler förfrågningar, mindre strul. Vi bygger hemsidan, syns på Google och fångar
                upp jobben — så att du kan fokusera på det du gör bäst.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaButton withArrow>Få kostnadsfri analys</CtaButton>
                <a href={site.phoneTel} className="btn-outline">
                  <PhoneIcon className="h-4 w-4 text-accent" />
                  {site.phone}
                </a>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <p className="mt-5 text-sm text-muted">
                {site.responsePromise} · Ingen bindningstid · Fast offert innan start
              </p>
            </Reveal>
          </div>

          {/* Editorial pull-quote card (accsoft) — no fake imagery. */}
          <Reveal delay={2} className="lg:justify-self-end">
            <div className="rounded-card border border-line bg-accsoft p-7 sm:p-9">
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                “Den som syns och svarar först{" "}
                <span className="emph">vinner jobbet</span>.”
              </p>
              <p className="mt-4 text-sm text-muted">
                Vi gör marknadsföring för takläggare, elektriker, snickare, VVS, byggföretag och
                målare — i hela Sverige.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {[
                  "Hemsida byggd för att kontaktas",
                  "Synlighet på Google när kunden söker",
                  "Inga tappade förfrågningar",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-ink">
                    <CheckIcon className="h-4 w-4 flex-shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <TrustBar />

      {/* SERVICES */}
      <section className="shell py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">Vad vi gör</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            Allt som får fler kunder att <span className="emph">höra av sig</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i % 3}>
              <Link
                href={`/tjanster/${s.slug}`}
                className="card-lift flex h-full flex-col rounded-card border border-line bg-card p-6"
              >
                <h3 className="text-xl">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.intro.split(".")[0]}.</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Läs mer <ArrowIcon className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS — transparency centerpiece */}
      <section className="bg-soft">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <p className="eyebrow">Så går det till</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">
                Tryggt från första <span className="emph">samtalet</span>
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Du ska veta exakt vad du får och vad det kostar innan du bestämmer dig. Inga
                bindningstider, inga överraskningar.
              </p>
              <CtaButton className="mt-6" withArrow>
                Boka din kostnadsfria analys
              </CtaButton>
            </div>
          </Reveal>
          <div className="lg:pt-4">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* BRANSCHER */}
      <section className="shell py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">För din bransch</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Vi kan din vardag</h2>
          <p className="mt-4 max-w-xl text-muted">
            Marknadsföring som är anpassad efter hur just din bransch får jobb.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {branscher.map((b, i) => (
            <Reveal key={b.slug} delay={i % 6}>
              <Link
                href={`/for/${b.slug}`}
                className="card-lift inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink"
              >
                {b.name}
                <ArrowIcon className="h-4 w-4 text-accent" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RISK REVERSAL — accsoft pull block */}
      <section className="shell pb-16 sm:pb-20">
        <Reveal>
          <div className="grid gap-6 rounded-card bg-accsoft p-8 sm:grid-cols-3 sm:p-10">
            {[
              { t: "Kostnadsfri analys", d: "Du får råd och en plan utan att det kostar något — eller binder dig." },
              { t: "Fast offert innan start", d: "Du vet priset i förväg. Vi börjar aldrig utan att du sagt ja." },
              { t: "Ingen bindningstid", d: "Du stannar för att det fungerar — inte för att du måste." },
            ].map((item) => (
              <div key={item.t}>
                <h3 className="text-lg">{item.t}</h3>
                <p className="mt-2 text-sm text-muted">{item.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* KUNDCASE — honest placeholder (cold launch, no fabricated proof) */}
      <section className="border-t border-line bg-soft">
        <div className="shell py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Kundcase</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Fylls på löpande</h2>
            <p className="mt-4 max-w-xl text-muted">
              Vi är nystartade och visar hellre riktiga resultat än påhittade. Här lägger vi upp
              kundcase efter hand — med kundens tillåtelse.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i}>
                <div className="flex h-40 items-center justify-center rounded-card border border-dashed border-line bg-card text-sm font-medium text-muted">
                  [Kommer inom kort]
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      {guides.length > 0 && (
        <section className="shell py-16 sm:py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Guider</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">Lär dig mer</h2>
              </div>
              <Link
                href="/guider"
                className="hidden items-center gap-1.5 text-sm font-semibold text-accent sm:inline-flex"
              >
                Alla guider <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={i}>
                <Link
                  href={`/guider/${g.slug}`}
                  className="card-lift flex h-full flex-col rounded-card border border-line bg-card p-6"
                >
                  <span className="pill self-start">{g.cluster}</span>
                  <h3 className="mt-3 text-lg leading-snug">{g.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{g.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Läs guiden <ArrowIcon className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
