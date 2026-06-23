"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Granular cookie consent: Nödvändiga (always on) / Statistik / Marknadsföring.
 * Non-essential categories default OFF until the user consents.
 * Stored in localStorage; no non-essential scripts load before consent.
 */

type Consent = { necessary: true; statistics: boolean; marketing: boolean; ts: string };
const KEY = "byggmedia_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* storage blocked — leave banner hidden, only necessary cookies used */
    }
  }, []);

  const save = (consent: Consent) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch {
      /* ignore */
    }
    setVisible(false);
    // NOTE: statistics/marketing scripts should be gated on these flags when added.
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-3 md:bottom-4 md:left-4 md:right-auto md:max-w-md md:p-0">
      <div className="rounded-2xl border border-line bg-card p-5 shadow-2xl">
        <h2 className="text-base font-semibold text-ink">Vi värnar om din integritet</h2>
        <p className="mt-2 text-sm text-muted">
          Vi använder nödvändiga cookies för att sidan ska fungera. Med ditt samtycke använder vi
          även cookies för statistik och marknadsföring. Läs mer i vår{" "}
          <Link href="/cookiepolicy" className="font-medium text-accent underline">
            cookiepolicy
          </Link>
          .
        </p>

        {details && (
          <div className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
            <Row label="Nödvändiga" desc="Krävs för att sidan ska fungera. Alltid på." checked disabled />
            <Row
              label="Statistik"
              desc="Hjälper oss förstå hur sidan används."
              checked={statistics}
              onChange={setStatistics}
            />
            <Row
              label="Marknadsföring"
              desc="Används för relevanta annonser."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              save({ necessary: true, statistics: true, marketing: true, ts: new Date().toISOString() })
            }
            className="btn-accent flex-1"
          >
            Godkänn alla
          </button>
          <button
            type="button"
            onClick={() =>
              save({ necessary: true, statistics: false, marketing: false, ts: new Date().toISOString() })
            }
            className="btn-outline flex-1"
          >
            Endast nödvändiga
          </button>
          {details ? (
            <button
              type="button"
              onClick={() =>
                save({ necessary: true, statistics, marketing, ts: new Date().toISOString() })
              }
              className="btn-ghost w-full"
            >
              Spara mina val
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="btn-ghost w-full"
            >
              Anpassa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[var(--accent)] disabled:opacity-60"
      />
      <span>
        <span className="block font-medium text-ink">{label}</span>
        <span className="block text-muted">{desc}</span>
      </span>
    </label>
  );
}
