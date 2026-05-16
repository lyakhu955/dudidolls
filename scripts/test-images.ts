import { client } from "../lib/sanity";
import { groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

async function test() {
  const raw = await client.fetch(groq`*[_type == "doll"]{name, images}`);
  for (const d of raw) {
    const mapped = (d.images || [])
      .filter((i: unknown) => typeof i === "object" && i !== null)
      .map((i: unknown) => {
        try {
          return builder.image(i as Parameters<typeof builder.image>[0]).url();
        } catch (e) {
          return "ERROR:" + (e instanceof Error ? e.message : String(e));
        }
      });
    console.log(d.name, "->", mapped.length, "img(s)", mapped[0] || "FALLBACK");
  }
}

test();
