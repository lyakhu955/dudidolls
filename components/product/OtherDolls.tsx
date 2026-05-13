import Image from "next/image";
import Link from "next/link";
import { DOLLS, dollImage } from "@/lib/data";

export default function OtherDolls({ excludeId }: { excludeId: string }) {
  const others = DOLLS.filter((d) => d.id !== excludeId);
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
          <Link key={doll.id} href={`/product/${doll.id}`} className="card" style={{ textDecoration: "none" }}>
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
          </Link>
        ))}
      </div>
    </section>
  );
}
