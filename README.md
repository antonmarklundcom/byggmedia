# Byggmedia — byggmedia.se

Production Swedish-language B2B website for **Byggmedia**, a marketing agency
(run by **Marklund Sales & Marketing AB**, org.nr 559184-4757, godkänd för
F-skatt) that does marketing **only** for bygg- och hantverksföretag across hela
Sverige.

- **Stack:** Next.js (App Router) + TypeScript (strict) + Tailwind CSS. No
  database. Fonts via `next/font/google` (self-hosted at build).
- **Locale:** sv-SE, du-tilltal. Prices exkl. moms, space thousand-separators.
- **Conversion mode:** form-first. A short qualifying lead form routes/tags leads
  for later GHL automation. No checkout, no signup, no client portal.

There is no DB. Services and industries are **typed content in the repo**; guides
are **MDX**.

---

## Getting started

```bash
npm ci
cp .env.example .env.local   # fill in the MINIMUM-TO-LAUNCH subset
npm run dev                  # http://localhost:3000
npm run build && npm run start
```

The site **builds and runs with only the minimum env subset set** (see below).
Every integration degrades gracefully when unconfigured.

---

## Routes

| Path | What |
|------|------|
| `/` | Home (results/desire-led, Variant B) |
| `/tjanster` | Services hub |
| `/tjanster/[slug]` | Service page — `hemsida`, `seo`, `google-ads`, `sociala-medier`, `automation`, `ai` |
| `/for/[bransch]` | Industry pages — `taklaggare`, `elektriker`, `snickare`, `vvs`, `byggforetag`, `malare` |
| `/guider` | Guide hub (MDX) |
| `/guider/[slug]` | Guide article (MDX) |
| `/priser` | Pricing |
| `/om-oss` | About (founder presence, transparency) |
| `/kontakt` | Contact (form + phone + e-post + org details) |
| `/boka` | Placeholder "boka samtal" (calendar slot) |
| `/tack` | Thank-you page after form submit |
| `/integritetspolicy`, `/cookiepolicy`, `/allmanna-villkor` | Legal |
| `/api/lead` | Lead orchestrator (POST) |
| `/sitemap.xml`, `/robots.txt` | Generated from content |

---

## Editing content

### Services — `content/services.ts`

A typed array. Each entry has `slug`, `title` (the H1 — always an **outcome**),
`keyword`, `intro`, `sections[]`, `faq[]`, meta fields, and an optional
`isPositioning: true` for the lighter `automation` / `ai` pages. Edit the file;
the page, sitemap and nav update automatically. A section whose heading contains
"så går det till" automatically renders the numbered process timeline.

### Industries (branscher) — `content/branscher.json`

One object per vertical with unique pain-point copy, which services fit, and a
vertical FAQ. Add an object (ASCII slug) and the page, sitemap and nav update.

### Guides — `content/guider/*.mdx`

**Add a guide = drop a new `.mdx` file.** No code change. Frontmatter is
zod-validated (`lib/guides.ts`); the build fails loudly on invalid frontmatter.

```mdx
---
title: "..."
slug: "matches-the-filename"   # ASCII kebab-case, must equal the filename
cluster: "hemsida"
description: "..."
date: "2026-01-15"
author: "Byggmedia"
sources: ["..."]
related: ["/tjanster/seo"]      # internal links rendered at the end
faq:                            # optional → renders + emits FAQPage JSON-LD
  - q: "..."
    a: "..."
---
```

