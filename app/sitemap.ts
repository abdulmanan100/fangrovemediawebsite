import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/company";
import { services } from "@/content/services";
import { sites } from "@/content/sites";
import { campaigns } from "@/content/work";

/**
 * Generated from the content files, so it can never drift out of date.
 *
 * No `lastModified`. Stamping every URL with the build time tells Google that
 * everything changed on every deploy, and it learns to ignore the field for
 * the whole domain. Leaving it out is neutral; an inaccurate one is not.
 *
 * `images` lists the real photography on each page, which is what surfaces a
 * site in image search for "billboard <road name>".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/network"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.9 },
    {
      url: url("/work"),
      changeFrequency: "monthly",
      priority: 0.8,
      images: campaigns.map((campaign) => url(campaign.poster)),
    },
    { url: url("/rates"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.7 },

    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Individual sites are the long tail: "billboard on <road name>" queries.
    ...sites.map((site) => ({
      url: url(`/network/${site.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.5,
      images: [url(site.photo)],
    })),
  ];
}
