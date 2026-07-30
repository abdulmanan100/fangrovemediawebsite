"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { BLUR, images } from "@/lib/images";
import { company } from "@/content/company";
import { citiesCovered, totalSites } from "@/content/sites";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINES = ["Attention", "is a place."] as const;

/** Lahore local time, PKT. Renders blank until mounted so SSR and client agree. */
function LahoreClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Karachi",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="nums tabular-nums" suppressHydrationWarning>
      {time ?? "--:--:--"}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The image drifts slower than the page, and dims as the section leaves.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[38rem] flex-col justify-end overflow-hidden"
    >
      {/* Backdrop. z-0 rather than a negative index — body paints an opaque
          background, so anything behind it disappears entirely. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={reduce ? undefined : { y: imageY, opacity: imageOpacity }}
      >
        <Image
          src={images.heroCorridor}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="scale-105 object-cover [filter:saturate(0.55)_contrast(1.08)]"
        />
        {/* Scrims exist for legibility, not decoration. The flat layer sets the
            overall key; the bottom ramp does the actual contrast work behind
            the headline, paragraph and eyebrow, all of which sit low. */}
        <div className="absolute inset-0 bg-bg/40" />
        <div className="absolute inset-x-0 bottom-0 h-[85%] bg-linear-to-t from-bg from-12% via-bg/78 via-52% to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-bg/70 to-transparent" />
      </motion.div>

      <div className="shell relative z-10 pb-12 md:pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-label text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span
                className="absolute inline-flex size-full rounded-full bg-accent"
                style={{ animation: "pulse-ring 2.6s var(--ease-out-expo) infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Lahore
          </span>
          <LahoreClock />
          <span className="hidden sm:inline">
            {company.address.coords[0].toFixed(4)}°N {company.address.coords[1].toFixed(4)}°E
          </span>
          <span className="hidden md:inline">Est. {company.founded}</span>
        </motion.div>

        {/* Headline — animates on mount, not on scroll, so it never blocks LCP
            behind an intersection observer. */}
        <h1 className="text-hero max-w-[16ch]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="text-subhead max-w-xl text-muted lg:col-span-6"
          >
            Fangrove owns {totalSites} large-format sites across {citiesCovered} Pakistani
            cities — and the print floor that dresses them. Out-of-home, broadcast and
            press, run from Lahore.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end"
          >
            <Link
              href="/network"
              className="group inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink px-7 py-4 text-sm font-medium text-bg transition-colors duration-200 hover:bg-white"
            >
              Explore the network
              <span className="nums text-xs opacity-60">{totalSites}</span>
            </Link>
            <Link
              href="/contact"
              className="link-underline text-sm font-medium text-ink"
            >
              Request rates
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-14 hidden items-center gap-3 text-label text-subtle md:flex"
          aria-hidden="true"
        >
          <ArrowDown className="size-3.5" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
