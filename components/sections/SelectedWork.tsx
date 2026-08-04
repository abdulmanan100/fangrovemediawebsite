import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CampaignCard } from "@/components/work/CampaignCard";
import { campaigns } from "@/content/work";

const featured = campaigns.slice(0, 2);

/**
 * Two campaigns, offset vertically. A symmetrical pair of equal cards would
 * give both the same weight; the offset creates a reading order.
 */
export function SelectedWork() {
  return (
    <section className="section-y" aria-labelledby="work-heading">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Selected work"
          lines={["Campaigns that", "had to hold up", "in traffic."]}
          lede="Outdoor is judged at speed, in bad light, by someone who is not looking for it. Everything below was built for that."
          link={{ href: "/work", label: "All work" }}
        />
        <h2 id="work-heading" className="sr-only">
          Selected work
        </h2>

        <div className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {featured.map((campaign, i) => (
            <Reveal
              key={campaign.slug}
              delay={i * 0.08}
              className={i === 1 ? "lg:mt-28" : undefined}
            >
              <CampaignCard
                campaign={campaign}
                ratio={i === 0 ? "landscape" : "portrait"}
                sizes="(min-width: 1024px) 46vw, 92vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
