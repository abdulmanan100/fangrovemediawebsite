/**
 * Single source of truth for company facts.
 *
 * The phone number and postal address are confirmed and real. Every field
 * still marked `TODO` below — email boxes, legal name, founding year, social
 * profiles and the map coordinates — must be replaced before launch.
 * See ASSETS.md for the full checklist.
 */

export const company = {
  name: "Fangrove Media",
  shortName: "Fangrove",
  legalName: "Fangrove Media (Pvt.) Ltd.", // TODO: confirm legal entity name
  founded: 2014, // TODO: confirm founding year
  tagline: "Pakistan runs on attention. We own the places it happens.",
  description:
    "Fangrove Media is an out-of-home, broadcast and print media company in Lahore. We own and operate large-format sites across Punjab, buy electronic and press media, and run our own printing floor.",

  contact: {
    phone: "+92 322 807 2185",
    phoneHref: "tel:+923228072185",
    email: "hello@fangrovemedia.com", // TODO: confirm mailbox exists
    salesEmail: "sales@fangrovemedia.com", // TODO: confirm mailbox exists
  },

  address: {
    line1: "10D Commercial",
    line2: "Pak Arab Society",
    city: "Lahore",
    region: "Punjab",
    country: "Pakistan",
    countryCode: "PK",

    /**
     * Deliberately no lat/lng.
     *
     * Pak Arab Society is not present in OpenStreetMap, Photon or Overpass,
     * and the surrounding road anchors disagree by several kilometres — so
     * any coordinate here would be a guess. A wrong `geo` block is worse than
     * none: it overrides the postal address in Google's local index and pins
     * the business somewhere it isn't.
     *
     * Instead, every map link resolves from the written address below, which
     * Google geocodes correctly on its own.
     *
     * Optional improvement: right-click the office in Google Maps, copy the
     * `lat, lng`, and add `coords: [lat, lng] as [number, number]` here — then
     * re-add the `geo` property in lib/schema.ts.
     */
  },

  hours: {
    label: "Mon – Sat, 09:00 – 18:00 PKT",
    schema: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
    ],
  },

  social: {
    // TODO: replace with real profiles, or delete the entries you don't use
    linkedin: "https://www.linkedin.com/company/fangrovemedia",
    instagram: "https://www.instagram.com/fangrovemedia",
    facebook: "https://www.facebook.com/fangrovemedia",
  },

  /** Headline capability numbers. Recalculated from sites.ts where possible. */
  stats: {
    yearsActive: new Date().getFullYear() - 2014,
    citiesCovered: 5,
    printCapacitySqFtDay: 40_000, // TODO: confirm daily flex output
  },
} as const;

/**
 * Single, address-based Google Maps target used everywhere on the site.
 * Google geocodes the written address, so this stays correct without the
 * site having to hold coordinates of its own.
 */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  [
    company.address.line1,
    company.address.line2,
    company.address.city,
    company.address.country,
  ].join(", "),
)}`;

export const siteConfig = {
  // TODO: point this at the real production domain before launch
  url: "https://fangrovemedia.com",
  locale: "en_PK",
  twitter: "@fangrovemedia",
} as const;

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Network", href: "/network" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
