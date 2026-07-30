/**
 * Fangrove mark.
 *
 * Four ascending bars. The tallest is split by a hairline gap into a panel
 * sitting on a stem — a hoarding on a pole. Read together the bars are a
 * grove, a run of billboard structures, and a reach curve. One idea, three
 * readings, legible at 16px.
 */

type MarkProps = {
  className?: string;
  /** Accent the tallest bar. Off inside monochrome contexts (footer, print). */
  accent?: boolean;
};

export function LogoMark({ className, accent = true }: MarkProps) {
  return (
    <svg
      viewBox="0 0 27 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="0" y="20" width="5" height="12" fill="currentColor" opacity="0.45" />
      <rect x="7.33" y="14" width="5" height="18" fill="currentColor" opacity="0.65" />
      <rect x="14.67" y="7" width="5" height="25" fill="currentColor" opacity="0.85" />
      {/* Tallest bar: panel + stem */}
      <rect x="22" y="0" width="5" height="13" fill={accent ? "var(--color-accent)" : "currentColor"} />
      <rect x="22" y="15" width="5" height="17" fill={accent ? "var(--color-accent)" : "currentColor"} />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  accent?: boolean;
  /** Show the "MEDIA" sub-line. Off in the header, on in the footer. */
  withSubline?: boolean;
};

export function Logo({ className, accent = true, withSubline = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark accent={accent} className="h-[1.35em] w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className="font-[family-name:var(--font-display)] font-bold uppercase leading-none"
          style={{ letterSpacing: "-0.035em", fontStretch: "104%" }}
        >
          Fangrove
        </span>
        {withSubline && (
          <span className="text-label mt-1.5 text-subtle" aria-hidden="true">
            Media
          </span>
        )}
      </span>
    </span>
  );
}
