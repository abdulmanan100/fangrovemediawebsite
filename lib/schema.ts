import { company, mapsUrl, siteConfig } from "@/content/company";
import { getService, services } from "@/content/services";
import { getSite, type MediaSite } from "@/content/sites";
import { authors, lastModified, type Faq, type Post } from "@/content/blog";

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
    // What the business is an authority on, in the words people search with.
    knowsAbout: [
      "Billboard advertising",
      "Outdoor media",
      "Out-of-home advertising",
      "Digital out-of-home advertising",
      "SMD screen advertising",
      "Hoardings",
      "Media campaigns",
      "Media planning and buying",
      "TV and radio advertising",
      "Newspaper advertising",
      "Flex printing",
    ],
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

/* ── Journal ───────────────────────────────────────────────────────────── */

const BLOG_ID = `${siteConfig.url}/blog#blog`;

/**
 * The author as an entity. The editorial byline resolves to the company's own
 * Organization node, so the article, the publisher and the business on the
 * map are one entity to Google and to AI answer engines. A named Person gets
 * their own node, tied to the company through `worksFor`.
 */
function authorNode(post: Post) {
  const author = authors[post.author];
  if (author.kind === "Organization") return { "@id": ORG_ID };

  return {
    "@type": "Person",
    name: author.name,
    url: `${siteConfig.url}${author.url}`,
    ...("role" in author && author.role ? { jobTitle: author.role } : {}),
    ...("sameAs" in author && author.sameAs ? { sameAs: author.sameAs } : {}),
    worksFor: { "@id": ORG_ID },
  };
}

export function blogPostingSchema(post: Post, wordCount: number) {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    abstract: post.summary,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: post.published,
    dateModified: lastModified(post),
    author: authorNode(post),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": BLOG_ID },
    inLanguage: "en-PK",
    articleSection: post.category,
    wordCount,
    // What the article is about (our services) and what it names (our sites).
    // These are the links that tie a guide to the business behind it.
    about: post.serviceSlugs
      .map((slug) => getService(slug))
      .filter((service) => service != null)
      .map((service) => ({
        "@type": "Service",
        name: service.title,
        url: `${siteConfig.url}/services/${service.slug}`,
        provider: { "@id": ORG_ID },
      })),
    mentions: (post.siteIds ?? [])
      .map((id) => getSite(id))
      .filter((site) => site != null)
      .map((site) => ({
        "@type": "Place",
        name: site.name,
        url: `${siteConfig.url}/network/${site.id}`,
      })),
  };
}

/**
 * Google now shows FAQ rich results for only a few kinds of site, so this is
 * not for a search feature. It states each question and answer as data, which
 * is how Bing and AI answer engines read a page's Q&A most reliably. The same
 * questions are visible on the page, as the markup requires.
 */
export function faqSchema(faq: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function blogSchema(posts: readonly Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    name: `${company.name} Journal`,
    url: `${siteConfig.url}/blog`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-PK",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${siteConfig.url}/blog/${post.slug}#article`,
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.published,
      dateModified: lastModified(post),
    })),
  };
}
