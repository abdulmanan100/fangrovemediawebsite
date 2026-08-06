/**
 * Campaign portfolio — real work.
 *
 * These are the company's own campaigns, carried over during the rebrand from
 * Omelet Advertising to Fangrove Media. Each poster is a frame from that
 * campaign's own reel, so nothing here pairs a client with creative that isn't
 * theirs. Two (Carrefour, Zero Carbon Solar) come from our own site
 * photography of the same creative on the same face.
 *
 * The reels themselves are not shown. Six of them carry the old Omelet mark in
 * the top-right corner and one opens on a full-screen Omelet logo, all burnt
 * into the footage and unremovable without re-editing the films. The posters
 * are cropped 21:9 from the top for the same reason — see CampaignCard. If the
 * films are ever re-cut without the mark, add playback back.
 *
 * Deliberately a light model. The source gives client, campaign and discipline
 * — it does not give briefs, strategies or measured outcomes, and inventing
 * those for real named clients would be fabrication. `year` is set only where
 * the campaign title or the creative in the photograph states it.
 */

export type Campaign = {
  slug: string;
  client: string;
  title: string;
  /** Discipline label shown on the card. */
  category: string;
  /** Only where the source names it. Never inferred from an upload date. */
  year?: number;
  /** Slugs from content/services.ts */
  serviceSlugs: readonly string[];
  /** 21:9 poster frame in /public/media/work. */
  poster: string;
  /** What the poster frame actually shows — used for the image alt text. */
  posterAlt: string;
};

export const campaigns: readonly Campaign[] = [
  {
    slug: "packages-shopping-festival",
    client: "Packages Mall",
    title: "Packages Shopping Festival",
    category: "Retail · Seasonal",
    year: 2020,
    serviceSlugs: ["outdoor-media", "dooh"],
    poster: "/media/work/packages-shopping-festival.webp",
    posterAlt:
      "Packages Shopping Festival creative on a large-format board at Johar Town, opposite the Expo Centre, Lahore",
  },
  {
    slug: "carrefour-ooh",
    client: "Carrefour",
    title: "Carrefour OOH Campaign",
    category: "Retail · Out-of-Home",
    year: 2021,
    serviceSlugs: ["outdoor-media"],
    poster: "/media/work/carrefour-ooh.webp",
    posterAlt: "Carrefour express-delivery creative running on a Fangrove billboard in Lahore",
  },
  {
    slug: "igi-life-ooh",
    client: "IGI Life Insurance",
    title: "IGI Life OOH Campaign",
    category: "Financial · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    poster: "/media/work/igi-life-ooh.webp",
    posterAlt: "IGI Life Vitality creative on the DHA Main Boulevard hoarding, Lahore",
  },
  {
    slug: "metro-cash-carry-trolley",
    client: "Metro Cash & Carry",
    title: "Store Trolley Branding",
    category: "Retail · Activation",
    // Dated from the creative itself — the trolley carries "Electronics Gala
    // 2019, 28th Nov to 25th Dec". Not from the reel's upload date.
    year: 2019,
    serviceSlugs: ["printing", "flex-printing"],
    poster: "/media/work/metro-cash-carry-trolley.webp",
    posterAlt:
      "An oversized illuminated shopping-trolley float built for Metro Cash & Carry, on the road in Lahore",
  },
  {
    slug: "condis-ooh",
    client: "Condis by Spain",
    title: "Condis by Spain OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media", "dooh"],
    poster: "/media/work/condis-ooh.webp",
    posterAlt: "Condis by Spain creative on the Hussain Chowk LED screen, Gulberg, Lahore",
  },
  {
    slug: "packages-mall-ooh",
    client: "Packages Mall",
    title: "Packages Mall OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    poster: "/media/work/packages-mall-ooh.webp",
    posterAlt: "Packages Mall creative on a digital streamer along Jam-e-Shireen Road, Lahore",
  },
  {
    slug: "zero-carbon-solar",
    client: "Zero Carbon Solar",
    title: "Zero Electricity Bills",
    category: "Energy · Out-of-Home",
    serviceSlugs: ["outdoor-media", "flex-printing"],
    poster: "/media/work/zero-carbon-solar.webp",
    posterAlt:
      "Zero Carbon Solar “Zero Electricity Bills” creative running on a Fangrove board in Lahore",
  },
  {
    slug: "acca-ooh",
    client: "ACCA",
    title: "ACCA OOH Campaign",
    category: "Education · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    poster: "/media/work/acca-ooh.webp",
    posterAlt: "ACCA creative on a portrait board along Model Town Link Road, Lahore",
  },
  {
    slug: "car-first-ooh",
    client: "Car First",
    title: "Car First OOH Campaign",
    category: "Automotive · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    poster: "/media/work/car-first-ooh.webp",
    posterAlt: "Car First creative on a central-median board along Model Town Link Road, Lahore",
  },
  {
    slug: "asghar-ali-perfumes",
    client: "Asghar Ali Perfumes",
    title: "Asghar Ali Perfumes",
    category: "FMCG · Out-of-Home",
    serviceSlugs: ["outdoor-media", "flex-printing"],
    poster: "/media/work/asghar-ali-perfumes.webp",
    posterAlt: "Asghar Ali Perfumes creative on the Liberty hoarding, Lahore",
  },
  {
    slug: "al-fateh-ooh",
    client: "Al Fatah Superstore",
    title: "Al Fatah OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    poster: "/media/work/al-fateh-ooh.webp",
    posterAlt: "Al Fatah Superstore creative on the Wapda Town roundabout board, Lahore",
  },
];

/** Campaigns that used a given service. Powers the service-page cross-link. */
export function campaignsForService(serviceSlug: string): Campaign[] {
  return campaigns.filter((campaign) => campaign.serviceSlugs.includes(serviceSlug));
}

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((campaign) => campaign.slug === slug);
}

export const totalCampaigns = campaigns.length;
