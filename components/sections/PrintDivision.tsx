import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { BLUR, images } from "@/lib/images";

const capabilities = [
  { label: "Max roll width", value: "16 ft" },
  { label: "Print to mount", value: "Same night" },
  { label: "Offset sheet", value: "28 × 40 in" },
  { label: "Ink UV stability", value: "24 months" },
];

/**
 * The print floor. Split layout, image carrying the left half at full bleed —
 * this is the part of the business competitors outsource, so it gets its own
 * section rather than a line in a service list.
 */
export function PrintDivision() {
  return (
    <section className="section-y" aria-labelledby="print-heading">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="media-reveal relative aspect-4/5 overflow-hidden rounded-[var(--radius-lg)] bg-surface">
              <Image
                src={images.pressRollers}
                alt="Ink rollers on the press at the Fangrove print floor"
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="flex items-baseline gap-4 border-t border-line pt-5">
                <span className="text-label nums text-accent">05</span>
                <span className="text-label text-subtle">The print floor</span>
              </div>
            </Reveal>

            <RevealLines
              lines={["We print", "what we hang."]}
              as="h2"
              className="text-section mt-9"
              delay={0.05}
            />

            <Reveal delay={0.12}>
              <p className="text-subhead mt-8 text-muted">
                Offset, digital and large-format on one floor, sharing a schedule with
                the mounting crews. A face that comes off the printer at six is on the
                board by two.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-body mt-6 max-w-prose text-subtle">
                It also means colour is proofed against the illumination the piece will
                actually live under. A red approved on a backlit monitor and hung on a
                front-lit face is the most expensive mistake in this industry.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-11 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
                {capabilities.map((item) => (
                  <div key={item.label} className="bg-bg p-5">
                    <dt className="text-label text-subtle">{item.label}</dt>
                    <dd className="nums mt-2.5 text-lg font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                  href="/services/flex-printing"
                  className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-ink"
                >
                  Flex printing
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/services/printing"
                  className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
                >
                  Commercial printing
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <h2 id="print-heading" className="sr-only">
        The print floor
      </h2>
    </section>
  );
}
