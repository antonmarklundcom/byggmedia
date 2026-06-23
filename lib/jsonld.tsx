import { site } from "./config";

/** JSON-LD builders. Keep them honest — no invented ratings/counts. */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    areaServed: { "@type": "Country", name: "Sweden" },
    address: { "@type": "PostalAddress", addressCountry: "SE" },
    identifier: { "@type": "PropertyValue", name: "Organisationsnummer", value: site.orgNr },
    sameAs: [site.linkedin],
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "Sweden" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Bygg- och hantverksföretag",
    },
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

/** Renders a JSON-LD <script> block. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, server-generated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
