import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { doll } from "./sanity/schemaTypes/doll";

export default defineConfig({
  name: "default",
  title: "dudidolls CMS",
  projectId: "tu17xem4",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [doll],
  },
});
