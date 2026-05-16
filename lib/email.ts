import { getResend } from "@/lib/resend";
import { getDollById } from "@/lib/sanity.queries";

export async function sendOrderConfirmation({
  dollIds,
  customerEmail,
  total,
}: {
  dollIds: string[];
  customerEmail: string;
  total: number;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[EMAIL] RESEND_API_KEY mancante — skip invio email");
    return;
  }

  const resend = getResend();
  const from = "dudidolls <onboarding@resend.dev>";

  const dollData = await Promise.all(dollIds.map((id) => getDollById(id)));
  const dolls = dollData
    .filter(Boolean)
    .map((d) => `- ${d!.name} — ${d!.italic} (${d!.price} €)`)
    .join("\n");

  const subject = "Conferma ordine — Dudi Dolls";
  const text = `Grazie per il tuo ordine!\n\nDettagli:\n${dolls}\n\nTotale: ${total} €\n\nA presto,\nSimona — Dudi Dolls`;

  // Email al cliente
  await resend.emails.send({
    from,
    to: customerEmail,
    subject,
    text,
  });

  // Email a Simona
  await resend.emails.send({
    from,
    to: "atelier@dudidolls.it",
    subject: `Nuovo ordine da ${customerEmail}`,
    text: `Nuovo ordine ricevuto!\n\nCliente: ${customerEmail}\n\nBambole:\n${dolls}\n\nTotale: ${total} €`,
  });
}
