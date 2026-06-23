"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SERVICE_TAGS,
  BRANSCH_TAGS,
  serviceLabels,
  branschLabels,
  type ServiceTag,
  type BranschTag,
} from "@/lib/lead";
import { getUtm } from "@/lib/utm";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { site } from "@/lib/config";

type Variant = "qualify" | "contact";

type Contact = {
  company: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
};

const emptyContact: Contact = {
  company: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
};

export function LeadForm({
  variant = "qualify",
  defaultService,
  defaultBransch,
}: {
  variant?: Variant;
  defaultService?: ServiceTag;
  defaultBransch?: BranschTag;
}) {
  const router = useRouter();
  const [step, setStep] = useState(variant === "qualify" ? 1 : 3);
  const [service, setService] = useState<ServiceTag | null>(defaultService ?? null);
  const [bransch, setBransch] = useState<BranschTag | null>(defaultBransch ?? null);
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const completed = useRef(false);
  const payloadRef = useRef<string | null>(null);

  function buildPayload(): string {
    const body = {
      source: variant === "qualify" ? "qualify_form" : "contact_form",
      service: service ?? (variant === "qualify" ? "vet-inte" : undefined),
      bransch: bransch ?? (variant === "qualify" ? "annat" : undefined),
      company: contact.company.trim(),
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      email: contact.email.trim(),
      message: contact.message.trim(),
      consent: contact.consent,
      consentTimestamp: new Date().toISOString(),
      utm: getUtm(),
    };
    return JSON.stringify(body);
  }

  // Leave-page-safe: if the user navigates away mid-submit, post via beacon.
  useEffect(() => {
    const onHide = () => {
      if (submitting && !completed.current && payloadRef.current) {
        try {
          navigator.sendBeacon(
            "/api/lead",
            new Blob([payloadRef.current], { type: "application/json" }),
          );
          completed.current = true;
        } catch {
          /* never block */
        }
      }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [submitting]);

  async function submit() {
    setError(null);
    // Minimal client validation; server does full zod.
    if (!contact.company.trim() || !contact.name.trim()) {
      setError("Fyll i företag och namn.");
      return;
    }
    if (!contact.phone.trim() && !contact.email.trim()) {
      setError("Ange telefon eller e-post så vi kan höra av oss.");
      return;
    }
    if (!contact.email.trim()) {
      setError("Ange en e-postadress.");
      return;
    }
    if (!contact.consent) {
      setError("Du behöver godkänna integritetspolicyn.");
      return;
    }

    const payload = buildPayload();
    payloadRef.current = payload;
    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: payload,
        keepalive: true,
      });
      completed.current = true;
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitting(false);
        setError(
          data?.error ||
            `Något gick fel. Ring ${site.phone} eller mejla ${site.email} så hjälper vi dig.`,
        );
        return;
      }
      // Success → thank-you page (carries routing tags server-side).
      router.push("/tack");
    } catch {
      // Network error to our own server is rare. Try a beacon, then show fallback.
      try {
        navigator.sendBeacon(
          "/api/lead",
          new Blob([payload], { type: "application/json" }),
        );
        completed.current = true;
        router.push("/tack");
        return;
      } catch {
        /* fall through to fallback message */
      }
      setSubmitting(false);
      setError(
        `Något gick fel. Ring ${site.phone} eller mejla ${site.email} så hjälper vi dig.`,
      );
    }
  }

  const totalSteps = variant === "qualify" ? 3 : 1;
  const currentStep = variant === "qualify" ? step : 1;

  return (
    <div className="w-full">
      {variant === "qualify" && (
        <div className="mb-5 flex items-center gap-2" aria-hidden>
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </div>
      )}
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
        Steg {currentStep} av {totalSteps}
      </p>

      {/* STEP 1 — service (primary routing tag) */}
      {variant === "qualify" && step === 1 && (
        <div>
          <h3 className="mb-1 text-xl">Vad behöver du hjälp med?</h3>
          <p className="mb-4 text-sm text-muted">Välj det som passar bäst — du kan ändra sen.</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SERVICE_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setService(t);
                  setStep(2);
                }}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  service === t
                    ? "border-accent bg-accsoft text-ink"
                    : "border-line bg-card hover:border-ink/40"
                }`}
              >
                {serviceLabels[t]}
                <ArrowIcon className="h-4 w-4 text-accent" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — bransch (secondary routing tag) */}
      {variant === "qualify" && step === 2 && (
        <div>
          <h3 className="mb-1 text-xl">Vilken bransch är du i?</h3>
          <p className="mb-4 text-sm text-muted">Så att vi kan ge dig relevanta råd.</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BRANSCH_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setBransch(t);
                  setStep(3);
                }}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                  bransch === t
                    ? "border-accent bg-accsoft text-ink"
                    : "border-line bg-card hover:border-ink/40"
                }`}
              >
                {branschLabels[t]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-4 text-sm font-medium text-muted hover:text-ink"
          >
            ← Tillbaka
          </button>
        </div>
      )}

      {/* STEP 3 — contact details */}
      {currentStep === (variant === "qualify" ? 3 : 1) && step === 3 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <h3 className="mb-1 text-xl">
            {variant === "qualify" ? "Sista steget — dina uppgifter" : "Skicka en förfrågan"}
          </h3>
          <p className="mb-4 text-sm text-muted">
            Vi hör av oss inom 24 timmar med din kostnadsfria analys.
          </p>

          {variant === "contact" && (
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Vad gäller det?"
                value={service ?? ""}
                onChange={(v) => setService((v || null) as ServiceTag | null)}
                options={SERVICE_TAGS.map((t) => ({ value: t, label: serviceLabels[t] }))}
              />
              <Select
                label="Bransch"
                value={bransch ?? ""}
                onChange={(v) => setBransch((v || null) as BranschTag | null)}
                options={BRANSCH_TAGS.map((t) => ({ value: t, label: branschLabels[t] }))}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            <Field
              label="Företag"
              value={contact.company}
              onChange={(v) => setContact((c) => ({ ...c, company: v }))}
              autoComplete="organization"
              required
            />
            <Field
              label="Namn"
              value={contact.name}
              onChange={(v) => setContact((c) => ({ ...c, name: v }))}
              autoComplete="name"
              required
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label="Telefon"
                type="tel"
                value={contact.phone}
                onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
                autoComplete="tel"
              />
              <Field
                label="E-post"
                type="email"
                value={contact.email}
                onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                autoComplete="email"
                required
              />
            </div>
            <Field
              label="Meddelande (valfritt)"
              value={contact.message}
              onChange={(v) => setContact((c) => ({ ...c, message: v }))}
              textarea
            />
          </div>

          <label className="mt-4 flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={contact.consent}
              onChange={(e) => setContact((c) => ({ ...c, consent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--accent)]"
            />
            <span>
              Jag godkänner att Byggmedia behandlar mina uppgifter enligt{" "}
              <Link href="/integritetspolicy" className="font-medium text-accent underline">
                integritetspolicyn
              </Link>
              .
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-line bg-soft px-3 py-2 text-sm text-ink"
            >
              {error}
            </p>
          )}

          <div className="mt-5 flex items-center gap-3">
            {variant === "qualify" && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm font-medium text-muted hover:text-ink"
              >
                ← Tillbaka
              </button>
            )}
            <button type="submit" disabled={submitting} className="btn-accent ml-auto disabled:opacity-60">
              {submitting ? "Skickar…" : "Skicka — få kostnadsfri analys"}
              {!submitting && <CheckIcon className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Föredrar du att ringa? {site.phone} — vi svarar gärna direkt.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const id = `f-${label.replace(/\W/g, "")}`;
  const cls =
    "w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none";
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium text-ink">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = `s-${label.replace(/\W/g, "")}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
      >
        <option value="">Välj…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
