import { site } from "@/lib/config";
import { PhoneIcon, MailIcon } from "@/components/Icons";

/**
 * Placeholder "boka samtal" card.
 * Env-gated: if NEXT_PUBLIC_GHL_CALENDAR_URL is set, render the GHL calendar
 * iframe; otherwise show the phone/e-post fallback. No fake time-slot UI.
 */
export function CalendarPlaceholder() {
  return (
    <div className="rounded-card border border-line bg-card p-6 shadow-sm">
      <h2 className="text-2xl">Vill du boka ett samtal direkt?</h2>
      {site.ghlCalendarUrl ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          {/* GHL calendar iframe drops in here */}
          <iframe
            src={site.ghlCalendarUrl}
            title="Boka ett samtal"
            className="h-[640px] w-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-muted">
            Ring {site.phone} eller mejla oss så bokar vi en tid som passar dig.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneTel} className="btn-accent">
              <PhoneIcon className="h-4 w-4" />
              Ring {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="btn-outline">
              <MailIcon className="h-4 w-4 text-accent" />
              {site.email}
            </a>
          </div>
          {/* GHL calendar iframe drops in here once NEXT_PUBLIC_GHL_CALENDAR_URL is set */}
        </div>
      )}
    </div>
  );
}
