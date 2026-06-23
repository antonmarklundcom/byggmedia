import type { Metadata } from "next";
import { site } from "@/lib/config";
import { PageHeader } from "@/components/PageHeader";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { PhoneIcon, MailIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Kontakt — Byggmedia",
  description:
    "Kontakta Byggmedia för marknadsföring av ditt bygg- eller hantverksföretag. Ring, mejla eller skicka en förfrågan så hör vi av oss inom 24 timmar.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title={
          <>
            Hör av dig — vi <span className="emph">svarar snabbt</span>
          </>
        }
        intro="Ring, mejla eller skicka en förfrågan. Vi återkommer inom 24 timmar med en kostnadsfri analys och konkreta råd."
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]}
      />

      <section className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <Reveal>
            <div className="rounded-card border border-line bg-card p-6 sm:p-8">
              <LeadForm variant="contact" />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <aside className="space-y-6">
              {/* Phone + e-post fallback is ALWAYS shown (never depends on integrations). */}
              <div className="rounded-card border border-line bg-card p-6">
                <h2 className="text-xl">Ring eller mejla direkt</h2>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={site.phoneTel} className="btn-accent w-full">
                    <PhoneIcon className="h-4 w-4" />
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="btn-outline w-full">
                    <MailIcon className="h-4 w-4 text-accent" />
                    {site.email}
                  </a>
                </div>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-muted">
                  {[site.responsePromise, "Kostnadsfri analys", "Ingen bindningstid"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 flex-shrink-0 text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card border border-line bg-soft p-6 text-sm text-muted">
                <p className="font-semibold text-ink">{site.legalName}</p>
                <p className="mt-1">
                  Org.nr {site.orgNr}
                  {site.fSkatt && " · Godkänd för F-skatt"}
                </p>
                <p className="mt-1">{site.region}</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
