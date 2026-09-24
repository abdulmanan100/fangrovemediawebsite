import Link from "next/link";
import { Enter, EnterLines } from "@/components/ui/Enter";

type Crumb = { label: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  /** Authored line breaks for the masked reveal. */
  lines: readonly string[];
  lede?: string;
  /** Small stat pairs rendered under the lede. */
  meta?: readonly { label: string; value: string }[];
  breadcrumbs?: readonly Crumb[];
  /** Trims the top padding where the page's own content follows immediately. */
  compact?: boolean;
};

/**
 * Shared opener for every page except home. The top padding clears the fixed
 * header; the rest is the same grid as SectionHeader so inner pages and home
 * sections share one rhythm.
 *
 * Always on screen at load, so it uses the CSS <Enter> rather than <Reveal>:
 * the heading and lede are usually the page's largest paint.
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  meta,
  breadcrumbs,
  compact = false,
}: PageHeroProps) {
  return (
    <header className={`shell ${compact ? "pt-32 pb-12" : "pt-36 pb-[var(--spacing-group)]"} md:pt-44`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Enter>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-label text-subtle">
              {breadcrumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="link-underline transition-colors hover:text-ink">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-line-strong">
                    /
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </Enter>
      )}

      <Enter>
        <p className="text-label text-accent">{eyebrow}</p>
      </Enter>

      <EnterLines lines={lines} as="h1" className="text-display mt-7 max-w-[15ch]" delay={0.05} />

      {lede && (
        <div className="mt-9 grid lg:grid-cols-12">
          <Enter delay={0.12} className="lg:col-span-6">
            <p className="text-subhead text-muted">{lede}</p>
          </Enter>
        </div>
      )}

      {/* A <dl> may only contain dt/dd, or div wrappers holding them directly —
          so the reveal wraps the whole list rather than each cell. */}
      {meta && meta.length > 0 && (
        <Enter delay={0.1}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="bg-bg p-5 md:p-6">
                <dt className="text-label text-subtle">{item.label}</dt>
                <dd className="nums mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Enter>
      )}
    </header>
  );
}
