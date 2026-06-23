import { NextResponse } from "next/server";
import { leadSchema, type LeadRecord } from "@/lib/lead";
import { sendToGhl } from "@/lib/ghl";
import { sendToSheets } from "@/lib/sheets";

export const runtime = "nodejs";

/**
 * Single lead orchestrator.
 * - Parses JSON from the raw text body, zod-validates every field.
 * - Fans out to GHL + Google Sheets with Promise.allSettled (each retries 3×).
 * - NEVER-BLOCK: even if both integrations are unconfigured or fail, we still
 *   return success, log the lead, and the UI shows the e-post/phone fallback.
 *   A logging/CRM error must never cost a lead.
 */
export async function POST(req: Request) {
  // Parse raw text → JSON (works for fetch and navigator.sendBeacon).
  let json: unknown;
  try {
    const raw = await req.text();
    json = raw ? JSON.parse(raw) : null;
  } catch {
    return NextResponse.json({ ok: false, error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || "Kontrollera fälten och försök igen.";
    return NextResponse.json({ ok: false, error: first }, { status: 400 });
  }

  const lead = parsed.data;
  const record: LeadRecord = {
    ...lead,
    receivedAt: new Date().toISOString(),
    primaryTag: lead.service ?? "okand",
    secondaryTag: lead.bransch ?? "okand",
  };

  // Fan out — never throws, results inspected for logging only.
  const [ghl, sheets] = await Promise.allSettled([sendToGhl(record), sendToSheets(record)]);

  const summarize = (r: PromiseSettledResult<{ ok: boolean; skipped?: boolean; reason?: string }>) =>
    r.status === "fulfilled"
      ? r.value.ok
        ? "ok"
        : r.value.skipped
          ? `skipped (${r.value.reason})`
          : `failed (${r.value.reason})`
      : `error (${String(r.reason)})`;

  const ghlStatus = summarize(ghl);
  const sheetsStatus = summarize(sheets);
  const delivered = ghlStatus === "ok" || sheetsStatus === "ok";

  // Always log the lead so it is never lost, even if integrations are down.
  // (When neither GHL nor Sheets is configured, this server log is the record.)
  console.log(
    `[lead] ${record.receivedAt} source=${record.source} tjanst=${record.primaryTag} ` +
      `bransch=${record.secondaryTag} company=${JSON.stringify(record.company)} ` +
      `name=${JSON.stringify(record.name)} phone=${JSON.stringify(record.phone)} ` +
      `email=${JSON.stringify(record.email)} delivered=${delivered} ` +
      `ghl=${ghlStatus} sheets=${sheetsStatus}`,
  );

  // Never block the user — always success.
  return NextResponse.json({ ok: true, delivered });
}
