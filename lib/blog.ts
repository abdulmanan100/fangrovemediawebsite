import { readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

/**
 * Build-time reads of a post's MDX source: word count, reading time and the
 * contents list. Every blog route is static, so this runs once per build.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function source(slug: string): string {
  return readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
}

/** Markdown and JSX syntax removed, leaving the words a reader reads. */
function prose(mdx: string): string {
  return mdx
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+\/>/g, " ") // self-closing components
    .replace(/<\/?[A-Za-z][^>]*>/g, " ") // other tags
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → their text
    .replace(/[#>*_`|~-]/g, " ");
}

export function wordCount(slug: string): number {
  return prose(source(slug)).split(/\s+/).filter(Boolean).length;
}

/** Minutes at 220 words a minute, never less than one. */
export function readingMinutes(slug: string): number {
  return Math.max(1, Math.round(wordCount(slug) / 220));
}

export type OutlineItem = { id: string; text: string };

/**
 * The post's H2s with the ids rehype-slug gives them. rehype-slug runs one
 * github-slugger over every heading in order, so this does the same, H3s
 * included, or a repeated heading would get a different suffix here.
 */
export function outline(slug: string): OutlineItem[] {
  const slugger = new GithubSlugger();
  const items: OutlineItem[] = [];

  for (const match of source(slug).matchAll(/^(#{1,6})\s+(.+?)\s*#*\s*$/gm)) {
    const level = match[1]!.length;
    const text = match[2]!.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
    const id = slugger.slug(text);
    if (level === 2) items.push({ id, text });
  }

  return items;
}
