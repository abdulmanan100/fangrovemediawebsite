"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { BLUR, images } from "@/lib/images";
import { enterStyle } from "@/components/ui/Enter";
import { company } from "@/content/company";
import { areaBreakdown, totalSites } from "@/content/sites";

/* The page's H1, so it carries the search phrase. The old line, "Attention
   is a place.", lives on in the eyebrow above it. */
const LINES = ["Billboards &", "outdoor media", "in Lahore."] as const;

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

      {/* Entrances below are CSS (.enter / .enter-line), not motion: they
          start on first paint rather than after hydration. The paragraph is
          this page's LCP element, and a JS-driven fade held it back ~3.5 s. */}
      <div className="shell relative z-10 pb-12 md:pb-16">
        {/* Eyebrow */}
        <div
          className="enter mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-label text-muted"
          style={enterStyle({ delay: 0.15, y: 0 })}
        >
          <span className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span
                className="absolute inline-flex size-full rounded-full bg-accent"
                style={{ animation: "pulse-ring 2.6s var(--ease-out-expo) infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Attention is a place.
          </span>
          <LahoreClock />
          <span className="hidden sm:inline">{company.address.line2}</span>
          <span className="hidden md:inline">Est. {company.founded}</span>
        </div>

        {/* Headline — animates on load, not on scroll. */}
        <h1 className="text-hero max-w-[16ch]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                className="enter-line"
                style={enterStyle({ delay: 0.1 + i * 0.09, duration: 1 })}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p
            className="enter text-subhead max-w-xl text-muted lg:col-span-6"
            style={enterStyle({ delay: 0.5, duration: 0.7, y: 20 })}
          >
            Fangrove owns {totalSites} billboard and LED screen sites across{" "}
            {areaBreakdown().length} areas of Lahore — and the print floor that dresses
            them. Outdoor media, broadcast and press campaigns, since {company.founded}.
          </p>

          <div
            className="enter flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end"
            style={enterStyle({ delay: 0.62, duration: 0.7, y: 20 })}
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
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="enter mt-14 hidden items-center gap-3 text-label text-subtle md:flex"
          style={enterStyle({ delay: 0.9, y: 0 })}
          aria-hidden="true"
        >
          <ArrowDown className="size-3.5" />
          Scroll
        </div>
      </div>
    </section>
  );
}
