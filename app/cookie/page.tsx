import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Cookie Policy",
  description: "Informativa sull'uso dei cookie sul sito dudidolls.it",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 48 }}>
    <h2 style={{
      fontFamily: "var(--serif)",
      fontSize: "clamp(22px, 3vw, 30px)",
      letterSpacing: "-0.02em",
      marginBottom: 16,
      color: "var(--ink)",
    }}>
      {title}
    </h2>
    {children}
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: "var(--sans)",
    fontSize: 16,
    lineHeight: 1.75,
    color: "var(--ink-2)",
    marginBottom: 12,
  }}>
    {children}
  </p>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{
    fontFamily: "var(--sans)",
    fontSize: 16,
    lineHeight: 1.75,
    color: "var(--ink-2)",
    marginBottom: 6,
  }}>
    {children}
  </li>
);

export default function CookiePage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto" }}>

        <p style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: 0.5,
          marginBottom: 24,
        }}>
          Cookie Policy
        </p>

        <h1 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(40px, 7vw, 80px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          marginBottom: 40,
        }}>
          I <span style={{ fontStyle: "italic", color: "var(--accent)" }}>cookie</span> che usiamo.
        </h1>

        <P>
          Ultimo aggiornamento: maggio 2026. Questa pagina descrive come il sito dudidolls.it
          utilizza i cookie e tecnologie simili, in conformità al Regolamento UE 2016/679 (GDPR)
          e al Codice del Consumo italiano.
        </P>

        <div style={{ borderTop: "1px solid var(--line)", margin: "40px 0" }} />

        <Section title="Cosa sono i cookie">
          <P>
            I cookie sono piccoli file di testo che un sito web salva sul tuo dispositivo quando
            lo visiti. Servono a ricordare le tue preferenze, a mantenere attiva la sessione e,
            in alcuni casi, a raccogliere dati statistici anonimi sull&apos;utilizzo del sito.
          </P>
          <P>
            I cookie non contengono informazioni personali direttamente identificative e non
            possono eseguire programmi o trasmettere virus.
          </P>
        </Section>

        <Section title="Cookie tecnici necessari">
          <P>
            Questi cookie sono indispensabili per il corretto funzionamento del sito. Non
            richiedono il tuo consenso e non possono essere disabilitati senza compromettere
            l&apos;esperienza di navigazione.
          </P>
          <ul style={{ paddingLeft: 24, marginBottom: 12 }}>
            <Li>
              <strong>Cookie di sessione Next.js</strong> — gestiscono il routing lato server e
              la cache delle pagine. Durata: sessione.
            </Li>
            <Li>
              <strong>Zustand / localStorage</strong> — memorizzano lo stato del carrello e le
              preferenze dell&apos;interfaccia (es. menu aperto, cookie consent). Durata: persistente
              fino alla cancellazione manuale.
            </Li>
            <Li>
              <strong>dudidolls-cookie-consent</strong> — registra la tua scelta sul consenso ai
              cookie. Durata: persistente.
            </Li>
          </ul>
        </Section>

        <Section title="Cookie analitici">
          <P>
            Al momento il sito dudidolls.it non utilizza cookie analitici di terze parti (es.
            Google Analytics). Eventuali statistiche di accesso sono aggregate e anonime,
            gestite direttamente dall&apos;infrastruttura Vercel senza profilazione individuale.
          </P>
          <P>
            Qualora in futuro venissero introdotti strumenti analitici, questa policy sarà
            aggiornata e verrà richiesto il tuo consenso esplicito.
          </P>
        </Section>

        <Section title="Cookie di terze parti — Stripe">
          <P>
            Per elaborare i pagamenti in modo sicuro utilizziamo <strong>Stripe</strong>, un
            servizio certificato PCI-DSS. Stripe può impostare cookie propri durante il processo
            di checkout per prevenire frodi e garantire la sicurezza della transazione.
          </P>
          <ul style={{ paddingLeft: 24, marginBottom: 12 }}>
            <Li>
              <strong>__stripe_mid / __stripe_sid</strong> — identificatori di sessione per la
              prevenzione delle frodi. Durata: 1 anno / sessione.
            </Li>
          </ul>
          <P>
            Questi cookie sono attivati solo durante il checkout e sono soggetti alla{" "}
            <a
              href="https://stripe.com/it/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              Privacy Policy di Stripe
            </a>
            .
          </P>
        </Section>

        <Section title="Come disabilitare i cookie">
          <P>
            Puoi gestire o disabilitare i cookie direttamente dalle impostazioni del tuo browser.
            Tieni presente che disabilitare i cookie tecnici potrebbe impedire il corretto
            funzionamento del carrello e del checkout.
          </P>
          <ul style={{ paddingLeft: 24, marginBottom: 12 }}>
            <Li>
              <strong>Chrome</strong> — Impostazioni › Privacy e sicurezza › Cookie e altri dati
              dei siti
            </Li>
            <Li>
              <strong>Firefox</strong> — Impostazioni › Privacy e sicurezza › Cookie e dati dei
              siti web
            </Li>
            <Li>
              <strong>Safari</strong> — Preferenze › Privacy › Gestisci dati siti web
            </Li>
            <Li>
              <strong>Edge</strong> — Impostazioni › Cookie e autorizzazioni sito › Cookie e dati
              archiviati
            </Li>
          </ul>
          <P>
            Puoi anche revocare il consenso in qualsiasi momento cancellando la voce
            <code style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              background: "var(--line)",
              padding: "2px 6px",
              borderRadius: 3,
              margin: "0 4px",
            }}>
              dudidolls-cookie-consent
            </code>
            dal localStorage del tuo browser (Strumenti per sviluppatori › Applicazione ›
            Local Storage).
          </P>
        </Section>

        <Section title="Aggiornamento della policy">
          <P>
            Questa cookie policy può essere aggiornata in qualsiasi momento per riflettere
            modifiche tecniche o normative. La data di ultima revisione è sempre indicata in
            cima alla pagina. In caso di modifiche sostanziali, mostreremo nuovamente il banner
            di consenso.
          </P>
          <P>
            Per qualsiasi domanda scrivi a{" "}
            <a
              href="mailto:atelier@dudidolls.it"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              atelier@dudidolls.it
            </a>
            .
          </P>
        </Section>

      </main>
      <Footer />
    </>
  );
}
