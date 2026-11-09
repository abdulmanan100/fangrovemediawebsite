import Link from "next/link";
import {
  FORMATS,
  areaBreakdown,
  sites,
  type Format,
  type MediaSite,
} from "@/content/sites";
import { compactNumber, dimensions, groupedNumber } from "@/lib/format";
import { TableFrame, Td, Th } from "@/components/blog/Table";

/**
 * Tables a post can drop in to quote the network. They read content/sites.ts
 * at build time, so a post's figures always match the network page: when a
 * site is added or a face is resized, every article that shows it updates.
 */

type SiteTableProps = {
  /** Specific sites, in this order. */
  ids?: readonly string[];
  /** Every site in an area, as written in content/sites.ts. */
  area?: string;
  format?: Format;
  /** The N sites with the highest daily audience. */
  top?: number;
  /** Accessible name for the scrolling table region. */
  label?: string;
};

function selectSites({ ids, area, format, top }: SiteTableProps): MediaSite[] {
  if (ids) return ids.map((id) => sites.find((site) => site.id === id)).filter((s) => s != null);

  let list = [...sites];
  if (area) list = list.filter((site) => site.area === area);
  if (format) list = list.filter((site) => site.format === format);
  list.sort((a, b) => b.dailyImpressions - a.dailyImpressions);
  return top ? list.slice(0, top) : list;
}

export function SiteTable(props: SiteTableProps) {
  const list = selectSites(props);
  if (list.length === 0) return null;

  const label =
    props.label ??
    (props.area ? `${props.area} sites` : props.format ? `${props.format} sites` : "Sites");

  return (
    <TableFrame label={label}>
      <thead>
        <tr>
          <Th>Site</Th>
          <Th>Format</Th>
          <Th>Size</Th>
          <Th>Lighting</Th>
          <Th className="text-right">Audience / day</Th>
        </tr>
      </thead>
      <tbody>
        {list.map((site) => (
          <tr key={site.id}>
            <Td className="min-w-[14rem]">
              <Link
                href={`/network/${site.id}`}
                className="link-underline text-ink transition-colors hover:text-accent"
              >
                {site.name}
              </Link>
              {!props.area && <span className="mt-1 block text-xs text-subtle">{site.area}</span>}
            </Td>
            <Td className="whitespace-nowrap">{site.format}</Td>
            <Td className="whitespace-nowrap">{dimensions(site.widthFt, site.heightFt)}</Td>
            <Td className="whitespace-nowrap">{site.illumination}</Td>
            <Td className="whitespace-nowrap text-right text-ink">
              {groupedNumber(site.dailyImpressions)}
            </Td>
          </tr>
        ))}
      </tbody>
    </TableFrame>
  );
}

/** Area → number of sites, formats and the busiest site's audience. */
export function AreaTable() {
  const rows = areaBreakdown().map(({ area, count }) => {
    const inArea = sites.filter((site) => site.area === area);
    return {
      area,
      count,
      formats: [...new Set(inArea.map((site) => site.format))].join(", "),
      peak: Math.max(...inArea.map((site) => site.dailyImpressions)),
    };
  });

  return (
    <TableFrame label="Sites by area">
      <thead>
        <tr>
          <Th>Area</Th>
          <Th className="text-right">Sites</Th>
          <Th>Formats</Th>
          <Th className="text-right">Busiest site / day</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.area}>
            <Td className="whitespace-nowrap">
              <Link
                href={`/network?area=${encodeURIComponent(row.area)}`}
                className="link-underline text-ink transition-colors hover:text-accent"
              >
                {row.area}
              </Link>
            </Td>
            <Td className="text-right">{row.count}</Td>
            <Td className="min-w-[10rem]">{row.formats}</Td>
            <Td className="whitespace-nowrap text-right text-ink">{compactNumber(row.peak)}</Td>
          </tr>
        ))}
      </tbody>
    </TableFrame>
  );
}

/** Format → how many sites, size range and lighting, for the sizes guide. */
export function FormatTable() {
  const rows = FORMATS.map((format) => {
    const list = sites
      .filter((site) => site.format === format)
      .sort((a, b) => a.widthFt * a.heightFt - b.widthFt * b.heightFt);
    const first = list[0];
    const last = list[list.length - 1];
    if (!first || !last) return null;

    const low = dimensions(first.widthFt, first.heightFt);
    const high = dimensions(last.widthFt, last.heightFt);
    return {
      format,
      count: list.length,
      sizes: low === high ? low : `${low} – ${high}`,
      lighting: [...new Set(list.map((site) => site.illumination))].join(", "),
    };
  }).filter((row) => row != null);

  return (
    <TableFrame label="Billboard formats and sizes">
      <thead>
        <tr>
          <Th>Format</Th>
          <Th className="text-right">Sites</Th>
          <Th>Face sizes</Th>
          <Th>Lighting</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.format}>
            <Td className="whitespace-nowrap text-ink">{row.format}</Td>
            <Td className="text-right">{row.count}</Td>
            <Td className="whitespace-nowrap">{row.sizes}</Td>
            <Td className="whitespace-nowrap">{row.lighting}</Td>
          </tr>
        ))}
      </tbody>
    </TableFrame>
  );
}
