import type { Metadata } from "next";
import { company, siteConfig } from "@/content/company";

type BuildMetadata = {
  title: string;
  description: string;
  /** Path only, e.g. "/services/dooh". Omit for the home page. */
  path?: string;
  /**
   * Root-relative path to a 1200 × 630 card, e.g. a route's own
   * `/network/<id>/opengraph-image`. Defaults to the site-wide card.
   */
  image?: string;
  /**
   * False drops the " · Fangrove Media" suffix. For long-tail pages whose
   * titles are already near the ~60 characters a result shows, where the
   * place name matters more than the brand.
   */
  brand?: boolean;
};

/**
 * Every page's metadata goes through here so titles, canonicals and OG tags
 * stay consistent. `metadataBase` in the root layout resolves relative URLs.
 *
 * The image is always set explicitly. A page's `openGraph` object replaces
 * the layout's wholesale rather than merging with it, so leaving `images` out
 * here does not inherit the root card — it ships the page with no preview
 * image at all, which is how every inner page used to share on WhatsApp.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image = "/opengraph-image",
  brand = true,
}: BuildMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title: brand ? title : { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: company.name,
      title,
      description,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitter,
      images: [image],
    },
  };
}
