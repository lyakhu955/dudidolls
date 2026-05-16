import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Diritto di Recesso",
  description: "Informazioni sul diritto di recesso per gli acquisti effettuati su dudidolls.it. 14 giorni dalla ricezione del prodotto.",
};

export default function RecessoPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
          Informazioni legali
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 40 }}>
          Diritto di <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Recesso</span>.
        </h1>
        <p style={{ fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 64 }}>
          In quanto consumatore, hai il diritto di recedere dal contratto di acquisto senza dover fornire alcuna motivazione, nel rispetto della Direttiva Europea 2011/83/UE sui diritti dei consumatori.
        </p>

        {/* Sezione 1 */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            01 — Termini
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Il diritto di recesso
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)" }}>
            Hai diritto di recedere dal presente contratto entro <strong>14 giorni</strong> dalla data in cui tu, o un terzo da te designato (diverso dal corriere), hai preso fisicamente possesso del prodotto. Per gli ordini composti da più articoli consegnati separatamente, il termine decorre dall&apos;ultimo articolo ricevuto.
          </p>
        </section>

        {/* Sezione 2 */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            02 — Procedura
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Come esercitarlo
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Per esercitare il diritto di recesso, invia una comunicazione chiara e inequivocabile prima della scadenza del termine. Puoi farlo nei seguenti modi:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Email:</strong> scrivi a{" "}
              <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                atelier@dudidolls.it
              </a>{" "}
              indicando il numero d&apos;ordine, il tuo nome completo e la comunicazione di recesso.
            </li>
            <li>
              <strong>Modulo standard:</strong> puoi utilizzare il modulo di recesso tipo allegato al D.Lgs. 21/2014, compilato e inviato via email all&apos;indirizzo sopra indicato.
            </li>
          </ul>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)" }}>
            Riceverai conferma della ricezione della tua comunicazione di recesso entro 24 ore lavorative.
          </p>
        </section>

        {/* Sezione 3 */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            03 — Eccezioni
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Prodotti esclusi
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Ai sensi dell&apos;art. 59 della Direttiva 2011/83/UE, il diritto di recesso <strong>non si applica</strong> ai beni confezionati su misura o chiaramente personalizzati. In particolare, sono esclusi dalla possibilità di reso:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24 }}>
            <li style={{ marginBottom: 8 }}>
              Bambole con <strong>dediche ricamate personalizzate</strong> (nome, data, messaggio su richiesta del cliente).
            </li>
            <li style={{ marginBottom: 8 }}>
              Articoli realizzati con <strong>tessuti o materiali scelti su specifica indicazione</strong> del cliente durante l&apos;ordine.
            </li>
            <li>
              Tutti i prodotti in cui la personalizzazione li rende <strong>non riutilizzabili o non rivendibili</strong> a terzi.
            </li>
          </ul>
          <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.8, color: "var(--ink-2)", opacity: 0.7, marginTop: 16, fontStyle: "italic" }}>
            In caso di dubbio sulla natura personalizzata del tuo acquisto, ti invitiamo a contattarci prima di effettuare l&apos;ordine.
          </p>
        </section>

        {/* Sezione 4 */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            04 — Restituzione
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Condizioni del prodotto e spese
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Il prodotto deve essere restituito entro <strong>14 giorni</strong> dalla data in cui ci hai comunicato la tua decisione di recedere. Il prodotto deve essere:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Nelle <strong>condizioni originali</strong>, non utilizzato e non lavato.</li>
            <li style={{ marginBottom: 8 }}>Completo di <strong>certificato di autenticità firmato</strong> incluso nella confezione originale.</li>
            <li style={{ marginBottom: 8 }}>Imballato con cura, preferibilmente nella scatola originale.</li>
            <li>Privo di segni di usura, profumi, macchie o danni non presenti al momento della consegna.</li>
          </ul>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)" }}>
            Le <strong>spese di restituzione sono a carico del cliente</strong>. Ti consigliamo di utilizzare un servizio di spedizione tracciabile, poiché non siamo responsabili per eventuali perdite durante il trasporto del reso.
          </p>
        </section>

        {/* Sezione 5 */}
        <section style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, marginBottom: 12 }}>
            05 — Rimborso
          </p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Modalità e tempi di rimborso
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Una volta ricevuto il prodotto restituito e verificato che si trovi nelle condizioni originali, procederemo al rimborso entro <strong>14 giorni</strong> dalla ricezione della merce.
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Il rimborso verrà effettuato utilizzando lo <strong>stesso metodo di pagamento</strong> usato al momento dell&apos;acquisto:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Carta di credito/debito: accredito entro 5-10 giorni lavorativi bancari.</li>
            <li style={{ marginBottom: 8 }}>PayPal: accredito entro 3-5 giorni lavorativi.</li>
            <li>Bonifico bancario: accredito entro 3-5 giorni lavorativi.</li>
          </ul>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)" }}>
            Il rimborso includerà il prezzo del prodotto e le spese di spedizione originali (al costo della spedizione standard, anche se avevi scelto una consegna più rapida). Non includerà le spese di restituzione, che rimangono a carico del cliente.
          </p>
        </section>

        {/* Contatti */}
        <section style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 48, marginTop: 24 }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 16 }}>
            Per qualsiasi domanda relativa al diritto di recesso, contattaci:
          </p>
          <a
            href="mailto:atelier@dudidolls.it"
            style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: "0.05em", color: "var(--accent)", textDecoration: "underline" }}
          >
            atelier@dudidolls.it
          </a>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.05em", color: "var(--ink-2)", opacity: 0.5, marginTop: 40 }}>
            Ultimo aggiornamento: maggio 2025 — Conforme a D.Lgs. 21/2014 e Direttiva UE 2011/83/UE
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
