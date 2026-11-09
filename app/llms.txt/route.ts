import { company, siteConfig } from "@/content/company";
import { services } from "@/content/services";
import { areaBreakdown, digitalScreens, sites, totalSites } from "@/content/sites";
import { publishedPosts } from "@/content/blog";
import { compactNumber, dimensions } from "@/lib/format";

/**
 * /llms.txt: a plain-text map of the site for AI assistants and answer
 * engines (see llmstxt.org). It states who the company is and links every
 * page worth citing, each with one line on what it holds.
 *
 * Generated from content/, like the sitemap, so it cannot drift from the site.
 */
export const dynamic = "force-static";

export function GET() {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const areas = areaBreakdown();
  const posts = publishedPosts();
  const { address, contact, hours } = company;

  const lines = [
    `# ${company.name}`,
    "",
    `> ${company.description}`,
    "",
    "Key facts:",
    `- Location: ${address.line1}, ${address.line2}, ${address.city} ${address.postalCode}, ${address.country}`,
    `- Phone and WhatsApp: ${contact.phone} (${hours.label})`,
    `- Owned media estate: ${totalSites} sites across ${areas.length} areas of Lahore, ${digitalScreens} of them digital LED screens. Each site's size, lighting, direction of approach and daily audience is published on its own page.`,
    `- Campaigns planned and bought in: ${company.stats.marketsCovered.join(", ")}; broadcast and national press across Pakistan.`,
    "- Static sites are booked in monthly cycles starting on the 1st or the 16th. Rates are quoted per cycle on request.",
    `- In business since ${company.founded}.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${url(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Media network",
    "",
    `- [Network map and site list](${url("/network")}): every site with photograph, size, lighting, approach and daily audience`,
    `- [How rates work](${url("/rates")}): what sets a billboard or screen rate, and what to send for a quote`,
    ...sites.map(
      (site) =>
        `- [${site.name}](${url(`/network/${site.id}`)}): ${site.format}, ${dimensions(site.widthFt, site.heightFt)}, ${site.illumination.toLowerCase()}, ${site.area}, about ${compactNumber(site.dailyImpressions)} a day`,
    ),
    "",
    ...(posts.length > 0
      ? [
          "## Journal",
          "",
          ...posts.map((post) => `- [${post.title}](${url(`/blog/${post.slug}`)}): ${post.description}`),
          "",
        ]
      : []),
    "## Company",
    "",
    `- [About](${url("/about")}): who we are, how we work, clients`,
    `- [Work](${url("/work")}): campaigns run for clients`,
    `- [Contact](${url("/contact")}): phone, WhatsApp, email and office address`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
