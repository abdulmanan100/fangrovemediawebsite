import Image from "next/image";
import type { Campaign } from "@/content/work";
import { services } from "@/content/services";
import { BLUR } from "@/lib/images";

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  services.map((service) => [service.slug, service.shortTitle]),
);

type Props = {
  campaign: Campaign;
  sizes?: string;
  priority?: boolean;
};

/**
 * A portfolio card: one campaign, one photograph of the creative on the face
 * that carried it.
 *
 * Every poster is cropped 21:9 from the top. That framing is not decorative —
 * the campaign reels these frames come from carry an old logo in the top-right
 * corner, and dropping the top strip removes it while keeping the full width,
 * so nothing of the board itself is lost.
 *
 * Deliberately not a link and not a player. There are no written case studies
 * behind these, and the reels cannot be shown because the old logo is burnt
 * into the footage.
 */
export function CampaignCard({
  campaign,
  sizes = "(min-width: 1024px) 46vw, 92vw",
  priority = false,
}: Props) {
  return (
    <figure className="group">
      {/* The chip sits outside the framed image so it keeps its own crisp
          edges rather than scaling with the photo on hover. */}
      <div className="relative">
        <div className="media-reveal media-reveal-colour relative aspect-21/9 overflow-hidden rounded-[var(--radius-lg)] bg-surface">
          <Image
            src={campaign.poster}
            alt={campaign.posterAlt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-5 top-5 rounded-[var(--radius-sm)] bg-bg/75 px-3 py-1.5 text-label text-ink backdrop-blur-sm">
          {campaign.category}
        </span>
      </div>

      <figcaption className="mt-6">
        <div className="flex items-baseline gap-3">
          <span className="text-label text-accent">{campaign.client}</span>
          {campaign.year && (
            <span className="nums text-label text-subtle">{campaign.year}</span>
          )}
        </div>
        <p className="text-headline mt-3 max-w-md">{campaign.title}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {campaign.serviceSlugs.map((slug) => (
            <li
              key={slug}
              className="rounded-[var(--radius-full)] border border-line px-3 py-1.5 text-label text-subtle"
            >
              {SERVICE_LABELS[slug] ?? slug}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
