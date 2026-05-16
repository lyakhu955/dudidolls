import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getString(obj: unknown, key: string): string {
  if (obj && typeof obj === "object" && key in obj) {
    const val = (obj as Record<string, unknown>)[key];
    return typeof val === "string" ? val : "";
  }
  return "";
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;

    const docId =
      getString(body, "id") ||
      getString(body, "_id") ||
      getString(body.document, "_id");

    const docType =
      getString(body, "_type") ||
      getString(body.document, "_type");

    // Revalida sempre la homepage
    revalidatePath("/");

    // Se è una bambola, revalida anche la pagina prodotto
    if (docType === "doll" && docId) {
      const dollId = docId.replace("doll-", "");
      revalidatePath(`/product/${dollId}`);
      console.log(`[REVALIDATE] Pagina /product/${dollId} aggiornata`);
    }

    return NextResponse.json({ revalidated: true, docId, docType });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
