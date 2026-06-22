/** sv-SE formatting helpers. Prices exkl. moms, space thousand-separators. */

/** 1995 -> "1 995 kr" (space thousand-separator, no decimals). */
export function formatKr(amount: number): string {
  const grouped = new Intl.NumberFormat("sv-SE", {
    maximumFractionDigits: 0,
  }).format(amount);
  // Intl uses a non-breaking space already; normalise to a regular NBSP.
  return `${grouped.replace(/ /g, " ")} kr`;
}
