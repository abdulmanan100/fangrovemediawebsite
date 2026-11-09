import { authors, lastModified, publishedPosts } from "@/content/blog";
import { company, siteConfig } from "@/content/company";

/**
 * RSS 2.0 feed of published posts. Feed readers, aggregators and some AI
 * crawlers use it to find new articles sooner than a sitemap recrawl. Built
 * once per deploy.
 */
export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

export function GET() {
  const posts = publishedPosts();
  const home = `${siteConfig.url}/blog`;
  const newest = posts[0];

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.published)}</pubDate>
      <category>${escape(post.category)}</category>
      <dc:creator>${escape(authors[post.author].name)}</dc:creator>
      <description>${escape(`${post.summary} ${post.description}`)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(`${company.name} Journal`)}</title>
    <link>${home}</link>
    <atom:link href="${home}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guides to buying billboards, digital screens and large-format print in Lahore.</description>
    <language>en-pk</language>
${newest ? `    <lastBuildDate>${rfc822(lastModified(newest))}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
