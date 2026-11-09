import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { Enter } from "@/components/ui/Enter";
import { CampaignCard } from "@/components/work/CampaignCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getService, nextService, services } from "@/content/services";
import { campaignsForService } from "@/content/work";
import { postsForService } from "@/content/blog";
import { FurtherReading } from "@/components/blog/FurtherReading";
import { BLUR, images } from "@/lib/images";
import { pad2 } from "@/lib/format";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return buildMetadata({ title: "Service not found", description: "" });

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: `/services/${service.slug}/opengraph-image`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = campaignsForService(service.slug).slice(0, 2);
  const upNext = nextService(service.slug);

  return (
    <>
      <JsonLd data={serviceSchema(service.slug, service.title, service.metaDescription)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${service.index} — ${service.eyebrow}`}
        lines={service.headingLines}
        lede={service.lede}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        compact
      />

      {/* Hero image */}
      <section className="shell">
        {/* <Enter>, not <Reveal>: this image is the page's largest paint. */}
        <Enter>
          <div className="relative aspect-16/9 overflow-hidden rounded-[var(--radius-lg)] bg-surface md:aspect-21/9">
            <Image
              src={images[service.image]}
              alt={`${service.title} — Fangrove Media`}
              fill
              priority
              sizes="(min-width: 1536px) 1400px, 96vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
        </Enter>
      </section>

      {/* Body */}
      <section className="shell section-y">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {service.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={`text-subhead text-muted ${i > 0 ? "mt-7" : ""}`}>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <h2 className="text-label border-t border-line pt-5 text-subtle">
                Specification
              </h2>
              <dl className="mt-6">
                {service.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 gap-4 border-b border-line py-3.5"
                  >
                    <dt className="text-xs text-subtle">{spec.label}</dt>
                    <dd className="nums text-xs text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Capabilities */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <h2 className="text-section max-w-[14ch]">What that covers.</h2>
          </Reveal>

          <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability, i) => (
              <li key={capability.title}>
                <Reveal delay={Math.min(i * 0.05, 0.25)}>
                  <div className="border-t border-line pt-6">
                    <span className="nums text-label text-accent">{pad2(i + 1)}</span>
                    <h3 className="mt-4 text-lg font-medium text-ink">{capability.title}</h3>
                    <p className="text-body mt-3 text-muted">{capability.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="rule">
          <div className="shell section-y">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-section">Where we have used it.</h2>
                <Link
                  href="/work"
                  className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-ink"
                >
                  All work
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <div className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-14 lg:grid-cols-2">
              {related.map((study, i) => (
                <Reveal key={study.slug} delay={i * 0.08}>
                  <CampaignCard campaign={study} sizes="(min-width: 1024px) 46vw, 92vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FurtherReading posts={postsForService(service.slug)} />

      {/* Next service */}
      <section className="rule">
        <Link href={`/services/${upNext.slug}`} className="group block">
          <div className="shell flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-label text-subtle">Next service</span>
              <p className="text-display mt-4 transition-colors duration-300 group-hover:text-accent">
                {upNext.title}
              </p>
            </div>
            <ArrowUpRight
              className="size-9 shrink-0 text-subtle transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-hover:text-ink"
              aria-hidden="true"
            />
          </div>
        </Link>
      </section>

      <ContactCTA index="03" />
    </>
  );
}
