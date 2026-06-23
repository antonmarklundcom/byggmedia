import type { Metadata } from "next";
import { site } from "@/lib/config";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookiepolicy",
  description: "Hur Byggmedia använder cookies och hur du styr dina cookieinställningar.",
  alternates: { canonical: "/cookiepolicy" },
};

export default function CookiePage() {
  return (
    <LegalLayout title="Cookiepolicy" updated="22 juni 2026">
      <p>
        Den här cookiepolicyn förklarar hur Byggmedia ({site.legalName}, org.nr {site.orgNr})
        använder cookies och liknande tekniker på webbplatsen.
      </p>

      <h2>Vad är cookies?</h2>
      <p>
        Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. De används för
        att webbplatsen ska fungera, för att komma ihåg dina val och för att förstå hur webbplatsen
        används.
      </p>

      <h2>Vilka cookies vi använder</h2>
      <p>Vi delar in cookies i tre kategorier:</p>
      <ul>
        <li>
          <strong>Nödvändiga</strong> — krävs för att webbplatsen ska fungera, till exempel för att
          komma ihåg dina cookieval. Dessa är alltid aktiva.
        </li>
        <li>
          <strong>Statistik</strong> — hjälper oss förstå hur besökare använder webbplatsen så att
          vi kan förbättra den. Aktiveras endast med ditt samtycke.
        </li>
        <li>
          <strong>Marknadsföring</strong> — används för att kunna visa relevanta annonser. Aktiveras
          endast med ditt samtycke.
        </li>
      </ul>

      <h2>Ditt samtycke</h2>
      <p>
        När du besöker webbplatsen första gången får du välja vilka kategorier du godkänner.
        Icke-nödvändiga cookies (statistik och marknadsföring) är avstängda tills du aktivt
        samtycker. Du kan när som helst ändra eller återkalla ditt val genom att rensa cookies i din
        webbläsare och göra ett nytt val.
      </p>

      <h2>Hantera cookies i webbläsaren</h2>
      <p>
        Du kan blockera eller radera cookies via inställningarna i din webbläsare. Tänk på att vissa
        delar av webbplatsen kan sluta fungera om du blockerar nödvändiga cookies.
      </p>

      <h2>Mer information</h2>
      <p>
        Hur vi behandlar personuppgifter beskrivs i vår{" "}
        <a href="/integritetspolicy">integritetspolicy</a>. Har du frågor når du oss på{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
