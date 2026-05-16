import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Craft() {
  return (
    <section style={{ padding: "120px 0" }} id="craft">
      <Reveal as="div" className="section-head">
        <div className="index">— 02</div>
        <h2 className="title">
          Il rituale <span className="it">del fare</span>
        </h2>
        <div className="meta">
          Quattro tempi
          <br />
          Una sola mano
        </div>
      </Reveal>
      <div className="craft">
        <div className="craft-sticky">
          <Image src="/foto/craft.jpg" alt="Atelier · Lana" fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="craft-text">
          <Reveal className="craft-block">
            <div className="step">— Atto I</div>
            <h3>
              Si <span className="it">ascolta</span> la stoffa
            </h3>
            <p>Ogni rotolo di lino, ogni avanzo di velluto antico ha un carattere. Aspettiamo che ci dica che bambola vuole diventare. A volte sono giorni di attesa.</p>
          </Reveal>
          <Reveal className="craft-block" delay={80}>
            <div className="step">— Atto II</div>
            <h3>
              Si <span className="it">disegna</span> il volto
            </h3>
            <p>Un occhio leggermente più basso dell&apos;altro, una piega d&apos;espressione vicino alla bocca. Mai due volti uguali. È qui che nasce il nome.</p>
          </Reveal>
          <Reveal className="craft-block" delay={160}>
            <div className="step">— Atto III</div>
            <h3>
              Si <span className="it">cuce</span> a mano
            </h3>
            <p>Punto dopo punto, in silenzio. Il corpo è imbottito a strati con lana cardata di pecora locale. Un singolo pezzo richiede circa 14 giorni.</p>
          </Reveal>
          <Reveal className="craft-block" delay={240}>
            <div className="step">— Atto IV</div>
            <h3>
              Si <span className="it">firma</span> e parte
            </h3>
            <p>Numerazione, firma a inchiostro sotto il piede sinistro, certificato su carta cotone. Spedita in scatola di legno con paglia di segale.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
