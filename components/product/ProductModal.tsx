"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

export default function ProductModal() {
  const doll = useStore((s) => s.modalDoll);
  const setModal = useStore((s) => s.setModal);
  const addToCart = useStore((s) => s.addToCart);
  const open = !!doll;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setModal]);

  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  if (!doll) {
    return (
      <>
        <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={() => setModal(null)} />
        <div className={`modal ${open ? "open" : ""}`} />
      </>
    );
  }

  const images = doll.images;

  return (
    <>
      <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={() => setModal(null)} />
      <div className={`modal ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Dettaglio bambola">
        <button className="modal-close" onClick={() => setModal(null)}>
          ✕
        </button>
        <div className="modal-img" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <Image
              src={images[active]}
              alt={`${doll.name} · foto ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {images.length > 1 && (
            <div className="modal-thumbs">
              {images.map((src, i) => (
                <button
                  key={`${doll.id}-${i}`}
                  className={`modal-thumb ${i === active ? "active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Vedi foto ${i + 1}`}
                >
                  <Image src={src} alt={`anteprima ${i + 1}`} fill sizes="60px" style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
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
      </div>
    </>
  );
}
