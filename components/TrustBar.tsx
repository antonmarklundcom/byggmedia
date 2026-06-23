import { site } from "@/lib/config";
import { CheckIcon } from "@/components/Icons";

/** Trust bar — real facts only, no invented client counts. */
export function TrustBar() {
  const items = [
    `Org.nr ${site.orgNr}`,
    site.fSkatt ? "Godkänd för F-skatt" : "",
    site.responsePromise,
    "Kostnadsfri analys",
  ].filter(Boolean);

  return (
    <div className="border-y border-line bg-soft">
      <div className="shell flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-sm text-muted">
        {items.map((it) => (
          <span key={it} className="inline-flex items-center gap-1.5">
            <CheckIcon className="h-4 w-4 text-accent" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
