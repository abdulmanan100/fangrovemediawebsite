import { getSite, sites } from "@/content/sites";
import { compactNumber, dimensions } from "@/lib/format";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Fangrove Media site specification";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return sites.map((site) => ({ id: site.id }));
}

/** Per-site card: what a WhatsApp or LinkedIn share of a single face shows. */
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = getSite(id);

  if (!site) return ogCard({ headline: "Fangrove Media" });

  return ogCard({
    eyebrow: `${site.format} · ${site.area}, ${site.city}`,
    headline: site.name,
    detail: `${dimensions(site.widthFt, site.heightFt)} · ${site.illumination} · ${compactNumber(site.dailyImpressions)} daily audience`,
  });
}
