"use client";
import Image from "next/image";
import { dollImage } from "@/lib/data";
import { useStore, useCartTotal } from "@/lib/store";

export default function CartDrawer() {
  const open = useStore((s) => s.drawerOpen);
  const setDrawer = useStore((s) => s.setDrawer);
  const cart = useStore((s) => s.cart);
  const remove = useStore((s) => s.remove);
  const total = useCartTotal();

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
                    Qty: 1
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
            <button className="btn-primary">
              <span>Vai al checkout</span>
              <span className="arrow">→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
