"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { compactNumber, groupedNumber } from "@/lib/format";

type CounterProps = {
  value: number;
  /** "compact" → 1.24M · "grouped" → 1,240,000 · "plain" → 24 */
  format?: "compact" | "grouped" | "plain";
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/**
 * Counts up once when scrolled into view. Renders the final value immediately
 * for reduced-motion users and in the server HTML, so the number is never
 * missing from the page — only its animation is conditional.
 */
export function Counter({
  value,
  format = "plain",
  suffix,
  className,
  durationMs = 1600,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduce || !inView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutExpo — fast out of the gate, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    setDisplay(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, durationMs]);

  const rendered =
    format === "compact"
      ? compactNumber(display)
      : format === "grouped"
        ? groupedNumber(display)
        : String(display);

  return (
    <span ref={ref} className={`nums ${className ?? ""}`}>
      {rendered}
      {suffix}
    </span>
  );
}
