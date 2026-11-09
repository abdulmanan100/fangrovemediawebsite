import type { ReactNode } from "react";
import {
  areaBreakdown,
  availableSites,
  digitalScreens,
  largestFace,
  totalDailyImpressions,
  totalSites,
} from "@/content/sites";
import { getService } from "@/content/services";
import { company } from "@/content/company";
import { afterBooking, rateFactors, rateRequest } from "@/content/rates";
import { process as workflow } from "@/content/studio";
import { compactNumber, dimensions, pad2 } from "@/lib/format";

/**
 * Inline facts and lists for posts, read from content/ at build time. A post
 * writes <Stat name="totalSites" /> instead of typing "35", so the article
 * and the rest of the site can never disagree.
 */

const stats = {
  totalSites: () => String(totalSites),
  availableSites: () => String(availableSites),
  digitalScreens: () => String(digitalScreens),
  areas: () => String(areaBreakdown().length),
  dailyAudience: () => compactNumber(totalDailyImpressions),
  largestFace: () => dimensions(largestFace.widthFt, largestFace.heightFt),
  largestFaceSite: () => largestFace.name,
  largestFaceArea: () => largestFace.area,
  founded: () => String(company.founded),
  brandsServed: () => `${company.stats.brandsServed}+`,
  staff: () => `${company.stats.staff}+`,
  markets: () => company.stats.marketsCovered.join(", "),
} as const;

export function Stat({ name }: { name: keyof typeof stats }) {
  return <span className="nums">{stats[name]()}</span>;
}

/** One value from a service's spec table: <Spec service="dooh" label="Loop" />. */
export function Spec({ service, label }: { service: string; label: string }) {
  const value = getService(service)?.specs.find((spec) => spec.label === label)?.value;
  if (!value) throw new Error(`<Spec>: no "${label}" on service "${service}"`);
  return <span className="nums">{value}</span>;
}

/** A service's full spec table as a definition list. */
export function SpecList({ service }: { service: string }) {
  const found = getService(service);
  if (!found) throw new Error(`<SpecList>: no service "${service}"`);

  return (
    <dl className="my-9 border-t border-line">
      {found.specs.map((spec) => (
        <div key={spec.label} className="grid grid-cols-[minmax(8rem,1fr)_2fr] gap-4 border-b border-line py-3.5">
          <dt className="text-sm text-subtle">{spec.label}</dt>
          <dd className="nums text-sm text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const noteSets = { rateFactors, rateRequest, afterBooking } as const;

/** One of the note lists from content/rates.ts, numbered. */
export function NoteList({ set }: { set: keyof typeof noteSets }) {
  return (
    <ol className="my-9 border-t border-line">
      {noteSets[set].map((note, i) => (
        <li key={note.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
          <span className="nums text-label pt-1 text-accent">{pad2(i + 1)}</span>
          <div>
            <p className="font-medium text-ink">{note.title}</p>
            <p className="text-body mt-1.5 text-muted">{note.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The six-step working process from content/studio.ts. */
export function ProcessSteps() {
  return (
    <ol className="my-9 border-t border-line">
      {workflow.map((step) => (
        <li key={step.index} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
          <span className="nums text-label pt-1 text-accent">{step.index}</span>
          <div>
            <p className="font-medium text-ink">{step.title}</p>
            <p className="text-body mt-1.5 text-muted">{step.body}</p>
            <p className="mt-2 text-xs text-subtle">You receive: {step.deliverable}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-9 rounded-[var(--radius-md)] border border-line bg-surface p-6">
      {title && <p className="text-label text-subtle">{title}</p>}
      <div className={`text-body text-muted [&>p+p]:mt-3 ${title ? "mt-3" : ""}`}>{children}</div>
    </aside>
  );
}
