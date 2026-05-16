import { client, urlFor, isSanityConfigured } from "@/lib/sanity";
import { DOLLS, findDoll, type Doll } from "@/lib/data";
import { groq } from "next-sanity";

function mapSanityDoll(raw: Record<string, unknown>): Doll {
  const images = Array.isArray(raw.images)
    ? raw.images
        .filter((img): img is { asset?: { _ref?: string }; _type?: string } =>
          typeof img === "object" && img !== null
        )
        .map((img) => urlFor(img).url())
    : [];

  return {
    id: String(raw.id ?? raw._id ?? ""),
    name: String(raw.name ?? ""),
    italic: String(raw.italic ?? ""),
    price: Number(raw.price ?? 0),
    edition: String(raw.edition ?? ""),
    origin: String(raw.origin ?? ""),
    materials: String(raw.materials ?? ""),
    height: String(raw.height ?? ""),
    year: String(raw.year ?? ""),
    desc: String(raw.desc ?? ""),
    tag: ["", "new", "scarce"].includes(String(raw.tag))
      ? (String(raw.tag) as Doll["tag"])
      : "",
    images: images.length > 0 ? images : ["/foto/hero.jpg"],
    sold: Boolean(raw.sold ?? false),
    weight: raw.weight != null ? Number(raw.weight) : undefined,
    dimensions: raw.dimensions != null ? String(raw.dimensions) : undefined,
    sku: raw.sku != null ? String(raw.sku) : undefined,
    category: raw.category != null ? String(raw.category) : undefined,
  };
}

export async function getAllDolls(): Promise<Doll[]> {
  if (!isSanityConfigured()) {
    return DOLLS;
  }

  const raw = await client.fetch<
    Array<Record<string, unknown>>
  >(groq`*[_type == "doll"] | order(price asc) {
    _id,
    id,
    name,
    italic,
    price,
    edition,
    origin,
    materials,
    height,
    year,
    desc,
    tag,
    images,
    sold,
    weight,
    dimensions,
    sku,
    category
  }`);

  return raw.map(mapSanityDoll);
}

export async function getDollById(id: string): Promise<Doll | undefined> {
  if (!isSanityConfigured()) {
    return findDoll(id);
  }

  const raw = await client.fetch<Record<string, unknown> | null>(
    groq`*[_type == "doll" && id == $id][0] {
      _id,
      id,
      name,
      italic,
      price,
      edition,
      origin,
      materials,
      height,
      year,
      desc,
      tag,
      images,
      sold,
      weight,
      dimensions,
      sku,
      category
    }`,
    { id }
  );

  if (!raw) return undefined;
  return mapSanityDoll(raw);
}

export async function getDollImage(id: string): Promise<string> {
  const doll = await getDollById(id);
  return doll?.images[0] || "/foto/hero.jpg";
}

export async function getDollImages(id: string): Promise<string[]> {
  const doll = await getDollById(id);
  return doll?.images || ["/foto/hero.jpg"];
}

export async function isDollAvailable(id: string): Promise<boolean> {
  const doll = await getDollById(id);
  return doll ? !doll.sold : false;
}
