import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Page-load entrance for the first screen: the CSS counterpart to <Reveal>
 * and <RevealLines>.
 *
 * Those two wait for hydration and an IntersectionObserver before anything
 * becomes visible. That is right below the fold and wrong above it — on a
 * mid-range phone it held the largest paint back by three to four seconds,
 * which is what Google measures as LCP. These are plain CSS animations
 * (`.enter` / `.enter-line` in globals.css): they start on first paint, need
 * no JavaScript, and the reduced-motion rule switches them off.
 *
 * Use them only for content visible on load. Everything further down keeps
 * the scroll-triggered <Reveal>.
 */

type EnterTiming = {
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  /** Travel distance in px. `.enter` only; 0 gives a plain fade. */
  y?: number;
};

/** Inline custom properties for a `.enter` / `.enter-line` element. */
export function enterStyle({ delay, duration, y }: EnterTiming = {}): CSSProperties {
  return {
    ...(delay ? { "--enter-delay": `${delay}s` } : {}),
    ...(duration ? { "--enter-duration": `${duration}s` } : {}),
    ...(y !== undefined ? { "--enter-y": `${y}px` } : {}),
  } as CSSProperties;
}

export function Enter({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className ? `enter ${className}` : "enter"} style={enterStyle({ delay })}>
      {children}
    </div>
  );
}

/** Heading whose authored lines rise from behind a mask, as <RevealLines>. */
export function EnterLines({
  lines,
  as: Tag = "h1",
  className,
  delay = 0,
}: {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span className="enter-line" style={enterStyle({ delay: delay + i * 0.075 })}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
