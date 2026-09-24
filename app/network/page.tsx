import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { NetworkExplorer } from "@/components/network/NetworkExplorer";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, mediaSiteSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  availableSites,
  digitalScreens,
  sites,
  sitesByArea,
  totalDailyImpressions,
  totalSites,
} from "@/content/sites";
import { compactNumber, dimensions } from "@/lib/format";

export const metadata = buildMetadata({
  title: `${totalSites} billboard & LED sites in Lahore, on a map`,
  description:
    "Every Fangrove billboard, LED screen and bridge panel in Lahore on one map — face size, lighting and daily audience for each. Filter by area and format.",
  path: "/network",
});

export default function NetworkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Network", path: "/network" },
        ])}
      />
      {/* One Place record per site — this is what makes individual structures
          discoverable for "billboard on <road name>" style local searches. */}
      {sites.map((site) => (
        <JsonLd key={site.id} data={mediaSiteSchema(site)} />
      ))}

      <PageHero
        eyebrow="The estate"
        lines={["Every site.", "Every number."]}
        lede="Filter by area, format, illumination or availability. Face dimensions, direction of approach and daily audience are published for every structure — before you enquire, and without a phone call."
        meta={[
          { label: "Owned sites", value: String(totalSites) },
          { label: "Available now", value: String(availableSites) },
          { label: "Digital screens", value: String(digitalScreens) },
          { label: "Daily impressions", value: compactNumber(totalDailyImpressions) },
        ]}
        compact
      />

      {/* useSearchParams needs a Suspense boundary to keep the shell static. */}
      <Suspense
        fallback={
          <div className="shell py-24">
            <p className="text-label text-subtle">Loading network…</p>
          </div>
        }
      >
        <NetworkExplorer />
      </Suspense>

      <section className="shell section-y">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <h2 className="text-section lg:col-span-5">How to read a site.</h2>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            <p className="text-body text-muted">
              <strong className="font-medium text-ink">Daily audience</strong> is the
              figure we hold against each structure in our own inventory records. It is an
              estimate of vehicles and pedestrians passing the face, not a guaranteed
              impression count — ask and we will talk you through how a given site was
              assessed.
            </p>
            <p className="text-body text-muted">
              <strong className="font-medium text-ink">Direction of approach</strong>{" "}
              matters more than size. A 30 × 15 face a driver approaches head-on for four
              hundred metres outperforms a 60 × 20 they pass at an angle.
            </p>
            <p className="text-body text-muted">
              <strong className="font-medium text-ink">Illumination</strong> decides the
              hours you are actually buying. A non-lit face in Lahore is a twelve-hour
              medium in December, and it is priced that way.
            </p>
            <p className="text-body text-subtle">
              Booked sites are shown rather than hidden, and availability moves constantly.
              It is always worth asking about a face that reads as taken — the cycle behind
              it may be days from ending.
            </p>
          </div>
        </div>
      </section>

      {/* The same estate as plain links. The explorer above is interactive and
          renders client-side, so this index is the crawlable route from this
          page to every site's own page — and a quicker scan for anyone who
          already knows the road they want. */}
      <section className="rule">
        <div className="shell section-y">
          <h2 className="text-section max-w-[16ch]">Every site, by area.</h2>

          <div className="mt-[var(--spacing-group)] gap-x-12 md:columns-2 lg:columns-3">
            {sitesByArea().map((group) => (
              <div key={group.area} className="mb-10 break-inside-avoid">
                <h3 className="text-label flex items-baseline justify-between border-t border-line pt-5 text-subtle">
                  {group.area}
                  <span className="nums">{group.sites.length}</span>
                </h3>
                <ul className="mt-3">
                  {group.sites.map((site) => (
                    <li key={site.id}>
                      <Link href={`/network/${site.id}`} className="group block py-2.5">
                        <span className="block text-sm text-ink transition-colors group-hover:text-accent">
                          {site.name}
                        </span>
                        <span className="nums mt-1 block text-xs text-subtle">
                          {site.format} · {dimensions(site.widthFt, site.heightFt)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA index="02" />
    </>
  );
}
