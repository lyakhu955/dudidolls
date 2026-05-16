"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

export default function ProductModal() {
  const doll = useStore((s) => s.modalDoll);
  const setModal = useStore((s) => s.setModal);
  const addToCart = useStore((s) => s.addToCart);
  const open = !!doll;
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") {
          setLightboxOpen(false);
          return;
        }
        if (e.key === "ArrowLeft") {
          setLightboxIndex((i) => (i > 0 ? i - 1 : (doll?.images.length ?? 1) - 1));
          return;
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((i) => (i < (doll?.images.length ?? 1) - 1 ? i + 1 : 0));
          return;
        }
      } else {
        if (e.key === "Escape") setModal(null);
      }
    };
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setModal, lightboxOpen, doll]);

  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  useEffect(() => {
    if (open || lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lightboxOpen]);

  if (!doll) {
    return (
      <>
        <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={() => setModal(null)} />
        <div className={`modal ${open ? "open" : ""}`} />
      </>
    );
  }

  const images = doll.images;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    setLightboxIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const nextImage = () => {
    setLightboxIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  return (
    <>
      <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={() => setModal(null)} />
      <div className={`modal ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Dettaglio bambola">
        <button className="modal-close" onClick={() => setModal(null)}>
          ✕
        </button>
        <div className="modal-img" style={{ display: "flex", flexDirection: "column", backgroundColor: "var(--ink)" }}>
          <div
            style={{ position: "relative", flex: 1, minHeight: 0, cursor: images.length > 0 ? "zoom-in" : "default" }}
            onClick={() => images.length > 0 && openLightbox(active)}
          >
            <Image
              src={images[active]}
              alt={`${doll.name} · foto ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: "contain" }}
            />
            <button
              className="modal-zoom-btn"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(active);
              }}
              aria-label="Ingrandisci foto"
            >
              🔍 Ingrandisci
            </button>
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
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox-overlay ${lightboxOpen ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <button className="lightbox-close" onClick={closeLightbox} aria-label="Chiudi lightbox">
          ✕
        </button>
        {images.length > 1 && (
          <>
            <button className="lightbox-arrow left" onClick={prevImage} aria-label="Foto precedente">
              ‹
            </button>
            <button className="lightbox-arrow right" onClick={nextImage} aria-label="Foto successiva">
              ›
            </button>
          </>
        )}
        <div className="lightbox-img-wrap">
          <Image
            src={images[lightboxIndex] ?? images[0]}
            alt={`${doll.name} · foto ${lightboxIndex + 1}`}
            fill
            sizes="90vw"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </>
  );
}
