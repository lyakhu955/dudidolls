import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Ordine confermato",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 32 }}>✦</div>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>Ordine confermato</p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24 }}>
          La tua bambola <span style={{ fontStyle: "italic", color: "var(--accent)" }}>è tua</span>.
        </h1>
        <p style={{ fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          Riceverai una email di conferma a breve. La tua bambola sarà preparata con cura e spedita entro i tempi indicati. Grazie per aver scelto dudidolls.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--ink)", color: "var(--bg)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Torna alla collezione
          </Link>
          <Link
            href="/spedizioni"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", border: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", color: "var(--ink)" }}
          >
            Info spedizioni →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
