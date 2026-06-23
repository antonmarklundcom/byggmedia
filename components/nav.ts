import { services } from "@/content/services";
import { branscher } from "@/lib/branscher";

/** Single source of truth for navigation links. */
export const primaryNav = [
  { href: "/tjanster", label: "Tjänster" },
  { href: "/guider", label: "Guider" },
  { href: "/priser", label: "Priser" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export const serviceNav = services.map((s) => ({
  href: `/tjanster/${s.slug}`,
  label: s.name,
}));

export const branschNav = branscher.map((b) => ({
  href: `/for/${b.slug}`,
  label: b.name,
}));
