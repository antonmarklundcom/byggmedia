import { site } from "@/lib/config";
import { CtaButton } from "@/components/CtaButton";
import { PhoneIcon, CheckIcon } from "@/components/Icons";
import type { ServiceTag } from "@/lib/lead";

/**
 * Compact CTA card for service pages.
 * Sticky on desktop; collapses to a block on mobile (handled by parent layout).
 */
export function ServiceSidebar({ service }: { service?: ServiceTag }) {
  const trust = [
    `Org.nr ${site.orgNr}`,
    site.fSkatt ? "Godkänd för F-skatt" : "",
    site.responsePromise,
    "Ingen bindningstid",
    site.showPrice ? site.priceFrom : "",
  ].filter(Boolean);

  return (
    <div className="rounded-card border border-line bg-card p-6 shadow-sm lg:sticky lg:top-[88px]">
      <h2 className="text-xl">Få en kostnadsfri analys</h2>
      <p className="mt-2 text-sm text-muted">
        Berätta vad du behöver — vi återkommer inom 24 timmar med konkreta råd.
      </p>
      <CtaButton service={service} className="mt-4 w-full">
        Få kostnadsfri analys
      </CtaButton>
      <a href={site.phoneTel} className="btn-outline mt-3 w-full">
        <PhoneIcon className="h-4 w-4 text-accent" />
        {site.phone}
      </a>
      <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-muted">
        {trust.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 flex-shrink-0 text-accent" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
