"use client";
import Link from "next/link";
import { useStore, useCartCount } from "@/lib/store";

export default function Nav() {
  const setMenu = useStore((s) => s.setMenu);
  const setDrawer = useStore((s) => s.setDrawer);
  const introFinished = useStore((s) => s.introFinished);
  const cartCount = useCartCount();

  return (
    <nav className={`nav ${!introFinished ? "nav-hidden" : ""}`}>
      <div className="nav-left">
        <button className="nav-hamburger" onClick={() => setMenu(true)} aria-label="Apri menu">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <Link className="nav-link" href="/#gallery">Collezione</Link>
        <Link className="nav-link" href="/#craft">Atelier</Link>
        <Link className="nav-link" href="/diario">Diario</Link>
      </div>
      <Link className="nav-brand" href="/">dudidolls</Link>
      <div className="nav-right">
        <Link className="nav-link" href="/#gallery">Cerca</Link>
        <Link className="nav-link" href="/accedi">Accedi</Link>
        <button className="cart-pill" onClick={() => setDrawer(true)}>
          <span className="cart-dot" />
          Carrello ({cartCount})
        </button>
      </div>
    </nav>
  );
}
