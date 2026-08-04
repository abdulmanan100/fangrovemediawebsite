import Image from "next/image";
import type { Campaign } from "@/content/work";
import { services } from "@/content/services";
import { BLUR } from "@/lib/images";

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  services.map((service) => [service.slug, service.shortTitle]),
);

type Props = {
  campaign: Campaign;
  ratio?: "portrait" | "landscape";
  sizes?: string;
  priority?: boolean;
};

/**
 * A portfolio card, not a case-study teaser — there is no written case study
 * behind these, and a detail page that repeats the card back at you is worse
 * than no detail page.
 *
 * Campaigns without a verified photograph of their own creative render as a
 * typographic panel instead of borrowing an unrelated board. The mixed grid is
 * the honest presentation and reads as deliberate rather than thin.
 */
export function CampaignCard({
  campaign,
  ratio = "landscape",
  sizes = "(min-width: 1024px) 46vw, 92vw",
  priority = false,
}: Props) {
  const shape = ratio === "portrait" ? "aspect-4/5" : "aspect-16/11";

  return (
    <figure className="group">
      {campaign.image ? (
        <div className={`media-reveal relative overflow-hidden rounded-[var(--radius-lg)] bg-surface ${shape}`}>
          <Image
            src={campaign.image}
            alt={`${campaign.client} creative running on a Fangrove site in Lahore`}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
          <span className="absolute left-5 top-5 rounded-[var(--radius-sm)] bg-bg/80 px-3 py-1.5 text-label text-ink backdrop-blur-sm">
            {campaign.category}
          </span>
        </div>
      ) : (
        // Sized by its content rather than matched to the photo ratio — a tall
        // panel holding two lines of text reads as a missing image.
        <div className="flex min-h-[15rem] flex-col justify-between rounded-[var(--radius-lg)] border border-line bg-surface p-7 transition-colors duration-300 group-hover:border-line-strong">
          <span className="text-label text-subtle">{campaign.category}</span>
          <div>
            <span
              className="block font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink/90"
              aria-hidden="true"
            >
              {campaign.client}
            </span>
            <ul className="mt-5 flex flex-wrap gap-2">
              {campaign.serviceSlugs.map((slug) => (
                <li
                  key={slug}
                  className="rounded-[var(--radius-full)] border border-line px-3 py-1.5 text-label text-subtle"
                >
                  {SERVICE_LABELS[slug] ?? slug}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <figcaption className="mt-6">
        <div className="flex items-baseline gap-3">
          <span className="text-label text-accent">{campaign.client}</span>
          {campaign.year && (
            <span className="nums text-label text-subtle">{campaign.year}</span>
          )}
        </div>
        <p className="text-headline mt-3 max-w-md">{campaign.title}</p>
      </figcaption>
    </figure>
  );
}
