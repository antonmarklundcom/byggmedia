import type { Metadata } from "next";
import Link from "next/link";
import { services, coreServices, positioningServices } from "@/content/services";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { CtaButton } from "@/components/CtaButton";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tjänster — marknadsföring för bygg & hantverk",
  description:
    "Marknadsföring för bygg- och hantverksföretag: hemsida, SEO, Google Ads, sociala medier, automation och AI. Allt som får fler kunder att höra av sig.",
  alternates: { canonical: "/tjanster" },
};

function ServiceCard({ slug, name, title, intro }: (typeof services)[number]) {
  return (
    <Link
      href={`/tjanster/${slug}`}
      className="card-lift flex h-full flex-col rounded-card border border-line bg-card p-6"
    >
      <h3 className="text-xl">{name}</h3>
      <p className="mt-1 text-sm font-medium text-accent">{title}</p>
      <p className="mt-3 flex-1 text-sm text-muted">{intro.split(".")[0]}.</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Läs mer <ArrowIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function ServicesHub() {
  return (
    <>
      <PageHeader
        eyebrow="Tjänster"
        title={
          <>
            Marknadsföring för bygg- &amp; <span className="emph">hantverksföretag</span>
          </>
        }
        intro="Du behöver inte göra allt på en gång — du behöver göra rätt sak i rätt ordning. Här är allt vi gör för att få fler kunder att höra av sig."
        crumbs={[
          { name: "Hem", path: "/" },
          { name: "Tjänster", path: "/tjanster" },
        ]}
      >
        <CtaButton withArrow>Få kostnadsfri analys</CtaButton>
      </PageHeader>

      <section className="shell py-16 sm:py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">Kärntjänster</h2>
          <p className="mt-2 max-w-xl text-muted">Grunden för fler förfrågningar.</p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {coreServices.map((s, i) => (
            <Reveal key={s.slug} delay={i % 2}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-16 text-2xl sm:text-3xl">Som tar dig längre</h2>
          <p className="mt-2 max-w-xl text-muted">
            När grunden sitter hjälper det här dig att jobba smartare.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {positioningServices.map((s, i) => (
            <Reveal key={s.slug} delay={i % 2}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
