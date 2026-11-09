import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { visiblePosts } from "@/content/blog";

/**
 * The three newest posts, on the home page. The home page carries the most
 * link authority on the site, so a new article is linked from here the day
 * it is published. Renders nothing until there is a post.
 */
export function JournalPreview() {
  const latest = visiblePosts().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="section-y" aria-label="From the journal">
      <div className="shell">
        <SectionHeader
          eyebrow="Journal"
          lines={["Buying outdoor,", "explained."]}
          lede="Rates, sizes, locations and booking: guides written from the figures we publish for our own sites."
          link={{ href: "/blog", label: "All articles" }}
        />

        <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
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
