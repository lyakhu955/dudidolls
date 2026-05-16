import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Informativa sulla Privacy",
  description: "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
  robots: { index: true, follow: true },
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--serif)",
  fontSize: 24,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  marginTop: 48,
  marginBottom: 12,
  color: "var(--ink)",
};

const pStyle: React.CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 16,
  lineHeight: 1.75,
  color: "var(--ink-2)",
  marginBottom: 16,
};

const liStyle: React.CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 16,
  lineHeight: 1.75,
  color: "var(--ink-2)",
  marginBottom: 8,
};

const ulStyle: React.CSSProperties = {
  paddingLeft: 24,
  marginBottom: 16,
};

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid var(--ink-2)",
  opacity: 0.12,
  margin: "40px 0",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 760, margin: "0 auto" }}>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
          Informativa Privacy · GDPR Art. 13
        </p>

        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 32 }}>
          Informativa sulla{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Privacy</span>
        </h1>

        <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.75, color: "var(--ink-2)", marginBottom: 48, opacity: 0.7 }}>
          Ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR), ti forniamo le seguenti informazioni sul trattamento dei tuoi dati personali. Ti invitiamo a leggere attentamente questo documento prima di utilizzare il sito dudidolls.it e i servizi ad esso collegati.
        </p>

        <hr style={dividerStyle} />

        {/* 1. Titolare del trattamento */}
        <h2 style={h2Style}>1. Titolare del trattamento</h2>
        <p style={pStyle}>
          Il titolare del trattamento dei dati personali è:
        </p>
        <p style={{ ...pStyle, paddingLeft: 16, borderLeft: "2px solid var(--accent)", opacity: 0.9 }}>
          <strong style={{ fontFamily: "var(--sans)", color: "var(--ink)" }}>Simona Calloni</strong><br />
          Operante con il marchio <strong style={{ fontFamily: "var(--sans)", color: "var(--ink)" }}>dudidolls</strong><br />
          Sede operativa: Alto Adige / Sudtirol, Italia<br />
          Partita IVA: 02938471055<br />
          Email:{" "}
          <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)", textDecoration: "underline", fontFamily: "var(--mono)", fontSize: 14 }}>
            atelier@dudidolls.it
          </a>
        </p>

        <hr style={dividerStyle} />

        {/* 2. Tipi di dati raccolti */}
        <h2 style={h2Style}>2. Tipi di dati raccolti</h2>
        <p style={pStyle}>
          In relazione ai diversi servizi offerti, raccogliamo le seguenti categorie di dati personali:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orario e durata della visita. Questi dati sono raccolti automaticamente dai sistemi informatici che gestiscono il sito e sono necessari al suo corretto funzionamento.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Dati di contatto:</strong> nome, cognome e indirizzo email forniti volontariamente tramite il modulo di contatto o in fase di iscrizione alla newsletter.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Dati di ordine:</strong> nome e cognome, indirizzo di spedizione e fatturazione, numero di telefono, indirizzo email, dettagli dell&apos;ordine acquistato. I dati di pagamento (carta di credito, IBAN) non transitano sui nostri sistemi ma sono trattati direttamente dal processore di pagamento Stripe.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Cookie tecnici:</strong> piccoli file di testo necessari al funzionamento del sito (sessione, preferenze). Non utilizziamo cookie di profilazione o cookie di terze parti a scopo pubblicitario senza il tuo consenso esplicito.
          </li>
        </ul>
        <p style={pStyle}>
          Non raccogliamo dati appartenenti a categorie particolari ai sensi dell&apos;art. 9 GDPR (dati relativi alla salute, all&apos;origine etnica, alle convinzioni religiose, ecc.).
        </p>

        <hr style={dividerStyle} />

        {/* 3. Finalità del trattamento */}
        <h2 style={h2Style}>3. Finalità del trattamento</h2>
        <p style={pStyle}>I tuoi dati personali sono trattati per le seguenti finalità:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Evasione degli ordini:</strong> gestione dell&apos;ordine di acquisto, elaborazione del pagamento, organizzazione della spedizione e comunicazioni relative allo stato dell&apos;ordine. Senza questi dati non è possibile completare la transazione.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Adempimenti fiscali e contabili:</strong> emissione di fatture o ricevute di vendita e conservazione della documentazione contabile secondo gli obblighi di legge.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Newsletter e comunicazioni commerciali:</strong> invio periodico di aggiornamenti sulle nuove collezioni, eventi e offerte riservate. Questa finalità è attivata esclusivamente previo tuo consenso esplicito e liberamente revocabile.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Miglioramento del sito:</strong> analisi statistica anonima dei dati di navigazione per ottimizzare le prestazioni, la struttura e l&apos;esperienza d&apos;uso del sito.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Gestione delle richieste di contatto:</strong> risposta alle tue domande, richieste di informazioni o comunicazioni relative a commissioni personalizzate.
          </li>
        </ul>

        <hr style={dividerStyle} />

        {/* 4. Base giuridica */}
        <h2 style={h2Style}>4. Base giuridica del trattamento</h2>
        <p style={pStyle}>Il trattamento dei tuoi dati si fonda sulle seguenti basi giuridiche ai sensi dell&apos;art. 6 GDPR:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Esecuzione di un contratto (art. 6, par. 1, lett. b):</strong> il trattamento è necessario per dare seguito all&apos;acquisto effettuato, incluse le operazioni di spedizione, fatturazione e assistenza post-vendita.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Consenso dell&apos;interessato (art. 6, par. 1, lett. a):</strong> per l&apos;iscrizione alla newsletter e per l&apos;invio di comunicazioni di marketing. Il consenso può essere revocato in qualsiasi momento inviando una richiesta a{" "}
            <a href="mailto:atelier@dudidolls.it" style={{ color: "var(--accent)", textDecoration: "underline", fontFamily: "var(--mono)", fontSize: 14 }}>atelier@dudidolls.it</a>{" "}
            o cliccando sul link di disiscrizione presente in ogni email.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Obbligo legale (art. 6, par. 1, lett. c):</strong> per gli adempimenti fiscali e contabili previsti dalla normativa italiana ed europea (conservazione delle fatture, registri IVA).
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Legittimo interesse (art. 6, par. 1, lett. f):</strong> per la sicurezza del sito web, la prevenzione di frodi e il miglioramento delle funzionalità del servizio, nella misura in cui tali interessi non prevalgano sui tuoi diritti fondamentali.
          </li>
        </ul>

        <hr style={dividerStyle} />

        {/* 5. Destinatari dei dati */}
        <h2 style={h2Style}>5. Destinatari dei dati</h2>
        <p style={pStyle}>
          I tuoi dati personali possono essere comunicati, nei limiti strettamente necessari, alle seguenti categorie di soggetti che operano in qualità di responsabili del trattamento o titolari autonomi:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Stripe, Inc.</strong> — processore di pagamento. I dati della carta di credito sono trasmessi direttamente a Stripe attraverso connessione cifrata TLS. Stripe è certificato PCI DSS Livello 1. Informativa Stripe:{" "}
            <a href="https://stripe.com/it/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline", fontFamily: "var(--mono)", fontSize: 13 }}>
              stripe.com/it/privacy
            </a>
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Corrieri e servizi postali</strong> — il nome, l&apos;indirizzo di spedizione e il numero di telefono vengono trasmessi al corriere scelto (es. BRT, GLS, Poste Italiane) al solo scopo di consegnare l&apos;ordine.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Provider di hosting e infrastruttura</strong> — il sito è ospitato su Vercel, Inc. (infrastruttura cloud con server in Europa). I dati di navigazione possono transitare su questi sistemi nell&apos;ambito della normale erogazione del servizio.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Commercialista o consulente fiscale</strong> — i dati fiscali possono essere condivisi con il professionista incaricato della contabilità, vincolato da obblighi di riservatezza.
          </li>
        </ul>
        <p style={pStyle}>
          I tuoi dati non vengono venduti, ceduti o comunicati a terzi per finalità di marketing di soggetti diversi da dudidolls, né trasferiti in Paesi al di fuori dello Spazio Economico Europeo senza adeguate garanzie ai sensi degli artt. 44–49 GDPR.
        </p>

        <hr style={dividerStyle} />

        {/* 6. Periodo di conservazione */}
        <h2 style={h2Style}>6. Periodo di conservazione</h2>
        <p style={pStyle}>I tuoi dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Documenti fiscali e fatture:</strong> 10 anni dalla data dell&apos;operazione, come previsto dall&apos;art. 2220 del Codice Civile e dalla normativa fiscale italiana.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Dati del profilo cliente e storico ordini:</strong> 2 anni dall&apos;ultimo acquisto o dall&apos;ultima interazione con il servizio, dopodiché i dati vengono eliminati o anonimizzati.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Dati newsletter:</strong> fino alla revoca del consenso. In caso di disiscrizione, i dati vengono rimossi dall&apos;elenco entro 30 giorni dalla richiesta.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Log di navigazione:</strong> massimo 12 mesi, salvo necessità di conservazione per accertamento di reati informatici da parte delle autorità competenti.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Comunicazioni email e richieste di contatto:</strong> 2 anni dalla data dell&apos;ultima comunicazione, trascorsi i quali le email vengono eliminate.
          </li>
        </ul>

        <hr style={dividerStyle} />

        {/* 7. Diritti dell'interessato */}
        <h2 style={h2Style}>7. I tuoi diritti</h2>
        <p style={pStyle}>
          In qualità di interessato, hai il diritto di esercitare i seguenti diritti nei confronti del titolare del trattamento, ai sensi degli artt. 15–22 GDPR:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto di accesso (art. 15):</strong> puoi richiedere conferma che sia o meno in corso un trattamento di dati personali che ti riguardano e, in tal caso, ottenere una copia dei dati trattati.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto di rettifica (art. 16):</strong> puoi chiedere la correzione di dati inesatti o l&apos;integrazione di dati incompleti che ti riguardano.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto alla cancellazione (art. 17):</strong> puoi richiedere la cancellazione dei tuoi dati personali quando non siano più necessari rispetto alle finalità per cui sono stati raccolti, o quando tu revochi il consenso su cui si basa il trattamento, salvo che il trattamento sia necessario per adempiere a un obbligo legale.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto di limitazione del trattamento (art. 18):</strong> puoi richiedere la limitazione del trattamento dei tuoi dati in determinati casi previsti dal GDPR (es. mentre verifichi l&apos;esattezza dei dati contestati).
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto alla portabilità (art. 20):</strong> puoi ricevere i dati che ti riguardano in un formato strutturato, di uso comune e leggibile da dispositivo automatico, e trasmetterli a un altro titolare del trattamento, ove tecnicamente possibile.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto di opposizione (art. 21):</strong> puoi opporti in qualsiasi momento al trattamento dei tuoi dati per finalità di marketing diretto o basato sul legittimo interesse, con effetto immediato.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto di revocare il consenso:</strong> se il trattamento si basa sul consenso, hai il diritto di revocarlo in qualsiasi momento senza pregiudizio per la liceità del trattamento effettuato prima della revoca.
          </li>
          <li style={liStyle}>
            <strong style={{ color: "var(--ink)" }}>Diritto di proporre reclamo:</strong> puoi proporre reclamo all&apos;autorità di controllo competente. In Italia, l&apos;autorità di controllo è il <strong style={{ color: "var(--ink)" }}>Garante per la protezione dei dati personali</strong> (www.garanteprivacy.it, email: garante@gpdp.it).
          </li>
        </ul>

        <hr style={dividerStyle} />

        {/* 8. Come esercitare i diritti */}
        <h2 style={h2Style}>8. Come esercitare i tuoi diritti</h2>
        <p style={pStyle}>
          Per esercitare qualsiasi diritto elencato nella sezione precedente, o per richiedere informazioni sul trattamento dei tuoi dati, puoi scrivere direttamente al titolare del trattamento:
        </p>
        <p style={{ ...pStyle, paddingLeft: 16, borderLeft: "2px solid var(--accent)" }}>
          <a href="mailto:atelier@dudidolls.it" style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--accent)", textDecoration: "underline", letterSpacing: "0.03em" }}>
            atelier@dudidolls.it
          </a>
          <br />
          <span style={{ fontSize: 14, opacity: 0.7, fontFamily: "var(--sans)" }}>
            Simona Calloni · dudidolls · Alto Adige / Sudtirol
          </span>
        </p>
        <p style={pStyle}>
          Daremo riscontro alla tua richiesta entro 30 giorni dal ricevimento, come previsto dall&apos;art. 12 GDPR. In caso di richieste particolarmente complesse o numerose, questo termine potrà essere prorogato di ulteriori 60 giorni, dandoti comunicazione della proroga e della relativa motivazione entro il primo mese.
        </p>
        <p style={pStyle}>
          Non è richiesta alcuna forma specifica per la richiesta: è sufficiente un&apos;email chiara che descriva il diritto che intendi esercitare e consenta di identificarti come interessato.
        </p>

        <hr style={dividerStyle} />

        {/* 9. Aggiornamenti */}
        <h2 style={h2Style}>9. Modifiche alla presente informativa</h2>
        <p style={pStyle}>
          Il titolare si riserva il diritto di aggiornare la presente informativa in qualsiasi momento per adeguarla a modifiche normative, tecnologiche o operative. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Ti invitiamo a consultare periodicamente questa pagina.
        </p>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", opacity: 0.4, marginTop: 48, textTransform: "uppercase" }}>
          Ultimo aggiornamento: maggio 2026
        </p>

      </main>
      <Footer />
    </>
  );
}
