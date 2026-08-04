import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import {
  areaBreakdown,
  digitalScreens,
  largestFace,
  totalDailyImpressions,
  totalSites,
} from "@/content/sites";
import { BLUR, images } from "@/lib/images";

const metrics = [
  { value: totalSites, label: "Sites in Lahore", format: "plain" as const },
  { value: areaBreakdown().length, label: "Areas covered", format: "plain" as const },
  {
    value: totalDailyImpressions,
    label: "Daily audience",
    format: "compact" as const,
  },
  { value: digitalScreens, label: "Digital screens", format: "plain" as const },
];

/** Top areas by site count, for the strip under the metrics. */
const topAreas = areaBreakdown().slice(0, 7);

/**
 * The teaser for the thing no competitor publishes: the actual estate, with
 * numbers attached. Everything here derives from content/sites.ts, so the
 * headline figures can never drift out of sync with the inventory.
 */
export function NetworkPreview() {
  return (
    <section className="relative overflow-hidden bg-surface" aria-labelledby="network-heading">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={images.streetNight}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover opacity-35 grayscale"
        />
        <div className="absolute inset-0 bg-bg/55" />
      </div>

      <div className="shell section-y relative z-10">
        <Reveal>
          <div className="flex items-baseline gap-4 border-t border-line-strong pt-5">
            <span className="text-label nums text-accent">02</span>
            <span className="text-label text-muted">The estate</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <RevealLines
            lines={["We publish", "every site."]}
            as="h2"
            className="text-section lg:col-span-6"
            delay={0.05}
          />
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={0.12}>
              <p className="text-subhead text-muted">
                Dimensions, illumination, direction of approach and modelled daily
                impressions — for every structure, before you enquire. Opacity is how
                this industry has always made its margin. We would rather compete on
                the sites.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Metrics */}
        <dl className="mt-[var(--spacing-group)] grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div key={metric.label} className="bg-bg p-7 md:p-9">
              <Reveal delay={i * 0.06}>
                <dt className="text-label text-subtle">{metric.label}</dt>
                <dd
                  className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]"
                >
                  <Counter value={metric.value} format={metric.format} />
                </dd>
              </Reveal>
            </div>
          ))}
        </dl>

        {/* Area breakdown */}
        <ul className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          {topAreas.map((entry, i) => (
            <li key={entry.area}>
              <Reveal delay={i * 0.05}>
                <span className="flex items-baseline gap-2.5">
                  <span className="text-headline">{entry.area}</span>
                  <span className="nums text-label text-accent">{entry.count}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.08}>
          <p className="text-body mt-9 max-w-xl text-subtle">
            Largest face in the estate: {largestFace.widthFt} × {largestFace.heightFt} ft at{" "}
            {largestFace.area}.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/network"
            className="group mt-14 inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink px-7 py-4 text-sm font-medium text-bg transition-colors duration-200 hover:bg-white"
          >
            Browse the network
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>

      <h2 id="network-heading" className="sr-only">
        Our media network
      </h2>
    </section>
  );
}
