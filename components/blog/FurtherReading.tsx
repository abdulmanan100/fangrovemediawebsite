import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/content/blog";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";

/**
 * Journal links at the foot of service and site pages: the internal links
 * that pass a guide's relevance back to the pages that take enquiries, and
 * the reverse. Renders nothing when there is nothing to link.
 */
export function FurtherReading({
  posts,
  heading = "Further reading.",
}: {
  posts: readonly Post[];
  heading?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="rule" aria-labelledby="further-reading">
      <div className="shell section-y">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="further-reading" className="text-section">
              {heading}
            </h2>
            <Link
              href="/blog"
              className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              All articles
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={Math.min(i * 0.06, 0.2)} className="h-full">
                <PostCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
