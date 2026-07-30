"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import type { MediaSite } from "@/content/sites";
import { BLUR, images } from "@/lib/images";
import { compactNumber, dimensions } from "@/lib/format";

type Props = {
  site: MediaSite;
  active: boolean;
  onSelect: () => void;
  onHover: (hovering: boolean) => void;
};

export function SiteCard({ site, active, onSelect, onHover }: Props) {
  const available = site.status === "available";

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      aria-pressed={active}
      className={`group grid w-full cursor-pointer grid-cols-[5.5rem_1fr] gap-4 border-b border-line p-4 text-left transition-colors duration-200 sm:grid-cols-[7rem_1fr] ${
        active ? "bg-surface-2" : "hover:bg-surface"
      }`}
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-sm)] bg-surface">
        <Image
          src={images[site.image]}
          alt=""
          fill
          sizes="112px"
          placeholder="blur"
          blurDataURL={BLUR}
          // Night photography reads as a black rectangle at 112px, so thumbnails
          // get a brightness lift the full-size images do not need.
          className={`object-cover brightness-140 contrast-95 transition-all duration-500 ${
            active ? "grayscale-0" : "grayscale group-hover:grayscale-0"
          }`}
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`truncate text-[15px] font-medium leading-snug transition-colors ${
              active ? "text-accent" : "text-ink"
            }`}
          >
            {site.name}
          </h3>
          <span
            className={`mt-1 flex shrink-0 items-center gap-1.5 text-label ${
              available ? "text-available" : "text-booked"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${available ? "bg-available" : "bg-booked"}`}
              aria-hidden="true"
            />
            {available ? "Open" : "Booked"}
          </span>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-subtle">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          {site.area}, {site.city}
        </p>

        <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <div className="flex gap-1.5">
            <dt className="sr-only">Format</dt>
            <dd>{site.format}</dd>
          </div>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <div className="flex gap-1.5">
            <dt className="sr-only">Dimensions</dt>
            <dd className="nums">{dimensions(site.widthFt, site.heightFt)}</dd>
          </div>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <div className="flex gap-1.5">
            <dt className="sr-only">Daily impressions</dt>
            <dd className="nums">{compactNumber(site.dailyImpressions)} daily</dd>
          </div>
        </dl>
      </div>
    </button>
  );
}
