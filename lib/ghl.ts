import type { LeadRecord } from "./lead";
import { postWithRetry, type SendResult } from "./retry";

/**
 * GoHighLevel (GHL) inbound-webhook provider.
 *
 * ⚠️ UNVERIFIED — TODO before production:
 *   Every field/endpoint name below is an assumption. Verify against the live
 *   GHL inbound-webhook docs and ONE test contact before going live. Keep
 *   GHL_SANDBOX=true until that test contact lands correctly in the pipeline.
 *
 * Until GHL_WEBHOOK_URL is set, GHL calls are skipped cleanly (never blocking).
 */

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "";
const GHL_SANDBOX = (process.env.GHL_SANDBOX || "true").toLowerCase() === "true";

/**
 * Map our lead to the GHL inbound payload.
 * TODO(ghl): confirm these field keys match the GHL webhook mapping.
 */
function toGhlPayload(lead: LeadRecord) {
  return {
    // TODO(ghl): GHL standard contact fields — verify exact keys.
    first_name: lead.name,
    company_name: lead.company,
    phone: lead.phone,
    email: lead.email,
    // TODO(ghl): confirm how custom fields / tags are accepted by the webhook.
    tags: [
      `tjanst:${lead.primaryTag}`,
      `bransch:${lead.secondaryTag}`,
      `kalla:${lead.source}`,
      GHL_SANDBOX ? "sandbox" : "live",
    ],
    notes: lead.message || "",
    // Routing tags kept explicit so automation can branch on them.
    routing: { primary: lead.primaryTag, secondary: lead.secondaryTag },
    consent: lead.consent,
    consent_timestamp: lead.consentTimestamp || lead.receivedAt,
    received_at: lead.receivedAt,
    utm: lead.utm || {},
  };
}

export async function sendToGhl(lead: LeadRecord): Promise<SendResult> {
  if (!GHL_WEBHOOK_URL) {
    return { ok: false, skipped: true, reason: "GHL_WEBHOOK_URL not set" };
  }
  return postWithRetry(GHL_WEBHOOK_URL, toGhlPayload(lead));
}

export const ghlConfigured = () => Boolean(GHL_WEBHOOK_URL);
