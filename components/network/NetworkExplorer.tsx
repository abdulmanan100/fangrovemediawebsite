"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import {
  FORMATS,
  ILLUMINATIONS,
  areaBreakdown,
  sites,
  type Format,
  type Illumination,
  type MediaSite,
} from "@/content/sites";
import { SiteCard } from "@/components/network/SiteCard";
import { SiteDrawer } from "@/components/network/SiteDrawer";
import { compactNumber } from "@/lib/format";

/** Leaflet reaches for `window` on import, so it can never render on the server. */
const NetworkMap = dynamic(() => import("@/components/network/NetworkMap"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center bg-surface">
      <span className="text-label text-subtle">Loading map…</span>
    </div>
  ),
});

const ALL = "all";

/** Areas with more than one site get a chip; the rest live in the select. */
const AREAS = areaBreakdown();
const CHIP_AREAS = AREAS.filter((entry) => entry.count > 1).map((entry) => entry.area);

export function NetworkExplorer() {
  const router = useRouter();
  const params = useSearchParams();

  const area = params.get("area") ?? ALL;
  const format = params.get("format") ?? ALL;
  const illumination = params.get("illum") ?? ALL;
  const status = params.get("status") ?? ALL;
  const selectedId = params.get("site");

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /** Writes filter state into the URL so any view can be shared or bookmarked. */
  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === ALL || value === "") next.delete(key);
      else next.set(key, value);
      // Changing a filter invalidates whichever site was open.
      if (key !== "site") next.delete("site");
      const query = next.toString();
      router.replace(query ? `/network?${query}` : "/network", { scroll: false });
    },
    [params, router],
  );

  const filtered = useMemo(
    () =>
      sites.filter(
        (site) =>
          (area === ALL || site.area === area) &&
          (format === ALL || site.format === (format as Format)) &&
          (illumination === ALL || site.illumination === (illumination as Illumination)) &&
          (status === ALL || site.status === status),
      ),
    [area, format, illumination, status],
  );

  const selected: MediaSite | null =
    filtered.find((site) => site.id === selectedId) ?? null;

  const activeId = selectedId ?? hoveredId;

  const filtersApplied =
    area !== ALL || format !== ALL || illumination !== ALL || status !== ALL;

  const reachTotal = filtered.reduce((sum, site) => sum + site.dailyImpressions, 0);

  return (
    <>
      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-[71px] z-30 border-y border-line bg-bg/92 backdrop-blur-xl md:top-[79px]">
        <div className="shell flex flex-col gap-4 py-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <fieldset className="flex flex-wrap items-center gap-2">
              <legend className="sr-only">Filter by area</legend>
              <Chip active={area === ALL} onClick={() => setParam("area", ALL)}>
                All areas
              </Chip>
              {CHIP_AREAS.map((option) => (
                <Chip
                  key={option}
                  active={area === option}
                  onClick={() => setParam("area", option)}
                >
                  {option}
                </Chip>
              ))}
            </fieldset>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              label="Areas"
              value={area}
              options={AREAS.map((entry) => entry.area)}
              onChange={(value) => setParam("area", value)}
            />
            <Select
              label="Formats"
              value={format}
              options={FORMATS}
              onChange={(value) => setParam("format", value)}
            />
            <Select
              label="Illumination"
              value={illumination}
              options={ILLUMINATIONS}
              onChange={(value) => setParam("illum", value)}
            />
            <Chip
              active={status === "available"}
              onClick={() => setParam("status", status === "available" ? ALL : "available")}
            >
              Available only
            </Chip>

            {filtersApplied && (
              <button
                type="button"
                onClick={() => router.replace("/network", { scroll: false })}
                className="flex cursor-pointer items-center gap-1.5 text-label text-subtle transition-colors hover:text-ink"
              >
                <X className="size-3" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results summary. aria-live announces filter changes. ─────────── */}
      <div className="shell border-b border-line py-3.5">
        <p className="text-label text-subtle" role="status" aria-live="polite">
          <span className="nums text-accent">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "site" : "sites"}
          {filtered.length > 0 && (
            <>
              {" · "}
              <span className="nums">{compactNumber(reachTotal)}</span> combined daily
              audience
            </>
          )}
        </p>
      </div>

      {/* ── Split view ───────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-12">
        {/* Map first in the DOM on small screens, second column on desktop */}
        <div className="order-1 h-[46vh] min-h-[20rem] border-b border-line lg:order-2 lg:col-span-7 lg:h-[calc(100vh-8.5rem)] lg:border-b-0 lg:border-l">
          <div className="sticky top-[8.5rem] h-[46vh] min-h-[20rem] lg:h-[calc(100vh-8.5rem)]">
            <NetworkMap
              sites={filtered}
              activeId={activeId}
              onSelect={(id) => setParam("site", id)}
              onHover={setHoveredId}
            />
          </div>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-5">
          {filtered.length === 0 ? (
            <div className="px-6 py-24 text-center">
              <p className="text-headline">No sites match.</p>
              <p className="text-body mt-3 text-muted">
                Try widening the format or illumination filter.
              </p>
              <button
                type="button"
                onClick={() => router.replace("/network", { scroll: false })}
                className="mt-7 cursor-pointer rounded-[var(--radius-md)] border border-line-strong px-6 py-3 text-sm text-ink transition-colors hover:bg-ink/8"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Gives the h3 in each card an h2 to descend from — without it
                  the document jumps h1 → h3. Kept outside the <ul>, which may
                  only contain <li>. */}
              <h2 id="site-list-heading" className="sr-only">
                Sites
              </h2>
              <ul aria-labelledby="site-list-heading">
                {filtered.map((site) => (
                  <li key={site.id}>
                    <SiteCard
                      site={site}
                      active={activeId === site.id}
                      onSelect={() => setParam("site", site.id)}
                      onHover={(hovering) => setHoveredId(hovering ? site.id : null)}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <SiteDrawer site={selected} onClose={() => setParam("site", ALL)} />
    </>
  );
}

/* ── Local controls ──────────────────────────────────────────────────── */

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-[var(--radius-full)] border px-4 py-2 text-xs font-medium transition-colors duration-200 ${
        active
          ? "border-accent bg-accent-dim text-accent"
          : "border-line-strong text-muted hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer rounded-[var(--radius-md)] border border-line-strong bg-bg px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-ink/40"
      >
        <option value={ALL}>All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
