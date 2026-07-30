import type { ImageKey } from "@/lib/images";

/**
 * Case studies.
 *
 * ⚠ ALL CLIENTS AND RESULTS BELOW ARE FICTIONAL PLACEHOLDERS. The company
 * names are invented so the site can be reviewed with realistic content; none
 * of them represent a real Fangrove client or a real campaign outcome.
 *
 * These MUST be replaced with genuine work before the site is made public.
 * Publishing invented case studies as real would misrepresent the business.
 * See ASSETS.md.
 */

export type Result = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  index: string;
  client: string;
  title: string;
  headingLines: readonly string[];
  year: number;
  category: string;
  summary: string;
  brief: readonly string[];
  approach: readonly string[];
  placements: readonly string[];
  results: readonly Result[];
  /** Slugs from content/services.ts */
  serviceSlugs: readonly string[];
  heroImage: ImageKey;
  gallery: readonly ImageKey[];
  metaDescription: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "karvaan-mobility-launch",
    index: "01",
    client: "Karvaan Mobility",
    title: "Launching a ride-hailing app on the roads it wanted to own",
    headingLines: ["Owning the road", "before the app", "was on it"],
    year: 2025,
    category: "Launch campaign",
    summary:
      "Nineteen sites, four weeks, one message per corridor — a city-wide launch built on frequency instead of noise.",
    brief: [
      "Karvaan had eight weeks before a competitor's Lahore launch and a budget that could not buy television. They needed the city to believe the brand was already established on the day it opened.",
      "The strategic problem was credibility, not awareness. A new app with a small media budget looks small. The brief was to look inevitable.",
    ],
    approach: [
      "We bought depth on four corridors instead of thin coverage across nineteen. Ferozepur Road, Canal Bank, Main Boulevard and the Ring Road interchanges carry the same commuters twice a day — which meant the same person saw Karvaan eight to ten times a week rather than once.",
      "Each corridor ran a single message rather than a rotation, so the corridor itself became the unit of memory. Digital screens at Liberty and Packages Mall carried a driver-recruitment message in the morning belt and a rider message after 4 p.m., using the one thing static cannot do.",
      "Flex was printed and mounted by our own crews over two consecutive nights, so the campaign appeared complete overnight rather than trickling up across a fortnight.",
    ],
    placements: [
      "4 gantries — Kalma Chowk, Thokar, Babu Sabu, Canal Bank",
      "9 unipoles across Gulberg, Model Town and DHA",
      "3 digital LED screens with morning/evening dayparting",
      "Run of 12 pole signs, Wahdat Road corridor",
      "Drive-time radio, two FM stations, six weeks",
    ],
    results: [
      { value: "10.4×", label: "Average weekly frequency, target commuter" },
      { value: "2 nights", label: "Full estate live from first mount" },
      { value: "31%", label: "Share of driver sign-ups citing outdoor" },
    ],
    serviceSlugs: ["outdoor-media", "dooh", "flex-printing", "electronic-media"],
    heroImage: "heroCorridor",
    gallery: ["digitalPanel", "streetNight", "billboardStructure"],
    metaDescription:
      "How a corridor-depth outdoor strategy launched a ride-hailing brand across Lahore in two nights.",
  },
  {
    slug: "riwaj-eid-retail",
    index: "02",
    client: "Riwaj",
    title: "An Eid retail push that changed message four times a day",
    headingLines: ["Four messages,", "one screen,", "one day"],
    year: 2025,
    category: "Retail / seasonal",
    summary:
      "Dayparted DOOH across the Gulberg and Johar Town retail belts, with creative swapped against live stock levels.",
    brief: [
      "Riwaj runs eleven stores and sells almost half its year in the three weeks before Eid. Their problem was not traffic — it was that the traffic arrived asking for lines that had already sold out.",
      "They wanted outdoor that could keep up with a stockroom.",
    ],
    approach: [
      "We built a dynamic creative template driven by a simple feed from their inventory system. When a line dropped below a threshold at a given store, the screens nearest that store stopped promoting it and promoted the next line instead.",
      "The daypart structure did the rest: family messaging in the morning, a men's line at the evening commute, and a late-night reminder of extended Eid trading hours.",
      "Press carried the store list and hours in the Urdu dailies for the week of Chaand Raat, where an older customer still checks timings before travelling.",
    ],
    placements: [
      "5 digital LED screens — Gulberg, Johar Town, Walton",
      "Dynamic creative bound to store-level stock feed",
      "4 daypart variants per screen per day",
      "Half-page insertions, two Urdu dailies, Chaand Raat week",
    ],
    results: [
      { value: "4×", label: "Creative variants per screen, per day" },
      { value: "< 2 hrs", label: "Stock change to screen update" },
      { value: "0", label: "Wasted plays promoting sold-out lines" },
    ],
    serviceSlugs: ["dooh", "print-media"],
    heroImage: "digitalPanel",
    gallery: ["streetNight", "heroCorridor", "billboardStructure"],
    metaDescription:
      "A dayparted, stock-driven DOOH campaign for an eleven-store fashion retailer through the Eid trading peak.",
  },
  {
    slug: "almas-steel-tender",
    index: "03",
    client: "Almas Steel",
    title: "Reaching a buying committee of four hundred people",
    headingLines: ["Four hundred", "people who", "sign things"],
    year: 2024,
    category: "B2B / infrastructure",
    summary:
      "Press, trade supplements and a freight-corridor outdoor buy aimed at procurement rather than the public.",
    brief: [
      "Almas Steel sells rebar to contractors and government projects. Their entire addressable market in Punjab is roughly four hundred people, and none of them are influenced by a mass campaign.",
      "The brief was visibility with a buying committee, at a cost that a B2B margin could carry.",
    ],
    approach: [
      "Mass outdoor was the wrong instrument except in one place: the freight corridors. Ring Road and the Multan Road approach are travelled daily by exactly the site engineers and contractors who specify steel, and almost nobody else with budget authority.",
      "Everything else went to press. Tender-adjacent placements in the English nationals, full pages in two construction trade supplements, and statutory notice formatting that let their procurement team move faster than competitors on public work.",
      "We printed the technical catalogue on our own floor — 96 pages, perfect bound, on a stock that survives a construction site.",
    ],
    placements: [
      "2 unipoles — Ring Road and Multan Road freight corridors",
      "Full-page insertions, 2 construction trade supplements",
      "18 tender and statutory notices, English and Urdu nationals",
      "96-page technical catalogue, 4,000 copies, perfect bound",
    ],
    results: [
      { value: "2 sites", label: "Outdoor placements — deliberately, not by budget" },
      { value: "18", label: "Statutory notices placed to deadline" },
      { value: "4,000", label: "Catalogues printed and distributed" },
    ],
    serviceSlugs: ["print-media", "outdoor-media", "printing"],
    heroImage: "pressNewsprint",
    gallery: ["paperStock", "pressRollers", "streetNight"],
    metaDescription:
      "A B2B media plan for a steel manufacturer: press authority, freight-corridor outdoor and an in-house technical catalogue.",
  },
  {
    slug: "chinar-foods-rollout",
    index: "04",
    client: "Chinar Foods",
    title: "A five-city rollout printed and mounted in nine days",
    headingLines: ["Five cities.", "Nine days."],
    year: 2024,
    category: "FMCG / national",
    summary:
      "Twenty-six faces across Punjab, Sindh and the capital — one print floor, one schedule, no third-party handoffs.",
    brief: [
      "Chinar was moving a regional dairy brand national and had a distributor conference date it could not move. Every face had to be live the morning the sales force walked in.",
      "Four suppliers had already quoted three weeks.",
    ],
    approach: [
      "The compression came from removing handoffs. Because the print floor and the mounting crews sit inside the same business, faces went from press to truck without an intermediate warehouse or a third-party collection window.",
      "We sequenced by distance: Multan and Faisalabad printed and shipped first, Karachi second, Lahore and Islamabad last because our own crews could mount those overnight.",
      "Colour was the risk. A dairy white that goes grey under sodium lighting kills the whole idea, so we proofed against front-lit and back-lit separately and ran two ink densities.",
    ],
    placements: [
      "26 faces across Lahore, Islamabad, Karachi, Faisalabad, Multan",
      "Mixed unipole, gantry and billboard inventory",
      "Two ink densities — front-lit and back-lit variants",
      "9-day print-to-mount across all five cities",
    ],
    results: [
      { value: "9 days", label: "Brief to final mount, five cities" },
      { value: "26", label: "Faces printed, shipped and installed" },
      { value: "2", label: "Ink densities, matched to illumination type" },
    ],
    serviceSlugs: ["flex-printing", "outdoor-media"],
    heroImage: "pressOffset",
    gallery: ["pressFloor", "billboardBlank", "billboardStructure"],
    metaDescription:
      "Twenty-six outdoor faces printed and mounted across five Pakistani cities in nine days, without a third-party handoff.",
  },
  {
    slug: "nishan-telecom-broadcast",
    index: "05",
    client: "Nishan Telecom",
    title: "Buying airtime against the log, not the rate card",
    headingLines: ["Bought against", "the log"],
    year: 2024,
    category: "Broadcast",
    summary:
      "A six-week television and radio plan where reconciliation recovered more value than the original negotiation.",
    brief: [
      "Nishan had run broadcast for three years without ever reconciling a transmission log. They assumed the spots they paid for were the spots that aired.",
      "We were asked to plan a six-week burst. We asked to audit the previous one first.",
    ],
    approach: [
      "The audit found the usual pattern: a meaningful share of spots had aired outside the belt they were bought in, mostly in low-value late-night inventory. None of it was malicious and none of it had ever been claimed.",
      "The new plan was bought conservatively and reconciled weekly. Every spot outside its belt was recovered as a make-good in a higher-value slot rather than credited at the original rate.",
      "Radio carried the frequency at a fraction of the cost, timed to the same drive-time window as the client's outdoor estate so the two media compounded on a single commute.",
    ],
    placements: [
      "6-week TV burst across news and entertainment belts",
      "Drive-time radio, three FM networks, four cities",
      "30s and 15s TVC cutdowns, delivered to broadcast spec",
      "Weekly transmission-log reconciliation with make-good recovery",
    ],
    results: [
      { value: "Weekly", label: "Log reconciliation cadence" },
      { value: "3 yrs", label: "Of unreconciled buying audited" },
      { value: "2 formats", label: "30s and 15s, planned as a pair" },
    ],
    serviceSlugs: ["electronic-media"],
    heroImage: "broadcastStudio",
    gallery: ["digitalPanel", "streetNight", "heroCorridor"],
    metaDescription:
      "A television and radio plan where weekly transmission-log reconciliation recovered value the rate card never would have.",
  },
  {
    slug: "waseeb-agri-regional",
    index: "06",
    client: "Waseeb Agri",
    title: "Talking to South Punjab in the media it actually uses",
    headingLines: ["The media", "South Punjab", "actually uses"],
    year: 2023,
    category: "Regional / agriculture",
    summary:
      "Urdu press, regional radio and non-lit roadside boards on the routes between farm and mandi.",
    brief: [
      "Waseeb sells inputs to growers across Multan, Bahawalpur and Rahim Yar Khan. Their previous agency had bought them Lahore digital screens.",
      "The brief was to stop wasting money on an audience that was never going to buy.",
    ],
    approach: [
      "We rebuilt the plan around the routes between farm and mandi. Non-lit roadside boards on those roads cost a fraction of an illuminated urban face and reach the only people who matter — at the exact moment they are travelling to sell or to buy inputs.",
      "Urdu regional press carried the technical detail, because a grower comparing input prices will read a half page of specification that no urban consumer ever would.",
      "Regional FM covered the early-morning belt. Nothing in the plan was glamorous, and all of it was cheap relative to what it replaced.",
    ],
    placements: [
      "Roadside boards on farm-to-mandi routes, three districts",
      "Half-page technical insertions, Urdu regional press",
      "Early-morning belt, regional FM",
      "Point-of-sale printing for 240 input dealers",
    ],
    results: [
      { value: "3", label: "Districts covered on a regional budget" },
      { value: "240", label: "Dealer point-of-sale kits printed" },
      { value: "0", label: "Rupees spent on urban digital screens" },
    ],
    serviceSlugs: ["outdoor-media", "print-media", "printing", "electronic-media"],
    heroImage: "lahoreStreet",
    gallery: ["billboardBlank", "paperStock", "billboardStructure"],
    metaDescription:
      "A South Punjab agriculture campaign built on regional press, farm-route outdoor and dealer point-of-sale printing.",
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function nextCaseStudy(slug: string): CaseStudy {
  const i = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length]!;
}

/** Case studies that used a given service. Powers the service-page cross-link. */
export function caseStudiesForService(serviceSlug: string): CaseStudy[] {
  return caseStudies.filter((study) => study.serviceSlugs.includes(serviceSlug));
}
