import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Featured() {
  return (
    <section className="featured">
      <Reveal as="div" className="featured-left">
        <p className="quote">
          Sono bambole che invecchiano bene, come certi mobili di famiglia. Le compri per una bambina e finiscono sul comò di sua nonna.
        </p>
        <div className="by">— Vogue Italia · primavera 2026</div>
      </Reveal>
      <Reveal className="featured-right" delay={100}>
        <Image src="/foto/fabric.jpg" alt="Atelier · dettaglio cucitura" fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 50vw" />
      </Reveal>
    </section>
  );
}
