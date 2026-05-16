import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dudidolls — Pagamento annullato",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <>
      <Nav />
      <MobileMenu />
      <main style={{ padding: "160px 40px 120px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>Pagamento annullato</p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24 }}>
          Nessun problema,{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>riprova quando vuoi</span>.
        </h1>
        <p style={{ fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          Il pagamento non è stato completato. Il tuo carrello è ancora lì ad aspettarti.
        </p>
        <Link
          href="/#gallery"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--ink)", color: "var(--bg)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
        >
          ← Torna al carrello
        </Link>
      </main>
      <Footer />
    </>
  );
}
