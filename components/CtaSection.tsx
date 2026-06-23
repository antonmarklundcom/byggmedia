import { site } from "@/lib/config";
import { CtaButton } from "@/components/CtaButton";
import { PhoneIcon } from "@/components/Icons";

/**
 * The one ink-dark moment per page (risk-reversal / final CTA).
 * Used at the end of pages — no dead ends.
 */
export function CtaSection({
  title = "Redo att få fler förfrågningar?",
  body = "Börja med en kostnadsfri analys. Du får ärliga råd, en fast offert innan start — och ingen bindningstid.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink text-white">
      <div className="shell py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">{body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton className="!bg-white !text-ink hover:!bg-white/90">
              Få kostnadsfri analys
            </CtaButton>
            <a
              href={site.phoneTel}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
          <p className="mt-5 text-sm text-white/50">
            {site.responsePromise} · Ingen bindningstid · {site.region}
          </p>
        </div>
      </div>
    </section>
  );
}
