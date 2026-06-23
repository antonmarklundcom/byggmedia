import type { LeadRecord } from "./lead";
import { postWithRetry, type SendResult } from "./retry";

/**
 * Google Sheets backup via a webhook URL (e.g. a Google Apps Script Web App
 * that appends a row). Skips cleanly if SHEETS_WEBHOOK_URL is unset.
 *
 * ⚠️ Until Sheets OR GHL is configured, non-redirect leads live only in server
 * logs. Set up the Sheets backup in week one (see README).
 */

const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || "";

/** One flat row — easy to map to spreadsheet columns. */
function toRow(lead: LeadRecord) {
  return {
    received_at: lead.receivedAt,
    source: lead.source,
    tjanst: lead.primaryTag,
    bransch: lead.secondaryTag,
    company: lead.company,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    message: lead.message || "",
    consent: lead.consent ? "ja" : "nej",
    consent_timestamp: lead.consentTimestamp || lead.receivedAt,
    utm_source: lead.utm?.utm_source || "",
    utm_medium: lead.utm?.utm_medium || "",
    utm_campaign: lead.utm?.utm_campaign || "",
    utm_term: lead.utm?.utm_term || "",
    utm_content: lead.utm?.utm_content || "",
    referrer: lead.utm?.referrer || "",
    landing_path: lead.utm?.landing_path || "",
  };
}

export async function sendToSheets(lead: LeadRecord): Promise<SendResult> {
  if (!SHEETS_WEBHOOK_URL) {
    return { ok: false, skipped: true, reason: "SHEETS_WEBHOOK_URL not set" };
  }
  return postWithRetry(SHEETS_WEBHOOK_URL, toRow(lead));
}

export const sheetsConfigured = () => Boolean(SHEETS_WEBHOOK_URL);
