import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { CampaignCard } from "@/components/work/CampaignCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { campaigns } from "@/content/work";
import { company } from "@/content/company";
import { sites } from "@/content/sites";
import { BLUR } from "@/lib/images";

/** Faces whose photography shows live creative — the strongest shots. */
const gallery = sites.filter((site) => site.format === "Billboard").slice(0, 12);

export const metadata = buildMetadata({
  title: "Work — campaigns built for traffic",
  description:
    "Out-of-home and DOOH campaigns from Fangrove Media for Carrefour, Packages Mall, Metro Cash & Carry, IGI Life, ACCA, Al Fatah and others across Lahore.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <PageHero
        eyebrow="Selected work"
        lines={["Built to hold up", "in traffic."]}
        lede={`Outdoor is judged at forty kilometres an hour, in bad light, by somebody who is not looking for it. Everything below was planned for that constraint — part of the ${company.stats.brandsServed}+ brands we have run since ${company.founded}.`}
      />

      <section className="shell pb-[var(--spacing-section)]">
        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {campaigns.map((campaign, i) => (
            <Reveal
              key={campaign.slug}
              delay={(i % 2) * 0.08}
              className={i % 2 === 1 ? "lg:mt-24" : undefined}
            >
              <CampaignCard
                campaign={campaign}
                ratio={i % 3 === 1 ? "portrait" : "landscape"}
                sizes="(min-width: 1024px) 46vw, 92vw"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Real site photography, labelled as inventory rather than as any one
          client's campaign. */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <p className="text-label text-accent">Live on our faces</p>
            <h2 className="text-section mt-7 max-w-[18ch]">
              Our sites, carrying somebody&apos;s campaign.
            </h2>
            <p className="text-subhead mt-7 max-w-2xl text-muted">
              Every photograph below is one of our own structures in Lahore, shot on
              site. The creative belongs to whoever had the face booked that month.
            </p>
          </Reveal>

          <ul className="mt-[var(--spacing-group)] grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((site, i) => (
              <li key={site.id}>
                <Reveal delay={Math.min(i * 0.04, 0.3)}>
                  <Link href={`/network/${site.id}`} className="group block">
                    <div className="media-reveal relative aspect-4/3 overflow-hidden rounded-[var(--radius-md)] bg-surface">
                      <Image
                        src={site.photo}
                        alt={`${site.name} — ${site.format} in ${site.area}, Lahore`}
                        fill
                        sizes="(min-width: 768px) 23vw, 46vw"
                        placeholder="blur"
                        blurDataURL={BLUR}
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 truncate text-xs text-subtle transition-colors group-hover:text-ink">
                      {site.area} · {site.widthFt} × {site.heightFt} ft
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA index="03" />
    </>
  );
}
