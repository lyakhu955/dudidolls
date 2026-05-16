import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/intro/", "/api/"] },
    sitemap: "https://dudidolls.vercel.app/sitemap.xml",
  };
}
