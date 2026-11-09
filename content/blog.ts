/**
 * The journal: every post's metadata. Bodies live beside this file in
 * content/blog/<slug>.mdx.
 *
 * Everything else is derived from this list: the /blog index, sitemap
 * entries, the RSS feed, llms.txt, structured data, and the "Further reading"
 * links on service and site pages.
 *
 * The same rule as content/work.ts and content/rates.ts applies to the
 * writing: nothing goes in a post that the site's own data cannot back up.
 * Where a figure exists in content/ (sizes, audiences, specs), pull it from
 * there, either here in a template string or through the MDX components in
 * components/blog/, so a post can never contradict the network page.
 *
 * Publishing: a post is written as `status: "draft"`. Drafts show in
 * `npm run dev` and on Vercel preview deploys, carry `noindex`, and are left
 * out of every production build. To publish, set `status: "published"` and
 * set `published` to the real date it goes live.
 */

import {
  areaBreakdown,
  digitalScreens,
  largestFace,
  sites,
  totalSites,
  type Format,
} from "@/content/sites";
import { compactNumber, dimensions } from "@/lib/format";

/* ── Authors ───────────────────────────────────────────────────────────── */

export type Author = {
  name: string;
  /** "Organization" until real people are added. Drives the schema type. */
  kind: "Organization" | "Person";
  role?: string;
  /** Root-relative profile page on this site. */
  url: string;
  /** Profiles elsewhere (LinkedIn etc). Strengthens a Person's identity. */
  sameAs?: readonly string[];
};

/**
 * To credit a real person, add an entry with `kind: "Person"`, their role and
 * LinkedIn under `sameAs`, then set `author` on their posts. The byline and
 * the BlogPosting schema both follow.
 */
export const authors = {
  editorial: {
    name: "Fangrove Media Editorial",
    kind: "Organization",
    url: "/about",
  },
} as const satisfies Record<string, Author>;

export type AuthorKey = keyof typeof authors;

/* ── Posts ─────────────────────────────────────────────────────────────── */

export const CATEGORIES = ["Guides", "Formats", "Planning", "Print"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  /** The H1. Phrased the way people search or ask. */
  title: string;
  /** Search title, when the H1 runs past the ~60 characters a result shows. */
  metaTitle?: string;
  /** ~155 characters. Meta description and card copy. */
  description: string;
  /**
   * 40–60 words that answer the title outright. Shown first on the page as
   * "In short": the passage search snippets and AI answers lift.
   */
  summary: string;
  category: Category;
  status: "draft" | "published";
  /** ISO date (YYYY-MM-DD). Set to the real day it goes live. */
  published: string;
  /** ISO date of the last substantive edit. Shown on the page. */
  updated?: string;
  author: AuthorKey;
  /** Services the post is about. Linked both ways. */
  serviceSlugs: readonly string[];
  /** Sites the post discusses by name. Listed under the post, and linked back. */
  siteIds?: readonly string[];
  /** Also link back from every site of these formats. */
  formats?: readonly Format[];
  /** Also link back from every site page. For estate-wide guides. */
  allSites?: boolean;
  faq: readonly Faq[];
};

/* Derived figures the copy below quotes. Never typed in as literals. */

/** "40 × 15 to 90 × 30 ft": smallest to largest face of a format, by area. */
function sizeRange(format: Format): string {
  const list = sites
    .filter((site) => site.format === format)
    .sort((a, b) => a.widthFt * a.heightFt - b.widthFt * b.heightFt);
  const first = list[0];
  const last = list[list.length - 1];
  if (!first || !last) return "";
  const low = dimensions(first.widthFt, first.heightFt);
  const high = dimensions(last.widthFt, last.heightFt);
  return low === high ? low : `${low.replace(" ft", "")} to ${high}`;
}

const topSite = [...sites].sort((a, b) => b.dailyImpressions - a.dailyImpressions)[0]!;
const areaCount = areaBreakdown().length;
const largest = dimensions(largestFace.widthFt, largestFace.heightFt);

