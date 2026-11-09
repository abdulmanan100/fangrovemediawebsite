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
import { company } from "@/content/company";

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
    slug: "best-billboard-company-lahore",
    title: "The best billboard company in Lahore: how to choose one",
    metaTitle: "Best billboard company in Lahore: how to choose",
    description:
      "How to choose the best billboard or outdoor media company in Lahore: ownership, published audiences, print, permits, proof of every face, and a shortlist checklist.",
    summary:
      "The best billboard company in Lahore is the one whose faces stand on the roads your customers drive and which can prove every face ran. Look for a company that owns its structures, publishes each site's daily audience, approach and lighting, prints and mounts in-house, handles PHA permits, and gives a dated photograph of every face.",
    category: "Guides",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "dooh", "flex-printing"],
    allSites: true,
    faq: [
      {
        q: "Which is the best billboard company in Lahore?",
        a: `It depends on where your customers drive and what proof you need. Compare companies on ownership, published audience per site, in-house printing and mounting, permits and proof of every face. Fangrove Media owns ${totalSites} sites across ${areaCount} areas of Lahore and publishes each one's size, lighting, approach and daily audience.`,
      },
      {
        q: "What is the difference between a billboard owner and an advertising agency?",
        a: "A billboard owner builds and maintains its own structures; an agency or reseller sells space on structures owned by others. Buying from an owner means one company is responsible for the face, print, crew and permits.",
      },
      {
        q: "How do I check a billboard company is reliable?",
        a: "Ask for the daily audience of each site, photographs of the actual faces, who prints and mounts, who handles permits, and whether you will receive a dated photograph of every face. Ask to see real campaigns on their own boards.",
      },
      {
        q: "Who handles billboard permits in Lahore?",
        a: "On an owned site, the company should. Fangrove Media handles PHA and cantonment paperwork for its own sites end to end, so the advertiser never applies for it.",
      },
      {
        q: "How quickly can a billboard company give a quote?",
        a: "With the site (or road), the start cycle and the number of cycles, Fangrove Media can usually return a rate the same day by WhatsApp or phone.",
      },
    ],
  },

  {
    slug: "best-media-company-lahore",
    title: "The best media company in Lahore: how to choose an agency",
    metaTitle: "Best media company in Lahore: how to choose an agency",
    description:
      "How to choose the best media or advertising agency in Lahore: owner vs agency, which media they buy, line-by-line plans, proof for every placement, and a checklist.",
    summary:
      "The best media company in Lahore plans your budget across the right media, buys good positions and proves every placement ran. Check what kind of company it is, which media it buys directly, whether it shows the plan line by line, and whether it supplies photographs, play logs, transmission logs and tear sheets for everything it bought.",
    category: "Planning",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["media-campaigns", "electronic-media", "print-media"],
    faq: [
      {
        q: "Which is the best media company in Lahore?",
        a: `The best one for you buys the media your brief needs, shows the plan line by line and proves every placement ran. Fangrove Media has worked with brands since ${company.founded}, owns its outdoor sites in Lahore, and plans and buys TV, radio, cinema and press across Pakistan.`,
      },
      {
        q: "What is the difference between a media agency and an advertising agency?",
        a: "A creative or advertising agency makes the advertising; a media agency decides where it runs and buys the space and airtime. Some companies, including Fangrove Media, combine media buying with owned media and production.",
      },
      {
        q: "What should a media agency report after a campaign?",
        a: "Proof for every placement: dated photographs of outdoor faces, play logs for digital screens, transmission log reconciliation for TV and radio, and tear sheets for press.",
      },
      {
        q: "Do I need an agency that covers all media?",
        a: "Only if the brief needs them. A good agency recommends media by the job each one does, and will say when two billboards will do more than a spread across six media.",
      },
      {
        q: "Does Fangrove Media work outside Lahore?",
        a: `Its owned outdoor estate is in Lahore. Campaigns are planned and bought across ${company.stats.marketsCovered.join(", ")}, with broadcast and national press across Pakistan.`,
      },
    ],
  },

  {
    slug: "what-is-outdoor-media",
    title: "What is outdoor media? A guide to OOH advertising in Pakistan",
    metaTitle: "What is outdoor media? OOH advertising in Pakistan",
    description:
      "Outdoor media explained: billboards, hoardings, bridge panels, SMD screens and streamers, how each is bought in Pakistan, and where outdoor fits in a campaign.",
    summary:
      "Outdoor media, also called out-of-home or OOH, is advertising people see outside the home: billboards, hoardings, bridge and underpass panels, digital screens and runs of streamers or cutouts. It works through repetition on the roads people travel daily. Printed faces are rented by the month; digital screens are bought as slots in a loop.",
    category: "Formats",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "dooh", "media-campaigns"],
    allSites: true,
    faq: [
      {
        q: "What is outdoor media?",
        a: "Outdoor media is paid advertising in public space: billboards, hoardings, unipoles, bridge and underpass panels, digital LED screens, streamers, pole panels and cutouts. It is also called out-of-home (OOH) advertising.",
      },
      {
        q: "What is the difference between OOH and DOOH?",
        a: "OOH (out-of-home) covers all outdoor advertising. DOOH (digital out-of-home) is the screen-based part of it: LED or SMD screens that play a rotating loop of advertisers instead of one printed face.",
      },
      {
        q: "How is outdoor advertising bought in Pakistan?",
        a: "Static faces such as billboards are rented by the month; on Fangrove Media's sites cycles start on the 1st or the 16th. Digital screens are bought as slots in a loop. Small formats such as streamers are sold as runs of many units.",
      },
      {
        q: "Is a hoarding the same as a billboard?",
        a: "In Pakistan the words are used almost interchangeably for large roadside advertising faces. Panaflex, or flex, is the printed material the face is made of rather than a separate format.",
      },
      {
        q: "Who owns outdoor media in Lahore?",
        a: "Some companies own and maintain their own structures; others resell space on structures owned by someone else. Fangrove Media owns its sites in Lahore and prints and mounts the faces itself.",
      },
    ],
  },

  {
    slug: "is-billboard-advertising-worth-it",
    title: "Is billboard advertising worth it? An honest answer",
    metaTitle: "Is billboard advertising worth it? An honest answer",
    description:
      "When billboards pay off and when they don't: what outdoor does well, what it can't do, which businesses it suits, and five checks that remove most of the risk.",
    summary:
      "Billboard advertising is worth it when your audience drives past the same place often and your message can be read in one glance. It is a poor buy when you need an instant click or the site was chosen on price. Most risk is removed by checking each site's daily audience, approach and lighting, and paying only for proven delivery.",
    category: "Guides",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "media-campaigns"],
    faq: [
      {
        q: "Does billboard advertising still work?",
        a: "Yes, when the site is right. A billboard reaches everyone on the road, cannot be skipped or blocked, and builds frequency because commuters pass the same face twice a day. It fails mostly when the site faces the wrong traffic or the message is too long to read at a glance.",
      },
      {
        q: "What kind of business benefits most from billboards?",
        a: "Businesses whose customers live or travel in a defined part of the city: retailers, malls, restaurants, car showrooms, real estate, schools, universities and hospitals. National brands use billboards as the frequency layer under TV and digital.",
      },
      {
        q: "What are the disadvantages of billboard advertising?",
        a: "No click-through, room for only a short message, lead time for printed faces (artwork is due 72 hours before the mount), and the risk of a poorly chosen site.",
      },
      {
        q: "How long should a billboard run?",
        a: "Outdoor works through repetition, so one cycle on one face rarely shows what the medium can do. Static faces are booked in monthly cycles from the 1st or the 16th.",
      },
    ],
  },

  {
    slug: "smd-screen-advertising-lahore",
    title: "SMD screen advertising in Lahore: how it works",
    metaTitle: "SMD screen advertising in Lahore: how it works",
    description:
      "How SMD and LED screen advertising works in Lahore: loops and slots, pixel pitch, where the screens are, what creative to supply, dayparting and play-log proof.",
    summary:
      "SMD screen advertising means buying slots in the loop of an outdoor LED screen. In Lahore, Fangrove Media's screens run an 80-second loop with at most ten advertisers and 8-second slots as standard. Creative is a file, not a print, so it can change by time of day and go live within four working hours, with a weekly play log as proof.",
    category: "Formats",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["dooh", "media-campaigns"],
    siteIds: ["lhr-hussain-led", "lhr-modeltown-digital-streamers", "lhr-modeltown-linkrd-market"],
    formats: ["Digital LED"],
    faq: [
      {
        q: "What is an SMD screen?",
        a: "An outdoor LED screen built from surface-mounted (SMD) LEDs. In Lahore, SMD screen has become the everyday name for any roadside digital billboard.",
      },
      {
        q: "How long is an ad slot on an SMD screen?",
        a: "On Fangrove Media's screens, 8 seconds is standard, with 10 and 15-second slots available, in an 80-second loop shared by at most ten advertisers.",
      },
      {
        q: "What file format do SMD screens need?",
        a: "MP4 or JPG at the screen's native resolution, no larger than 40 MB. Roadside screens are silent, so the creative should work without sound.",
      },
      {
        q: "How quickly can an ad go live on an SMD screen?",
        a: "Within four working hours of approval, and creative can be pulled or replaced within two hours in an emergency.",
      },
      {
        q: "Where are SMD screens in Lahore?",
        a: "Fangrove Media's digital sites are the large LED screen at Hussain Chowk in Gulberg and digital streamers on Model Town Main Boulevard and at the Model Town Link Road commercial market.",
      },
    ],
  },

  {
    slug: "billboard-design-tips",
    title: "How to design a billboard that reads from the road",
    metaTitle: "Billboard design: how to make artwork that reads",
    description:
      "Billboard design rules for Lahore roads: one idea, few words, a big brand name, contrast that survives the lighting, and the 1:10 CMYK file setup printers need.",
    summary:
      "A billboard is read in a glance, often while driving, so design it around one idea, very few words, a brand name large enough to read from the road and strong contrast that works under the face's lighting at night. Build the file for the exact face, at 1:10 scale in CMYK at 150 dpi, and deliver it 72 hours before the mount.",
    category: "Guides",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "flex-printing", "dooh"],
    allSites: true,
    faq: [
      {
        q: "How many words should a billboard have?",
        a: "As few as possible: a short headline and the brand name is usually enough. A driver has seconds, and a billboard carries one message well and three badly.",
      },
      {
        q: "What resolution should billboard artwork be?",
        a: "For Fangrove Media's flex printing, build the file at 1:10 scale, in CMYK, at 150 dpi at that scale.",
      },
      {
        q: "Does lighting affect billboard design?",
        a: "Yes. Front-lit and back-lit faces render colour and dark areas differently, so colour should be proofed against the lighting the face will have. Non-lit faces are not seen after dark.",
      },
      {
        q: "Can one design work on every billboard size?",
        a: "Not without adapting it. Faces range from wide landscape boards to tall portrait faces, so design a master layout and rebuild it for each face's proportions rather than stretching one file.",
      },
    ],
  },

  {
    slug: "360-media-campaign-pakistan",
    title: "What is a 360 media campaign, and when do you need one?",
    metaTitle: "360 media campaigns in Pakistan: how to plan one",
    description:
      "A 360 media campaign runs one message across billboards, digital screens, TV, radio and press. What each medium does, when it's worth it, and how to plan one.",
    summary:
      "A 360 media campaign runs one message across several media, typically billboards and digital screens, TV, radio and newspapers, so the same audience meets it through the day. In Pakistan it suits launches, national audiences and long decisions. Give each medium one job, sequence them to the launch date, cost every line, and get proof that each placement ran.",
    category: "Planning",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["media-campaigns", "electronic-media", "outdoor-media"],
    faq: [
      {
        q: "What is a 360 campaign in advertising?",
        a: "A campaign that carries one idea across several media at once, such as outdoor, digital screens, television, radio, press and online, planned so the media support each other rather than being bought separately.",
      },
      {
        q: "Do small businesses need a 360 campaign?",
        a: "Usually not. If the audience lives in one part of one city and the message is simple, two or three well-chosen billboards may do more than a thin spread across many media.",
      },
      {
        q: "Which media work best together?",
        a: "Outdoor and radio pair naturally because they reach the same commute. Television adds national reach, digital screens let messages change by time of day, and press adds authority with decision-makers.",
      },
      {
        q: "How far ahead should a 360 campaign be planned?",
        a: "Work back from the launch date using the longest lead time. On Fangrove Media campaigns, TV needs 10 working days from brief to first air, press bookings close 48 hours before publication, and billboard artwork is due 72 hours before the mount.",
      },
    ],
  },

  {
    slug: "media-buying-pakistan",
    title: "How media buying works in Pakistan",
    metaTitle: "Media buying in Pakistan: how each medium is bought",
    description:
      "How billboards, digital screens, TV, radio and newspapers are bought in Pakistan, what to ask a media buying agency, and where money leaks out of media budgets.",
    summary:
      "Media buying in Pakistan works differently by medium: billboards are rented in monthly cycles, digital screens sold as slots in a loop, TV and radio bought by time belt and reconciled against transmission logs, and newspapers bought by insertion and page position with tear-sheet proof. A good buyer negotiates the position and proves every placement ran.",
    category: "Planning",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["media-campaigns", "electronic-media", "print-media"],
    faq: [
      {
        q: "What does a media buying agency do?",
        a: "It secures advertising space and airtime at the right price and position, books it, and checks afterwards that every placement ran as bought, recovering anything that did not.",
      },
      {
        q: "What is the difference between media planning and media buying?",
        a: "Planning decides which media, sites, channels and timing to use. Buying turns the plan into booked placements, negotiates rates and positions, and reconciles what ran.",
      },
      {
        q: "What is log reconciliation in TV advertising?",
        a: "Checking every booked spot against the channel's transmission log. Spots that did not run in the belt they were bought in should be recovered as make-goods.",
      },
      {
        q: "What is a tear sheet?",
        a: "Proof of a newspaper advertisement as it actually appeared in print. Fangrove Media supplies a scanned tear sheet within 48 hours of each insertion.",
      },
      {
        q: "Should I buy outdoor media from an owner or a reseller?",
        a: "An owner builds and maintains its own structures, so one company is responsible for the face, print, crew and permits. A reseller depends on another company to fix problems.",
      },
    ],
  },

  {
    slug: "billboard-campaign-examples-lahore",
    title: "Billboard campaign examples from Lahore",
    metaTitle: "Billboard campaign examples from Lahore",
    description:
      "Real billboard and digital screen campaigns from Lahore roads, for Carrefour, Packages Mall, Al Fatah, IGI Life, ACCA, Car First and more, and what they share.",
    summary:
      "These are real campaigns that ran on Fangrove Media's billboards and screens in Lahore, for Carrefour, Al Fatah, Condis by Spain, Packages Mall, IGI Life, ACCA, Car First, Zero Carbon Solar, Asghar Ali Perfumes and Metro Cash & Carry. What they share: one message per face, sites chosen for the audience, and static and digital used together where the message changed.",
    category: "Guides",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "media-campaigns", "dooh"],
    siteIds: ["lhr-hussain-led"],
    faq: [
      {
        q: "Which brands advertise on billboards in Lahore?",
        a: "Campaigns on Fangrove Media's network include Carrefour, Packages Mall, Metro Cash & Carry, IGI Life, ACCA, Al Fatah, Car First, Condis by Spain, Zero Carbon Solar and Asghar Ali Perfumes.",
      },
      {
        q: "What makes a good billboard campaign?",
        a: "One message per face that can be read at a glance, sites chosen because the target audience passes them, and proof that every face ran.",
      },
      {
        q: "Can billboards and digital screens be used in the same campaign?",
        a: "Yes. Campaigns such as the Packages Shopping Festival and Condis by Spain ran on both static and digital faces; screens suit messages that need to change.",
      },
      {
        q: "Where can I see more billboard campaigns?",
        a: "The work page on fangrovemedia.org shows each campaign as it ran, and the network map shows every site with its photograph, size and daily audience.",
      },
    ],
  },

  {
    slug: "measure-billboard-campaign",
    title: "How to measure a billboard campaign",
    metaTitle: "How to measure billboard advertising results",
    description:
      "Measure billboard advertising in two parts: proof it ran (photos, play logs, audience figures) and response (dedicated numbers, offer codes, before-and-after baselines).",
    summary:
      "Measure a billboard campaign in two parts. Delivery: the site's published daily audience, a dated photograph of every face and a play log for every screen. Response: a dedicated phone or WhatsApp number, an offer code, or a before-and-after baseline of enquiries, searches and footfall. Set up the response measure before the board goes up.",
    category: "Planning",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "media-campaigns", "dooh"],
    allSites: true,
    faq: [
      {
        q: "How do you measure billboard ROI?",
        a: "Compare the campaign's cost with the response it produced, counted through a dedicated phone or WhatsApp number, an offer code, or a before-and-after baseline of enquiries, searches, footfall or sales.",
      },
      {
        q: "How are billboard impressions calculated?",
        a: "From the number of people who pass the face each day, multiplied across the faces and days booked. Fangrove Media publishes the daily audience for every site, and campaign plans show the impression model line by line.",
      },
      {
        q: "How do I know my billboard actually went up?",
        a: "Ask for a dated photograph of every static face and a play log for every digital screen. On Fangrove Media campaigns, if a placement did not run, you do not pay for it.",
      },
      {
        q: "How long before billboard results show?",
        a: "Outdoor works through repetition, so judge it over the whole run rather than the first weeks, and allow for longer delays on considered purchases such as cars, property or education.",
      },
    ],
  },

  {
    slug: "billboard-advertising-gulberg-lahore",
    title: "Billboard advertising in Gulberg, Lahore: every site",
    metaTitle: "Billboards in Gulberg, Lahore: Main Boulevard to MM Alam",
    description:
      "Every Fangrove billboard and LED screen in Gulberg: Main Boulevard, Hussain Chowk, Kasoori Road, Jinnah Flyover and MM Alam Road, with size, approach and audience.",
    summary:
      "Gulberg's billboards sit on Lahore's main commercial roads: Main Boulevard, Hussain Chowk, Kasoori Road, the Jinnah Flyover and MM Alam Road. Fangrove Media's Gulberg estate includes front-lit faces in both directions of Main Boulevard, three faces and a large LED screen on Hussain Chowk, and two faces on MM Alam Road, all booked monthly from the 1st or 16th.",
    category: "Guides",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media", "dooh"],
    siteIds: [
      "lhr-kasoori-alfatah",
      "lhr-mainblvd-kalma",
      "lhr-mainblvd-jail",
      "lhr-hussain-a",
      "lhr-hussain-b",
      "lhr-hussain-c",
      "lhr-jinnah-flyover",
      "lhr-hussain-led",
      "lhr-mmalam-vogue",
      "lhr-mmalam-bluemall",
    ],
    faq: [
      {
        q: "Where are the billboards in Gulberg, Lahore?",
        a: "Fangrove Media's Gulberg sites are on Main Boulevard (Kalma Chowk and Jail Road approaches), Hussain Chowk (three static faces and an LED screen), Kasoori Road opposite Al-Fatah, the Jinnah Flyover, and MM Alam Road at Vogue Tower and Blue Mall.",
      },
      {
        q: "Is there a digital billboard in Gulberg?",
        a: "Yes. The Hussain Chowk LED screen is Fangrove Media's flagship digital site, on the busiest roundabout in Gulberg with two-road exposure.",
      },
      {
        q: "Are the Gulberg billboards lit?",
        a: "Yes. Every static face in Fangrove Media's Gulberg estate is front-lit, so it keeps working through the evening commute.",
      },
      {
        q: "Can I book both directions of Main Boulevard?",
        a: "Yes. The Kalma Chowk approach and the Jail Road approach faces are designed to be booked as a pair, covering both directions of the same commute.",
      },
    ],
  },

  {
    slug: "billboard-advertising-dha-lahore",
    title: "Billboard advertising in DHA, Lahore: every site",
    metaTitle: "Billboards in DHA Lahore: Phase 8, Airport Road & more",
    description:
      `Billboards serving DHA Lahore: the ${largest} Phase 8 face, Khayaban-e-Iqbal Road, Airport Road, the Ring Road and cutouts in DHA and PHA, with approach and audience.`,
    summary:
      "Fangrove Media's billboards serving DHA Lahore include the largest face on its network at DHA Phase 8 Commercial, a face on Khayaban-e-Iqbal Road towards Packages Mall, boards on Airport Road and the Ring Road towards the newer phases, and shaped cutouts inside DHA and PHA. Static faces are booked monthly, from the 1st or 16th.",
    category: "Guides",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["outdoor-media"],
    siteIds: [
      "lhr-dha8-freeways",
      "lhr-dha-khayaban-iqbal",
      "lhr-airport-garrison",
      "lhr-ringroad-airport",
      "lhr-dha-pha-cutouts",
    ],
    faq: [
      {
        q: "What is the biggest billboard in DHA Lahore?",
        a: `On Fangrove Media's network it is the ${largest} front-lit face at DHA Phase 8 Commercial, at the Freeways 1st roundabout, the largest face in the estate.`,
      },
      {
        q: "Where are the billboards in DHA?",
        a: "Fangrove Media's DHA-area sites are at DHA Phase 8 Commercial, on Khayaban-e-Iqbal Road, on Airport Road by the Garrison Golf Club and on the Ring Road towards DHA Phases 6 and 8, plus cutouts across DHA and PHA.",
      },
      {
        q: "Who should advertise on billboards in DHA?",
        a: "Brands selling to high-income households: property, cars, private schools and hospitals, premium retail and financial services. The Ring Road also suits B2B and automotive brands.",
      },
      {
        q: "What are cutouts?",
        a: "Shaped advertising pieces rather than flat faces, placed at locations inside DHA and PHA and used for launches that need a physical presence on the ground.",
      },
    ],
  },

  {
    slug: "plan-outdoor-media-campaign-lahore",
    title: "How to plan an outdoor media campaign in Lahore",
    metaTitle: "How to plan an outdoor media campaign in Lahore",
    description:
      "Planning a billboard and outdoor media campaign in Lahore: choosing corridors, mixing formats, adding radio or press, setting dates, and checking that every face ran.",
    summary:
      "Plan an outdoor media campaign in Lahore by starting with where your audience travels, holding two or three corridors rather than scattering single boards, and mixing static billboards for frequency with digital screens where the message must change. Book static faces in monthly cycles from the 1st or 16th, and insist on dated proof of every placement.",
    category: "Planning",
    status: "published",
    published: "2026-11-09",
    author: "editorial",
    serviceSlugs: ["media-campaigns", "outdoor-media", "dooh"],
    allSites: true,
    faq: [
      {
        q: "What is an outdoor media campaign?",
        a: "A set of outdoor placements, such as billboards, hoardings, bridge panels and digital screens, booked together so the same audience sees one message repeatedly over a period. It is often run alongside radio, TV or press.",
      },
      {
        q: "How many billboards does a campaign in Lahore need?",
        a: "It depends on the audience, not a fixed number. Holding two or three corridors that your audience drives every day usually works better than single faces spread across the city. Some briefs are met with two well-placed boards.",
      },
      {
        q: "How long should an outdoor campaign run?",
        a: "Static sites are booked by the month, in cycles starting on the 1st or the 16th. Outdoor works through repetition, so plan for at least one full cycle; longer bookings are priced differently from a single month.",
      },
      {
        q: "Can one agency plan billboards, digital screens, radio and press together?",
        a: "Yes. Fangrove Media plans and buys outdoor, digital out-of-home, TV, radio, cinema and press from Lahore, across Lahore, Islamabad and Karachi, with broadcast and national press across Pakistan, as one schedule.",
      },
      {
        q: "How do I know my outdoor campaign actually ran?",
        a: "Ask for proof. Fangrove Media supplies a dated photograph of every static face, weekly play logs for digital screens, tear sheets for press and transmission reconciliation for broadcast.",
      },
    ],
  },

  {
    slug: "billboard-advertising-rates-lahore",
    title: "What decides billboard rates in Lahore?",
    metaTitle: "Billboard advertising rates in Lahore: what sets the price",
    description:
      "Billboard rates in Lahore turn on audience, face size, lighting, booking cycle and share of voice. How each one moves the price, and what to send for a same-day quote.",
    summary:
      "A billboard rate in Lahore comes down to five things: the daily audience the site carries, the size of the face, whether it is lit, how many booking cycles you take, and, on a digital screen, your share of the loop. Fangrove Media quotes static sites per monthly cycle, starting on the 1st or the 16th.",
    category: "Planning",
    status: "published",
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
    status: "published",
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
    status: "published",
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
    status: "published",
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
    status: "published",
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
    status: "published",
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
