import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/content/blog";
import { readingMinutes } from "@/lib/blog";
import { longDate } from "@/lib/format";

/**
 * A post in a list. A plain link with the title as its text, so each card is
 * also a crawl path to the article.
 */
export function PostCard({
  post,
  headingLevel = "h3",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full border-t border-line pt-6">
      <p className="text-label flex flex-wrap items-center gap-x-3 gap-y-2 text-subtle">
        <span className="text-accent">{post.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.published}>{longDate(post.published)}</time>
        <span aria-hidden="true">·</span>
        <span>{readingMinutes(post.slug)} min read</span>
        {post.status === "draft" && (
          <span className="rounded-[var(--radius-sm)] border border-line-strong px-1.5 py-1 text-ink">
            Draft
          </span>
        )}
      </p>
      <Heading className="text-headline mt-5 flex items-start justify-between gap-6 transition-colors duration-300 group-hover:text-accent">
        <span>{post.title}</span>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          aria-hidden="true"
        />
      </Heading>
      <p className="text-body mt-4 max-w-prose text-muted">{post.description}</p>
    </Link>
  );
}
