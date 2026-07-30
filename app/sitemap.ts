import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/company";
import { services } from "@/content/services";
import { sites } from "@/content/sites";
import { caseStudies } from "@/content/work";

/** Generated from the content files, so it can never drift out of date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/network"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },

    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((study) => ({
      url: url(`/work/${study.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // Individual sites are the long tail: "billboard on <road name>" queries.
    ...sites.map((site) => ({
      url: url(`/network/${site.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
