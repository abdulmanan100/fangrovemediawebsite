import { company, siteConfig } from "@/content/company";
import { services } from "@/content/services";
import type { MediaSite } from "@/content/sites";
import type { Campaign } from "@/content/work";

/**
 * JSON-LD builders.
 *
 * Rendered via <script type="application/ld+json"> in the relevant layouts and
 * pages. Keep every URL absolute — Google will not resolve relative ones.
 */

const ORG_ID = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AdvertisingAgency", "LocalBusiness"],
    "@id": ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: siteConfig.url,
    description: company.description,
    foundingDate: String(company.founded),
    telephone: company.contact.phone,
    email: company.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    // No `geo` block by design — see the note in content/company.ts. Google
    // geocodes `address` itself, and a guessed coordinate would override it.
    openingHoursSpecification: company.hours.schema.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: ["Lahore", "Islamabad", "Karachi", "Faisalabad", "Multan", "Punjab", "Pakistan"].map(
      (name) => ({ "@type": "AdministrativeArea", name }),
    ),
    sameAs: Object.values(company.social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Media services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${siteConfig.url}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: company.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-PK",
  };
}

export function serviceSchema(slug: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: `${siteConfig.url}/services/${slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Pakistan" },
    serviceType: title,
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`,
    })),
  };
}

/**
 * VideoObject per campaign reel.
 *
 * `contentUrl` is deliberately omitted and `embedUrl` given instead — the reels
 * are hosted on YouTube, so there is no file of ours to point at, and Google
 * accepts either one.
 */
export function videoSchema(film: Campaign) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${film.client} — ${film.title}`,
    description: film.posterAlt,
    thumbnailUrl: `${siteConfig.url}${film.poster}`,
    uploadDate: film.uploaded,
    embedUrl: `https://www.youtube-nocookie.com/embed/${film.youtubeId}`,
    publisher: { "@id": ORG_ID },
  };
}

export function mediaSiteSchema(site: MediaSite) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: site.name,
    url: `${siteConfig.url}/network/${site.id}`,
    description: `${site.format}, ${site.widthFt} × ${site.heightFt} ft, ${site.illumination}. ${site.facing}.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.area,
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coords[0],
      longitude: site.coords[1],
    },
    isAccessibleForFree: false,
  };
}
