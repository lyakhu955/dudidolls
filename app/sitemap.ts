import type { MetadataRoute } from "next";
import { DOLLS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dudidolls.vercel.app";
  const static_routes = ["/", "/#gallery", "/#craft"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const product_routes = DOLLS.map((d) => ({
    url: `${base}/product/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...static_routes, ...product_routes];
}
