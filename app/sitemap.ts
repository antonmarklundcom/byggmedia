import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { services } from "@/content/services";
import { branscher } from "@/lib/branscher";
import { getAllGuides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticPaths = [
    "/",
    "/tjanster",
    "/guider",
    "/priser",
    "/om-oss",
    "/kontakt",
    "/boka",
    "/integritetspolicy",
    "/cookiepolicy",
    "/allmanna-villkor",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: url(p),
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));

  for (const s of services) {
    entries.push({
      url: url(`/tjanster/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const b of branscher) {
    entries.push({
      url: url(`/for/${b.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const g of getAllGuides()) {
    entries.push({
      url: url(`/guider/${g.slug}`),
      lastModified: new Date(g.date),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return entries;
}
