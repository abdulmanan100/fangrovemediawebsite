import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/work";
import { BLUR, images } from "@/lib/images";

type WorkCardProps = {
  study: CaseStudy;
  /** Controls the image crop and the sizes hint. */
  ratio?: "portrait" | "landscape";
  sizes?: string;
  priority?: boolean;
};

/**
 * The image is the card. Text is client, title, and two pieces of metadata —
 * anything more competes with the photograph for the same attention.
 */
export function WorkCard({
  study,
  ratio = "landscape",
  sizes = "(min-width: 1024px) 46vw, 92vw",
  priority = false,
}: WorkCardProps) {
  return (
    <Link href={`/work/${study.slug}`} className="group block">
      <div
        className={`media-reveal relative overflow-hidden rounded-[var(--radius-lg)] bg-surface ${
          ratio === "portrait" ? "aspect-4/5" : "aspect-16/11"
        }`}
      >
        <Image
          src={images[study.heroImage]}
          alt={`${study.client} — ${study.title}`}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover"
        />

        <span className="absolute left-5 top-5 rounded-[var(--radius-sm)] bg-bg/80 px-3 py-1.5 text-label text-ink backdrop-blur-sm">
          {study.category}
        </span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="nums text-label text-accent">{study.index}</span>
            <span className="text-label text-subtle">
              {study.client} · {study.year}
            </span>
          </div>
          <h3 className="text-headline mt-3 max-w-md transition-colors duration-300 group-hover:text-accent">
            {study.title}
          </h3>
        </div>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-subtle transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
