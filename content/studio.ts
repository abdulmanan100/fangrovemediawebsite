/**
 * Studio content: client roster, working process, team, and the numbers that
 * appear on the About page.
 *
 * ⚠ The client roster and team below are PLACEHOLDERS — invented names so the
 * layout can be reviewed with realistic content. Replace both before launch.
 * See ASSETS.md.
 */

/** Marquee roster. Invented names — replace with real clients. */
export const clients: readonly string[] = [
  "Karvaan Mobility",
  "Riwaj",
  "Almas Steel",
  "Chinar Foods",
  "Nishan Telecom",
  "Waseeb Agri",
  "Meraj Developers",
  "Sahil Bank",
  "Qandeel Pharma",
  "Rawal Cement",
  "Anaya Retail",
  "Barq Energy",
  "Sada Logistics",
  "Noorani Textiles",
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
};

/** ⚠ Invented people. Replace with the real team and their photographs. */
export const team: readonly TeamMember[] = [
  {
    name: "Placeholder Name",
    role: "Founder & Managing Director",
    bio: "Replace with the founder's background — years in the industry, previous agencies, what they built here.",
  },
  {
    name: "Placeholder Name",
    role: "Director, Media Operations",
    bio: "Replace with a short bio covering planning, buying and the client relationships they own.",
  },
  {
    name: "Placeholder Name",
    role: "Head of Production",
    bio: "Replace with a bio covering the print floor, substrates, colour management and the mounting crews.",
  },
  {
    name: "Placeholder Name",
    role: "Head of Broadcast",
    bio: "Replace with a bio covering channel relationships, planning tools and log reconciliation.",
  },
];

/** Facts used on the About page timeline. Replace with the real history. */
export const milestones: readonly { year: string; text: string }[] = [
  { year: "2014", text: "Founded in Lahore with a single print floor and two roadside faces." },
  { year: "2017", text: "First gantry structure erected on the Ferozepur Road corridor." },
  { year: "2019", text: "Broadcast desk opened; first full-service television and radio plans." },
  { year: "2021", text: "Large-format production brought fully in-house — print and mounting on one schedule." },
  { year: "2023", text: "First digital LED screens commissioned on Main Boulevard and Johar Town." },
  { year: "2025", text: "Network extended to five cities across Punjab, Sindh and the capital." },
];
