import type { ServiceTag } from "@/lib/lead";

/**
 * Typed service content. No DB — this file is the source of truth.
 * H1 (title) is always an OUTCOME, not a feature.
 * Core services (hemsida, seo, google-ads, sociala-medier) get real depth.
 * Positioning pages (automation, ai) are lighter and conversion-focused.
 */

export type ServiceSection = {
  heading: string;
  level?: 2 | 3;
  body: string[]; // paragraphs
  bullets?: string[];
};

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  // The routing tag this service maps to in the lead form (when applicable).
  tag?: ServiceTag;
  // Short menu/label name.
  name: string;
  // H1 — an outcome.
  title: string;
  keyword: string;
  intro: string;
  sections: ServiceSection[];
  faq: ServiceFaq[];
  isPositioning?: boolean;
  // SEO
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "hemsida",
    tag: "hemsida",
    name: "Hemsida",
    title: "Hemsida som ger ditt byggföretag fler förfrågningar",
    keyword: "hemsida för byggföretag",
    intro:
      "Du är bäst på ditt hantverk. Vi bygger hemsidan som gör att kunderna hittar dig, förstår vad du gör och faktiskt hör av sig. Inte en snygg broschyr som bara ligger där — en sida byggd för att skapa förfrågningar.",
    sections: [
      {
        heading: "Vad du får",
        level: 2,
        body: [
          "En modern, snabb och mobilanpassad hemsida som är gjord för bygg- och hantverksföretag. De flesta av dina kunder söker på mobilen, ofta direkt från ett tak, en arbetsplats eller bilen. Därför bygger vi mobilen först och ser till att numret är ett tryck bort.",
          "Allt fokus ligger på en enda sak: att en besökare ska bli en förfrågan. Tydliga knappar för att ringa och skicka offertförfrågan, korta texter som förklarar vad du gör och var du jobbar, och en kontaktväg som inte kräver att kunden tänker.",
        ],
        bullets: [
          "Mobilanpassad design som laddar snabbt",
          "Tydliga kontaktknappar — ring eller skicka förfrågan",
          "Sidor för dina tjänster och områden du jobbar i",
          "Plats för bilder på dina egna jobb (inga köpta stockbilder)",
          "Grund-SEO på plats från start så att Google förstår sidan",
          "Cookie- och GDPR-hantering enligt svenska regler",
        ],
      },
      {
        heading: "Så går det till",
        level: 2,
        body: [
          "Vi börjar med en kostnadsfri analys där vi tittar på var du står idag och vad dina kunder faktiskt söker efter. Sedan får du en fast offert innan något arbete startar — du vet alltid priset i förväg.",
          "När du sagt ja sätter vi ihop struktur och texter, bygger sidan och går igenom den tillsammans med dig innan den publiceras. Du behöver inte kunna något om teknik. Vi sköter domän, hosting och det löpande.",
        ],
      },
      {
        heading: "Resultat du kan vänta dig",
        level: 2,
        body: [
          "En hemsida i sig är ingen garanti för fler jobb — men den är grunden som allt annat vilar på. När annonser och sökresultat leder hit ska sidan omvandla besökaren till en förfrågan. Det är där en riktigt byggd sida gör skillnad.",
          "Vi lovar inga exakta siffror innan vi vet hur din situation ser ut. Det vi lovar är en sida som är gjord för att kontaktas, inte bara beundras — och som du faktiskt äger.",
        ],
      },
    ],
    faq: [
      {
        q: "Hur lång tid tar det att få en hemsida?",
        a: "En enklare hemsida för hantverkare är ofta klar inom ett par veckor från att vi har material och texter på plats. Vi ger dig en tidsplan i offerten.",
      },
      {
        q: "Måste jag fixa texter och bilder själv?",
        a: "Nej. Vi skriver texterna och hjälper dig att välja bilder. Egna bilder på dina jobb är guld värda, men vi löser strukturen och språket åt dig.",
      },
      {
        q: "Äger jag hemsidan själv?",
        a: "Ja. Hemsidan och domänen är dina. Ingen bindningstid binder dig till oss — du är kvar för att det fungerar, inte för att du måste.",
      },
      {
        q: "Vad kostar en hemsida?",
        a: "Det beror på omfattning. Vi har lösningar från 1 995 kr/mån och du får alltid en fast offert innan vi börjar. Se vår guide om vad en hemsida kostar för mer.",
      },
    ],
    metaTitle: "Hemsida för byggföretag & hantverkare | Byggmedia",
    metaDescription:
      "Vi bygger hemsidor för bygg- och hantverksföretag som ger fler förfrågningar. Mobilanpassat, snabbt och byggt för att kunderna ska höra av sig. Kostnadsfri analys.",
  },
  {
    slug: "seo",
    tag: "seo",
    name: "SEO",
    title: "Syns högre på Google när dina kunder söker hantverkare",
    keyword: "SEO för hantverkare",
    intro:
      "När någon i ditt område söker efter en takläggare, elektriker eller snickare — dyker du upp eller konkurrenten? SEO handlar om att finnas där när kunden redan letar. Vi gör att ditt företag syns för de sökningar som faktiskt leder till jobb.",
    sections: [
      {
        heading: "Vad SEO innebär för ditt företag",
        level: 2,
        body: [
          "SEO (sökmotoroptimering) betyder att din hemsida rankar högre i Googles vanliga, obetalda resultat. Skillnaden mot annonser är att trafiken är gratis varje gång — du betalar inte per klick. Det tar längre tid att bygga, men håller över tid.",
          "För bygg- och hantverksföretag handlar det mesta om lokala och tjänstespecifika sökningar: 'takläggare', 'byta tak pris', 'elektriker nära mig'. Vi ser till att din sida svarar på exakt det dina kunder skriver in.",
        ],
        bullets: [
          "Sökordsanalys — vad dina kunder faktiskt söker på",
          "Innehåll och sidor som matchar de sökningarna",
          "Teknisk SEO: snabbhet, mobil, struktur Google förstår",
          "Google Företagsprofil så att du syns på kartan",
          "Tydlig struktur mellan tjänster och områden",
        ],
      },
      {
        heading: "Så går det till",
        level: 2,
        body: [
          "Vi startar med en analys av var du står idag, vilka sökord som är värda att rikta in sig på och vad konkurrenterna gör. Du får en plan och en fast offert innan vi börjar.",
          "Sedan jobbar vi löpande: vi bygger ut innehåll, förbättrar tekniken och stärker din synlighet steg för steg. SEO är inte en engångsinsats utan ett arbete som ger mer och mer ju längre det får verka.",
        ],
      },
      {
        heading: "Resultat du kan vänta dig",
        level: 2,
        body: [
          "SEO är ett långsiktigt arbete. De första månaderna handlar om att lägga grunden; effekten kommer gradvis när sidor börjar ranka och dra in förfrågningar utan att du betalar per klick.",
          "Vi lovar inga placeringar 'på en vecka' — den som gör det säljer luft. Det vi gör är ett ärligt, metodiskt arbete och visar dig vad som händer längs vägen. Vill du synas snabbt direkt kombinerar många SEO med Google Ads i början.",
        ],
      },
    ],
    faq: [
      {
        q: "Hur lång tid tar SEO innan det ger resultat?",
        a: "Räkna med flera månader innan effekten syns ordentligt. SEO bygger värde över tid. Vill du ha förfrågningar snabbare kombinerar vi gärna med Google Ads i början.",
      },
      {
        q: "Kan ni garantera förstaplatsen på Google?",
        a: "Nej, och du ska vara skeptisk mot alla som lovar det. Google bestämmer placeringarna. Vi jobbar metodiskt med det som faktiskt påverkar och visar dig utvecklingen.",
      },
      {
        q: "Vad är skillnaden mot Google Ads?",
        a: "Ads är betalda annonser som syns direkt så länge du betalar. SEO är de obetalda resultaten som tar tid att bygga men inte kostar per klick. De kompletterar varandra.",
      },
    ],
    metaTitle: "SEO för hantverkare & byggföretag | Byggmedia",
    metaDescription:
      "Syns högre på Google när dina kunder söker hantverkare. Vi jobbar med lokal och tjänstespecifik SEO för bygg- och hantverksföretag. Kostnadsfri analys.",
  },
  {
    slug: "google-ads",
    tag: "google-ads",
    name: "Google Ads",
    title: "Förfrågningar redan denna vecka med Google Ads",
    keyword: "Google Ads för byggföretag",
    intro:
      "Vill du ha jobb in snabbt? Med Google Ads syns du högst upp när kunden söker — redan idag. Vi sätter upp och sköter annonseringen så att du betalar för rätt klick och inte slänger pengar på fel sökningar.",
    sections: [
      {
        heading: "Vad du får",
        level: 2,
        body: [
          "Google Ads är betald annonsering som placerar dig överst i sökresultatet direkt. Till skillnad från SEO syns du snabbt — perfekt när du vill fylla kalendern eller testa en ny tjänst eller ett nytt område.",
          "Vi bygger kampanjer riktade mot sökningar med köpvilja, skriver annonser som talar till dina kunder och styr budgeten mot det som ger förfrågningar. Lika viktigt: vi stänger av sökningar som bara kostar pengar utan att leda till jobb.",
        ],
        bullets: [
          "Kampanjer mot sökningar med verklig köpvilja",
          "Annonstexter skrivna för bygg och hantverk",
          "Negativa sökord så du slipper betala för fel klick",
          "Geografisk styrning mot områden du vill jobba i",
          "Landningssida och spårning så vi vet vad som ger förfrågningar",
        ],
      },
      {
        heading: "Så går det till",
        level: 2,
        body: [
          "Vi börjar med en kostnadsfri analys: vilka tjänster vill du få fler av, var vill du jobba och vad är en förfrågan värd för dig. Du får en rekommenderad budget och en fast offert på vårt arbete innan vi sätter igång.",
          "Sedan bygger vi kampanjen, kopplar spårning och drar igång. Därefter optimerar vi löpande — annonser, sökord och budget — så att varje krona jobbar hårdare över tid.",
        ],
      },
      {
        heading: "Resultat du kan vänta dig",
        level: 2,
        body: [
          "Fördelen med Ads är hastighet: förfrågningar kan börja komma in samma vecka som kampanjen är igång. Annonsbudgeten betalar du direkt till Google; vårt arvode är för att sätta upp och sköta kampanjen så att den faktiskt lönar sig.",
          "Vi lovar inga exakta siffror innan vi känner din marknad och dina priser. Det vi gör är att vara raka med vad budgeten rimligen kan ge och visa dig resultatet svart på vitt — hur många förfrågningar och vad de kostade.",
        ],
      },
    ],
    faq: [
      {
        q: "Hur snabbt kan jag få förfrågningar?",
        a: "Med Google Ads kan förfrågningar börja komma in redan samma vecka som kampanjen är igång, till skillnad från SEO som tar längre tid.",
      },
      {
        q: "Hur stor budget behöver jag?",
        a: "Det beror på din marknad, dina tjänster och hur många jobb du vill ha. Vi rekommenderar en budget i analysen och du bestämmer alltid taket själv.",
      },
      {
        q: "Betalar jag annonsbudgeten till er?",
        a: "Nej, annonsbudgeten betalar du direkt till Google. Vårt arvode är för att bygga och sköta kampanjen så att pengarna används rätt.",
      },
    ],
    metaTitle: "Google Ads för byggföretag & hantverkare | Byggmedia",
    metaDescription:
      "Få förfrågningar snabbt med Google Ads. Vi sätter upp och sköter annonseringen för bygg- och hantverksföretag så att du betalar för rätt klick. Kostnadsfri analys.",
  },
  {
    slug: "sociala-medier",
    tag: "sociala-medier",
    name: "Sociala medier",
    title: "Bli företaget folk känner igen i ditt område",
    keyword: "sociala medier för hantverkare",
    intro:
      "Dina bästa jobb är din bästa marknadsföring. Vi hjälper dig att visa dem på Facebook och Instagram så att fler i ditt område känner igen ditt namn — och tänker på dig när det är dags att anlita.",
    sections: [
      {
        heading: "Vad du får",
        level: 2,
        body: [
          "För bygg- och hantverksföretag är sociala medier inte dans och trender — det är före/efter-bilder, projekt som imponerar och ett ansikte bakom företaget. Det bygger igenkänning och förtroende, så att du redan känns trygg när kunden hör av sig.",
          "Vi hjälper dig att få ut ett jämnt flöde av innehåll utan att det tar din tid. Du skickar bilder från jobben, vi gör resten: text, upplägg och publicering. Vill du nå fler snabbt kan vi även köra riktade annonser mot ditt område.",
        ],
        bullets: [
          "Löpande inlägg på Facebook och Instagram",
          "Före/efter och projektbilder som visar ditt hantverk",
          "Texter och upplägg — du slipper sitta med det själv",
          "Riktade annonser mot ditt geografiska område (vid behov)",
          "En tydlig profil som ser professionell ut",
        ],
      },
      {
        heading: "Så går det till",
        level: 2,
        body: [
          "Vi börjar med en kostnadsfri analys av var du står och vad som passar ditt företag. Du får en plan och en fast offert innan vi sätter igång — inga överraskningar.",
          "Det enklaste upplägget: du fotar jobben med mobilen och skickar till oss. Vi gör innehåll av det och håller flödet levande. Vill du även annonsera sätter vi upp och sköter det.",
        ],
      },
      {
        heading: "Resultat du kan vänta dig",
        level: 2,
        body: [
          "Sociala medier handlar mer om igenkänning och förtroende än om direkta förfrågningar varje vecka. Det är det långsamma men värdefulla arbetet som gör att kunden väljer dig framför en okänd konkurrent.",
          "Vi lovar inga virala siffror — det är inte poängen för ett hantverksföretag. Poängen är att synas regelbundet, se professionell ut och bygga ett namn som håller i ditt område.",
        ],
      },
    ],
    faq: [
      {
        q: "Måste jag synas i bild själv?",
        a: "Nej, men ett ansikte bakom företaget bygger förtroende snabbare. Vi anpassar upplägget efter vad du är bekväm med — ofta räcker bra bilder på jobben långt.",
      },
      {
        q: "Hur mycket tid kräver det av mig?",
        a: "Så lite som att skicka bilder från dina jobb. Vi sköter texter, upplägg och publicering. Målet är att det ska funka även när du har fullt upp på arbetsplatsen.",
      },
      {
        q: "Ger sociala medier fler jobb?",
        a: "Främst indirekt: du blir igenkänd och känns tryggare att anlita. För snabba förfrågningar kombinerar många sociala medier med Google Ads.",
      },
    ],
    metaTitle: "Sociala medier för hantverkare & byggföretag | Byggmedia",
    metaDescription:
      "Visa dina bästa jobb på Facebook och Instagram och bli företaget folk känner igen i ditt område. Vi sköter innehåll och annonser åt bygg- och hantverksföretag.",
  },
  {
    slug: "automation",
    name: "Automation",
    title: "Missa aldrig en förfrågan igen",
    keyword: "automation för hantverksföretag",
    intro:
      "Hur många jobb tappar du för att du inte hann svara? Med smart automation fångas varje förfrågan upp direkt — även när du står på stegen. Snabbt svar, automatisk uppföljning och inget som faller mellan stolarna.",
    isPositioning: true,
    sections: [
      {
        heading: "Vad det löser",
        level: 2,
        body: [
          "Hantverkare förlorar sällan jobb för att de är dåliga — utan för att de inte hann svara i tid. Den som svarar först vinner ofta jobbet. Automation ser till att en förfrågan får ett snabbt svar och en uppföljning automatiskt, så att du hinner med jobbet och kunderna samtidigt.",
        ],
        bullets: [
          "Snabbt automatiskt svar när någon hör av sig",
          "Påminnelser och uppföljning så inget glöms bort",
          "Förfrågningar samlade på ett ställe i stället för spridda i sms, mejl och samtal",
        ],
      },
      {
        heading: "Så jobbar vi",
        level: 2,
        body: [
          "Vi börjar enkelt. I den kostnadsfria analysen tittar vi på hur dina förfrågningar kommer in idag och var de läcker. Sedan sätter vi upp ett par konkreta automationer som gör skillnad direkt — utan att krångla till din vardag.",
          "Det här är ett område med tunn efterfrågan i sök, så vi pratar hellre om resultatet: färre tappade jobb. Vi bygger det som faktiskt hjälper dig, inte teknik för teknikens skull.",
        ],
      },
    ],
    faq: [
      {
        q: "Är inte automation krångligt för ett litet företag?",
        a: "Tvärtom — det är litet företag som vinner mest, eftersom du inte har någon som sitter och svarar hela dagen. Vi håller det enkelt och sköter uppsättningen.",
      },
      {
        q: "Vad kostar det?",
        a: "Vi börjar med en kostnadsfri analys och ger dig en fast offert. Ofta byggs automation ovanpå hemsidan och uppföljningen du redan har.",
      },
    ],
    metaTitle: "Automation för hantverksföretag | Byggmedia",
    metaDescription:
      "Missa aldrig en förfrågan igen. Vi sätter upp smart automation för bygg- och hantverksföretag — snabbt svar och uppföljning så inga jobb faller mellan stolarna.",
  },
  {
    slug: "ai",
    name: "AI",
    title: "AI som ger dig fler timmar till hantverket",
    keyword: "AI för hantverksföretag",
    intro:
      "AI är inte science fiction för byggbranschen — det är ett verktyg som tar bort tråkigt pappersarbete. Vi använder AI där det faktiskt sparar dig tid, inte som en gimmick. Ärligt, jordnära och kopplat till din vardag.",
    isPositioning: true,
    sections: [
      {
        heading: "Hur vi tänker om AI",
        level: 2,
        body: [
          "Det finns mycket hype kring AI. Vi lovar inga mirakel. Det vi gör är att använda AI där det är till verklig nytta för ett hantverksföretag: snabbare svar till kunder, hjälp med text och innehåll, och mindre tid på administration.",
          "Vi kombinerar AI med din hemsida, dina annonser och din uppföljning så att helheten blir effektivare. Du behöver inte förstå tekniken — du ska bara märka att mer blir gjort på mindre tid.",
        ],
        bullets: [
          "AI som hjälper till med snabba svar och uppföljning",
          "Stöd för texter och innehåll till hemsida och sociala medier",
          "Mindre administration, mer tid till jobbet",
        ],
      },
      {
        heading: "Ärligt om vad det är och inte är",
        level: 2,
        body: [
          "AI ersätter inte ditt hantverk eller din relation till kunden. Det är ett verktyg bland flera. Vi är raka med vad det kan och inte kan — och vi sätter bara in det där det betalar sig.",
        ],
      },
    ],
    faq: [
      {
        q: "Behöver jag kunna något om AI?",
        a: "Nej. Vi sätter upp och sköter det. Du märker resultatet — mer tid och snabbare svar — utan att behöva lära dig tekniken.",
      },
      {
        q: "Är det inte bara hype?",
        a: "Mycket är hype, och det är vi ärliga med. Vi använder bara AI där det sparar dig tid eller ger dig fler kunder på riktigt.",
      },
    ],
    metaTitle: "AI för hantverksföretag — jordnära och nyttigt | Byggmedia",
    metaDescription:
      "AI som faktiskt sparar tid för bygg- och hantverksföretag. Inga gimmickar — vi använder AI där det ger nytta: snabbare svar, mindre admin, mer tid till hantverket.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const coreServices = services.filter((s) => !s.isPositioning);
export const positioningServices = services.filter((s) => s.isPositioning);
