"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. Longer = slower. */
  duration?: number;
  className?: string;
};

/**
 * CSS-only infinite marquee. The track is duplicated once and translated -50%,
 * so the loop is seamless with zero JS and zero measurement.
 *
 * The duplicate is aria-hidden — screen readers hear the list exactly once.
 */
export function Marquee({ children, duration = 42, className }: MarqueeProps) {
  return (
    <div
      className={`marquee-host relative flex overflow-hidden ${className ?? ""}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="animate-marquee flex shrink-0 items-center">
        {children}
        <span aria-hidden="true" className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}
