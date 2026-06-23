"use client";

/**
 * UTM capture. Read params on landing, persist in sessionStorage, attach as
 * hidden fields to the lead payload. Client-only.
 */

export type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
};

const KEY = "byggmedia_utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** Call once on landing. Persists first-touch UTM (does not overwrite). */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return; // first-touch wins
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 200);
    }
    utm.referrer = document.referrer ? document.referrer.slice(0, 500) : undefined;
    utm.landing_path = window.location.pathname.slice(0, 500);
    sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage may be blocked — fail silently, never block a lead.
  }
}

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Utm) : {};
  } catch {
    return {};
  }
}
