"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { company, navigation } from "@/content/company";
import { pad2 } from "@/lib/format";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on route change.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduce ? 0.15 : 0.7, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
        >
          <div className="shell flex h-[72px] shrink-0 items-center justify-between">
            <span className="text-label text-subtle">Menu</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 flex size-11 cursor-pointer items-center justify-center text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
            <ul>
              {navigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.22 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-5 py-5 text-ink"
                  >
                    <span className="text-label nums text-accent">{pad2(i + 1)}</span>
                    <span className="text-display">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="shell shrink-0 pb-10"
          >
            <p className="text-label text-subtle">Direct</p>
            <div className="mt-4 flex flex-col gap-2">
              <a href={company.contact.phoneHref} className="nums text-lg text-ink">
                {company.contact.phone}
              </a>
              <a href={`mailto:${company.contact.email}`} className="text-lg text-muted">
                {company.contact.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