export const posts: readonly Post[] = [
  {
    slug: "billboard-advertising-rates-lahore",
    title: "What decides billboard rates in Lahore?",
    metaTitle: "Billboard advertising rates in Lahore: what sets the price",
    description:
      "Billboard rates in Lahore turn on audience, face size, lighting, booking cycle and share of voice. How each one moves the price, and what to send for a same-day quote.",
    summary:
      "A billboard rate in Lahore comes down to five things: the daily audience the site carries, the size of the face, whether it is lit, how many booking cycles you take, and, on a digital screen, your share of the loop. Fangrove Media quotes static sites per monthly cycle, starting on the 1st or the 16th.",
    category: "Planning",
    status: "draft",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "dooh"],
    faq: [
      {
        q: "Does Fangrove Media publish billboard prices?",
        a: "Not as fixed figures. Every site's size, lighting, direction of approach and daily audience is published on its own page, and the rate is quoted per booking cycle on request, usually the same day by WhatsApp or phone.",
      },
      {
        q: "How long is a billboard booking in Lahore?",
        a: "Static sites are booked by the month, in cycles that start on the 1st or the 16th. One month and six months are priced differently, so say how many cycles you want when you ask.",
      },
      {
        q: "Does a lit billboard cost more than a non-lit one?",
        a: "Yes, because you are buying more hours. A non-lit hoarding in Lahore is roughly a twelve-hour medium in December, while a front-lit or back-lit face keeps working through the evening commute.",
      },
      {
        q: "How is pricing different on a digital (SMD) screen?",
        a: "On a digital screen you buy slots in a loop, not a whole face. Fangrove Media's loops run 80 seconds with at most ten advertisers and 8-second slots as standard, and the cost per thousand impressions is stated before you sign.",
      },
      {
        q: "What should I send to get a billboard quote?",
        a: "Three things: the site reference (or just the road or area you want), the cycle you want to start in, and how many cycles. With those, a rate can usually come back the same day.",
      },
    ],
  },

  {
    slug: "dooh-vs-static-billboards",
    title: "DOOH vs static billboards: which should you buy?",
    metaTitle: "DOOH vs static billboards in Lahore: which to buy",
    description:
      "A digital screen sells slots in a loop; a static billboard sells a whole face for a month. How the two differ on flexibility, proof and creative, and when each one wins.",
    summary:
      "Buy a static billboard when one message should own a face around the clock for a month or more. Buy digital out-of-home (DOOH) when you need to change creative quickly, run different messages by time of day, or want timestamped proof of play. On a screen you share an 80-second loop with up to nine other advertisers.",
    category: "Formats",
    status: "draft",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["dooh", "outdoor-media", "flex-printing"],
    siteIds: ["lhr-hussain-led", "lhr-modeltown-digital-streamers", "lhr-modeltown-linkrd-market"],
    formats: ["Digital LED"],
    faq: [
      {
        q: "How many times an hour does an ad play on a digital screen?",
        a: "With an 80-second loop and an 8-second slot, your spot plays once per loop: roughly forty-five times an hour.",
      },
      {
        q: "How fast can creative change on a DOOH screen?",
        a: "New creative goes live within four working hours of approval, and a spot can be pulled or replaced within two hours if it has to be.",
      },
      {
        q: "What file format do digital billboards need?",
        a: "MP4 or JPG at the screen's native resolution, no larger than 40 MB.",
      },
      {
        q: "How do I know my ad actually ran?",
        a: "Digital screens come with a weekly timestamped play log and a monthly impression summary. Static faces come with a dated photograph of every mount.",
      },
      {
        q: "Is an SMD screen the same as an LED billboard?",
        a: "Yes. In Lahore, “SMD screen” is the everyday name for the outdoor LED screens at junctions. Fangrove Media's are P6 to P10 pixel pitch, rated for outdoor use.",
      },
    ],
  },

  {
    slug: "best-billboard-locations-lahore",
    title: "Where are the best billboard locations in Lahore?",
    metaTitle: "Best billboard locations in Lahore, by road and area",
    description:
      "Lahore's strongest outdoor corridors (Gulberg, Canal Road, Mall Road, Model Town, DHA and more) with the published size and daily audience of every site on them.",
    summary:
      "The strongest billboard locations in Lahore sit on slow, heavily used commuter routes that the same people pass twice a day: Main Boulevard and Hussain Chowk in Gulberg, MM Alam Road, the Canal Road bridges and underpasses, Mall Road, Jail Road, Ferozepur Road and the Model Town roundabouts. Which is best depends on whom you need to reach.",
    category: "Guides",
    status: "draft",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "dooh"],
    allSites: true,
    faq: [
      {
        q: "Which billboard site in Lahore has the highest daily audience?",
        a: `On Fangrove Media's network it is ${topSite.name} in ${topSite.area}, at about ${compactNumber(topSite.dailyImpressions)} a day. Every site's figure is published on its own page.`,
      },
      {
        q: "How many billboard sites does Fangrove Media have in Lahore?",
        a: `${totalSites} sites across ${areaCount} areas of Lahore, ${digitalScreens} of them digital LED screens. All are owned and operated by Fangrove Media rather than resold.`,
      },
      {
        q: "Does the direction a billboard faces matter?",
        a: "A great deal. A face is only seen by the traffic driving towards it, so a site on a busy road can still miss your audience if it faces the wrong way. Each site page records its direction of approach.",
      },
      {
        q: "Can I see a billboard site before booking it?",
        a: "Yes. Each site has its own page with a photograph, dimensions, lighting, direction of approach and a map pin you can open in Google Maps.",
      },
    ],
  },

  {
    slug: "billboard-sizes-pakistan",
    title: "Billboard sizes in Pakistan: a format-by-format guide",
    description:
      "Billboard, bridge panel, underpass, LED screen, streamer, moppie and cutout sizes, with the real dimensions of every face on Fangrove Media's Lahore network.",
    summary: `There is no single standard billboard size in Pakistan. On Fangrove Media's Lahore network, roadside billboards run from ${sizeRange("Billboard")}, bridge panels are ${sizeRange("Bridge Panel")}, underpass panels ${sizeRange("Underpass")}, and LED screens range from ${sizeRange("Digital LED")}. Streamers, moppies and cutouts are smaller street-level formats sold in runs.`,
    category: "Formats",
    status: "draft",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "flex-printing", "dooh"],
    siteIds: [largestFace.id],
    allSites: true,
    faq: [
      {
        q: "What is the standard billboard size in Pakistan?",
        a: `There isn't one. Sizes follow the structure and the plot it stands on. On Fangrove Media's Lahore network, billboards run from ${sizeRange("Billboard")}.`,
      },
      {
        q: "What is the largest billboard on Fangrove Media's network?",
        a: `${largestFace.name}: a ${largest} ${largestFace.format.toLowerCase()} in ${largestFace.area}.`,
      },
      {
        q: "What size is a bridge panel billboard?",
        a: `On Fangrove Media's network, bridge panels are ${sizeRange("Bridge Panel")} and underpass panels are ${sizeRange("Underpass")}. Both are long, shallow faces read head-on by approaching traffic.`,
      },
      {
        q: "What resolution should billboard artwork be?",
        a: "Build the file at 1:10 scale, in CMYK, at 150 dpi at that scale. The print itself runs at 360 to 1440 dpi, set by how far away the face is read from.",
      },
      {
        q: "Can a very large billboard be printed in one piece?",
        a: "Flex prints up to 16 ft wide without a seam. Wider faces are made from welded panels, which is standard for large-format work.",
      },
    ],
  },

  {
    slug: "star-flex-printing-guide",
    title: "Star flex printing for billboards: gsm, lighting and artwork",
    metaTitle: "Star flex printing for billboards: a buyer's guide",
    description:
      "Which flex gsm to use, how front-lit, backlit, mesh and vinyl differ, and how to set up billboard artwork that reads from thirty metres away. From Fangrove Media's print floor.",
    summary:
      "Billboard flex at Fangrove Media is star flex between 440 and 650 gsm, heavier where wind load is real. Backlit stock is for internally lit boxes, mesh for exposed structures and building wraps, and vinyl for glass and curved surfaces. Supply artwork at 1:10 scale, CMYK, 150 dpi at scale, and proof it under the light it will hang in.",
    category: "Print",
    status: "draft",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["flex-printing", "outdoor-media", "printing"],
    faq: [
      {
        q: "What gsm flex is used for billboards?",
        a: "Star flex between 440 and 650 gsm. The heavier end is used where the structure takes real wind load.",
      },
      {
        q: "What is the difference between front-lit and backlit flex?",
        a: "Front-lit flex is lit from outside by lamps aimed at the face. Backlit flex is a translucent stock, printed at higher ink density, for boxes lit from inside.",
      },
      {
        q: "How long does billboard flex last outdoors?",
        a: "Fangrove Media prints with eco-solvent and solvent inks rated UV-stable for 24 months.",
      },
      {
        q: "How quickly can flex be printed and mounted?",
        a: "Printing takes about 24 hours, and mounting can follow the same night. For a booked site, artwork is due 72 hours before the mount.",
      },
      {
        q: "Why does my billboard colour look different from the screen proof?",
        a: "Usually because it was approved on a bright monitor and hung on a front-lit face. A red that looks vivid on screen can go muddy under street lighting, which is why proofs should be judged against the light the face will live under.",
      },
    ],
  },

  {
    slug: "how-to-book-a-billboard-lahore",
    title: "How to book a billboard in Lahore: step by step",
    description:
      "From choosing a site to proof that it ran: how billboard booking works in Lahore, with cycles, artwork deadlines, printing, overnight mounting, permits and verification.",
    summary:
      "To book a billboard in Lahore with Fangrove Media, choose a site (or just name a road), pick a start cycle, either the 1st or the 16th, and a number of months, then confirm. Artwork is due 72 hours before the mount, flex is printed on our own floor, crews mount overnight, and you receive a dated photograph of every face.",
    category: "Planning",
    status: "draft",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "flex-printing", "dooh"],
    faq: [
      {
        q: "When can a billboard campaign start?",
        a: "Static sites start on the 1st or the 16th of the month and run in monthly cycles.",
      },
      {
        q: "When is billboard artwork due?",
        a: "72 hours before the mount. Files are checked against the face size and its lighting before anything is printed.",
      },
      {
        q: "Do I need a permit to put up a billboard in Lahore?",
        a: "Outdoor advertising in Lahore is regulated, by the PHA and, in cantonment areas, by the cantonment authorities. On Fangrove Media's sites that paperwork is handled end to end, so the advertiser does not apply for it.",
      },
      {
        q: "What proof do I get that my billboard went up?",
        a: "A dated photograph of every static face, and a weekly play log for every screen. If it did not run, you do not pay for it.",
      },
      {
        q: "Can I book digital screens the same way?",
        a: "Yes, through the same enquiry. Digital is bought as slots in a loop rather than a whole face, and creative goes live within four working hours of approval.",
      },
    ],
  },
];

