import data from "@/content/branscher.json";

export type Bransch = {
  slug: string;
  name: string;
  title: string;
  keyword: string;
  intro: string;
  pains: string[];
  fitServices: string[]; // service slugs
  fitNote: string;
  faq: { q: string; a: string }[];
};

export const branscher: Bransch[] = data as Bransch[];

export function getBransch(slug: string): Bransch | undefined {
  return branscher.find((b) => b.slug === slug);
}
