/**
 * Rates page copy.
 *
 * No prices yet — nothing here is a number the business has not already
 * published elsewhere on the site. Every line restates something from the
 * network page, the service specs or the process, gathered where someone
 * searching "billboard rates Lahore" will find it.
 *
 * When the business is ready to publish price ranges, they belong here and
 * on each site in content/sites.ts — the page should show real ranges rather
 * than a "from" figure nobody has confirmed.
 */

import { dimensions } from "@/lib/format";
import { largestFace, sites } from "@/content/sites";

export type RateNote = { title: string; body: string };

const smallestFace = sites.reduce((best, site) =>
  site.widthFt * site.heightFt < best.widthFt * best.heightFt ? site : best,
);

/** What moves the number. */
export const rateFactors: readonly RateNote[] = [
  {
    title: "Audience",
    body: "The audience a site carries is the largest part of its rate. Every site on the network shows the daily audience figure we hold for it, so two sites can be compared before you ask — and a premium corridor is priced as one.",
  },
  {
    title: "Size",
    body: `A bigger face carries a bigger rent and a bigger print. Dimensions and face area are published for every site, from ${dimensions(smallestFace.widthFt, smallestFace.heightFt)} up to the ${dimensions(largestFace.widthFt, largestFace.heightFt)} ${largestFace.format.toLowerCase()} in ${largestFace.area}.`,
  },
  {
    title: "Lighting",
    body: "Illumination decides the hours you are actually buying. A non-lit hoarding in Lahore is a twelve-hour medium in December; a front-lit or back-lit face keeps working through the evening commute, and the rate reflects it.",
  },
  {
    title: "Booking cycle",
    body: "Static sites are booked by the month, starting on the 1st or the 16th. Rates are quoted per cycle and depend on how many cycles you take.",
  },
  {
    title: "Share of voice",
    body: "On a digital or SMD screen you are buying slots in a loop, not a face. Loops run 80 seconds with at most ten advertisers, slots are 8 seconds as standard, and we state the cost per thousand impressions before you sign.",
  },
];

/** What to include in an enquiry so the rate can come back the same day. */
export const rateRequest: readonly RateNote[] = [
  {
    title: "The site",
    body: "The reference from the site's page — or just the road or area, and we will suggest faces.",
  },
  {
    title: "The start",
    body: "Which cycle you want to go live in: the 1st or the 16th of the month.",
  },
  {
    title: "The length",
    body: "How many cycles. One month and six are priced differently.",
  },
];

/** What happens between booking and proof of run, in order. */
export const afterBooking: readonly RateNote[] = [
  {
    title: "Artwork",
    body: "Files are due 72 hours before the mount, and are checked against the face size and its lighting before anything is printed.",
  },
  {
    title: "Print",
    body: "Flex is printed on our own floor — 440 to 650 gsm star flex, chosen for the site's wind load and lighting.",
  },
  {
    title: "Mount",
    body: "Our own crews mount overnight, between 11 p.m. and 5 a.m. Digital creative goes live within four working hours of approval.",
  },
  {
    title: "Proof",
    body: "A dated photograph of every static face and a weekly play log for every screen. If it did not run, you do not pay for it.",
  },
];
