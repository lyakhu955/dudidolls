"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { dollImage, type Doll } from "@/lib/data";

export default function DollCard({ doll }: { doll: Doll }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState(0);

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
      <div className="card-img" ref={ref}>
        <div style={{ width: "100%", height: "100%", transform: `translateY(${parallax}px) scale(1.08)`, position: "relative" }}>
          <Image
            src={dollImage(doll.id)}
            alt={`ritratto · ${doll.name}`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        {doll.tag === "new" && <span className="card-tag">nuova</span>}
        {doll.tag === "scarce" && <span className="card-tag scarce">ultima</span>}
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, position: "relative", zIndex: 2 }}>
          <div className="card-price">€{doll.price}</div>
          <Link
            href={`/product/${doll.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 13, color: "var(--accent)", cursor: "pointer", textDecoration: "underline" }}
          >
            Vedi dettagli →
          </Link>
        </div>
      </div>
      <Link
        href={`/product/${doll.id}`}
        style={{ position: "absolute", inset: 0, cursor: "pointer", zIndex: 1 }}
        aria-label={`Apri ${doll.name}`}
      />
    </Reveal>
  );
}