Use real internal links and honest figures only (ranges labelled "ungefärliga
riktpriser" or the real "från 1 995 kr/mån" — never invented exact numbers).

---

## Environment variables

See `.env.example` for the full, commented list. Real secrets live **only in the
Hostinger panel** — `.env.example` documents, never holds.

**Minimum to launch** (site builds/runs with just these):

```
NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_PHONE,
NEXT_PUBLIC_ORG_NR, NEXT_PUBLIC_F_SKATT, NEXT_PUBLIC_REGION,
NEXT_PUBLIC_RESPONSE_PROMISE, NEXT_PUBLIC_VISA_PRIS, NEXT_PUBLIC_PRIS_FRAN
```

> ⚠️ Until **Sheets or GHL** is configured, non-redirect leads are only in the
> **server logs**. Set up the Sheets backup in **week one**. The `/kontakt` page
> always also shows the `mailto:`/phone fallback, so a lead is never lost.

### Adding integrations later (one at a time, redeploy each)

**GHL inbound webhook** — set `GHL_WEBHOOK_URL`. Keep `GHL_SANDBOX=true` until
verified. ⚠️ Every GHL field/endpoint name in `lib/ghl.ts` is **unverified**
(marked `TODO(ghl)`). Verify against live GHL docs + one test contact before
production. Until the URL is set, GHL is skipped cleanly.

**Google Sheets backup** — set `SHEETS_WEBHOOK_URL` to a Google Apps Script Web
App (or similar) that appends a row. Mapping is in `lib/sheets.ts`. Skipped
cleanly if unset.

**Calendar** — set `NEXT_PUBLIC_GHL_CALENDAR_URL`. When set, `/boka` and `/tack`
render it as an `<iframe>` (`components/CalendarPlaceholder.tsx`); otherwise they
show the phone/e-post fallback. No fake time-slot UI.

**Chat widget** — the bottom-bar **Chatt** icon calls
`window.openByggmediaChat()`. Today that stub opens the lead dialog. When the GHL
chat widget is injected, override `window.openByggmediaChat` to open the real
widget so there is **one** chat entry point (not GHL's floating bubble *and* this
icon). Hook up via `NEXT_PUBLIC_GHL_CHAT_ID`.

---

## How the lead pipeline works

1. Form (`components/LeadForm.tsx`) POSTs JSON to `/api/lead`. It captures UTM
   (persisted first-touch in `sessionStorage`), stamps a consent timestamp, and
   uses `navigator.sendBeacon` on `pagehide` so a leaving user's lead still posts.
2. `/api/lead/route.ts` zod-validates, then fans out to GHL + Sheets with
   `Promise.allSettled` (3× exponential-backoff retries each).
3. **NEVER-BLOCK:** even if both integrations are unconfigured or fail, the API
   logs the lead and returns success; the UI redirects to `/tack`. A CRM/logging
   error must never cost a lead.

Routing tags travel on every payload: `service` (primary) + `bransch`
(secondary), so GHL automation can branch on them later.

---

## Deployment — Hostinger (Node, verified June 2026)

1. hPanel → **Websites → Add Website → Node.js App**
2. **Import Git Repository** → branch `main`
3. **Next.js** preset → root `./` → default build (`next build` / `next start`)
4. **Node 24.x** (current LTS — pick 24, not 26). `package.json` `engines.node`
   allows ≤ 24.
5. Set the env vars (minimum-to-launch subset) in the panel.
6. **Deploy**, then attach the domain.

CI on push: `npm ci && npm run build`. Merging to `main` = deploying
(auto-redeploy).

Seed all images in **`public/images/`** (committed to the repo). Never upload via
the host file manager — Hostinger's filesystem wipes on redeploy. Use
`next/image`; no hotlinking. Never use `output: 'export'` (this app has API
routes).

---

## Who answers the leads

Leads must be answered **within 24 hours** (the public promise across the site).
Until Sheets/GHL is live, check the server logs and the monitored inbox
(`NEXT_PUBLIC_CONTACT_EMAIL`). Once Sheets is connected, every lead lands as a row
there as a backup to GHL.

---

## Compliance & honesty notes (launch-blocking)

- sv-SE, du-form; kr **exkl. moms** stated next to every price; space
  thousand-separators.
- **Cold launch / läge utan case:** no testimonials, client logos, result
  numbers, client counts, or generated faces. The proof substitution stack is
  process transparency, founder presence (typographic photo placeholder — add a
  real photo to `public/images/`, do not generate one), and risk reversal
  (kostnadsfri analys, ingen bindningstid, fast offert innan start).
- Any `[Kommer inom kort]` / `[KOMPLETTERA]` placeholder renders verbatim.
- Banned hype words (no real source): "revolutionerande", "marknadsledande",
  "Sveriges bästa", "ledande", "game changer".
- **GDPR:** unticked consent + timestamp on every form; granular cookie banner
  (Nödvändiga / Statistik / Marknadsföring) with non-essential OFF until consent;
  the integritetspolicy names Marklund Sales & Marketing AB as
  personuppgiftsansvarig with org.nr.
