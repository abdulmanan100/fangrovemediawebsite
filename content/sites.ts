import type { ImageKey } from "@/lib/images";

/**
 * The media estate.
 *
 * ⚠ PLACEHOLDER INVENTORY. Road names, junctions and coordinates are real
 * locations in Pakistan so the map reads correctly, but the structures,
 * dimensions, impression counts and availability are illustrative.
 * Replace this array with real inventory before launch — nothing else in the
 * app needs to change. See ASSETS.md.
 */

export const CITIES = ["Lahore", "Islamabad", "Karachi", "Faisalabad", "Multan"] as const;
export const FORMATS = [
  "Digital LED",
  "Unipole",
  "Gantry",
  "Billboard",
  "Bus Shelter",
  "Pole Sign",
] as const;
export const ILLUMINATIONS = ["Digital", "Front-lit", "Back-lit", "Non-lit"] as const;

export type City = (typeof CITIES)[number];
export type Format = (typeof FORMATS)[number];
export type Illumination = (typeof ILLUMINATIONS)[number];

export type MediaSite = {
  id: string;
  name: string;
  city: City;
  area: string;
  format: Format;
  widthFt: number;
  heightFt: number;
  illumination: Illumination;
  /** Which direction of traffic the face addresses. */
  facing: string;
  dailyImpressions: number;
  coords: [number, number];
  status: "available" | "booked";
  image: ImageKey;
  /** One line on why this site earns its rate. */
  note: string;
};

