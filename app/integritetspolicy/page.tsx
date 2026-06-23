import type { Metadata } from "next";
import { site } from "@/lib/config";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Så behandlar Byggmedia (Marklund Sales & Marketing AB) dina personuppgifter enligt GDPR.",
  alternates: { canonical: "/integritetspolicy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Integritetspolicy" updated="22 juni 2026">
      <p>
        Din integritet är viktig för oss. Den här policyn beskriver hur{" "}
        <strong>{site.legalName}</strong> (org.nr {site.orgNr}), som driver Byggmedia, samlar in och
        behandlar dina personuppgifter när du använder vår webbplats och kontaktar oss.
      </p>

      <h2>Personuppgiftsansvarig</h2>
      <p>
        Personuppgiftsansvarig för behandlingen är {site.legalName}, org.nr {site.orgNr}. Du når oss
        på <a href={`mailto:${site.email}`}>{site.email}</a> eller {site.phone}.
      </p>

      <h2>Vilka uppgifter vi samlar in</h2>
      <p>När du fyller i ett formulär eller kontaktar oss kan vi behandla:</p>
      <ul>
        <li>Namn och företagsnamn</li>
        <li>Telefonnummer och e-postadress</li>
        <li>Information du själv lämnar i ett meddelande</li>
        <li>Vilken tjänst och bransch du är intresserad av</li>
        <li>Teknisk information som hur du hittade till oss (t.ex. kampanjparametrar)</li>
      </ul>

      <h2>Varför vi behandlar uppgifterna</h2>
      <p>Vi behandlar dina uppgifter för att:</p>
      <ul>
        <li>Besvara din förfrågan och ge dig en kostnadsfri analys</li>
        <li>Upprätta och hantera ett eventuellt kundförhållande</li>
        <li>Förbättra och administrera vår webbplats</li>
      </ul>

      <h2>Rättslig grund</h2>
      <p>
        Behandlingen sker med stöd av ditt <strong>samtycke</strong> (som du lämnar när du kryssar i
        rutan i formuläret) samt för att kunna fullgöra eller ingå ett avtal med dig och vårt
        berättigade intresse av att besvara din förfrågan. Vid varje formulär sparas en tidpunkt för
        ditt samtycke.
      </p>

      <h2>Hur länge vi sparar uppgifterna</h2>
      <p>
        Vi sparar dina uppgifter så länge det behövs för ändamålet — för att besvara din förfrågan
        och, om det blir aktuellt, under och en tid efter vårt kundförhållande. Därefter raderas
        eller anonymiseras de.
      </p>

      <h2>Vem vi delar uppgifter med</h2>
      <p>
        Vi säljer aldrig dina uppgifter. För att kunna driva verksamheten använder vi
        personuppgiftsbiträden, till exempel system för kundhantering (CRM) och säker datalagring.
        Dessa behandlar uppgifter endast enligt våra instruktioner.
      </p>

      <h2>Dina rättigheter</h2>
      <p>Enligt dataskyddsförordningen (GDPR) har du rätt att:</p>
      <ul>
        <li>Begära information om vilka uppgifter vi har om dig</li>
        <li>Få felaktiga uppgifter rättade</li>
        <li>Begära att dina uppgifter raderas</li>
        <li>Invända mot eller begränsa behandlingen</li>
        <li>Återkalla ett lämnat samtycke</li>
        <li>Lämna klagomål till Integritetsskyddsmyndigheten (IMY)</li>
      </ul>
      <p>
        Vill du utöva någon av dina rättigheter? Kontakta oss på{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Vi använder cookies på webbplatsen. Hur det fungerar och hur du styr dina val beskrivs i vår{" "}
        <a href="/cookiepolicy">cookiepolicy</a>.
      </p>
    </LegalLayout>
  );
}
