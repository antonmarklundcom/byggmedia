import { site } from "@/lib/config";

/**
 * Price display with honest campaign framing.
 * Shows the current (campaign) price; if an ordinary price is configured,
 * shows it struck through with a "Kampanjpris" label. exkl. moms always stated.
 */
export function PriceTag({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  if (!site.showPrice) return null;
  const big = size === "lg";
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`font-display ${big ? "text-4xl sm:text-5xl" : "text-2xl"} text-ink`}>
          {site.priceFrom}
        </span>
        <span className="text-sm text-muted">exkl. moms</span>
      </div>
      {site.priceOrdinary && (
        <p className="mt-2 text-sm text-muted">
          <span className="rounded-full bg-accsoft px-2.5 py-1 text-xs font-semibold text-accent">
            Kampanjpris
          </span>{" "}
          <span className="ml-1">
            ordinarie <span className="line-through">{site.priceOrdinary}</span>
          </span>
        </p>
      )}
    </div>
  );
}
