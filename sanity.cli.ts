import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "tu17xem4",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
