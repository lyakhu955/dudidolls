import Reveal from "@/components/motion/Reveal";
import DollCard from "@/components/product/DollCard";
import { DOLLS } from "@/lib/data";

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <Reveal as="div" className="section-head">
        <div className="index">— 01</div>
        <h2 className="title">
          La collezione, <span className="it">nata in primavera</span>
        </h2>
        <div className="meta">
          Otto pezzi
          <br />
          Edizione unica
        </div>
      </Reveal>
      <div className="gallery-grid">
        {DOLLS.map((d) => (
          <DollCard key={d.id} doll={d} />
        ))}
      </div>
    </section>
  );
}