export const sites: readonly MediaSite[] = [
  // ── Lahore ────────────────────────────────────────────────────────────
  {
    id: "lhr-kalma-01",
    name: "Kalma Chowk Flyover — North Face",
    city: "Lahore",
    area: "Gulberg",
    format: "Gantry",
    widthFt: 60,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Traffic inbound from Ferozepur Road",
    dailyImpressions: 412000,
    coords: [31.5006, 74.3282],
    status: "available",
    image: "heroCorridor",
    note: "The single highest-volume interchange in the city. Signal dwell averages 55 seconds.",
  },
  {
    id: "lhr-mainblvd-02",
    name: "Main Boulevard — Liberty Approach",
    city: "Lahore",
    area: "Gulberg III",
    format: "Digital LED",
    widthFt: 32,
    heightFt: 18,
    illumination: "Digital",
    facing: "Traffic inbound toward Liberty Roundabout",
    dailyImpressions: 336000,
    coords: [31.5121, 74.348],
    status: "available",
    image: "digitalPanel",
    note: "P8 screen at the retail entry point to Gulberg. Strong evening and weekend weight.",
  },
  {
    id: "lhr-mmalam-03",
    name: "MM Alam Road — Block C",
    city: "Lahore",
    area: "Gulberg III",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Back-lit",
    facing: "Eastbound, restaurant strip",
    dailyImpressions: 168000,
    coords: [31.5165, 74.3452],
    status: "booked",
    image: "digitalPanel",
    note: "Affluent evening audience. Books out months ahead for food and fashion.",
  },
  {
    id: "lhr-canal-04",
    name: "Canal Bank — Jail Road Bridge",
    city: "Lahore",
    area: "Canal Bank",
    format: "Billboard",
    widthFt: 50,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Southbound toward Jail Road",
    dailyImpressions: 288000,
    coords: [31.532, 74.332],
    status: "available",
    image: "streetNight",
    note: "Canal Road carries the city's most consistent white-collar commute, twice daily.",
  },
  {
    id: "lhr-thokar-05",
    name: "Thokar Niaz Baig Interchange",
    city: "Lahore",
    area: "Thokar",
    format: "Gantry",
    widthFt: 60,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Inbound from Multan Road / Motorway M-2",
    dailyImpressions: 374000,
    coords: [31.47, 74.24],
    status: "available",
    image: "billboardBlank",
    note: "First impression for every vehicle entering Lahore from the motorway.",
  },
  {
    id: "lhr-ringroad-06",
    name: "Ring Road — Babu Sabu Interchange",
    city: "Lahore",
    area: "Babu Sabu",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Ring Road southbound",
    dailyImpressions: 214000,
    coords: [31.568, 74.276],
    status: "available",
    image: "streetNight",
    note: "Freight and long-haul corridor. Undervalued for B2B and automotive.",
  },
  {
    id: "lhr-mall-07",
    name: "The Mall — Charing Cross",
    city: "Lahore",
    area: "Mall Road",
    format: "Billboard",
    widthFt: 30,
    heightFt: 15,
    illumination: "Front-lit",
    facing: "Westbound toward Governor House",
    dailyImpressions: 196000,
    coords: [31.557, 74.329],
    status: "available",
    image: "digitalPanel",
    note: "Institutional Lahore — assemblies, courts, banks. The site for public-facing messaging.",
  },
  {
    id: "lhr-airport-08",
    name: "Airport Road — Terminal Approach",
    city: "Lahore",
    area: "Cantt",
    format: "Digital LED",
    widthFt: 28,
    heightFt: 16,
    illumination: "Digital",
    facing: "Inbound to Allama Iqbal International",
    dailyImpressions: 142000,
    coords: [31.5216, 74.4036],
    status: "available",
    image: "billboardStructure",
    note: "Captive audience at the terminal approach. Premium rate, premium demographic.",
  },
  {
    id: "lhr-dha5-09",
    name: "DHA Phase 5 — Y Block Roundabout",
    city: "Lahore",
    area: "DHA Phase 5",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Back-lit",
    facing: "Traffic from Main Boulevard DHA",
    dailyImpressions: 156000,
    coords: [31.472, 74.403],
    status: "booked",
    image: "heroCorridor",
    note: "Highest household income catchment in the network.",
  },
  {
    id: "lhr-dha3-10",
    name: "DHA Phase 3 — Ghazi Road Junction",
    city: "Lahore",
    area: "DHA Phase 3",
    format: "Billboard",
    widthFt: 30,
    heightFt: 15,
    illumination: "Front-lit",
    facing: "Northbound from Ghazi Road",
    dailyImpressions: 118000,
    coords: [31.483, 74.39],
    status: "available",
    image: "billboardStructure",
    note: "Feeder route into DHA. Pairs well with the Y Block site for frequency.",
  },
  {
    id: "lhr-johartown-11",
    name: "Johar Town — Expo Centre",
    city: "Lahore",
    area: "Johar Town",
    format: "Digital LED",
    widthFt: 36,
    heightFt: 20,
    illumination: "Digital",
    facing: "Traffic on Khayaban-e-Firdousi",
    dailyImpressions: 204000,
    coords: [31.469, 74.268],
    status: "available",
    image: "digitalPanel",
    note: "Event-driven spikes during Expo weeks. Dayparting earns its keep here.",
  },
  {
    id: "lhr-modeltown-12",
    name: "Model Town Link Road",
    city: "Lahore",
    area: "Model Town",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Inbound toward Ferozepur Road",
    dailyImpressions: 176000,
    coords: [31.483, 74.323],
    status: "available",
    image: "streetNight",
    note: "Established residential catchment with heavy school-run frequency.",
  },
  {
    id: "lhr-jail-13",
    name: "Jail Road — Shadman Signal",
    city: "Lahore",
    area: "Shadman",
    format: "Billboard",
    widthFt: 30,
    heightFt: 15,
    illumination: "Front-lit",
    facing: "Southbound at the signal",
    dailyImpressions: 164000,
    coords: [31.533, 74.335],
    status: "available",
    image: "streetNight",
    note: "Long signal cycle. One of the few sites that reliably delivers a full read.",
  },
  {
    id: "lhr-multanroad-14",
    name: "Multan Road — Chauburji",
    city: "Lahore",
    area: "Chauburji",
    format: "Billboard",
    widthFt: 40,
    heightFt: 20,
    illumination: "Non-lit",
    facing: "Inbound toward the walled city",
    dailyImpressions: 148000,
    coords: [31.548, 74.305],
    status: "available",
    image: "streetNight",
    note: "Dense mass-market catchment. Daytime-only value, priced accordingly.",
  },
  {
    id: "lhr-fortress-15",
    name: "Fortress Stadium — Main Gate",
    city: "Lahore",
    area: "Cantt",
    format: "Bus Shelter",
    widthFt: 12,
    heightFt: 6,
    illumination: "Back-lit",
    facing: "Pedestrian and queuing traffic",
    dailyImpressions: 64000,
    coords: [31.535, 74.372],
    status: "available",
    image: "billboardStructure",
    note: "Eye-level, long dwell. Sold as a run of six shelters across the Cantt loop.",
  },
  {
    id: "lhr-emporium-16",
    name: "Emporium Mall — Canal Frontage",
    city: "Lahore",
    area: "Johar Town",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Back-lit",
    facing: "Canal Road westbound",
    dailyImpressions: 232000,
    coords: [31.469, 74.265],
    status: "booked",
    image: "digitalPanel",
    note: "Retail intent at the point of arrival. Consistently the fastest site to sell.",
  },
  {
    id: "lhr-packages-17",
    name: "Packages Mall — Walton Road",
    city: "Lahore",
    area: "Walton",
    format: "Digital LED",
    widthFt: 30,
    heightFt: 18,
    illumination: "Digital",
    facing: "Traffic inbound from Ring Road",
    dailyImpressions: 188000,
    coords: [31.476, 74.376],
    status: "available",
    image: "digitalPanel",
    note: "Weekend-weighted. Strong for launches with a Friday-to-Sunday burst.",
  },
  {
    id: "lhr-wahdat-18",
    name: "Wahdat Road — Muslim Town Junction",
    city: "Lahore",
    area: "Muslim Town",
    format: "Pole Sign",
    widthFt: 6,
    heightFt: 12,
    illumination: "Back-lit",
    facing: "Both directions, twin-face",
    dailyImpressions: 78000,
    coords: [31.515, 74.305],
    status: "available",
    image: "billboardStructure",
    note: "Sold in runs of twelve along the corridor. Cheap frequency, high repetition.",
  },
  {
    id: "lhr-bahria-19",
    name: "Bahria Town — Main Entrance",
    city: "Lahore",
    area: "Bahria Town",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Inbound from Raiwind Road",
    dailyImpressions: 96000,
    coords: [31.366, 74.183],
    status: "available",
    image: "billboardBlank",
    note: "Single point of entry for the whole development. Unavoidable for residents.",
  },

  // ── Islamabad ─────────────────────────────────────────────────────────
  {
    id: "isb-bluearea-20",
    name: "Blue Area — Jinnah Avenue",
    city: "Islamabad",
    area: "Blue Area",
    format: "Digital LED",
    widthFt: 32,
    heightFt: 18,
    illumination: "Digital",
    facing: "Eastbound toward the Secretariat",
    dailyImpressions: 224000,
    coords: [33.71, 73.065],
    status: "available",
    image: "billboardStructure",
    note: "Government and corporate HQ corridor. The federal audience in one placement.",
  },
  {
    id: "isb-srinagar-21",
    name: "Srinagar Highway — Zero Point",
    city: "Islamabad",
    area: "Zero Point",
    format: "Gantry",
    widthFt: 60,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Inbound from Islamabad International",
    dailyImpressions: 268000,
    coords: [33.69, 73.04],
    status: "available",
    image: "heroCorridor",
    note: "Airport-to-capital artery. Catches every arriving visitor and the twin-cities commute.",
  },
  {
    id: "isb-f7-22",
    name: "F-7 Markaz — Jinnah Super",
    city: "Islamabad",
    area: "F-7",
    format: "Billboard",
    widthFt: 30,
    heightFt: 15,
    illumination: "Back-lit",
    facing: "Markaz approach, both lanes",
    dailyImpressions: 84000,
    coords: [33.7204, 73.0551],
    status: "booked",
    image: "heroCorridor",
    note: "Diplomatic and high-income catchment. Small format, disproportionate influence.",
  },

  // ── Karachi ───────────────────────────────────────────────────────────
  {
    id: "khi-faisal-23",
    name: "Shahrah-e-Faisal — Nursery Flyover",
    city: "Karachi",
    area: "Shahrah-e-Faisal",
    format: "Gantry",
    widthFt: 60,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Inbound toward Karachi city centre",
    dailyImpressions: 486000,
    coords: [24.86, 67.07],
    status: "available",
    image: "streetNight",
    note: "The highest raw impression count in the network. Karachi's principal artery.",
  },
  {
    id: "khi-clifton-24",
    name: "Clifton — Do Talwar Roundabout",
    city: "Karachi",
    area: "Clifton",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Back-lit",
    facing: "Traffic circling from Boat Basin",
    dailyImpressions: 262000,
    coords: [24.8138, 67.0299],
    status: "available",
    image: "digitalPanel",
    note: "Affluent southern Karachi. Evening and weekend weight comparable to MM Alam.",
  },

  // ── Faisalabad & Multan ───────────────────────────────────────────────
  {
    id: "fsd-kohinoor-25",
    name: "Kohinoor City — Jaranwala Road",
    city: "Faisalabad",
    area: "Kohinoor",
    format: "Unipole",
    widthFt: 40,
    heightFt: 20,
    illumination: "Front-lit",
    facing: "Inbound toward Faisalabad centre",
    dailyImpressions: 132000,
    coords: [31.418, 73.079],
    status: "available",
    image: "billboardBlank",
    note: "Industrial Punjab's commercial hub. Textile and FMCG buy here.",
  },
  {
    id: "mux-bosan-26",
    name: "Bosan Road — Chungi No. 9",
    city: "Multan",
    area: "Bosan Road",
    format: "Billboard",
    widthFt: 30,
    heightFt: 15,
    illumination: "Front-lit",
    facing: "Northbound toward Cantt",
    dailyImpressions: 108000,
    coords: [30.22, 71.475],
    status: "available",
    image: "streetNight",
    note: "South Punjab entry point. Completes regional coverage for a national buy.",
  },
] as const;

/* ── Derived values. Never hard-code these anywhere else. ─────────────── */

export const totalSites = sites.length;

export const totalDailyImpressions = sites.reduce(
  (sum, site) => sum + site.dailyImpressions,
  0,
);

export const citiesCovered = new Set(sites.map((site) => site.city)).size;

export const digitalScreens = sites.filter((site) => site.format === "Digital LED").length;

export const availableSites = sites.filter((site) => site.status === "available").length;

export function getSite(id: string): MediaSite | undefined {
  return sites.find((site) => site.id === id);
}

export function sitesInCity(city: City): MediaSite[] {
  return sites.filter((site) => site.city === city);
}

/** City → site count, ordered largest first. Used on the network page. */
export function cityBreakdown(): { city: City; count: number }[] {
  return CITIES.map((city) => ({ city, count: sitesInCity(city).length }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);
}
