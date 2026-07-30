"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Two-part cursor: a hard dot that tracks the pointer exactly, and a ring that
 * lags behind on a spring. `mix-blend-mode: difference` means it inverts
 * whatever it crosses, so it stays visible over black, gold and photography
 * without needing a single colour rule.
 *
 * Renders nothing at all on touch devices, coarse pointers, or when the user
 * has asked for reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 340, damping: 30, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 340, damping: 30, mass: 0.45 });

  // Gate on a fine pointer. Runs after mount, so the server and first client
  // render always agree on `null`.
  useEffect(() => {
    if (reduce) return;
    const query = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const interactive = "a, button, [role='button'], input, select, textarea, [data-cursor='hover']";

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovering(Boolean((event.target as Element | null)?.closest?.(interactive)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden mix-blend-difference lg:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms linear" }}
    >
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute rounded-full border border-white"
        style={{
          x: ringX,
          y: ringY,
          width: 34,
          height: 34,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 1.5 : 1, opacity: hovering ? 1 : 0.5 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
