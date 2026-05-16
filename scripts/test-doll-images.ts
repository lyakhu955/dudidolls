import { config } from "dotenv";
config({ path: ".env.local" });

import { getDollById } from "../lib/sanity.queries";

async function test() {
  const doll = await getDollById("scimmia");
  if (!doll) {
    console.log("Bambola non trovata");
    return;
  }
  console.log("Nome:", doll.name);
  console.log("Immagini:", doll.images.length);
  doll.images.forEach((url, i) => console.log(`  [${i}]`, url));
}

test();
