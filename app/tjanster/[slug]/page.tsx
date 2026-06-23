import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getService } from "@/content/services";
import { site } from "@/lib/config";
import { JsonLd, serviceLd, faqLd } from "@/lib/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { ServiceSidebar } from "@/components/ServiceSidebar";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, ArrowIcon } from "@/components/Icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/tjanster/${service.slug}` },
    openGraph: { title: service.metaTitle, description: service.metaDescription },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${site.url}/tjanster/${service.slug}`;
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={serviceLd({ name: service.title, description: service.metaDescription, url })} />
      {service.faq.length > 0 && <JsonLd data={faqLd(service.faq)} />}

      <PageHeader
        eyebrow={service.isPositioning ? "Tjänst" : "Kärntjänst"}
        title={service.title}
        intro={service.intro}
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Tjänster", path: "/tjanster" },
          { name: service.name, path: `/tjanster/${service.slug}` },
        ]}
      />

      <div className="shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_360px]">
        {/* Main */}
        <article className="min-w-0">
          {service.sections.map((sec, i) => {
            const isProcess = sec.heading.toLowerCase().includes("så går det till");
            return (
              <Reveal as="section" key={sec.heading} delay={Math.min(i, 2)} className="mb-12 last:mb-0">
                <h2 className="text-2xl sm:text-3xl">{sec.heading}</h2>
                <div className="mt-4 space-y-4">
                  {sec.body.map((p) => (
                    <p key={p.slice(0, 24)} className="max-w-prose text-muted">
                      {p}
                    </p>
                  ))}
                </div>
                {sec.bullets && (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-ink">
                        <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {isProcess && (
                  <div className="mt-8">
                    <ProcessTimeline />
                  </div>
                )}
              </Reveal>
            );
          })}

          {service.faq.length > 0 && (
            <div className="mt-4">
              <Faq items={service.faq} />
            </div>
          )}

          {/* Internal links — keep the cluster tight */}
          <Reveal as="section" className="mt-12 border-t border-line pt-8">
            <h2 className="text-xl">Fler tjänster</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/tjanster/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:border-ink/40"
                >
                  {s.name}
                  <ArrowIcon className="h-4 w-4 text-accent" />
                </Link>
              ))}
            </div>
          </Reveal>
        </article>

        {/* Sidebar — sticky on desktop, block on mobile (below content) */}
        <aside>
          <ServiceSidebar service={service.tag} />
        </aside>
      </div>

      <CtaSection />
    </>
  );
}
