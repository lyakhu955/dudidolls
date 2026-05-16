import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Termini e Condizioni di Vendita",
  description: "Termini e condizioni di vendita di dudidolls. Bambole artigianali 1-of-1 realizzate nell'atelier in Sudtirolo.",
};

const section = {
  marginBottom: 48,
} as const;

const h2Style = {
  fontFamily: "var(--serif)",
  fontSize: "clamp(22px, 3vw, 28px)",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  marginBottom: 16,
  marginTop: 0,
} as const;

const pStyle = {
  fontFamily: "var(--sans)",
  fontSize: 16,
  lineHeight: 1.8,
  color: "var(--ink-2)",
  marginBottom: 12,
  marginTop: 0,
} as const;

const smallMono = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  opacity: 0.5,
  marginBottom: 8,
  display: "block",
} as const;

const divider = {
  border: "none",
  borderTop: "1px solid var(--ink-1, rgba(0,0,0,0.08))",
  marginBottom: 48,
  marginTop: 0,
} as const;

export default function TerminiPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
          Legale · Termini di Vendita
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 24 }}>
          Termini e Condizioni{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>di Vendita</span>.
        </h1>
        <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 16 }}>
          Venditrice: <strong>Simona Calloni</strong>, titolare del marchio <strong>dudidolls</strong>
          <br />
          P.IVA: 02938471055 — Sudtirolo (BZ), Italia
          <br />
          Contatti:{" "}
          <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)" }}>
            atelier@dudidolls.it
          </a>
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", opacity: 0.45, marginBottom: 64 }}>
          Ultimo aggiornamento: maggio 2025
        </p>

        <hr style={divider} />

        {/* 1. Oggetto */}
        <div style={section}>
          <span style={smallMono}>Art. 1</span>
          <h2 style={h2Style}>Oggetto</h2>
          <p style={pStyle}>
            I presenti Termini e Condizioni di Vendita (di seguito &ldquo;Termini&rdquo;) disciplinano la vendita a distanza di bambole artigianali prodotte da Simona Calloni con il marchio <strong>dudidolls</strong>, tramite il sito web dudidolls.it (di seguito &ldquo;Sito&rdquo;), in conformità al Codice del Consumo (D.Lgs. 206/2005) e al Regolamento UE 2018/302.
          </p>
          <p style={pStyle}>
            Ogni bambola dudidolls è un&apos;opera artigianale unica, realizzata interamente a mano nell&apos;atelier in Sudtirolo. Ogni esemplare è classificato come pezzo unico (<em>1-of-1</em>): non esistono copie, repliche o produzioni in serie. Acquistando una bambola dudidolls, il Cliente riceve un oggetto irripetibile, con le proprie caratteristiche individuali di tessuto, colore e finitura.
          </p>
          <p style={pStyle}>
            I Termini si applicano a tutti gli acquisti effettuati sul Sito da parte di consumatori privati residenti nell&apos;Unione Europea. Per acquisti da parte di soggetti professionali o rivenditori, si applicano condizioni separate da concordare per iscritto.
          </p>
        </div>

        <hr style={divider} />

        {/* 2. Prezzi */}
        <div style={section}>
          <span style={smallMono}>Art. 2</span>
          <h2 style={h2Style}>Prezzi</h2>
          <p style={pStyle}>
            Tutti i prezzi indicati sul Sito sono espressi in <strong>Euro (EUR)</strong> e si intendono comprensivi di IVA, laddove applicabile, nella misura prevista dalla normativa italiana vigente al momento dell&apos;ordine.
          </p>
          <p style={pStyle}>
            I prezzi non includono le spese di spedizione, che vengono calcolate e mostrate separatamente al momento del checkout, prima della conferma dell&apos;ordine.
          </p>
          <p style={pStyle}>
            dudidolls si riserva il diritto di modificare i prezzi in qualsiasi momento. Le variazioni di prezzo non avranno effetto sugli ordini già confermati per iscritto via email. In caso di evidente errore tipografico nel prezzo pubblicato, dudidolls contatterà il Cliente prima di procedere alla spedizione per concordare le condizioni corrette o, in alternativa, offrire il recesso senza alcun costo.
          </p>
        </div>

        <hr style={divider} />

        {/* 3. Modalità di pagamento */}
        <div style={section}>
          <span style={smallMono}>Art. 3</span>
          <h2 style={h2Style}>Modalità di Pagamento</h2>
          <p style={pStyle}>
            Il pagamento del corrispettivo è dovuto integralmente al momento dell&apos;ordine. dudidolls accetta i seguenti metodi di pagamento:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 12, marginTop: 0 }}>
            <li><strong>Carta di credito o debito</strong> (Visa, Mastercard, American Express) — tramite gateway di pagamento certificato PCI-DSS;</li>
            <li><strong>Bonifico bancario</strong> — le coordinate IBAN vengono comunicate via email al momento dell&apos;ordine; la spedizione avviene dopo la ricezione dell&apos;accredito;</li>
            <li>Altri metodi eventualmente indicati al checkout al momento dell&apos;acquisto.</li>
          </ul>
          <p style={pStyle}>
            Tutti i pagamenti sono elaborati tramite canali sicuri con crittografia SSL/TLS. dudidolls non conserva né ha accesso ai dati completi della carta di pagamento del Cliente.
          </p>
          <p style={pStyle}>
            In caso di mancato pagamento o di pagamento non autorizzato, l&apos;ordine sarà annullato e il Cliente ne verrà informato tempestivamente via email.
          </p>
        </div>

        <hr style={divider} />

        {/* 4. Disponibilità prodotti */}
        <div style={section}>
          <span style={smallMono}>Art. 4</span>
          <h2 style={h2Style}>Disponibilità dei Prodotti</h2>
          <p style={pStyle}>
            Ogni bambola dudidolls è un pezzo unico: una volta acquistata, non è più disponibile. Le informazioni sulla disponibilità mostrate sul Sito sono aggiornate in tempo reale, ma non possono essere garantite in caso di acquisti simultanei da parte di più utenti.
          </p>
          <p style={pStyle}>
            Nell&apos;eventualità — seppur rara — che un prodotto risulti non disponibile dopo la conferma dell&apos;ordine, dudidolls provvederà a rimborsare integralmente il Cliente entro 7 giorni lavorativi, tramite lo stesso metodo di pagamento utilizzato, e ne darà comunicazione via email senza ritardo.
          </p>
          <p style={pStyle}>
            Le immagini dei prodotti sul Sito sono fotografiche e riproducono fedelmente ogni bambola. La resa cromatica può variare leggermente in base allo schermo del dispositivo del Cliente. Le bambole sono oggetti d&apos;artigianato: piccole irregolarità nei materiali o nelle finiture fanno parte della natura artigianale del prodotto e non costituiscono difetti.
          </p>
        </div>

        <hr style={divider} />

        {/* 5. Processo d'ordine */}
        <div style={section}>
          <span style={smallMono}>Art. 5</span>
          <h2 style={h2Style}>Processo d&apos;Ordine e Conferma</h2>
          <p style={pStyle}>
            Il contratto di vendita si perfeziona nel seguente modo:
          </p>
          <ol style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 12, marginTop: 0 }}>
            <li>Il Cliente seleziona il prodotto e lo aggiunge al carrello;</li>
            <li>Il Cliente fornisce i dati di spedizione e seleziona il metodo di pagamento;</li>
            <li>Il Cliente revisiona il riepilogo dell&apos;ordine e procede al pagamento;</li>
            <li>Il Cliente riceve una <strong>email di ricezione dell&apos;ordine</strong> automatica, che non costituisce ancora accettazione;</li>
            <li>Entro <strong>24 ore</strong> dalla ricezione dell&apos;ordine, dudidolls invia una <strong>email di conferma d&apos;ordine</strong>: da questo momento il contratto è concluso e vincolante per entrambe le parti.</li>
          </ol>
          <p style={pStyle}>
            dudidolls si riserva il diritto di rifiutare o annullare un ordine in caso di errori manifesti nel prezzo o nella descrizione del prodotto, di sospetto di frode, o di mancata disponibilità verificata successivamente. In tali casi, il Cliente sarà informato senza ritardo e l&apos;eventuale pagamento verrà rimborsato integralmente.
          </p>
          <p style={pStyle}>
            Per le <strong>commissioni personalizzate</strong> — bambole realizzate su specifiche indicazioni del Cliente — le condizioni, i tempi di realizzazione e il corrispettivo sono definiti caso per caso via email prima di qualsiasi pagamento.
          </p>
        </div>

        <hr style={divider} />

        {/* 6. Spedizione */}
        <div style={section}>
          <span style={smallMono}>Art. 6</span>
          <h2 style={h2Style}>Spedizione e Consegna</h2>
          <p style={pStyle}>
            Le bambole vengono spedite dall&apos;atelier in Sudtirolo (Italia) tramite corrieri selezionati per cura e affidabilità. Ogni spedizione include imballaggio artigianale progettato per proteggere il prodotto durante il trasporto.
          </p>
          <p style={pStyle}>
            I tempi di spedizione e i costi variano in base alla destinazione e al metodo di consegna scelto. Per le informazioni aggiornate su tempi, costi e zone di consegna si rimanda alla{" "}
            <a href="/spedizioni" style={{ color: "var(--accent)" }}>pagina Spedizioni</a>.
          </p>
          <p style={pStyle}>
            I tempi di consegna indicati sono stime fornite dal corriere e non costituiscono garanzia. dudidolls non è responsabile per ritardi imputabili al vettore, a cause di forza maggiore, a operazioni doganali o a informazioni di spedizione errate fornite dal Cliente.
          </p>
          <p style={pStyle}>
            Al momento della spedizione, il Cliente riceve via email il numero di tracciamento per seguire lo stato della consegna. Il rischio sul prodotto si trasferisce al Cliente al momento della consegna al vettore, per i consumatori, ai sensi dell&apos;art. 63 del Codice del Consumo.
          </p>
          <p style={pStyle}>
            In caso di prodotto danneggiato alla consegna, il Cliente deve segnalare il danno al corriere al momento del ritiro (apponendo riserva scritta sulla bolla) e contattare dudidolls entro 48 ore all&apos;indirizzo{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)" }}>atelier@dudidolls.it</a>, allegando fotografie del danno e dell&apos;imballaggio.
          </p>
        </div>

        <hr style={divider} />

        {/* 7. Diritto di recesso */}
        <div style={section}>
          <span style={smallMono}>Art. 7</span>
          <h2 style={h2Style}>Diritto di Recesso</h2>
          <p style={pStyle}>
            Il Cliente consumatore ha il diritto di recedere dal contratto entro <strong>14 giorni</strong> dalla ricezione del prodotto, senza dover fornire alcuna motivazione, ai sensi degli artt. 52–58 del Codice del Consumo (D.Lgs. 206/2005) e della Direttiva UE 2011/83/UE.
          </p>
          <p style={pStyle}>
            Per esercitare il diritto di recesso è necessario comunicare la propria decisione a dudidolls prima della scadenza del termine, tramite email all&apos;indirizzo{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)" }}>atelier@dudidolls.it</a>,
            indicando il numero d&apos;ordine e i prodotti oggetto del recesso.
          </p>
          <p style={pStyle}>
            Le procedure dettagliate di recesso, le istruzioni per la restituzione del prodotto e le condizioni per il rimborso sono disponibili nella{" "}
            <a href="/recesso" style={{ color: "var(--accent)" }}>pagina Diritto di Recesso</a>.
          </p>
          <p style={pStyle}>
            <strong>Eccezione — commissioni personalizzate:</strong> il diritto di recesso non si applica ai prodotti realizzati su misura o chiaramente personalizzati in base alle indicazioni del Cliente (art. 59, comma 1, lett. c del Codice del Consumo), tranne nel caso di difetti di fabbricazione.
          </p>
        </div>

        <hr style={divider} />

        {/* 8. Garanzia legale */}
        <div style={section}>
          <span style={smallMono}>Art. 8</span>
          <h2 style={h2Style}>Garanzia Legale di Conformità</h2>
          <p style={pStyle}>
            Tutti i prodotti venduti da dudidolls sono coperti dalla <strong>garanzia legale di conformità</strong> di <strong>2 (due) anni</strong> dalla data di consegna, ai sensi degli artt. 128–135 del Codice del Consumo e della Direttiva UE 2019/771.
          </p>
          <p style={pStyle}>
            In caso di difetto di conformità — vale a dire un difetto presente al momento della consegna che rende il prodotto non conforme al contratto — il Cliente ha diritto, a propria scelta e senza spese:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 12, marginTop: 0 }}>
            <li>alla <strong>riparazione</strong> del prodotto;</li>
            <li>alla <strong>sostituzione</strong> del prodotto (laddove possibile, tenuto conto della natura unica di ogni bambola);</li>
            <li>a una <strong>riduzione proporzionale del prezzo</strong>;</li>
            <li>alla <strong>risoluzione del contratto</strong> e al rimborso integrale, nei casi previsti dalla legge.</li>
          </ul>
          <p style={pStyle}>
            I difetti si presumono esistenti al momento della consegna se si manifestano entro un anno dalla stessa. Il Cliente deve segnalare il difetto entro 2 mesi dalla scoperta. Le segnalazioni vanno inviate a{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)" }}>atelier@dudidolls.it</a>{" "}
            con descrizione del problema e fotografie.
          </p>
          <p style={pStyle}>
            La garanzia legale non copre danni causati da uso improprio, cadute, esposizione prolungata all&apos;umidità o alla luce diretta, lavaggio non indicato, o normale usura derivante dall&apos;utilizzo del prodotto.
          </p>
        </div>

        <hr style={divider} />

        {/* 9. Riparazioni */}
        <div style={section}>
          <span style={smallMono}>Art. 9</span>
          <h2 style={h2Style}>Riparazioni — Garanzia a Vita</h2>
          <p style={pStyle}>
            dudidolls offre un servizio di <strong>riparazione gratuita a vita</strong> per tutti i difetti di manifattura imputabili alla lavorazione artigianale originale: cuciture allentate, perdita di farciture, cedimento di occhi o bottoni applicati in fase di produzione.
          </p>
          <p style={pStyle}>
            Per richiedere una riparazione, il Cliente scrive a{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)" }}>atelier@dudidolls.it</a>{" "}
            con una descrizione del problema e, se utile, alcune fotografie. dudidolls valuta ogni richiesta e concorda con il Cliente le modalità di spedizione verso l&apos;atelier e di restituzione del prodotto riparato.
          </p>
          <p style={pStyle}>
            Le spese di spedizione per la riparazione sono a carico del Cliente per l&apos;invio verso l&apos;atelier; la rispedizione del prodotto riparato è a carico di dudidolls per i soli difetti riconosciuti di manifattura.
          </p>
          <p style={pStyle}>
            Il servizio di riparazione a vita non copre danni accidentali, usura, strappi dovuti a uso improprio, interventi di terzi, o modifiche apportate dal Cliente o da terzi alla bambola originale.
          </p>
        </div>

        <hr style={divider} />

        {/* 10. Foro competente */}
        <div style={section}>
          <span style={smallMono}>Art. 10</span>
          <h2 style={h2Style}>Foro Competente</h2>
          <p style={pStyle}>
            Per qualsiasi controversia relativa all&apos;interpretazione, all&apos;esecuzione o alla risoluzione dei presenti Termini, o derivante dall&apos;acquisto di prodotti tramite il Sito, è competente il <strong>Tribunale di Bolzano</strong>, fatta salva la facoltà del consumatore residente nell&apos;Unione Europea di adire il foro del proprio luogo di residenza, ai sensi della normativa vigente in materia di tutela dei consumatori.
          </p>
          <p style={pStyle}>
            Ai sensi dell&apos;art. 14 del Regolamento UE 524/2013, si informa che la Commissione Europea mette a disposizione una piattaforma per la risoluzione alternativa delle controversie (ODR) accessibile all&apos;indirizzo:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
              ec.europa.eu/consumers/odr
            </a>. L&apos;indirizzo email di dudidolls per le comunicazioni relative all&apos;ODR è:{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)" }}>atelier@dudidolls.it</a>.
          </p>
        </div>

        <hr style={divider} />

        {/* 11. Legge applicabile */}
        <div style={section}>
          <span style={smallMono}>Art. 11</span>
          <h2 style={h2Style}>Legge Applicabile</h2>
          <p style={pStyle}>
            I presenti Termini e Condizioni di Vendita sono disciplinati dalla <strong>legge italiana</strong>, con particolare riferimento al Codice del Consumo (D.Lgs. 206/2005) e al Codice Civile.
          </p>
          <p style={pStyle}>
            Per i consumatori residenti in altri Stati membri dell&apos;Unione Europea si applicano inoltre le disposizioni inderogabili previste dalla normativa europea a tutela dei consumatori, incluse ma non limitate a:
          </p>
          <ul style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", paddingLeft: 24, marginBottom: 12, marginTop: 0 }}>
            <li>Direttiva UE 2011/83/UE sui diritti dei consumatori;</li>
            <li>Direttiva UE 2019/771 sulla vendita di beni;</li>
            <li>Regolamento UE 2016/679 (GDPR) sulla protezione dei dati personali;</li>
            <li>Regolamento UE 524/2013 sulla risoluzione alternativa delle controversie online.</li>
          </ul>
          <p style={pStyle}>
            L&apos;eventuale nullità o inefficacia di una singola clausola dei presenti Termini non pregiudica la validità delle restanti disposizioni, che continueranno ad avere piena efficacia.
          </p>
        </div>

        <hr style={divider} />

        {/* Contatti */}
        <div style={{ marginBottom: 0 }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 16 }}>
            Hai domande?
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 8, marginTop: 0 }}>
            Per qualsiasi chiarimento su questi Termini o sul tuo ordine, scrivici:
          </p>
          <a href="mailto:atelier@dudidolls.it" style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: "0.05em", color: "var(--accent)", textDecoration: "underline" }}>
            atelier@dudidolls.it
          </a>
        </div>

      </main>
      <Footer />
    </>
  );
}
