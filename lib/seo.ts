import type { Metadata } from "next";
import { company, siteConfig } from "@/content/company";

type BuildMetadata = {
  title: string;
  description: string;
  /** Path only, e.g. "/services/dooh". Omit for the home page. */
  path?: string;
  /** Absolute or root-relative OG image. Defaults to the generated one. */
  image?: string;
};

/**
 * Every page's metadata goes through here so titles, canonicals and OG tags
 * stay consistent. `metadataBase` in the root layout resolves relative URLs.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: BuildMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: company.name,
      title,
      description,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitter,
      ...(image ? { images: [image] } : {}),
    },
  };
}
