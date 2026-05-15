"use client";
import ThreadSeparator from "@/components/motion/ThreadSeparator";

export default function HeroContent() {
  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="hero">
      <ThreadSeparator />
      <div className="hero-bottom-row">
        <p className="hero-tagline">
          Bambole d'autore cucite una alla volta,
          <br />
          tra le valli del Sudtirolo. Ogni pezzo è{" "}
          <span className="it" style={{ color: "var(--accent)" }}>unico</span>, firmato, e ha già un nome.
        </p>
        <div className="hero-cta-group">
          <button className="btn-outline" onClick={scrollToGallery}>
            Scopri la collezione <span>→</span>
          </button>
        </div>
      </div>

      <div className="hero-meta">
        <div>
          <span className="num">
            128<span className="sup">★</span>
          </span>
          Pezzi cuciti nel 2026
        </div>
        <div>
          <span className="num">1 / 1</span>
          Ogni bambola è unica
        </div>
        <div>
          <span className="num">
            14<span className="sup">gg</span>
          </span>
          Tempo medio di lavorazione
        </div>
        <div>
          <span className="num">IT</span>
          Spedizione in 24h
        </div>
      </div>
    </header>
  );
}
