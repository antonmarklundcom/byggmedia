import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Guider — marknadsföring för hantverkare",
  description:
    "Jordnära guider för bygg- och hantverksföretag: vad en hemsida kostar, hur du får fler kunder online och hur SEO fungerar. Ärligt och utan svammel.",
  alternates: { canonical: "/guider" },
};

export default function GuidesHub() {
  const guides = getAllGuides();

  return (
    <>
      <PageHeader
        eyebrow="Guider"
        title={
          <>
            Lär dig få fler kunder — <span className="emph">utan svammel</span>
          </>
        }
        intro="Ärliga, jordnära guider skrivna för bygg- och hantverksföretag. Inga magiska löften, bara det som faktiskt fungerar."
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Guider", path: "/guider" },
        ]}
      />

      <section className="shell py-14 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={i % 3}>
              <Link
                href={`/guider/${g.slug}`}
                className="card-lift flex h-full flex-col rounded-card border border-line bg-card p-6"
              >
                <span className="pill self-start">{g.cluster}</span>
                <h2 className="mt-3 text-lg leading-snug">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{g.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Läs guiden <ArrowIcon className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
