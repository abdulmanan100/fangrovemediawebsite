import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { visiblePosts } from "@/content/blog";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const posts = visiblePosts();

export const metadata = buildMetadata({
  title: "Outdoor advertising guides for Lahore & Pakistan",
  description:
    "Guides to buying billboards, digital screens and large-format print in Lahore: rates, sizes, locations and booking, written from the figures we publish for our own sites.",
  path: "/blog",
  image: "/blog/opengraph-image",
  // An empty journal is not worth indexing; it becomes indexable with its first post.
  noindex: posts.length === 0,
  feed: true,
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema(posts.filter((post) => post.status === "published"))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
        ])}
      />

      <PageHero
        eyebrow="Journal"
        lines={["Outdoor advertising,", "explained."]}
        lede="How billboards, screens and large-format print are bought in Lahore: rates, sizes, locations and booking, written from the figures we publish for our own sites."
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      <section className="shell pb-[var(--spacing-section)]">
        {posts.length > 0 ? (
          <ul className="grid gap-x-12 gap-y-14 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-subhead max-w-prose border-t border-line pt-6 text-muted">
            The first articles are being written. In the meantime, every site on the network
            publishes its size, lighting and daily audience.
          </p>
        )}
      </section>

      <ContactCTA index="02" />
    </>
  );
}
