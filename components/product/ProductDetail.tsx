"use client";
import Image from "next/image";
import { useState } from "react";
import { type Doll } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ProductDetail({ doll }: { doll: Doll }) {
  const [active, setActive] = useState(0);
  const addToCart = useStore((s) => s.addToCart);
  const images = doll.images;

  return (
    <div className="product-page">
      <div className="product-wrap">
        <div className="product-gallery">
          <div className="product-main-img">
            <Image
              src={images[active]}
              alt={`${doll.name} · foto ${active + 1}`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {images.length > 1 && (
            <div className="product-thumbs">
              {images.map((src, i) => (
                <div
                  key={`${doll.id}-${i}`}
                  className="product-thumb"
                  onClick={() => setActive(i)}
                  style={{ outline: i === active ? "1px solid var(--accent)" : "none" }}
                >
                  <Image src={src} alt={`${doll.name} · anteprima ${i + 1}`} fill sizes="80px" style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-eyebrow">
            {doll.edition} · primavera {doll.year}
          </div>
          <h1 className="product-name">
            {doll.name}, <span className="it">{doll.italic}</span>
          </h1>
          <p className="product-desc">{doll.desc}</p>
          <dl className="product-spec">
            <div><dt>Altezza</dt><dd>{doll.height}</dd></div>
            <div><dt>Materiali</dt><dd>{doll.materials}</dd></div>
            <div><dt>Atelier</dt><dd>{doll.origin}</dd></div>
            <div><dt>Edizione</dt><dd>{doll.edition}</dd></div>
          </dl>
          <div className="product-price-row">
            <div>
              <div className="product-eyebrow" style={{ marginBottom: 4 }}>
                Prezzo
              </div>
              <div className="product-price">€{doll.price}</div>
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
        </div>
      </div>
    </div>
  );
}
