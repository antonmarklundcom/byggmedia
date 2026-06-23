import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { branscher, getBransch } from "@/lib/branscher";
import { getService } from "@/content/services";
import { site } from "@/lib/config";
import { JsonLd, serviceLd, faqLd } from "@/lib/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { ServiceSidebar } from "@/components/ServiceSidebar";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

export function generateStaticParams() {
  return branscher.map((b) => ({ bransch: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bransch: string }>;
}): Promise<Metadata> {
  const { bransch } = await params;
  const b = getBransch(bransch);
  if (!b) return {};
  const title = `${b.title} — fler förfrågningar`;
  const description = b.intro;
  return {
    title,
    description,
    alternates: { canonical: `/for/${b.slug}` },
    openGraph: { title, description },
  };
}

export default async function BranschPage({
  params,
}: {
  params: Promise<{ bransch: string }>;
}) {
  const { bransch } = await params;
  const b = getBransch(bransch);
  if (!b) notFound();

  const url = `${site.url}/for/${b.slug}`;
  const fitServices = b.fitServices.map((slug) => getService(slug)).filter((s) => s !== undefined);

  return (
    <>
      <JsonLd data={serviceLd({ name: b.title, description: b.intro, url })} />
      {b.faq.length > 0 && <JsonLd data={faqLd(b.faq)} />}

      <PageHeader
        eyebrow="För din bransch"
        title={b.title}
        intro={b.intro}
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "För din bransch", path: "/tjanster" },
          { name: b.name, path: `/for/${b.slug}` },
        ]}
      />

      <div className="shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_360px]">
        <article className="min-w-0">
          {/* Pains */}
          <Reveal as="section" className="mb-12">
            <h2 className="text-2xl sm:text-3xl">Vad vi vet om din vardag</h2>
            <div className="mt-5 space-y-4">
              {b.pains.map((p) => (
                <div key={p.slice(0, 24)} className="flex items-start gap-3 rounded-card border border-line bg-soft p-4">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <p className="text-ink">{p}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Fit services */}
          <Reveal as="section" className="mb-12">
            <h2 className="text-2xl sm:text-3xl">Vad som passar dig</h2>
            <p className="mt-4 max-w-prose text-muted">{b.fitNote}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {fitServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/tjanster/${s.slug}`}
                  className="card-lift flex flex-col rounded-card border border-line bg-card p-5"
                >
                  <h3 className="text-lg">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{s.intro.split(".")[0]}.</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Läs mer <ArrowIcon className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          {b.faq.length > 0 && <Faq items={b.faq} heading={`Vanliga frågor — ${b.name.toLowerCase()}`} />}
        </article>

        <aside>
          <ServiceSidebar />
        </aside>
      </div>

      <CtaSection title={`Vill du ha fler jobb som ${b.name.toLowerCase()}?`} />
    </>
  );
}
