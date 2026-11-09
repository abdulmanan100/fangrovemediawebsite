import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Enter, EnterLines } from "@/components/ui/Enter";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import { Toc } from "@/components/blog/Toc";
import { PostCard } from "@/components/blog/PostCard";
import { authors, getPost, lastModified, relatedPosts, visiblePosts } from "@/content/blog";
import { getService } from "@/content/services";
import { getSite } from "@/content/sites";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { outline, readingMinutes, wordCount } from "@/lib/blog";
import { BLUR } from "@/lib/images";
import { compactNumber, dimensions, longDate } from "@/lib/format";

/** Only posts in the registry exist; anything else is a 404, not a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return visiblePosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Article not found", description: "" });

  const title = post.metaTitle ?? post.title;

  return buildMetadata({
    title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: `/blog/${post.slug}/opengraph-image`,
    // The brand suffix only where it still fits in a ~60 character result.
    brand: title.length <= 44,
    article: {
      publishedTime: post.published,
      modifiedTime: lastModified(post),
      authors: [authors[post.author].name],
      section: post.category,
    },
    noindex: post.status === "draft",
    feed: true,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);

  const author = authors[post.author];
  const updated = post.updated && post.updated !== post.published ? post.updated : undefined;
  const contents = outline(post.slug);
  const related = relatedPosts(post);
  const services = post.serviceSlugs.map((s) => getService(s)).filter((s) => s != null);
  const mentioned = (post.siteIds ?? []).map((id) => getSite(id)).filter((s) => s != null);

  return (
    <>
      <JsonLd data={blogPostingSchema(post, wordCount(post.slug))} />
      <JsonLd data={faqSchema(post.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        {/* Header. On screen at load, so CSS <Enter> rather than <Reveal>. */}
        <header className="shell pt-32 pb-12 md:pt-44 md:pb-16">
          <Enter>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="text-label flex flex-wrap items-center gap-2 text-subtle">
                {[
                  { label: "Home", href: "/" },
                  { label: "Journal", href: "/blog" },
                ].map((crumb) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    <Link href={crumb.href} className="link-underline transition-colors hover:text-ink">
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true" className="text-line-strong">
                      /
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          </Enter>

          <Enter>
            <p className="text-label text-accent">
              {post.category}
              {post.status === "draft" && <span className="ml-3 text-ink">· Draft, not indexed</span>}
            </p>
          </Enter>

          <EnterLines lines={[post.title]} as="h1" className="text-section mt-7 max-w-[22ch]" delay={0.05} />

          <Enter delay={0.1}>
            <p className="text-subhead mt-8 max-w-[60ch] text-muted">{post.description}</p>
          </Enter>

          <Enter delay={0.12}>
            <p className="text-label mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5 text-subtle">
              <span>
                By{" "}
                <Link href={author.url} className="link-underline text-ink" rel="author">
                  {author.name}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Published <time dateTime={post.published}>{longDate(post.published)}</time>
              </span>
              {updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={updated}>{longDate(updated)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(post.slug)} min read</span>
            </p>
          </Enter>
        </header>

        <div className="shell grid gap-x-16 gap-y-10 pb-[var(--spacing-section)] lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Toc items={contents} />
          </aside>

          {/* The body is plain server-rendered HTML at full opacity — no scroll
              reveal — so crawlers and AI fetchers read every word. */}
          <div className="max-w-[68ch] lg:col-span-8 lg:col-start-5">
            <section
              aria-labelledby="in-short"
              className="mb-14 rounded-[var(--radius-md)] border border-line border-l-2 border-l-accent bg-surface p-6 md:p-8"
            >
              <h2 id="in-short" className="text-label text-subtle">
                In short
              </h2>
              <p className="text-subhead mt-4 text-ink">{post.summary}</p>
            </section>

            <Body />

            <section aria-labelledby="questions" className="mt-20 border-t border-line pt-12">
              <h2 id="questions" className="text-headline scroll-mt-28">
                Common questions
              </h2>
              {/* Headings rather than a <dl>: a <dt> may not contain one, and
                  each question as an H3 is what makes it a findable answer. */}
              <div className="mt-8">
                {post.faq.map((item) => (
                  <div key={item.q} className="border-b border-line py-6 first:pt-0">
                    <h3 className="text-lg font-medium text-ink">{item.q}</h3>
                    <p className="text-body mt-3 text-muted md:text-[1.0625rem]">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* Where to go next: the services the post is about, the sites it names,
          and other posts. Every link is a plain anchor. */}
      {(services.length > 0 || mentioned.length > 0) && (
        <section className="rule" aria-labelledby="post-related">
          <div className="shell section-y">
            <h2 id="post-related" className="text-section max-w-[16ch]">
              Put it to work.
            </h2>

            <div className="mt-[var(--spacing-group)] grid gap-x-16 gap-y-14 lg:grid-cols-12">
              {services.length > 0 && (
                <div className="lg:col-span-5">
                  <h3 className="text-label text-subtle">Related services</h3>
                  <ul className="mt-5">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-start justify-between gap-6 border-t border-line py-5"
                        >
                          <span>
                            <span className="block text-lg font-medium text-ink transition-colors group-hover:text-accent">
                              {service.title}
                            </span>
                            <span className="text-body mt-1.5 block text-muted">{service.summary}</span>
                          </span>
                          <ArrowUpRight
                            className="mt-1 size-4 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mentioned.length > 0 && (
                <div className="lg:col-span-6 lg:col-start-7">
                  <h3 className="text-label text-subtle">Sites in this article</h3>
                  <ul className="mt-5">
                    {mentioned.map((site) => (
                      <li key={site.id}>
                        <Link
                          href={`/network/${site.id}`}
                          className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 border-t border-line py-4 sm:grid-cols-[7rem_1fr]"
                        >
                          <span className="relative block aspect-4/3 overflow-hidden rounded-[var(--radius-sm)] bg-surface">
                            <Image
                              src={site.photo}
                              alt=""
                              fill
                              sizes="7rem"
                              placeholder="blur"
                              blurDataURL={BLUR}
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm text-ink transition-colors group-hover:text-accent">
                              {site.name}
                            </span>
                            <span className="nums mt-1 block text-xs text-subtle">
                              {site.format} · {dimensions(site.widthFt, site.heightFt)} ·{" "}
                              {compactNumber(site.dailyImpressions)}/day
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="rule" aria-labelledby="more-journal">
          <div className="shell section-y">
            <h2 id="more-journal" className="text-section">
              More from the journal.
            </h2>
            <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <PostCard post={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCTA index="03" />
    </>
  );
}
