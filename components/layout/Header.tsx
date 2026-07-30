"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { company, navigation } from "@/content/company";

/**
 * Sticky header that retracts on scroll-down and returns on scroll-up, so the
 * hero and every full-bleed image gets the whole viewport while you're moving
 * forward, and navigation is one flick away when you want it back.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (menuOpen) return;
    setHidden(latest > previous && latest > 220);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !menuOpen
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-8 md:h-20">
          <Link
            href="/"
            aria-label={`${company.name} — home`}
            className="text-[15px] text-ink md:text-base"
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline text-sm font-medium transition-colors duration-200 ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={company.contact.phoneHref}
              className="hidden text-sm font-medium text-muted transition-colors hover:text-ink xl:block nums"
            >
              {company.contact.phone}
            </a>
            <Link
              href="/contact"
              className="hidden rounded-[var(--radius-md)] border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/40 hover:bg-ink/8 lg:inline-flex"
            >
              Request rates
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-mr-2 flex size-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <span className="relative block h-[9px] w-6" aria-hidden="true">
                <span className="absolute inset-x-0 top-0 h-px bg-ink" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
