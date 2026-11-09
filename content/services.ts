import { images, type ImageKey } from "@/lib/images";

export type Capability = { title: string; description: string };
export type Spec = { label: string; value: string };

export type Service = {
  slug: string;
  index: string;
  title: string;
  /** Used in tight spaces — nav, cards, breadcrumbs. */
  shortTitle: string;
  eyebrow: string;
  /** One line. Card copy. */
  summary: string;
  /** Two sentences. Page hero. */
  lede: string;
  /** Authored line breaks for the page's masked heading reveal. */
  headingLines: readonly string[];
  body: readonly string[];
  capabilities: readonly Capability[];
  specs: readonly Spec[];
  image: ImageKey;
  /** Search title: the phrase people actually type, not the section name. */
  metaTitle: string;
  metaDescription: string;
};

export const services: readonly Service[] = [
  {
    slug: "outdoor-media",
    index: "01",
    title: "Outdoor Media",
    shortTitle: "Outdoor",
    eyebrow: "Owned & operated",
    summary:
      "Unipoles, gantries, bridge panels and street furniture on the roads that actually carry Punjab's traffic.",
    lede:
      "We do not resell other people's boards. Fangrove owns and maintains its own structures on Lahore's highest-yield corridors, which is why we can quote in an hour and mount overnight.",
    headingLines: ["Outdoor", "Media"],
    body: [
      "A billboard is infrastructure before it is advertising. The steel has to survive a Punjab summer, the lighting has to hold at 2 a.m., and the face has to be reachable by a crew at short notice. Sites that fail any of those three quietly cost their advertiser a third of the campaign.",
      "Our estate is built around commuter arteries — Ferozepur Road, Canal Bank, the Ring Road interchanges, Main Boulevard Gulberg — where dwell time is long, speeds are low, and the same audience passes twice a day, five days a week. Frequency is what makes outdoor work, and frequency is a function of where the structure stands.",
      "Every site in our network is documented: map location, face dimensions, illumination type, direction of approach, and the daily audience figure we hold for it. You can inspect all of it before you commit to a single rupee.",
    ],
    capabilities: [
      {
        title: "Billboards, hoardings & unipoles",
        description:
          "Single- and double-face structures up to 90 × 30 ft, front-lit or back-lit, on owned land and rooftop leases.",
      },
      {
        title: "Gantries & bridge panels",
        description:
          "Overhead spans across dual carriageways and underpass approaches — the highest-recall placement in the format.",
      },
      {
        title: "Street furniture",
        description:
          "Pole panels, kiosks and shelter faces through municipal licences, sold as area-wide runs rather than single units.",
      },
      {
        title: "Wall wraps & building fascia",
        description:
          "Large-scale vinyl on commercial frontage where a conventional structure cannot be permitted.",
      },
      {
        title: "Mounting & maintenance",
        description:
          "Own crews, own hoists. Faces are changed overnight and lighting is checked on a fortnightly cycle.",
      },
      {
        title: "Permits & compliance",
        description:
          "PHA and cantonment paperwork handled end to end. You never receive a takedown notice from us.",
      },
    ],
    specs: [
      { label: "Face sizes", value: "Up to 90 × 30 ft" },
      { label: "Illumination", value: "Front-lit · Back-lit · Non-lit" },
      { label: "Substrate", value: "Star flex 440–650 gsm · cast vinyl" },
      { label: "Booking cycle", value: "Monthly, from the 1st or 16th" },
      { label: "Artwork deadline", value: "72 hours before mount" },
      { label: "Mounting window", value: "Overnight, 11 p.m. — 5 a.m." },
    ],
    image: "billboardBlank",
    metaTitle: "Outdoor media & billboard advertising in Lahore",
    metaDescription:
      "Outdoor media in Lahore: owned billboards, hoardings, bridge panels and underpass faces, each with published size, location and daily audience.",
  },

  {
    slug: "dooh",
    index: "02",
    title: "Digital Out-of-Home",
    shortTitle: "DOOH",
    eyebrow: "Digital screens",
    summary:
      "LED screens on the same corridors as our static estate — but dayparted, swappable, and reportable.",
    lede:
      "Digital removes the two things advertisers hate most about outdoor: the four-week lock-in and the guesswork. Change the creative at noon, run a different message at rush hour, and get a play log at the end of it.",
    headingLines: ["Digital", "Out-of-Home"],
    body: [
      "The economics of DOOH are different from static, and pretending otherwise is how campaigns get wasted. You are not buying a face for a month — you are buying a share of voice inside a loop. What matters is loop length, slot duration, and how many other advertisers are in the rotation with you.",
      "We publish all three for every screen we operate. A ten-slot loop at eight seconds means your message plays roughly forty-five times an hour, and we will tell you what that costs per thousand impressions before you sign anything.",
      "Because creative is a file rather than a printed face, DOOH is where the interesting work happens: different messages by time of day, weather-triggered copy, countdowns, live scores, or a straight rotation of six product variants. If you can specify the rule, we can run it.",
    ],
    capabilities: [
      {
        title: "Roadside LED",
        description:
          "P6–P10 outdoor screens — what most of Lahore calls SMD screens — at signalised junctions, calibrated for daylight legibility and dimmed after dusk.",
      },
      {
        title: "Dayparting",
        description:
          "Separate creative for morning commute, midday, evening peak and late night — booked as one line item.",
      },
      {
        title: "Dynamic creative",
        description:
          "Copy driven by a feed: weather, price, stock, fixture, countdown. Built once, runs unattended.",
      },
      {
        title: "Share-of-voice buying",
        description:
          "Loop position and slot count stated up front. No undisclosed advertisers crowding your rotation.",
      },
      {
        title: "Play-log reporting",
        description:
          "Timestamped proof of play for every spot, delivered weekly. Photographic verification on request.",
      },
      {
        title: "Emergency swaps",
        description:
          "Creative can be pulled or replaced within two hours — the reason regulated categories choose digital.",
      },
    ],
    specs: [
      { label: "Pixel pitch", value: "P6 · P8 · P10 outdoor-rated" },
      { label: "Slot length", value: "8 seconds standard · 10s and 15s available" },
      { label: "Loop", value: "80 seconds · max 10 advertisers" },
      { label: "Creative format", value: "MP4 / JPG, native resolution, ≤ 40 MB" },
      { label: "Turnaround", value: "Live within 4 working hours of approval" },
      { label: "Reporting", value: "Weekly play log · monthly impression summary" },
    ],
    image: "digitalPanel",
    metaTitle: "SMD screens & digital billboards in Lahore",
    metaDescription:
      "SMD and LED screen advertising in Lahore: roadside digital screens with dayparting, dynamic creative, stated share of voice and weekly play logs.",
  },

  {
    slug: "electronic-media",
    index: "03",
    title: "Electronic Media",
    shortTitle: "Electronic",
    eyebrow: "Broadcast & buying",
    summary:
      "Television, radio and cinema — planned against ratings, bought against relationships, cleared against PEMRA.",
    lede:
      "Broadcast buying in Pakistan rewards people who have been in the room for years. We plan with the data and negotiate with the history.",
    headingLines: ["Electronic", "Media"],
    body: [
      "A TVC costs a fraction of what the airtime behind it costs, yet most of the argument happens over the film. We think the plan deserves the same scrutiny: which channels, which belts, what reach at what frequency, and what it takes to move a household that has already seen the category twice this week.",
      "We build plans from ratings data and buy them through direct channel relationships, then reconcile every spot against the log. If a spot did not run in the belt it was bought in, it gets made good — that reconciliation is where a lot of value quietly leaks out of Pakistani media budgets.",
      "Radio and cinema sit in the same plan rather than beside it. Radio is the cheapest frequency-builder in the country for a drive-time audience, and it pairs naturally with outdoor on the same commute.",
    ],
    capabilities: [
      {
        title: "Channel planning",
        description:
          "Reach and frequency modelled by belt and genre against the current ratings panel, not last year's assumptions.",
      },
      {
        title: "Airtime negotiation",
        description:
          "Direct buying across news, entertainment and sport, including bonus weight and sponsorship idents.",
      },
      {
        title: "Radio",
        description:
          "Drive-time spots and station tie-ins across FM networks in Lahore, Islamabad, Karachi and Faisalabad.",
      },
      {
        title: "Cinema",
        description:
          "On-screen pre-roll in multiplexes, sold by print rather than by seat — bought against confirmed release slates.",
      },
      {
        title: "TVC production",
        description:
          "15, 30 and 45-second commercials produced in-house or with partner directors, delivered to broadcast spec.",
      },
      {
        title: "Log reconciliation",
        description:
          "Every spot checked against the transmission log. Missed belts are recovered as make-goods, not written off.",
      },
    ],
    specs: [
      { label: "TVC durations", value: "15s · 30s · 45s · 60s" },
      { label: "Delivery spec", value: "1080i50 / 1080p25, R128 loudness" },
      { label: "Clearance", value: "PEMRA content certification handled" },
      { label: "Planning basis", value: "Reach, frequency and GRP by belt" },
      { label: "Lead time", value: "10 working days from brief to first air" },
      { label: "Reporting", value: "Post-campaign log reconciliation" },
    ],
    image: "broadcastStudio",
    metaTitle: "TV, radio & cinema advertising in Pakistan",
    metaDescription:
      "TV, radio and cinema planning and buying from Lahore. Ratings-led plans, direct channel negotiation, PEMRA clearance and full log reconciliation.",
  },

  {
    slug: "print-media",
    index: "04",
    title: "Print Media",
    shortTitle: "Press",
    eyebrow: "Press & publications",
    summary:
      "National and regional press, trade titles and Urdu dailies — placed where the decision-maker still reads.",
    lede:
      "Press is no longer a reach medium in Pakistan, and buying it as one wastes money. Bought as an authority medium, it still does something nothing else does.",
    headingLines: ["Print", "Media"],
    body: [
      "The readership that remains is older, wealthier, and disproportionately made up of people who sign things — procurement officers, contractors, bureaucrats, landowners. For tender notices, corporate announcements, recruitment and anything with a government-facing audience, a well-placed press insertion still outperforms its cost.",
      "We buy across the English and Urdu nationals and the regional editions that actually matter for a Punjab campaign. Placement is negotiated specifically: right-hand page, above the fold, facing editorial, away from the classifieds — the details that separate a noticed advertisement from a paid-for one.",
      "Everything is booked with a tear-sheet guarantee. You receive proof of the insertion as it appeared, not an invoice line claiming it did.",
    ],
    capabilities: [
      {
        title: "National dailies",
        description:
          "English and Urdu nationals, with edition-level control so a Lahore campaign is not paying for Karachi circulation.",
      },
      {
        title: "Regional & city editions",
        description:
          "Punjab regional titles for district-level reach on tenders, recruitment and public notices.",
      },
      {
        title: "Position negotiation",
        description:
          "Front solus, page three, facing editorial, and back page — priced and secured rather than left to the desk.",
      },
      {
        title: "Trade & special supplements",
        description:
          "Sector titles and annual supplements where a full page reaches a buying committee for the cost of a half-page national.",
      },
      {
        title: "Statutory notices",
        description:
          "Tender, legal and public notices formatted and placed to the letter of the requirement, at short notice.",
      },
      {
        title: "Tear-sheet proof",
        description:
          "Scanned proof of every insertion as printed, filed against the booking within 48 hours.",
      },
    ],
    specs: [
      { label: "Sizes", value: "Full page · half · quarter · strip · solus" },
      { label: "Colour", value: "Full colour and mono, by title" },
      { label: "Artwork", value: "CMYK PDF/X-1a, 300 dpi, 3 mm bleed" },
      { label: "Booking deadline", value: "48 hours before publication" },
      { label: "Editions", value: "Lahore · Punjab regional · national" },
      { label: "Proof", value: "Scanned tear sheet within 48 hours" },
    ],
    image: "pressNewsprint",
    metaTitle: "Newspaper advertising in Pakistan",
    metaDescription:
      "Newspaper and magazine advertising placed from Lahore. National and Urdu dailies, Punjab regional editions, negotiated positions and tear-sheet proof.",
  },

  {
    slug: "printing",
    index: "05",
    title: "Commercial Printing",
    shortTitle: "Printing",
    eyebrow: "Own print floor",
    summary:
      "Offset and digital — everything that ends up in someone's hand, from a business card to a shelf-ready carton.",
    lede:
      "We run our own floor rather than brokering to one. That means we quote from real machine time, and a rush job is a scheduling decision instead of a favour we have to ask someone else for.",
    headingLines: ["Commercial", "Printing"],
    body: [
      "Most printing problems are not printing problems. They are file problems, stock problems, or someone approving a screen proof for a job that will be read under a fluorescent tube. We check the file before the plate, proof on the actual stock, and tell you when a spot colour will not hold on an uncoated sheet.",
      "Offset carries the volume work — annual reports, catalogues, packaging runs, anything over a thousand. Digital covers short runs, variable data and the same-week turnarounds that offset economics cannot justify. The right answer depends on quantity, and we will say so even when it means a smaller invoice.",
      "Finishing is done in-house: lamination, spot UV, foiling, embossing, die-cutting and binding. Every hand-off between machines is a chance to lose a day, so we removed the hand-offs.",
    ],
    capabilities: [
      {
        title: "Offset",
        description:
          "Sheet-fed CMYK plus spot, for runs from 1,000 upward. Ideal for catalogues, reports and packaging.",
      },
      {
        title: "Digital",
        description:
          "Short-run and variable data with no plate cost — from fifty copies, delivered inside a week.",
      },
      {
        title: "Packaging",
        description:
          "Folding cartons and sleeves: structural die-line, print, laminate, cut and glue as one job.",
      },
      {
        title: "Corporate stationery",
        description:
          "Letterheads, cards, folders and envelopes held on file for reprint against an agreed brand sheet.",
      },
      {
        title: "Finishing",
        description:
          "Matte and gloss lamination, spot UV, hot foil, emboss, deboss, die-cut, perfect and saddle binding.",
      },
      {
        title: "Colour management",
        description:
          "Proofed on the production stock, matched to Pantone, and held consistent across reprints.",
      },
    ],
    specs: [
      { label: "Processes", value: "Sheet-fed offset · digital toner" },
      { label: "Max sheet", value: "28 × 40 in (720 × 1020 mm)" },
      { label: "Stock range", value: "70 – 400 gsm, coated & uncoated" },
      { label: "Colour", value: "CMYK + up to 2 spot / Pantone" },
      { label: "Artwork", value: "PDF/X-1a, 300 dpi, 3 mm bleed, outlined type" },
      { label: "Standard lead time", value: "5 working days · 48h rush available" },
    ],
    image: "paperStock",
    metaTitle: "Offset & digital printing in Lahore",
    metaDescription:
      "Offset and digital commercial printing in Lahore. Packaging, catalogues, corporate stationery and in-house finishing with managed colour.",
  },

  {
    slug: "flex-printing",
    index: "06",
    title: "Flex Printing",
    shortTitle: "Flex",
    eyebrow: "Large format",
    summary:
      "Panaflex, vinyl, mesh, backlit and one-way vision — printed on the same floor that mounts it.",
    lede:
      "Large format is judged from thirty metres away, at speed, usually in bad light. We print for that distance, not for how the file looks on a monitor.",
    headingLines: ["Flex", "Printing"],
    body: [
      "The single most common failure in flex is colour that was approved on a backlit screen and then hung on a front-lit face. A red that sings at 100% brightness goes muddy under sodium lighting. We proof against the illumination the piece will actually live under, and we build files at the resolution that distance requires — which is usually far lower than clients expect, and far better for it.",
      "Because we also own and mount outdoor structures, the print floor and the crew share a schedule. A face that comes off the printer at 6 p.m. is on the board by 2 a.m. Nothing waits in a warehouse for a third party to collect it.",
      "Substrate is chosen for the job rather than the invoice: heavy star flex where wind loading is real, mesh where the structure needs to breathe, backlit where the box is internally lit, cast vinyl where the surface curves.",
    ],
    capabilities: [
      {
        title: "Panaflex & star flex",
        description:
          "440–650 gsm flex for billboards and hoardings, welded and eyeleted to the structure's rigging spec.",
      },
      {
        title: "Backlit",
        description:
          "Translucent stock printed at density for internally illuminated boxes, shelters and light panels.",
      },
      {
        title: "Mesh",
        description:
          "Perforated substrate for building wraps and exposed structures where wind load rules out solid flex.",
      },
      {
        title: "Vinyl & one-way vision",
        description:
          "Self-adhesive cast and calendered vinyl for vehicles, glass, floors and curved fascia.",
      },
      {
        title: "Fabrication",
        description:
          "Frames, light boxes, standees, pylon signs and channel letters built alongside the print.",
      },
      {
        title: "Installation",
        description:
          "Own hoists and riggers. Overnight installation across Lahore, next-day across Punjab.",
      },
    ],
    specs: [
      { label: "Max roll width", value: "16 ft seamless · wider by weld" },
      { label: "Resolution", value: "360 – 1440 dpi, set by viewing distance" },
      { label: "Inks", value: "Eco-solvent & solvent, UV-stable 24 months" },
      { label: "Substrates", value: "Flex 440–650 gsm · mesh · backlit · vinyl" },
      { label: "Artwork", value: "1:10 scale, CMYK, 150 dpi at scale" },
      { label: "Turnaround", value: "24 hours print · same-night mounting" },
    ],
    image: "pressOffset",
    metaTitle: "Flex & panaflex printing in Lahore",
    metaDescription:
      "Large-format flex printing in Lahore: panaflex, backlit, mesh, vinyl and one-way vision, printed and mounted by the same team.",
  },
  {
    slug: "media-campaigns",
    index: "07",
    title: "Media Campaigns",
    shortTitle: "Campaigns",
    eyebrow: "Planning & buying",
    summary:
      "Billboards, digital screens, broadcast and press planned as one media campaign: costed line by line, verified at the end.",
    lede:
      "Most campaigns in Pakistan are bought in pieces: boards from one vendor, airtime from another, print from a third. We plan and run the whole media campaign in one place, from the brief to the proof that it ran.",
    headingLines: ["Media", "Campaigns"],
    body: [
      "A media campaign is a schedule, not a list of placements. The billboard on the commute, the radio spot in the same drive time, the digital screen that changes message at rush hour and the press insertion on launch day should be planned against each other, because the audience meets them in sequence.",
      "Every plan starts with an audit of what the last campaign cost and what it returned, then is built from corridors, formats, belts and cycles, costed line by line. You see the impression model and the assumptions behind it, not a total at the bottom of a page.",
      "Outdoor media usually carries the frequency: the same audience passes the same face twice a day, five days a week. Fangrove's owned billboard and LED estate is in Lahore, and campaigns are planned and bought across Lahore, Islamabad and Karachi, with broadcast and national press across Pakistan. At the end you receive dated photographs, play logs, tear sheets and transmission reconciliation. If it did not run, you do not pay for it.",
    ],
    capabilities: [
      {
        title: "Media planning",
        description:
          "Reach, frequency and budget split across outdoor, digital, broadcast and press, with the impression model shown line by line.",
      },
      {
        title: "Outdoor media campaigns",
        description:
          "Billboards, hoardings, bridge panels and LED screens booked as corridor- or area-wide runs, not one face at a time.",
      },
      {
        title: "Media buying",
        description:
          "Owned outdoor sites in Lahore, plus TV, radio, cinema and newspaper space bought directly across Pakistan.",
      },
      {
        title: "Multi-media launches",
        description:
          "Outdoor, digital screens, broadcast and press sequenced to one launch date, from one schedule and one invoice.",
      },
      {
        title: "Production & mounting",
        description:
          "Artwork proofed, faces printed on our own floor and mounted by our own crews overnight. Nothing brokered out.",
      },
      {
        title: "Verification & reporting",
        description:
          "Dated photographs, digital play logs, press tear sheets and broadcast log reconciliation in a monthly pack.",
      },
    ],
    specs: [
      { label: "Markets", value: "Lahore · Islamabad · Karachi" },
      { label: "Media", value: "Billboards · DOOH · TV · radio · press" },
      { label: "Plan", value: "Costed line by line, with impression model" },
      { label: "Outdoor cycle", value: "Monthly, from the 1st or 16th" },
      { label: "Digital go-live", value: "Within 4 working hours of approval" },
      { label: "Reporting", value: "Monthly verification pack" },
    ],
    image: "lahoreStreet",
    metaTitle: "Media campaign planning & buying in Pakistan",
    metaDescription:
      "Billboard, outdoor media, digital screen, TV, radio and press campaigns planned and bought as one schedule from Lahore, costed line by line and verified.",
  },
] as const;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function serviceImage(service: Service): string {
  return images[service.image];
}

/** Next service in the sequence, wrapping at the end. Powers the page footer. */
export function nextService(slug: string): Service {
  const i = services.findIndex((service) => service.slug === slug);
  return services[(i + 1) % services.length]!;
}
