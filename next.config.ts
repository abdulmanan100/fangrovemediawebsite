import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
