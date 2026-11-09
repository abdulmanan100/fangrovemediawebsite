import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { Enter } from "@/components/ui/Enter";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, mediaSiteSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getSite, nearestSites, sites } from "@/content/sites";
import { postsForSite } from "@/content/blog";
import { FurtherReading } from "@/components/blog/FurtherReading";
import { company, whatsapp } from "@/content/company";
import { BLUR } from "@/lib/images";
import {
  areaSqFt,
  compactNumber,
  dimensions,
  distance,
  groupedNumber,
  mailto,
} from "@/lib/format";

export function generateStaticParams() {
  return sites.map((site) => ({ id: site.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) return buildMetadata({ title: "Site not found", description: "" });

  // Specs first, then whichever of the note or the approach still fits a
  // search snippet (~160 characters) — a complete sentence rather than one
  // Google cuts off halfway. The note comes first because it is written per
  // site: faces on the same junction share specs and approach, and without it
  // their descriptions came out identical.
  const specs = `${site.format} in ${site.area}, ${site.city}. ${dimensions(site.widthFt, site.heightFt)}, ${site.illumination.toLowerCase()}, about ${compactNumber(site.dailyImpressions)} daily impressions.`;
  const extra = [site.note, `${site.facing}.`].find(
    (sentence) => sentence && specs.length + 1 + sentence.length <= 160,
  );

  // Place first, format second: "Jinnah Flyover — Billboard in Lahore". Names
  // already carry their own dash, so it becomes a comma here to keep one.
  return buildMetadata({
    title: `${site.name.replaceAll(" — ", ", ")} — ${site.format} in ${site.city}`,
    description: extra ? `${specs} ${extra}` : specs,
    path: `/network/${site.id}`,
    image: `/network/${site.id}/opengraph-image`,
    brand: false,
  });
}

export default async function SitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) notFound();

  const available = site.status === "available";
  const nearby = nearestSites(site, 4);

  const specs = [
    { label: "Format", value: site.format },
    { label: "Dimensions", value: dimensions(site.widthFt, site.heightFt) },
    { label: "Face area", value: `${groupedNumber(areaSqFt(site.widthFt, site.heightFt))} sq ft` },
    { label: "Illumination", value: site.illumination },
    { label: "Exposure", value: site.faces },
    { label: "Area", value: site.area },
    { label: "Daily impressions", value: groupedNumber(site.dailyImpressions) },
    { label: "Reference", value: site.id.toUpperCase() },
  ];

  const enquiry = mailto(
    company.contact.salesEmail,
    `Rate enquiry — ${site.name} (${site.id})`,
    `Hello Fangrove,\n\nPlease send rates and availability for:\n\n` +
      `Site:          ${site.name}\n` +
      `Reference:     ${site.id}\n` +
      `Location:      ${site.area}, ${site.city}\n` +
      `Format:        ${site.format}, ${dimensions(site.widthFt, site.heightFt)}, ${site.illumination}\n\n` +
      `Required from:  \nDuration:       \nCompany:        \nContact number: \n\nThank you.`,
  );

  return (
    <>
      <JsonLd data={mediaSiteSchema(site)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Network", path: "/network" },
          { name: site.name, path: `/network/${site.id}` },
        ])}
      />

      <PageHero
        eyebrow={`${site.area}, ${site.city}`}
        lines={[site.name]}
        lede={site.note}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Network", href: "/network" },
        ]}
        compact
      />

      <section className="shell pb-[var(--spacing-section)]">
        {/* <Enter>, not <Reveal>: this photo is the page's largest paint. */}
        <Enter>
          <div className="relative aspect-16/9 overflow-hidden rounded-[var(--radius-lg)] bg-surface">
            <Image
              src={site.photo}
              alt={`${site.name} — ${site.format} in ${site.area}, ${site.city}`}
              fill
              priority
              sizes="(min-width: 1536px) 1400px, 96vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
            <span
              className={`absolute left-5 top-5 flex items-center gap-2 rounded-[var(--radius-sm)] bg-bg/85 px-3.5 py-2 text-label backdrop-blur ${
                available ? "text-available" : "text-booked"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${available ? "bg-available" : "bg-booked"}`}
                aria-hidden="true"
              />
              {available ? "Available" : "Booked"}
            </span>
          </div>
        </Enter>

        <div className="mt-[var(--spacing-group)] grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-label text-subtle">Specification</h2>
            </Reveal>
            <Reveal>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-bg p-5">
                    <dt className="text-label text-subtle">{spec.label}</dt>
                    <dd className="nums mt-2.5 text-sm text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <h2 className="text-label mt-14 text-subtle">Approach</h2>
              <p className="text-subhead mt-5 max-w-prose text-muted">{site.facing}</p>
            </Reveal>

            <Reveal>
              <h2 className="text-label mt-14 text-subtle">Coordinates</h2>
              <p className="nums mt-5 text-lg text-ink">
                {site.coords[0].toFixed(5)}°N, {site.coords[1].toFixed(5)}°E
              </p>
              {site.pinApprox && (
                <p className="text-body mt-3 max-w-prose text-subtle">
                  This pin is placed on the road from the site&apos;s approach description
                  rather than geotagged exactly. Ask us for the precise location before
                  planning around it.
                </p>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.coords[0]},${site.coords[1]}`}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline group mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
              >
                Open in Google Maps
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="border border-line p-7">
                <p className="text-label text-subtle">Enquire</p>
                <p className="text-body mt-4 text-muted">
                  Rates are quoted per cycle and depend on duration.{" "}
                  <Link href="/rates" className="link-underline text-ink">
                    How rates work
                  </Link>
                  .
                </p>
                <a
                  href={whatsapp(
                    `Hello Fangrove — please send rates and availability for ` +
                      `${site.name} (${site.id}), ${site.format} ` +
                      `${dimensions(site.widthFt, site.heightFt)}, ${site.area}.`,
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-7 flex w-full items-center justify-center rounded-[var(--radius-md)] bg-ink px-6 py-4 text-sm font-medium text-bg transition-colors hover:bg-white"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href={company.contact.phoneHref}
                  className="nums mt-3 flex w-full items-center justify-center rounded-[var(--radius-md)] border border-line-strong px-6 py-4 text-sm text-ink transition-colors hover:bg-ink/8"
                >
                  {company.contact.phone}
                </a>
                <a
                  href={enquiry}
                  className="mt-3 flex w-full items-center justify-center rounded-[var(--radius-md)] border border-line px-6 py-3.5 text-sm text-muted transition-colors hover:bg-ink/8 hover:text-ink"
                >
                  Email instead
                </a>
              </div>
            </Reveal>

            {nearby.length > 0 && (
              <Reveal delay={0.08}>
                <div className="mt-9">
                  <h2 className="text-label text-subtle">Nearest sites</h2>
                  <ul className="mt-5">
                    {nearby.map(({ site: other, metres }) => (
                      <li key={other.id}>
                        <Link
                          href={`/network/${other.id}`}
                          className="group flex items-center justify-between gap-4 border-t border-line py-4"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm text-ink transition-colors group-hover:text-accent">
                              {other.name}
                            </span>
                            <span className="nums mt-1 block text-xs text-subtle">
                              {other.format} · {dimensions(other.widthFt, other.heightFt)} ·{" "}
                              {distance(metres)}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="size-4 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <Link
                href={`/network?area=${encodeURIComponent(site.area)}`}
                className="group mt-9 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                All {site.area} sites
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>

      <FurtherReading posts={postsForSite(site)} heading="Before you book." />

      <ContactCTA index="02" />
    </>
  );
}
