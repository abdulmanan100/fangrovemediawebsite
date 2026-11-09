import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // .mdx is listed so the blog's post bodies in content/blog/ compile. No
  // route is authored in MDX: every page is a .tsx file that imports them.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Leaflet ships untranspiled ESM/CJS interop that Turbopack handles fine,
  // but the server build needs it treated as external to avoid `window` access.
  serverExternalPackages: ["leaflet"],
};

/**
 * Plugins are named by string, not imported. Turbopack cannot pass functions
 * across to its loaders, so an imported plugin fails the build there.
 *
 * remark-gfm: Markdown tables, which most posts use for specs.
 * rehype-slug: an id on every heading, so the contents list and shared links
 * can jump to a section.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
