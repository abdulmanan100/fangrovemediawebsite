"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { BLUR, images } from "@/lib/images";

/**
 * The signature interaction: a sticky image panel that swaps as you move down
 * the service list. On touch and narrow viewports the panel is dropped
 * entirely and each row carries its own thumbnail — the same information,
 * without an interaction that cannot be performed.
 */
export function ServicesOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const active = services[activeIndex]!;

  return (
    <section className="section-y" aria-labelledby="services-heading">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="What we run"
          lines={["Seven disciplines,", "one schedule."]}
          lede="A media owner and an advertising agency in one building: media is bought, printed and mounted inside the same business. That is the whole advantage — nothing waits in a third party's queue."
          link={{ href: "/services", label: "All services" }}
        />
        <h2 id="services-heading" className="sr-only">
          Services
        </h2>

        <div className="mt-[var(--spacing-group)] grid gap-x-16 lg:grid-cols-12">
          {/* Sticky preview — desktop only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-4/5 overflow-hidden rounded-[var(--radius-lg)] bg-surface">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.slug}
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[active.image]}
                    alt=""
                    fill
                    sizes="40vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-bg/25" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <span className="text-label text-ink/80">{active.eyebrow}</span>
                <span className="nums text-label text-accent">{active.index}</span>
              </div>
            </div>
          </div>

          {/* List */}
          <ul className="lg:col-span-7">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Reveal delay={Math.min(i * 0.05, 0.25)}>
                  <Link
                    href={`/services/${service.slug}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-4 border-t border-line py-8 transition-colors duration-300 hover:border-line-strong sm:gap-x-8"
                  >
                    <span className="nums text-label pt-2 text-subtle transition-colors duration-300 group-hover:text-accent">
                      {service.index}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-headline transition-colors duration-300 group-hover:text-accent">
                        {service.title}
                      </h3>
                      <p className="text-body mt-3 max-w-lg text-muted">{service.summary}</p>

                      {/* Inline thumbnail replaces the sticky panel below lg */}
                      <div className="media-reveal relative mt-6 aspect-16/10 overflow-hidden rounded-[var(--radius-md)] bg-surface lg:hidden">
                        <Image
                          src={images[service.image]}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 60vw, 92vw"
                          placeholder="blur"
                          blurDataURL={BLUR}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <ArrowUpRight
                      className="mt-1.5 size-5 shrink-0 text-subtle transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
