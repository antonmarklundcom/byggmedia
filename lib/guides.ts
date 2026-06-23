import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Guides are MDX files in content/guider/*.mdx with zod-validated frontmatter.
 * Add a guide = drop a new .mdx file with valid frontmatter. No code change.
 */

const GUIDES_DIR = path.join(process.cwd(), "content", "guider");

export const guideFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be ASCII kebab-case"),
  cluster: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1), // ISO date
  author: z.string().min(1),
  sources: z.array(z.string()).default([]),
  faq: z
    .array(z.object({ q: z.string(), a: z.string() }))
    .optional()
    .default([]),
  // Optional internal links surfaced from frontmatter (kebab paths).
  related: z.array(z.string()).optional().default([]),
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;

export type Guide = GuideFrontmatter & {
  content: string; // raw MDX body
};

function readGuideFile(fileName: string): Guide {
  const fullPath = path.join(GUIDES_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = guideFrontmatterSchema.parse(data);
  // Enforce that the frontmatter slug matches the filename.
  const fileSlug = fileName.replace(/\.mdx?$/, "");
  if (fm.slug !== fileSlug) {
    throw new Error(
      `Guide slug mismatch: frontmatter "${fm.slug}" != filename "${fileSlug}"`,
    );
  }
  return { ...fm, content };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readGuideFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getGuide(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}
