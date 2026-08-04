/**
 * Studio content: client roster, working process, team, and the numbers that
 * appear on the About page.
 *
 * ⚠ The client roster and team below are PLACEHOLDERS — invented names so the
 * layout can be reviewed with realistic content. Replace both before launch.
 * See ASSETS.md.
 */

/**
 * Client roster — real brands the company has run campaigns for, carried over
 * from the previous Omelet Advertising portfolio.
 *
 * Add to this list only where there is a campaign to point at. The marquee is
 * the most-scanned credibility signal on the site.
 */
export const clients: readonly string[] = [
  "Carrefour",
  "Packages Mall",
  "Metro Cash & Carry",
  "IGI Life",
  "ACCA",
  "Al Fatah",
  "Car First",
  "Condis by Spain",
  "Zero Carbon Solar",
  "Asghar Ali Perfumes",
];

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
  /** What the client actually receives at the end of this step. */
  deliverable: string;
};

export const process: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Brief & audit",
    body: "We start by asking what the last campaign cost and what it returned. Most media problems are inherited, and the fastest saving usually comes from stopping something rather than starting something.",
    deliverable: "Written audit of current spend and gaps",
  },
  {
    index: "02",
    title: "Plan",
    body: "Corridors, formats, belts and cycles, costed line by line. You see the impression model and the assumptions behind it, not a total at the bottom of a page.",
    deliverable: "Costed plan with impression model",
  },
  {
    index: "03",
    title: "Artwork & proof",
    body: "Files are checked before plates or faces are committed. Colour is proofed against the illumination the piece will live under — front-lit and back-lit are not the same job.",
    deliverable: "Signed-off proof on production stock",
  },
  {
    index: "04",
    title: "Production",
    body: "Printed on our own floor, on the substrate the site's wind loading and lighting call for. Nothing is brokered out, so nothing waits in someone else's queue.",
    deliverable: "Faces produced, batched by route",
  },
  {
    index: "05",
    title: "Mount & go live",
    body: "Own crews, own hoists, overnight windows. Digital creative goes live within four working hours of approval. Broadcast is booked and cleared before the first air date.",
    deliverable: "Photographic proof of every mount",
  },
  {
    index: "06",
    title: "Verify",
    body: "Play logs for digital, tear sheets for press, transmission reconciliation for broadcast, and a dated photograph for every static face. If it did not run, you do not pay for it.",
    deliverable: "Monthly verification pack",
  },
];

export type Principle = { title: string; body: string };

export const principles: readonly Principle[] = [
  {
    title: "Own the asset",
    body: "We buy and maintain our own structures. Reselling someone else's inventory means inheriting their maintenance schedule and their excuses.",
  },
  {
    title: "Publish the numbers",
    body: "Every site lists its dimensions, illumination, approach direction and modelled impressions before you enquire. Opacity is how this industry has historically made its margin.",
  },
  {
    title: "Verify everything",
    body: "A dated photograph, a play log, a tear sheet. Proof is a deliverable, not a favour.",
  },
  {
    title: "Say no to the wrong buy",
    body: "We have talked clients out of digital screens, off television, and down to two billboards. A smaller correct invoice is worth more than a large wrong one.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public. Optional — the card falls back to a flat plate. */
  photo?: string;
};

/**
 * Empty on purpose.
 *
 * The About page skips the whole team section while this is empty, which is
 * better than shipping four cards reading "Placeholder Name". Add real people
 * and the section reappears with no other changes.
 */
export const team: readonly TeamMember[] = [];

/**
 * Confirmed company figures, used on the About page.
 *
 * This replaced an invented year-by-year timeline. Every number here is
 * verifiable; a reconstructed history was not. If the real milestones become
 * available, a timeline is a better story than a stat grid — but not at the
 * cost of making the years up.
 */
export const facts: readonly { value: string; label: string; note: string }[] = [
  {
    value: "2008",
    label: "Founded",
    note: "Working with brands in Lahore since, through every shift in how outdoor is bought.",
  },
  {
    value: "250+",
    label: "Brands",
    note: "Local and international, from single-face bookings to multi-corridor campaigns.",
  },
  {
    value: "30+",
    label: "Staff",
    note: "Sales, planning, media buying, creative design and the production floor.",
  },
];
