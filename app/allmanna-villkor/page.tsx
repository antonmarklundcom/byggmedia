import type { Metadata } from "next";
import { site } from "@/lib/config";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Allmänna villkor",
  description: "Allmänna villkor för tjänster som levereras av Byggmedia (Marklund Sales & Marketing AB).",
  alternates: { canonical: "/allmanna-villkor" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Allmänna villkor" updated="22 juni 2026">
      <p>
        Dessa allmänna villkor gäller för tjänster som tillhandahålls av{" "}
        <strong>{site.legalName}</strong> (org.nr {site.orgNr}), nedan kallat Byggmedia. Specifika
        villkor och omfattning regleras i den offert och det avtal som ingås mellan parterna.
      </p>

      <h2>1. Tjänster och offert</h2>
      <p>
        Byggmedia levererar tjänster inom marknadsföring för bygg- och hantverksföretag, exempelvis
        hemsidor, sökmotoroptimering, annonsering och sociala medier. Innan ett uppdrag påbörjas
        lämnar Byggmedia en offert med fast pris och beskrivning av vad som ingår. Arbete påbörjas
        först när kunden godkänt offerten.
      </p>

      <h2>2. Priser och betalning</h2>
      <p>
        Samtliga priser anges exklusive moms. Moms tillkommer enligt vid var tid gällande momssats.
        Eventuell annonsbudget till tredje part (exempelvis Google eller Meta) betalas av kunden
        direkt till plattformen, om inget annat avtalats. Betalningsvillkor framgår av offert och
        faktura.
      </p>

      <h2>3. Bindningstid</h2>
      <p>
        Löpande tjänster har <strong>ingen bindningstid</strong> om inget annat uttryckligen
        avtalats. Uppsägning sker enligt vad som anges i avtalet.
      </p>

      <h2>4. Kundens medverkan</h2>
      <p>
        Kunden ansvarar för att i rimlig tid bidra med det material och de uppgifter som krävs för
        att Byggmedia ska kunna utföra uppdraget, samt för att lämnat material inte gör intrång i
        tredje parts rättigheter.
      </p>

      <h2>5. Ansvar</h2>
      <p>
        Byggmedia utför uppdragen fackmässigt och med omsorg. Byggmedia kan inte garantera specifika
        placeringar i sökmotorer, ett visst antal förfrågningar eller andra resultat som ligger
        utanför vår kontroll, eftersom dessa påverkas av faktorer hos tredje part (t.ex. Google) och
        marknaden. Byggmedias ansvar är begränsat till det belopp kunden erlagt för den aktuella
        tjänsten, om inte annat följer av tvingande lag.
      </p>

      <h2>6. Immateriella rättigheter</h2>
      <p>
        När full betalning erlagts övergår nyttjanderätten till det levererade materialet till
        kunden i enlighet med avtalet. Byggmedia förbehåller sig rätten att, efter kundens
        godkännande, hänvisa till utfört arbete som referens.
      </p>

      <h2>7. Personuppgifter</h2>
      <p>
        Behandling av personuppgifter sker enligt vår{" "}
        <a href="/integritetspolicy">integritetspolicy</a>.
      </p>

      <h2>8. Tvist</h2>
      <p>
        Tvist med anledning av dessa villkor ska i första hand lösas genom överenskommelse mellan
        parterna. Om det inte är möjligt avgörs tvisten enligt svensk lag och vid svensk domstol.
      </p>

      <h2>9. Kontakt</h2>
      <p>
        Frågor om dessa villkor besvaras på <a href={`mailto:${site.email}`}>{site.email}</a> eller{" "}
        {site.phone}.
      </p>
    </LegalLayout>
  );
}
