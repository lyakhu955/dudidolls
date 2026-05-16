"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import type { Doll } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function DollCard({ doll }: { doll: Doll }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState(0);
  const setModal = useStore((s) => s.setModal);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      setParallax(-center * 0.06);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Reveal className="card">
      <div
        role="button"
        tabIndex={0}
        aria-label={`Apri dettagli: ${doll.name}, ${doll.italic}`}
        onClick={() => { if (!doll.sold) setModal(doll); }}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !doll.sold) setModal(doll); }}
        style={{ textDecoration: "none", color: "inherit", display: "block", cursor: doll.sold ? "default" : "pointer" }}
      >
        <div className="card-img" ref={ref}>
          <div style={{ width: "100%", height: "100%", transform: `translateY(${parallax}px) scale(1.08)`, position: "relative" }}>
            <Image
              src={doll.images[0] || "/foto/hero.jpg"}
              alt={`ritratto · ${doll.name}`}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {doll.tag === "new" && <span className="card-tag">nuova</span>}
          {doll.tag === "scarce" && <span className="card-tag scarce">ultima</span>}
          {doll.sold && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(244, 237, 225, 0.85)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 5,
            }}>
              <span style={{
                fontFamily: "var(--serif)", fontStyle: "italic",
                fontSize: "clamp(24px, 4vw, 36px)", color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}>
                Venduta
              </span>
            </div>
          )}
        </div>
        <div className="card-info">
          <div>
            <div className="card-name">
              {doll.name}, <span className="it">{doll.italic}</span>
            </div>
            <div className="card-meta">
              {doll.edition} · {doll.height}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div className="card-price">€{doll.price}</div>
            <span style={{ fontSize: 13, color: "var(--accent)", cursor: "pointer", textDecoration: "underline" }}>
              Vedi dettagli →
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
