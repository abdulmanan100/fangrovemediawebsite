/**
 * Campaign portfolio — real work.
 *
 * These are the company's own campaigns, carried over from the previous
 * Omelet Advertising site during the rebrand to Fangrove Media.
 *
 * Deliberately a light model. The source material gives client, campaign and
 * discipline — it does not give briefs, strategies or measured outcomes, and
 * inventing those for real named clients would be fabrication. When real
 * write-ups exist, add `story` to an entry and the grid links through to a
 * detail page; until then each campaign renders as a portfolio card.
 */

export type Campaign = {
  slug: string;
  client: string;
  title: string;
  /** Discipline label shown on the card. */
  category: string;
  /** Year the campaign ran, where it is known. */
  year?: number;
  /** Slugs from content/services.ts */
  serviceSlugs: readonly string[];
  /**
   * Only set where a photograph actually shows this client's creative on one
   * of our faces. Left undefined otherwise — pairing a client name with an
   * unrelated board implies creative that isn't theirs, so those campaigns
   * render as typographic cards until real campaign photography exists.
   */
  image?: string;
};

export const campaigns: readonly Campaign[] = [
  {
    slug: "carrefour-ooh",
    client: "Carrefour",
    title: "Carrefour OOH Campaign",
    category: "Retail · Out-of-Home",
    year: 2021,
    serviceSlugs: ["outdoor-media"],
    image: "/media/sites/site-12.webp",
  },
  {
    slug: "packages-shopping-festival",
    client: "Packages Mall",
    title: "Packages Shopping Festival",
    category: "Retail · Seasonal",
    year: 2020,
    serviceSlugs: ["outdoor-media", "dooh"],
  },
  {
    slug: "packages-mall-ooh",
    client: "Packages Mall",
    title: "Packages Mall OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
  {
    slug: "metro-cash-carry-trolley",
    client: "Metro Cash & Carry",
    title: "Store Trolley Branding",
    category: "Retail · In-store",
    serviceSlugs: ["printing", "flex-printing"],
  },
  {
    slug: "igi-life-ooh",
    client: "IGI Life Insurance",
    title: "IGI Life OOH Campaign",
    category: "Financial · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
  {
    slug: "acca-ooh",
    client: "ACCA",
    title: "ACCA OOH Campaign",
    category: "Education · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
  {
    slug: "al-fateh-ooh",
    client: "Al Fatah Superstore",
    title: "Al Fatah OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
  {
    slug: "car-first-ooh",
    client: "Car First",
    title: "Car First OOH Campaign",
    category: "Automotive · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
  {
    slug: "condis-ooh",
    client: "Condis by Spain",
    title: "Condis by Spain OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
  {
    slug: "zero-carbon-solar",
    client: "Zero Carbon Solar",
    title: "Zero Electricity Bills",
    category: "Energy · Out-of-Home",
    serviceSlugs: ["outdoor-media", "flex-printing"],
    image: "/media/sites/site-17.webp",
  },
  {
    slug: "asghar-ali-perfumes",
    client: "Asghar Ali Perfumes",
    title: "Asghar Ali Perfumes",
    category: "FMCG · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
  },
];

/** Campaigns that used a given service. Powers the service-page cross-link. */
export function campaignsForService(serviceSlug: string): Campaign[] {
  return campaigns.filter((campaign) => campaign.serviceSlugs.includes(serviceSlug));
}
