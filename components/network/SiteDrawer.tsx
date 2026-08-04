"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import type { MediaSite } from "@/content/sites";
import { BLUR } from "@/lib/images";
import { areaSqFt, dimensions, groupedNumber, mailto } from "@/lib/format";
import { company, whatsapp } from "@/content/company";

type Props = { site: MediaSite | null; onClose: () => void };

export function SiteDrawer({ site, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!site) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [site, onClose]);

  const specs = site
    ? [
        { label: "Format", value: site.format },
        { label: "Dimensions", value: dimensions(site.widthFt, site.heightFt) },
        { label: "Face area", value: `${groupedNumber(areaSqFt(site.widthFt, site.heightFt))} sq ft` },
        { label: "Illumination", value: site.illumination },
        { label: "Daily impressions", value: groupedNumber(site.dailyImpressions) },
        { label: "Exposure", value: site.faces },
        {
          label: "Coordinates",
          value: `${site.coords[0].toFixed(4)}, ${site.coords[1].toFixed(4)}${
            site.pinApprox ? " (approx.)" : ""
          }`,
        },
      ]
    : [];

  return (
    <AnimatePresence>
      {site && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-bg/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={site.name}
            data-lenis-prevent
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: "0%" }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[30rem] flex-col overflow-y-auto border-l border-line bg-bg"
          >
            <div className="relative aspect-16/10 shrink-0 bg-surface">
              <Image
                src={site.photo}
                alt=""
                fill
                sizes="480px"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-bg/40" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close site details"
                className="absolute right-4 top-4 flex size-10 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-line-strong bg-bg/80 text-ink backdrop-blur transition-colors hover:bg-surface-2"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 text-label ${
                    site.status === "available" ? "text-available" : "text-booked"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      site.status === "available" ? "bg-available" : "bg-booked"
                    }`}
                    aria-hidden="true"
                  />
                  {site.status === "available" ? "Available" : "Booked"}
                </span>
                <span className="text-label text-subtle">
                  {site.area}, {site.city}
                </span>
              </div>

              <h2 className="text-headline mt-4">{site.name}</h2>
              <p className="text-body mt-4 text-muted">{site.note}</p>

              <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-subtle">
                {site.facing}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-bg p-4">
                    <dt className="text-label text-subtle">{spec.label}</dt>
                    <dd className="nums mt-2 text-sm text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto space-y-3 pt-9">
                <a
                  href={whatsapp(
                    `Hello Fangrove — please send rates and availability for ` +
                      `${site.name} (${site.id}), ${site.format} ` +
                      `${dimensions(site.widthFt, site.heightFt)}, ${site.area}.`,
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] bg-ink px-6 py-4 text-sm font-medium text-bg transition-colors hover:bg-white"
                >
                  Enquire on WhatsApp
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={mailto(
                      company.contact.salesEmail,
                      `Rate enquiry — ${site.name} (${site.id})`,
                      `Hello Fangrove,\n\nPlease send rates and availability for:\n\n` +
                        `Site:          ${site.name}\n` +
                        `Reference:     ${site.id}\n` +
                        `Location:      ${site.area}, ${site.city}\n` +
                        `Format:        ${site.format}, ${dimensions(site.widthFt, site.heightFt)}, ${site.illumination}\n\n` +
                        `Required from:  \nDuration:       \nCompany:        \nContact number: \n\nThank you.`,
                    )}
                    className="flex items-center justify-center rounded-[var(--radius-md)] border border-line-strong px-4 py-3.5 text-sm text-ink transition-colors hover:bg-ink/8"
                  >
                    Email
                  </a>
                  <Link
                    href={`/network/${site.id}`}
                    className="group flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-line-strong px-4 py-3.5 text-sm text-ink transition-colors hover:bg-ink/8"
                  >
                    Full page
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
