import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendOrderConfirmation } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    console.error("[WEBHOOK] Firma non valida:", message);
    return NextResponse.json({ error: "Firma non valida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      customer_email: string | null;
      amount_total: number | null;
      metadata?: Record<string, string> | null;
    };

    const dollIdsRaw = session.metadata?.doll_ids || "";
    const dollIds = dollIdsRaw.split(",").filter(Boolean);
    const customerEmail = session.customer_email || "unknown@example.com";
    const total = (session.amount_total || 0) / 100;

    console.log("[WEBHOOK] Ordine completato:", {
      sessionId: session.id,
      customerEmail,
      dollIds,
      total,
    });

    try {
      await sendOrderConfirmation({
        dollIds,
        customerEmail,
        total,
      });
    } catch (err) {
      console.error("[WEBHOOK] Errore invio email:", err);
    }
  }

  return NextResponse.json({ received: true });
}
