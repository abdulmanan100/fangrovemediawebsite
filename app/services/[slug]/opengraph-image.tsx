import { getService, services } from "@/content/services";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Fangrove Media service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return ogCard({ headline: "Fangrove Media" });

  return ogCard({
    eyebrow: `${service.index} — ${service.eyebrow}`,
    headline: service.title,
    detail: service.summary,
  });
}
