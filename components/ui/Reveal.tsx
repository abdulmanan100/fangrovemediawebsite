"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";

/**
 * The site's only reveal animation.
 *
 * One curve, one distance, one duration — applied everywhere. Consistency is
 * what separates a designed site from a pile of micro-interactions.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.6;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use index * 0.06 for staggered lists. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      // data-reveal lets the <noscript> rule in the root layout force every
      // animated element visible when JS never runs. Without it the SSR HTML
      // ships with opacity: 0 and the page reads as blank.
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealLinesProps = {
  /** Each string is one visual line. Author the breaks deliberately. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  delay?: number;
};

/**
 * Heading reveal: each line rises out from behind a mask.
 *
 * Lines are authored, not measured — deterministic across every viewport and
 * font-load state, and it never causes layout thrash.
 *
 * The in-view check deliberately watches the heading element rather than the
 * masked spans. IntersectionObserver factors in clipping from ancestors with
 * `overflow: hidden`, and a span translated 110% down is fully clipped — so
 * observing the span directly means it never reports as visible and the
 * heading stays permanently hidden.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
}: RevealLinesProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            data-reveal
            className="block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * 0.075 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
