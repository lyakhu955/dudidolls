import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Contatti",
  description: "Scrivici. Siamo nell'atelier, tra le valli del Sudtirolo.",
};

export default function AccediPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>Contatti</p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 40 }}>
          Scrivici <span style={{ fontStyle: "italic", color: "var(--accent)" }}>qui</span>.
        </h1>
        <p style={{ fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 40 }}>
          Per commissioni, riparazioni o semplicemente per raccontarci dove vive la tua bambola.
        </p>
        <a href="mailto:atelier@dudidolls.it" style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: "0.05em", color: "var(--accent)", textDecoration: "underline" }}>
          atelier@dudidolls.it
        </a>
      </main>
      <Footer />
    </>
  );
}
