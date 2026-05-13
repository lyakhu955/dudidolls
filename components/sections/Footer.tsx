import { WaxSeal } from "@/components/atelier/Tools";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="col-foot">
        <div className="brand-large">
          dudi<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <p>Bambole d'autore. Lana, Sudtirolo. P.IVA 02938471055.</p>
      </div>
      <div>
        <h5>Negozio</h5>
        <ul>
          <li><a href="#">Collezione</a></li>
          <li><a href="#">Pezzi unici</a></li>
          <li><a href="#">Riparazioni</a></li>
        </ul>
      </div>
      <div>
        <h5>Studio</h5>
        <ul>
          <li><a href="#">Atelier</a></li>
          <li><a href="#">Stampa</a></li>
          <li><a href="#">Contatti</a></li>
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
        <div>IT · EN · DE</div>
      </div>
    </footer>
  );
}
