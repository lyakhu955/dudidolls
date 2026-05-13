"use client";
import { useStore, useCartCount } from "@/lib/store";

export default function Nav() {
  const setMenu = useStore((s) => s.setMenu);
  const setDrawer = useStore((s) => s.setDrawer);
  const cartCount = useCartCount();

  return (
    <nav className="nav">
      <div className="nav-left">
        <button className="nav-hamburger" onClick={() => setMenu(true)} aria-label="Apri menu">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <a className="nav-link" href="/#gallery">Collezione</a>
        <a className="nav-link" href="/#craft">Atelier</a>
        <a className="nav-link" href="#">Diario</a>
      </div>
      <a className="nav-brand" href="/">dudidolls</a>
      <div className="nav-right">
        <a className="nav-link" href="#">Cerca</a>
        <a className="nav-link" href="#">Accedi</a>
        <button className="cart-pill" onClick={() => setDrawer(true)}>
          <span className="cart-dot" />
          Carrello ({cartCount})
        </button>
      </div>
    </nav>
  );
}
