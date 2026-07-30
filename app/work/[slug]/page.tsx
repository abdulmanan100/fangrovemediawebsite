import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy, nextCaseStudy } from "@/content/work";
import { getService } from "@/content/services";
import { BLUR, images } from "@/lib/images";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return buildMetadata({ title: "Case study not found", description: "" });

  return buildMetadata({
    title: `${study.client} — ${study.title}`,
    description: study.metaDescription,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const upNext = nextCaseStudy(study.slug);
  const usedServices = study.serviceSlugs
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.client, path: `/work/${study.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${study.client} · ${study.year} · ${study.category}`}
        lines={study.headingLines}
        lede={study.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
        ]}
        compact
      />

      <section className="shell">
        <Reveal>
          <div className="relative aspect-16/9 overflow-hidden rounded-[var(--radius-lg)] bg-surface md:aspect-21/9">
            <Image
              src={images[study.heroImage]}
              alt={`${study.client} — ${study.title}`}
              fill
              priority
              sizes="(min-width: 1536px) 1400px, 96vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Results */}
      <section className="shell section-y">
        <dl className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {study.results.map((result, i) => (
            <div key={result.label} className="bg-bg p-7 md:p-9">
              <Reveal delay={i * 0.06}>
                <dd className="nums font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-accent">
                  {result.value}
                </dd>
                <dt className="text-body mt-4 text-muted">{result.label}</dt>
              </Reveal>
            </div>
          ))}
        </dl>
      </section>

      {/* Brief & approach */}
      <section className="shell pb-[var(--spacing-section)]">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-label border-t border-line pt-5 text-subtle">The brief</h2>
            </Reveal>
            {study.brief.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className={`text-subhead text-muted ${i === 0 ? "mt-7" : "mt-6"}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <h2 className="text-label mt-16 border-t border-line pt-5 text-subtle">
                What we did
              </h2>
            </Reveal>
            {study.approach.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className={`text-body text-muted ${i === 0 ? "mt-7" : "mt-6"}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <h2 className="text-label border-t border-line pt-5 text-subtle">Placements</h2>
              <ul className="mt-6 space-y-3.5">
                {study.placements.map((placement) => (
                  <li key={placement} className="flex gap-3 text-sm text-muted">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {placement}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-label mt-12 border-t border-line pt-5 text-subtle">
                Services used
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {usedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-block rounded-[var(--radius-full)] border border-line-strong px-4 py-2 text-xs text-muted transition-colors hover:border-ink/40 hover:text-ink"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="rule">
        <div className="shell section-y">
          <ul className="grid gap-6 md:grid-cols-3">
            {study.gallery.map((key, i) => (
              <li key={`${key}-${i}`}>
                <Reveal delay={i * 0.07}>
                  <div className="media-reveal relative aspect-4/5 overflow-hidden rounded-[var(--radius-md)] bg-surface">
                    <Image
                      src={images[key]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 31vw, 92vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next case study */}
      <section className="rule">
        <Link href={`/work/${upNext.slug}`} className="group block">
          <div className="shell flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="text-label text-subtle">Next project</span>
              <p className="text-display mt-4 transition-colors duration-300 group-hover:text-accent">
                {upNext.client}
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
