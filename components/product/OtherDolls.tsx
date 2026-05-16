"use client";
import Image from "next/image";
import { dollImage } from "@/lib/data";
import type { Doll } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function OtherDolls({ excludeId, dolls }: { excludeId: string; dolls: Doll[] }) {
  const others = dolls.filter((d) => d.id !== excludeId);
  const setModal = useStore((s) => s.setModal);
  return (
    <section className="others">
      <div className="others-head">
        <div className="index">— 02</div>
        <h2 className="title">
          Altre bambole <span className="it">da scoprire</span>
        </h2>
        <div className="meta">
          {others.length} pezzi
          <br />
          Edizione unica
        </div>
      </div>
      <div className="others-grid">
        {others.map((doll) => (
          <div key={doll.id} role="button" tabIndex={0} onClick={() => setModal(doll)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setModal(doll); }} className="card" style={{ textDecoration: "none", cursor: "pointer" }}>
            <div className="card-img">
              <Image
                src={dollImage(doll.id)}
                alt={`ritratto · ${doll.name}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
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
              <div className="card-price">€{doll.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
