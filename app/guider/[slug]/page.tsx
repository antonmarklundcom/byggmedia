import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuides, getGuide } from "@/lib/guides";
import { site } from "@/lib/config";
import { JsonLd, faqLd, breadcrumbLd } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { mdxComponents } from "@/components/mdx";
import { ArrowIcon } from "@/components/Icons";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guider/${guide.slug}` },
    openGraph: { type: "article", title: guide.title, description: guide.description },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: "Guider", path: "/guider" },
    { name: guide.title, path: `/guider/${guide.slug}` },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    author: { "@type": "Organization", name: guide.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/guider/${guide.slug}`,
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      {guide.faq.length > 0 && <JsonLd data={faqLd(guide.faq)} />}

      <article className="shell py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={crumbs} />
          <span className="pill mt-6 inline-flex">{guide.cluster}</span>
          <h1 className="mt-4 text-[2rem] leading-tight sm:text-4xl lg:text-5xl">{guide.title}</h1>
          <p className="mt-4 text-lg text-muted">{guide.description}</p>
          <p className="mt-3 text-sm text-muted">
            Av {guide.author} ·{" "}
            <time dateTime={guide.date}>
              {new Date(guide.date).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>

          <div className="mt-8 border-t border-line pt-2">
            <MDXRemote source={guide.content} components={mdxComponents} />
          </div>

          {guide.faq.length > 0 && (
            <div className="mt-12">
              <Faq items={guide.faq} />
            </div>
          )}

          {/* Internal links from frontmatter */}
          {guide.related.length > 0 && (
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-xl">Läs vidare</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {guide.related.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:border-ink/40"
                  >
                    {hrefLabel(href)}
                    <ArrowIcon className="h-4 w-4 text-accent" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {guide.sources.length > 0 && (
            <div className="mt-10 rounded-card border border-line bg-soft p-5 text-sm text-muted">
              <p className="font-semibold text-ink">Källor</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {guide.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <CtaSection />
    </>
  );
}

function hrefLabel(href: string): string {
  const map: Record<string, string> = {
    "/tjanster/hemsida": "Hemsida",
    "/tjanster/seo": "SEO",
    "/tjanster/google-ads": "Google Ads",
    "/tjanster/sociala-medier": "Sociala medier",
    "/tjanster/automation": "Automation",
    "/tjanster/ai": "AI",
    "/priser": "Priser",
    "/kontakt": "Kontakt",
  };
  return map[href] || href.replace(/^\//, "");
}
