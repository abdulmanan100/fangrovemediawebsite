import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Fangrove Media Journal";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Journal",
    headline: "Outdoor advertising, explained.",
    detail: "Guides to buying billboards, screens and print in Lahore.",
  });
}
