import type { MetadataRoute } from "next";
import { getAllDolls } from "@/lib/sanity.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://dudidolls.vercel.app";
  const static_routes = ["/", "/#gallery", "/#craft"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const dolls = await getAllDolls();
  const product_routes = dolls.map((d) => ({
    url: `${base}/product/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...static_routes, ...product_routes];
}
