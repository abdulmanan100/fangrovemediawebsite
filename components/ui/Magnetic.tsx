"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element chases the pointer, as a fraction of the offset. */
  strength?: number;
};

/**
 * Pointer-following wrapper for primary CTAs only. Used sparingly — three or
 * four instances across the whole site. It is a punctuation mark, not a style.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
