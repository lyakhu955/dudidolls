"use client";
import { useStore, useCartCount } from "@/lib/store";

export default function MobileBottomBar() {
  const setDrawer = useStore((s) => s.setDrawer);
  const cartCount = useCartCount();

  return (
    <div className="mobile-bottom-bar">
      <button className="btn-primary" onClick={() => setDrawer(true)}>
        <span>Carrello ({cartCount})</span>
        <span className="arrow">→</span>
      </button>
    </div>
  );
}
