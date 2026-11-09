import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { BLUR, images } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Outdoor media & advertising services in Lahore",
  description:
    "Billboards and outdoor media, digital screens, TV and radio, press, printing, flex and full media campaigns, all run from one building in Lahore.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        eyebrow="What we run"
        lines={["Seven disciplines,", "one schedule."]}
        lede="Planning, buying, printing and mounting sit inside the same business. Nothing is brokered out, so nothing waits in a third party's queue — and nobody can blame a supplier you have never met."
      />

      <section className="shell pb-[var(--spacing-section)]">
        <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {services.map((service, i) => (
            <li
              key={service.slug}
              // Alternating vertical offset breaks the grid into a reading
              // order rather than seven items of identical weight.
              className={i % 2 === 1 ? "md:mt-20" : undefined}
            >
              <Reveal delay={Math.min((i % 2) * 0.08, 0.16)}>
                <Link href={`/services/${service.slug}`} className="group block">
                  <div className="media-reveal relative aspect-4/3 overflow-hidden rounded-[var(--radius-lg)] bg-surface">
                    <Image
                      src={images[service.image]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 46vw, 92vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover"
                    />
                    <span className="absolute left-5 top-5 rounded-[var(--radius-sm)] bg-bg/80 px-3 py-1.5 text-label text-ink backdrop-blur-sm">
                      {service.eyebrow}
                    </span>
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <span className="nums text-label text-accent">{service.index}</span>
                      <h2 className="text-headline mt-3 transition-colors duration-300 group-hover:text-accent">
                        {service.title}
                      </h2>
                      <p className="text-body mt-3 max-w-md text-muted">{service.summary}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-subtle transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <ContactCTA index="02" />
    </>
  );
}
