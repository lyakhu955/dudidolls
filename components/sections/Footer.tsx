import Link from "next/link";
import { WaxSeal } from "@/components/atelier/Tools";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="col-foot">
        <div className="brand-large">
          dudi<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <p>Bambole d&apos;autore. Lana, Sudtirolo. P.IVA 02938471055.</p>
      </div>
      <div>
        <h5>Negozio</h5>
        <ul>
          <li><Link href="/#gallery">Collezione</Link></li>
          <li><Link href="/#gallery">Pezzi unici</Link></li>
          <li><Link href="/accedi">Riparazioni</Link></li>
        </ul>
      </div>
      <div>
        <h5>Studio</h5>
        <ul>
          <li><Link href="/#craft">Atelier</Link></li>
          <li><Link href="/diario">Stampa</Link></li>
          <li><Link href="/accedi">Contatti</Link></li>
        </ul>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
        <h5>Sigillato a mano</h5>
        <WaxSeal rot={-10} />
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: "var(--accent)", transform: "rotate(-3deg)", display: "inline-block" }}>
          Simona Calloni
        </span>
      </div>
      <div className="footer-bottom">
        <div>© 2026 dudidolls · Cucito a mano fra le mele</div>
        <div><a href="#">IT</a> · <a href="#">EN</a> · <a href="#">DE</a></div>
      </div>
    </footer>
  );
}
