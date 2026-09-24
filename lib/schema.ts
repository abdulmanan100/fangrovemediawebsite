import { company, mapsUrl, siteConfig } from "@/content/company";
import { services } from "@/content/services";
import type { MediaSite } from "@/content/sites";

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
    // The 512 px app icon (mark on black) and the site-wide social card.
    logo: `${siteConfig.url}/icon.png`,
    image: `${siteConfig.url}/opengraph-image`,
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
    hasMap: mapsUrl,
    openingHoursSpecification: company.hours.schema.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    // The markets campaigns are planned and bought in (the owned estate is
    // Lahore alone), plus the country for broadcast and national press.
    areaServed: [
      ...company.stats.marketsCovered.map((name) => ({ "@type": "City", name })),
      { "@type": "Country", name: "Pakistan" },
    ],
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

export function mediaSiteSchema(site: MediaSite) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: site.name,
    url: `${siteConfig.url}/network/${site.id}`,
    image: `${siteConfig.url}${site.photo}`,
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
