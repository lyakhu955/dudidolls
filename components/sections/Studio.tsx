import Reveal from "@/components/motion/Reveal";
import {
  Spool, Needle, Pin, Thimble, Tape,
  Polaroid, Schema, Swatch, PaperPin,
} from "@/components/atelier/Tools";

export default function Studio() {
  return (
    <section className="studio" id="studio">
      <Reveal as="div" className="studio-head">
        <div className="index">— 00</div>
        <h2 className="title">
          Lo studio,
          <br />
          tra <span className="it">spilli e pensieri</span>
        </h2>
        <div className="meta">
          Atelier di Simona
          <br />
          Lana, IT
        </div>
      </Reveal>

      <span className="corner-pin" style={{ top: 18, left: 22 }} />
      <span className="corner-pin" style={{ top: 18, right: 22 }} />
      <span className="corner-pin" style={{ bottom: 18, left: 22 }} />
      <span className="corner-pin" style={{ bottom: 18, right: 22 }} />

      <div className="studio-grid">
        <Reveal className="studio-tools">
          <div>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 18 }}>— strumenti del banco</div>
            <div className="tools-row">
              <Spool rot={-4} color="#c4623e" />
              <Spool rot={6} color="oklch(50% 0.08 145)" />
              <Spool rot={-2} color="oklch(40% 0.04 60)" />
              <Thimble rot={3} />
              <Pin rot={-18} />
              <Pin rot={12} />
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 14 }}>— ago infilato</div>
            <Needle rot={-6} color="#c4623e" />
          </div>
          <div>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 10 }}>— fettuccia da sarta</div>
            <Tape />
          </div>
          <PaperPin rot={-1.5} style={{ maxWidth: "min(380px, 100%)" }}>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 10 }}>Lista del giorno · 12 mag</div>
            <ul style={{ listStyle: "none", fontFamily: "'Caveat', cursive", fontSize: 22, lineHeight: 1.55, color: "var(--ink-2)" }}>
              <li>✓ carving fronte Anouk</li>
              <li>✓ cucire abito Miele</li>
              <li style={{ color: "var(--accent)" }}>○ dipingere occhi Tobia</li>
              <li style={{ color: "var(--muted)" }}>○ provare lino antico</li>
              <li style={{ color: "var(--muted)" }}>○ spedire Maria, Lione</li>
            </ul>
          </PaperPin>
        </Reveal>

        <Reveal className="studio-pol-1">
          <Polaroid caption="Anouk — prima passata" date="08 apr 2026" rot={-4} label="doll in progress · testa" img="/foto/1.png" />
        </Reveal>
        <Reveal className="studio-pol-2" delay={80}>
          <Polaroid caption="il cassetto delle lane" date="11 apr 2026" rot={3} label="fili · lane · ritagli" hue={30} img="/foto/spools.jpg" />
        </Reveal>

        <Reveal className="studio-schema" delay={40}>
          <Schema />
        </Reveal>

        <Reveal className="studio-pol-3" delay={120}>
          <Polaroid caption="primo punto, sempre tremante" date="14 apr 2026" rot={-2} label="mano · ago · lino" hue={-10} img="/foto/needle.jpg" />
        </Reveal>

        <Reveal className="studio-swatches" delay={160}>
          <div className="mono" style={{ color: "var(--muted)", marginBottom: 22 }}>— tessuti scelti per la stagione</div>
          <div className="swatch-strip">
            <Swatch color="#c4623e" label="terra · 4m" rot={-2} />
            <Swatch color="#a89572" label="sabbia · 2m" rot={1} />
            <Swatch color="#6b7d4f" label="salvia · 3m" rot={-1} />
            <Swatch color="#3d4a5f" label="notte · 1m" rot={2} />
            <Swatch color="#e0d4ba" label="latte · 5m" rot={-2} />
          </div>
        </Reveal>

        <Reveal className="studio-paper paper-pin" delay={100} style={{ "--rot": "1deg" } as React.CSSProperties}>
          Ogni giorno entro qui alle sette e mezza.<br />
          Accendo la lampada gialla, scelgo una bambola che ha bisogno di me, e comincio.<br />
          Alcune chiedono un orecchio più alto, altre uno sguardo che ancora non hanno trovato.<br />
          <span className="sign">— Simona</span>
        </Reveal>
      </div>
    </section>
  );
}
