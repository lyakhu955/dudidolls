import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { readFile } from "fs/promises";
import { join } from "path";
import { DOLLS } from "../lib/data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "placeholder-project-id") {
  console.error("❌ Configura NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token) {
  console.error("❌ Configura SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function getFilenameFromPath(path: string): string {
  return path.replace(/^\/foto\//, "");
}

async function uploadImage(path: string): Promise<string | null> {
  const filename = getFilenameFromPath(path);
  const filePath = join(import.meta.dirname, "..", "public", "foto", filename);

  try {
    const buffer = await readFile(filePath);
    const asset = await client.assets.upload("image", buffer, { filename });
    console.log(`  📤 Uploadata immagine: ${filename} → ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.warn(`  ⚠️ Errore upload ${filename}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

async function seed() {
  console.log("🌱 Inizio migrazione bambole su Sanity...\n");

  for (const doll of DOLLS) {
    console.log(`🧸 ${doll.name} — ${doll.italic}`);

    const imageIds: string[] = [];
    for (const imgPath of doll.images) {
      const assetId = await uploadImage(imgPath);
      if (assetId) imageIds.push(assetId);
    }

    const doc = {
      _type: "doll" as const,
      _id: `doll-${doll.id}`,
      id: doll.id,
      name: doll.name,
      italic: doll.italic,
      price: doll.price,
      edition: doll.edition,
      origin: doll.origin,
      materials: doll.materials,
      height: doll.height,
      year: doll.year,
      desc: doll.desc,
      tag: doll.tag || "",
      sold: doll.sold,
      weight: doll.weight,
      dimensions: doll.dimensions,
      sku: doll.sku,
      category: doll.category,
      images: imageIds.map((id) => ({
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: id },
      })),
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Documento creato: ${doc._id}\n`);
  }

  console.log("🎉 Migrazione completata! Vai su https://www.sanity.io/manage per vedere i dati.");
}

seed().catch((err) => {
  console.error("💥 Errore durante la migrazione:", err);
  process.exit(1);
});
