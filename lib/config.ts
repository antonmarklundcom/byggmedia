/**
 * Central site config, driven by env (see .env.example).
 * Everything here is build-safe: with only the MINIMUM-TO-LAUNCH vars set,
 * the site builds and runs; every integration degrades gracefully.
 *
 * NEXT_PUBLIC_* vars are inlined at build time and safe in the client bundle.
 */

const bool = (v: string | undefined, fallback: boolean): boolean => {
  if (v === undefined || v === "") return fallback;
  return v.toLowerCase() === "true";
};

// Real phone — used everywhere a phone is shown.
const PHONE_RAW = process.env.NEXT_PUBLIC_PHONE || "+46725414099";
// tel: needs no spaces; display wants the grouped form.
const phoneTel = `tel:${PHONE_RAW.replace(/[^+\d]/g, "")}`;
const phoneDisplay = "+46 72 541 40 99";

export const site = {
  name: "Byggmedia",
  legalName: "Marklund Sales & Marketing AB",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://byggmedia.se").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hej@byggmedia.se",
  phone: phoneDisplay,
  phoneTel,
  orgNr: process.env.NEXT_PUBLIC_ORG_NR || "559184-4757",
  fSkatt: bool(process.env.NEXT_PUBLIC_F_SKATT, true),
  region: process.env.NEXT_PUBLIC_REGION || "Hela Sverige",
  responsePromise: process.env.NEXT_PUBLIC_RESPONSE_PROMISE || "Svar inom 24 timmar",

  // Pricing (real). Flip NEXT_PUBLIC_VISA_PRIS=false to hide prices everywhere.
  showPrice: bool(process.env.NEXT_PUBLIC_VISA_PRIS, true),
  priceFrom: process.env.NEXT_PUBLIC_PRIS_FRAN || "Från 1 995 kr/mån",

  // Pending integrations (added later, one at a time).
  ghlCalendarUrl: process.env.NEXT_PUBLIC_GHL_CALENDAR_URL || "",
  ghlChatId: process.env.NEXT_PUBLIC_GHL_CHAT_ID || "",

  // Social / external (placeholder until real).
  linkedin: "https://www.linkedin.com/",
} as const;

export type Site = typeof site;

// Short, reusable trust points (no invented client counts).
export function trustPoints(): string[] {
  const points = [
    `Org.nr ${site.orgNr}`,
    site.fSkatt ? "Godkänd för F-skatt" : "",
    site.responsePromise,
    "Kostnadsfri analys",
    "Ingen bindningstid",
  ].filter(Boolean);
  return points;
}
