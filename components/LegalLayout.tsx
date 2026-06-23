import { PageHeader } from "@/components/PageHeader";

/** Shared layout for legal pages. Editorial prose, sv-SE. */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Juridik"
        title={title}
        crumbs={[
          { name: "Hem", path: "/" },
          { name: title, path: "#" },
        ]}
      />
      <section className="shell py-12 sm:py-16">
        <div className="mx-auto max-w-prose">
          <p className="text-sm text-muted">Senast uppdaterad: {updated}</p>
          <div className="legal mt-8">{children}</div>
        </div>
      </section>
    </>
  );
}