/* ── Queries ───────────────────────────────────────────────────────────── */

/**
 * Drafts are shown in development and on Vercel preview deploys, never in a
 * production build. BLOG_DRAFTS=show or BLOG_DRAFTS=hide overrides that,
 * e.g. to review drafts from a local production build.
 */
export const showDrafts =
  process.env.BLOG_DRAFTS != null
    ? process.env.BLOG_DRAFTS === "show"
    : process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

const newestFirst = (a: Post, b: Post) => b.published.localeCompare(a.published);

/** Published posts only. What the sitemap, feed and llms.txt list. */
export function publishedPosts(): Post[] {
  return posts.filter((post) => post.status === "published").sort(newestFirst);
}

/** What the site renders: published posts, plus drafts where showDrafts allows. */
export function visiblePosts(): Post[] {
  return posts.filter((post) => post.status === "published" || showDrafts).sort(newestFirst);
}

export function getPost(slug: string): Post | undefined {
  return visiblePosts().find((post) => post.slug === slug);
}

/** Date of the last substantive change. */
export function lastModified(post: Post): string {
  return post.updated ?? post.published;
}

export function postsForService(slug: string, limit = 3): Post[] {
  return visiblePosts()
    .filter((post) => post.serviceSlugs.includes(slug))
    .sort((a, b) => a.serviceSlugs.indexOf(slug) - b.serviceSlugs.indexOf(slug))
    .slice(0, limit);
}

/** Posts naming the site first, then format matches, then estate-wide guides. */
export function postsForSite(site: { id: string; format: Format }, limit = 3): Post[] {
  const rank = (post: Post) =>
    post.siteIds?.includes(site.id) ? 0 : post.formats?.includes(site.format) ? 1 : post.allSites ? 2 : 3;

  return visiblePosts()
    .filter((post) => rank(post) < 3)
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, limit);
}

/** Same category first, then the most shared services. */
export function relatedPosts(post: Post, limit = 3): Post[] {
  const score = (other: Post) =>
    (other.category === post.category ? 2 : 0) +
    other.serviceSlugs.filter((slug) => post.serviceSlugs.includes(slug)).length;

  return visiblePosts()
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}
