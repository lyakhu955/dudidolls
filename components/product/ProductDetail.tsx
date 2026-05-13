"use client";
import Image from "next/image";
import { useState } from "react";
import { dollImage, type Doll } from "@/lib/data";
import { useStore } from "@/lib/store";

const THUMBS = ["ritratto", "dettaglio", "schiena", "scatola"];

export default function ProductDetail({ doll }: { doll: Doll }) {
  const [active, setActive] = useState(0);
  const addToCart = useStore((s) => s.addToCart);

  return (
    <div className="product-page">
      <div className="product-wrap">
        <div className="product-gallery">
          <div className="product-main-img">
            <Image
              src={dollImage(doll.id)}
              alt={`${THUMBS[active]} · ${doll.name}`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="product-thumbs">
            {THUMBS.map((t, i) => (
              <div
                key={t}
                className="product-thumb"
                onClick={() => setActive(i)}
                style={{ outline: i === active ? "1px solid var(--accent)" : "none" }}
              >
                <Image src={dollImage(doll.id)} alt={`${t} · ${doll.name}`} fill sizes="80px" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
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
