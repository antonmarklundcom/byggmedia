/** Small fetch-with-retry helper: 3× exponential backoff. */

export type SendResult =
  | { ok: true; skipped?: false }
  | { ok: false; skipped: true; reason: string } // not configured
  | { ok: false; skipped?: false; reason: string }; // configured but failed

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function postWithRetry(
  url: string,
  body: unknown,
  { attempts = 3, baseDelayMs = 300 }: { attempts?: number; baseDelayMs?: number } = {},
): Promise<SendResult> {
  let lastErr = "unknown error";
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) return { ok: true };
      lastErr = `HTTP ${res.status}`;
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
    }
    if (i < attempts - 1) await wait(baseDelayMs * 2 ** i);
  }
  return { ok: false, reason: lastErr };
}
