import type { NextConfig } from "next";

const heroMode = process.env.HERO_MODE;

const config: NextConfig = {
  distDir: heroMode ? `.next-${heroMode}` : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["gsap", "lenis"],
  },
  async rewrites() {
    if (heroMode) {
      return {
        beforeFiles: [
          {
            source: "/",
            destination: `/intro/${heroMode}`,
          },
        ],
      };
    }
    return [];
  },
};

export default config;
