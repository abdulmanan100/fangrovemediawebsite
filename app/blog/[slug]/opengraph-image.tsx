import { getPost, visiblePosts } from "@/content/blog";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Fangrove Media Journal article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return visiblePosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return ogCard({ headline: "Fangrove Media" });

  return ogCard({
    eyebrow: `Journal — ${post.category}`,
    headline: post.title,
    detail: post.description,
  });
}
