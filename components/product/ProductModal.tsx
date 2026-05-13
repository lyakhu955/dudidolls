"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { dollImage } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ProductModal() {
  const doll = useStore((s) => s.modalDoll);
  const setModal = useStore((s) => s.setModal);
  const addToCart = useStore((s) => s.addToCart);
  const open = !!doll;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setModal]);

  return (
    <>
      <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={() => setModal(null)} />
      <div className={`modal ${open ? "open" : ""}`}>
        {doll && (
          <>
            <button className="modal-close" onClick={() => setModal(null)}>
              ✕
            </button>
            <div className="modal-img">
              <Image
                src={dollImage(doll.id)}
                alt={`ritratto · ${doll.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="modal-info">
              <div className="eyebrow">
                {doll.edition} · primavera {doll.year}
              </div>
              <h2>
                {doll.name},
                <br />
                <span className="it">{doll.italic}</span>
              </h2>
              <p className="desc">{doll.desc}</p>
              <dl className="modal-spec">
                <div><dt>Altezza</dt><dd>{doll.height}</dd></div>
                <div><dt>Materiali</dt><dd>{doll.materials}</dd></div>
                <div><dt>Atelier</dt><dd>{doll.origin}</dd></div>
                <div><dt>Edizione</dt><dd>{doll.edition}</dd></div>
              </dl>
              <div className="modal-price-row">
                <div>
                  <div className="eyebrow">Prezzo</div>
                  <div className="price">€{doll.price}</div>
                </div>
                <button
                  className="btn-primary"
                  style={{ width: "auto", paddingLeft: 28, paddingRight: 24 }}
                  onClick={() => addToCart(doll)}
                >
                  <span>Aggiungi al carrello</span>
                  <span className="arrow" style={{ marginLeft: 14 }}>→</span>
                </button>
              </div>
              <Link
                href={`/product/${doll.id}`}
                style={{ display: "inline-block", marginTop: 14, fontSize: 14, color: "var(--accent)", cursor: "pointer", textDecoration: "underline" }}
              >
                Vedi pagina dedicata →
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
