import { z } from "zod";

/**
 * Shared lead schema. Used by /api/lead (validation) and the lead form (types).
 * Two sources via discriminated union: the multi-step qualify form and the
 * plain contact form. Both carry routing tags + consent + UTM so GHL can branch.
 */

// Step 1 routing tag — first answer becomes the PRIMARY routing tag.
export const SERVICE_TAGS = [
  "hemsida",
  "seo",
  "google-ads",
  "sociala-medier",
  "vet-inte",
] as const;
export type ServiceTag = (typeof SERVICE_TAGS)[number];

// Step 2 routing tag — SECONDARY routing tag.
export const BRANSCH_TAGS = [
  "tak",
  "el",
  "snickeri",
  "vvs",
  "bygg",
  "maleri",
  "annat",
] as const;
export type BranschTag = (typeof BRANSCH_TAGS)[number];

export const serviceLabels: Record<ServiceTag, string> = {
  hemsida: "Hemsida",
  seo: "SEO",
  "google-ads": "Google Ads",
  "sociala-medier": "Sociala medier",
  "vet-inte": "Vet inte",
};

export const branschLabels: Record<BranschTag, string> = {
  tak: "Tak",
  el: "El",
  snickeri: "Snickeri",
  vvs: "VVS",
  bygg: "Bygg",
  maleri: "Måleri",
  annat: "Annat",
};

const utmSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    landing_path: z.string().max(500).optional(),
  })
  .partial();

const baseFields = {
  company: z.string().trim().min(1, "Ange företag").max(200),
  name: z.string().trim().min(1, "Ange namn").max(200),
  phone: z.string().trim().min(4, "Ange telefonnummer").max(40),
  email: z.string().trim().email("Ange en giltig e-postadress").max(200),
  message: z.string().trim().max(4000).optional().default(""),
  // Unticked consent + timestamp on every form (GDPR).
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du måste godkänna integritetspolicyn" }),
  }),
  consentTimestamp: z.string().datetime().optional(),
  utm: utmSchema.optional(),
};

export const leadSchema = z.discriminatedUnion("source", [
  z.object({
    source: z.literal("qualify_form"),
    // routing tags
    service: z.enum(SERVICE_TAGS),
    bransch: z.enum(BRANSCH_TAGS),
    ...baseFields,
  }),
  z.object({
    source: z.literal("contact_form"),
    service: z.enum(SERVICE_TAGS).optional(),
    bransch: z.enum(BRANSCH_TAGS).optional(),
    ...baseFields,
  }),
]);

export type LeadInput = z.infer<typeof leadSchema>;

/** Normalised lead passed to integrations (with server-stamped metadata). */
export type LeadRecord = LeadInput & {
  receivedAt: string; // ISO timestamp, server-side
  primaryTag: string; // service routing tag (or "okand")
  secondaryTag: string; // bransch routing tag (or "okand")
};
