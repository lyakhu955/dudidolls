import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Spedizioni",
  description: "Tempi di consegna, costi di spedizione e informazioni sul packaging per gli ordini dudidolls. Spediamo in Italia, Europa e nel mondo.",
};

const shippingZones = [
  {
    label: "Italia",
    carrier: "GLS / SDA",
    price: "€ 8,90",
    free: "Gratuita sopra € 200",
    time: "24 – 48 ore lavorative",
    note: "dalla conferma di spedizione",
  },
  {
    label: "Europa",
    carrier: "DHL Economy",
    price: "€ 18,90",
    free: "Gratuita sopra € 300",
    time: "3 – 5 giorni lavorativi",
    note: "dalla conferma di spedizione",
  },
  {
    label: "Resto del mondo",
    carrier: "DHL Express",
    price: "€ 29,90",
    free: null,
    time: "5 – 10 giorni lavorativi",
    note: "dalla conferma di spedizione",
  },
];

export default function SpedizioniPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
          Logistica
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 40 }}>
          Spedizioni e <span style={{ fontStyle: "italic", color: "var(--accent)" }}>consegne</span>.
        </h1>
        <p style={{ fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 64 }}>
          Ogni bambola dudidolls nasce nell&apos;atelier con cura artigianale. Prima di raggiungerti, ha bisogno del tempo giusto. Ecco tutto quello che devi sapere sulla sua partenza.
        </p>

        {/* Tempi di lavorazione */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            01 — Produzione
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Tempi di lavorazione
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            I tempi di lavorazione dipendono dal tipo di articolo ordinato:
          </p>
          <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
            <div style={{ padding: "24px 28px", background: "rgba(0,0,0,0.02)", borderLeft: "3px solid var(--accent)" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
                Pezzi personalizzati
              </p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>
                circa 14 giorni
              </p>
              <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)" }}>
                Bambole con dediche ricamate, personalizzazioni su misura o commissioni speciali. Ogni pezzo viene lavorato individualmente nell&apos;atelier.
              </p>
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(0,0,0,0.02)", borderLeft: "3px solid var(--ink-2)" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
                Già in magazzino
              </p>
              <p style={{ fontFamily: "var(--serif)", fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>
                2 – 3 giorni
              </p>
              <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)" }}>
                Articoli disponibili e pronti alla spedizione. Verificheremo la disponibilità al momento dell&apos;ordine e ti aggiorneremo via email.
              </p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.8, color: "var(--ink-2)", opacity: 0.7, fontStyle: "italic" }}>
            I tempi di lavorazione si aggiungono ai tempi di consegna del corriere. Riceverai una email di conferma spedizione con numero di tracciamento non appena il pacco è affidato al corriere.
          </p>
        </section>

        {/* Zone di spedizione */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            02 — Destinazioni
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Costi e tempi di consegna
          </h2>
          <div style={{ display: "grid", gap: 1 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              {["Destinazione", "Corriere", "Costo", "Tempi"].map((h) => (
                <p key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4 }}>
                  {h}
                </p>
              ))}
            </div>
            {/* Rows */}
            {shippingZones.map((zone) => (
              <div
                key={zone.label}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{zone.label}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-2)", opacity: 0.7 }}>{zone.carrier}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: 18, letterSpacing: "-0.01em", marginBottom: 2 }}>{zone.price}</p>
                  {zone.free && (
                    <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.04em" }}>{zone.free}</p>
                  )}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-2)", marginBottom: 2 }}>{zone.time}</p>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 10, opacity: 0.5 }}>{zone.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--sans)", fontSize: 13, lineHeight: 1.8, color: "var(--ink-2)", opacity: 0.6, marginTop: 16, fontStyle: "italic" }}>
            I tempi di consegna sono indicativi e possono variare in base a festività, condizioni meteo o rallentamenti del corriere. Per spedizioni extra-UE potrebbero applicarsi dazi doganali a carico del destinatario.
          </p>
        </section>

        {/* Packaging */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            03 — Packaging
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Una confezione degna del suo contenuto
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Ogni bambola dudidolls viene spedita in una <strong>scatola di legno</strong> con chiusura a pressione, imbottita con <strong>paglia di segale naturale</strong> che protegge e abbraccia il pezzo durante il viaggio. La scatola è pensata per essere conservata.
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            All&apos;interno della confezione troverai:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}>La bambola avvolta in carta velina senza acidi.</li>
            <li style={{ marginBottom: 8 }}>Il <strong>certificato di autenticità firmato a mano</strong> dall&apos;artigiana, con numero di serie e data di realizzazione.</li>
            <li style={{ marginBottom: 8 }}>Una nota personale dell&apos;atelier.</li>
            <li>Istruzioni per la cura del pezzo.</li>
          </ul>
        </section>

        {/* Tracking */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            04 — Monitoraggio
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Traccia il tuo ordine
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Non appena il tuo ordine viene affidato al corriere, riceverai una <strong>email automatica</strong> con il numero di tracciamento e il link diretto alla pagina di monitoraggio del corriere.
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)" }}>
            Se non ricevi l&apos;email di spedizione entro i tempi di lavorazione previsti, ti invitiamo a controllare la cartella spam o a contattarci direttamente a{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              atelier@dudidolls.it
            </a>
            .
          </p>
        </section>

        {/* Danni */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            05 — Danni in transito
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Il pacco è arrivato danneggiato?
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Se il prodotto risulta danneggiato al momento della consegna, è fondamentale che tu <strong>segnali il danno entro 48 ore</strong> dalla ricezione. Per farlo:
          </p>
          <ol style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>
              Scatta fotografie della confezione esterna e del prodotto danneggiato prima di rimuovere qualsiasi imballo.
            </li>
            <li style={{ marginBottom: 8 }}>
              Invia le fotografie e il numero d&apos;ordine a{" "}
              <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                atelier@dudidolls.it
              </a>{" "}
              con oggetto: <strong>&quot;Danno spedizione – [numero ordine]&quot;</strong>.
            </li>
            <li>
              Il nostro team ti contatterà entro 48 ore lavorative per organizzare il <strong>rimborso o la sostituzione</strong> del prodotto.
            </li>
          </ol>
          <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.8, color: "var(--ink-2)", opacity: 0.7, fontStyle: "italic" }}>
            Le segnalazioni oltre le 48 ore potrebbero non essere prese in carico, in quanto il tempo trascorso rende impossibile verificare la responsabilità del corriere.
          </p>
        </section>

        {/* Contatti */}
        <section style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 48, marginTop: 24 }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Per qualsiasi domanda sulle spedizioni, siamo a tua disposizione:
          </p>
          <a
            href="mailto:atelier@dudidolls.it"
            style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: "0.05em", color: "var(--accent)", textDecoration: "underline" }}
          >
            atelier@dudidolls.it
          </a>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.05em", color: "var(--ink-2)", opacity: 0.5, marginTop: 40 }}>
            Ultimo aggiornamento: maggio 2025
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
