"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Lenis in root mode adds no DOM of its own, so the options object can switch
 * on the reduced-motion query without any risk of a hydration mismatch.
 *
 * With `smoothWheel` off, Lenis stops intercepting wheel events entirely and
 * the browser's native scrolling takes over — which is exactly what someone
 * who asked for reduced motion should get.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <ReactLenis
      root
      options={
        reduce
          ? { lerp: 1, smoothWheel: false, syncTouch: false }
          : { lerp: 0.095, wheelMultiplier: 1, syncTouch: false, touchMultiplier: 1.6 }
      }
    >
      {children}
    </ReactLenis>
  );
}
