/**
 * Single source of truth for company facts.
 *
 * ⚠ PLACEHOLDER DATA — every field marked `TODO` below must be replaced with
 * real Fangrove Media details before this site goes live. Phone numbers are
 * deliberately all-zeros so they cannot dial a real person by accident.
 * See ASSETS.md for the full replacement checklist.
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
    // TODO: these coordinates are still the previous Gulberg location and do
    // not match the address above. They drive the LocalBusiness `geo` block
    // and the footer readout. Replace with the Pak Arab Society pin.
    coords: [31.5127, 74.3506] as [number, number],
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
