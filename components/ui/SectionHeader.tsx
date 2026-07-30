import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  /** Two-digit index numeral — one of the few places gold is allowed. */
  index?: string;
  eyebrow: string;
  /** Authored line breaks. Each string renders as one masked line. */
  lines: readonly string[];
  lede?: string;
  link?: { href: string; label: string };
  className?: string;
};

/**
 * The section opener used across every page. Left-aligned by default —
 * centring everything is the fastest way to look generic.
 */
export function SectionHeader({
  index,
  eyebrow,
  lines,
  lede,
  link,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-baseline gap-4 border-t border-line pt-5">
          {index && <span className="text-label nums text-accent">{index}</span>}
          <span className="text-label text-subtle">{eyebrow}</span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-12">
        <RevealLines
          lines={lines}
          as="h2"
          className="text-section lg:col-span-7"
          delay={0.05}
        />

        {(lede || link) && (
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            {lede && (
              <Reveal delay={0.12}>
                <p className="text-subhead max-w-prose text-muted">{lede}</p>
              </Reveal>
            )}
            {link && (
              <Reveal delay={0.18}>
                <Link
                  href={link.href}
                  className="link-underline group mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink"
                >
                  {link.label}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
