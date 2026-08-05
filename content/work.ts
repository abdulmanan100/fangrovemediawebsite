/**
 * Campaign portfolio — real work, and every entry is a film.
 *
 * These are the company's own campaign reels, carried over during the rebrand
 * from Omelet Advertising to Fangrove Media. Each one is a published YouTube
 * video; `youtubeId` is the canonical source and `poster` is a frame lifted
 * from that same campaign, so nothing here pairs a client with creative that
 * isn't theirs.
 *
 * Two posters (Carrefour, Zero Carbon Solar) come from our own site
 * photography rather than a video frame — the reels only offer a 640px
 * letterboxed still for those, and our shot of the same creative on the same
 * face is sharper.
 *
 * Deliberately a light model. The source gives client, campaign and discipline
 * — it does not give briefs, strategies or measured outcomes, and inventing
 * those for real named clients would be fabrication. `year` is set only where
 * the campaign title itself states it.
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
  /** YouTube video ID. Drives the player and the VideoObject schema. */
  youtubeId: string;
  /**
   * ISO date the reel was published to YouTube. VideoObject requires it. It is
   * when the film went up, not when the campaign ran, so it never feeds copy.
   */
  uploaded: string;
  /** 16:9 poster frame in /public/media/work. */
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
    youtubeId: "7UDmdtTGXJs",
    uploaded: "2021-01-07",
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
    youtubeId: "vDmk15Meh0o",
    uploaded: "2021-01-07",
    poster: "/media/work/carrefour-ooh.webp",
    posterAlt: "Carrefour express-delivery creative running on a Fangrove billboard in Lahore",
  },
  {
    slug: "igi-life-ooh",
    client: "IGI Life Insurance",
    title: "IGI Life OOH Campaign",
    category: "Financial · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    youtubeId: "BvHdqUTIaUs",
    uploaded: "2021-06-14",
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
    youtubeId: "borOLmcHJ9Q",
    uploaded: "2020-11-03",
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
    youtubeId: "WBMc4ZKZx7E",
    uploaded: "2020-10-31",
    poster: "/media/work/condis-ooh.webp",
    posterAlt: "Condis by Spain creative on the Hussain Chowk LED screen, Gulberg, Lahore",
  },
  {
    slug: "packages-mall-ooh",
    client: "Packages Mall",
    title: "Packages Mall OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    youtubeId: "VEh5s57c6Yk",
    uploaded: "2020-10-31",
    poster: "/media/work/packages-mall-ooh.webp",
    posterAlt: "Packages Mall creative on a digital streamer along Jam-e-Shireen Road, Lahore",
  },
  {
    slug: "zero-carbon-solar",
    client: "Zero Carbon Solar",
    title: "Zero Electricity Bills",
    category: "Energy · Out-of-Home",
    serviceSlugs: ["outdoor-media", "flex-printing"],
    youtubeId: "MecCW7sopBo",
    uploaded: "2021-08-17",
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
    youtubeId: "F5RveF-J80U",
    uploaded: "2020-10-31",
    poster: "/media/work/acca-ooh.webp",
    posterAlt: "ACCA creative on a portrait board along Model Town Link Road, Lahore",
  },
  {
    slug: "car-first-ooh",
    client: "Car First",
    title: "Car First OOH Campaign",
    category: "Automotive · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    youtubeId: "MYEvUZMM8CE",
    uploaded: "2020-10-31",
    poster: "/media/work/car-first-ooh.webp",
    posterAlt: "Car First creative on a central-median board along Model Town Link Road, Lahore",
  },
  {
    slug: "asghar-ali-perfumes",
    client: "Asghar Ali Perfumes",
    title: "Asghar Ali Perfumes",
    category: "FMCG · Out-of-Home",
    serviceSlugs: ["outdoor-media", "flex-printing"],
    youtubeId: "a7Vz0q-_yE0",
    uploaded: "2021-08-17",
    poster: "/media/work/asghar-ali-perfumes.webp",
    posterAlt: "Asghar Ali Perfumes creative on the Liberty hoarding, Lahore",
  },
  {
    slug: "al-fateh-ooh",
    client: "Al Fatah Superstore",
    title: "Al Fatah OOH Campaign",
    category: "Retail · Out-of-Home",
    serviceSlugs: ["outdoor-media"],
    youtubeId: "5bYEcOJGQBM",
    uploaded: "2020-10-31",
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

export const totalFilms = campaigns.length;
