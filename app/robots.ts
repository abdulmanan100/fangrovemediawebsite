import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/company";

/**
 * Everything is open to every crawler, deliberately including the AI ones
 * (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended). Being
 * read by answer engines is how the journal gets cited in their answers, so
 * do not add per-bot blocks without deciding to give that up. /llms.txt is
 * the map written for them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
