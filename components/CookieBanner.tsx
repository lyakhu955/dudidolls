"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dudidolls-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = (type: "all" | "necessary") => {
    localStorage.setItem("dudidolls-cookie-consent", type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
      background: "var(--bg)", borderTop: "1px solid var(--line)",
      padding: "20px 32px", display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 24, flexWrap: "wrap",
      fontFamily: "var(--sans)", fontSize: 14,
    }}>
      <p style={{ margin: 0, maxWidth: 600, color: "var(--ink-2)", lineHeight: 1.5 }}>
        Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso, cookie analitici per migliorare l&apos;esperienza.{" "}
        <Link href="/cookie" style={{ color: "var(--accent)", textDecoration: "underline" }}>Leggi la cookie policy</Link>.
      </p>
      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        <button
          onClick={() => accept("necessary")}
          style={{ padding: "10px 20px", border: "1px solid var(--line)", background: "transparent", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Solo necessari
        </button>
        <button
          onClick={() => accept("all")}
          style={{ padding: "10px 20px", background: "var(--ink)", color: "var(--bg)", border: "none", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
