"use client";
import { useState } from "react";
import Image from "next/image";
import { dollImage } from "@/lib/data";
import { useStore, useCartTotal } from "@/lib/store";

export default function CartDrawer() {
  const open = useStore((s) => s.drawerOpen);
  const setDrawer = useStore((s) => s.setDrawer);
  const cart = useStore((s) => s.cart);
  const remove = useStore((s) => s.remove);
  const total = useCartTotal();
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart.map((i) => ({ id: i.id, qty: i.qty })) }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Errore nel checkout: " + (data.error || "riprova"));
      }
    } catch {
      alert("Errore di rete, riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`drawer-backdrop ${open ? "open" : ""}`} onClick={() => setDrawer(false)} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-h">
          <h3>Il tuo carrello</h3>
          <button className="x" onClick={() => setDrawer(false)}>
            Chiudi ✕
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <div className="serif italic">
                Ancora nessuna
                <br />
                bambola scelta.
              </div>
              <div className="mono">torna nella collezione →</div>
            </div>
          ) : (
            cart.map((it) => (
              <div className="cart-item" key={it.id}>
                <div className="cart-item-img">
                  <Image src={dollImage(it.id)} alt={it.name} fill sizes="80px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h4>
                    {it.name}, <span className="italic">{it.italic}</span>
                  </h4>
                  <div className="meta">
                    {it.edition} · {it.height}
                  </div>
                  <div className="qty mono" style={{ marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
                    Qty: {it.qty}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="price">€{it.price}</div>
                  <button className="remove" onClick={() => remove(it.id)}>
                    Rimuovi
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-f">
            <div className="drawer-total">
              <span className="label">Totale</span>
              <span className="amount">€{total}</span>
            </div>
            <button className="btn-primary" onClick={checkout} disabled={loading}>
              <span>{loading ? "Caricamento…" : "Vai al checkout"}</span>
              {!loading && <span className="arrow">→</span>}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
