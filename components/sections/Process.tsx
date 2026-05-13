import Reveal from "@/components/motion/Reveal";
import { Spool, Pin, Needle, Thimble } from "@/components/atelier/Tools";

const ITEMS = [
  { n: "01", t: "Scegli", d: "Ogni bambola è un pezzo unico. Quando trovi la tua, è già tua." },
  { n: "02", t: "Personalizza", d: "Una piccola dedica ricamata sotto il vestito, su richiesta. Senza costo." },
  { n: "03", t: "Ricevi", d: "Confezione in legno, paglia di segale, certificato firmato a mano." },
  { n: "04", t: "Custodisci", d: "Cucita per durare cinquant'anni. Riparazioni a vita, gratuite." },
];

const TOOLS = [
  <Spool key="s" color="#c4623e" rot={-6} />,
  <Pin key="p" rot={-22} />,
  <Needle key="n" color="#6b7d4f" rot={6} />,
  <Thimble key="t" rot={4} />,
];

export default function Process() {
  return (
    <section className="process">
      <div className="process-grid">
        {ITEMS.map((it, i) => (
          <Reveal key={i} className="process-item" delay={i * 60}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div className="n">{it.n}</div>
              <div style={{ opacity: 0.7 }}>{TOOLS[i]}</div>
            </div>
            <h4>{it.t}</h4>
            <p>{it.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
