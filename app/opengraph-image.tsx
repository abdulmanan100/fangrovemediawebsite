import { company } from "@/content/company";
import { areaBreakdown, totalSites } from "@/content/sites";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = `${company.name} — Billboard & Outdoor Advertising in Lahore`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Site-wide card. Pages without a card of their own point here via lib/seo.ts. */
export default function Image() {
  return ogCard({
    headline: ["Attention", "is a place."],
    detail: `Out-of-home, broadcast and print. ${totalSites} owned sites across ${areaBreakdown().length} areas of Lahore.`,
  });
}
