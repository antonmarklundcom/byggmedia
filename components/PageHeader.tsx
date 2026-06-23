import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="shell py-12 sm:py-16">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 max-w-3xl text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
