import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { findDoll } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json() as { items: Array<{ id: string; qty: number }> };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrello vuoto" }, { status: 400 });
    }

    const lineItems = items.map((item) => {
      const doll = findDoll(item.id);
      if (!doll) throw new Error(`Bambola non trovata: ${item.id}`);

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${doll.name} — ${doll.italic}`,
            description: doll.desc,
            images: [`${process.env.NEXT_PUBLIC_SITE_URL}${doll.images[0]}`],
            metadata: { doll_id: doll.id, edition: doll.edition },
          },
          unit_amount: doll.price * 100, // Stripe uses cents
        },
        quantity: item.qty,
      };
    });

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      locale: "it",
      shipping_address_collection: {
        allowed_countries: ["IT", "DE", "AT", "FR", "CH", "BE", "NL", "ES", "PT"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 890, currency: "eur" },
            display_name: "Italia — GLS/SDA",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1890, currency: "eur" },
            display_name: "Europa — DHL Economy",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 2990, currency: "eur" },
            display_name: "Mondo — DHL Express",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      payment_method_types: ["card"],
      metadata: {
        doll_ids: items.map((i) => i.id).join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
