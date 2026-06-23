import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/config";
import { serviceNav, branschNav } from "@/components/nav";
import { PhoneIcon, MailIcon } from "@/components/Icons";

const legal = [
  { href: "/integritetspolicy", label: "Integritetspolicy" },
  { href: "/cookiepolicy", label: "Cookiepolicy" },
  { href: "/allmanna-villkor", label: "Allmänna villkor" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-soft">
      <div className="shell grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">
            Marknadsföring för bygg- och hantverksföretag i {site.region.toLowerCase()}. Du är
            bäst på ditt hantverk — vi ser till att kunderna hittar dig.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={site.phoneTel} className="inline-flex items-center gap-2 font-medium text-ink">
              <PhoneIcon className="h-4 w-4 text-accent" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-medium text-ink"
            >
              <MailIcon className="h-4 w-4 text-accent" /> {site.email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Tjänster</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {serviceNav.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-muted hover:text-ink">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">För din bransch</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {branschNav.map((b) => (
              <li key={b.href}>
                <Link href={b.href} className="text-muted hover:text-ink">
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Företaget</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/om-oss" className="text-muted hover:text-ink">
                Om oss
              </Link>
            </li>
            <li>
              <Link href="/guider" className="text-muted hover:text-ink">
                Guider
              </Link>
            </li>
            <li>
              <Link href="/priser" className="text-muted hover:text-ink">
                Priser
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-muted hover:text-ink">
                Kontakt
              </Link>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-medium text-ink">{site.legalName}</p>
            <p>
              Org.nr {site.orgNr}
              {site.fSkatt && " · Godkänd för F-skatt"} · {site.region}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shell pb-6 text-xs text-muted">© {year} {site.legalName}. Alla rättigheter förbehållna.</div>
      </div>
    </footer>
  );
}
