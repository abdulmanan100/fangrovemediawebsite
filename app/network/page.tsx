import { Suspense } from "react";
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
  totalDailyImpressions,
  totalSites,
} from "@/content/sites";
import { compactNumber } from "@/lib/format";

export const metadata = buildMetadata({
  title: "The Network — every site, published",
  description:
    "Browse Fangrove's owned media estate: billboards, unipoles, gantries and digital LED across Lahore, Islamabad, Karachi, Faisalabad and Multan. Filter by city, format and illumination, with dimensions and daily impressions for every site.",
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
        lede="Filter by city, format, illumination or availability. Dimensions, direction of approach and modelled daily impressions are published for all of it — before you enquire, and without a phone call."
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
              <strong className="font-medium text-ink">Daily impressions</strong> are
              modelled from traffic counts, approach speed and dwell time at the nearest
              signal — not from a rate card. They are an estimate, and we will show you
              the working if you ask for it.
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
              Booked sites are shown rather than hidden. Availability changes monthly and
              cycles usually open on the 1st and the 16th — worth asking about a site even
              when it reads as taken.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA index="02" />
    </>
  );
}
