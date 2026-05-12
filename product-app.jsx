/* dudidolls — product page */

const { useState, useEffect } = React;

function dollImage(id) {
  const map = {
    anouk: "foto/1.png",
    tobia: "foto/2.png",
    miele: "foto/3.png",
    ines: "foto/5.png",
    "noé": "foto/6.png",
    olmo: "foto/olmo.jpg",
    vera: "foto/vera.jpg",
    barnaba: "foto/barnaba.jpg",
  };
  return map[id] || "foto/hero.jpg";
}

const DOLLS = [
  { id: "anouk",   name: "Anouk",     italic: "il vento",        price: 280, edition: "1 of 1",  origin: "Lana, IT",     materials: "Lino, lana cardata", height: "32 cm", year: "2026",
    desc: "Cucita a mano in un pomeriggio d'aprile. Veste un abito sottile come la prima brezza dopo l'inverno. Anouk è un soffio, una pausa.",
    tag: "new" },
  { id: "tobia",   name: "Tobia",     italic: "il custode",      price: 320, edition: "1 of 1",  origin: "Lana, IT",     materials: "Cotone biologico, bottoni d'osso", height: "36 cm", year: "2026",
    desc: "Sguardo serio, mani grandi. Tobia tiene in tasca pietre raccolte lungo il fiume. Custodisce ciò che gli altri non sanno guardare.",
    tag: "scarce" },
  { id: "miele",   name: "Miele",     italic: "la dolcezza",     price: 260, edition: "1 of 1",  origin: "Bolzano, IT",  materials: "Lana merino, capelli in seta", height: "30 cm", year: "2026",
    desc: "Capelli color miele, guance arrossate. Profuma di pane caldo e domeniche d'estate.",
    tag: "" },
  { id: "ines",    name: "Ines",      italic: "la sognatrice",   price: 340, edition: "1 of 1",  origin: "Lana, IT",     materials: "Velluto a coste, pizzo antico", height: "34 cm", year: "2026",
    desc: "Ines dorme con gli occhi aperti. Indossa il pizzo della nonna, smontato e ricomposto come un sogno.",
    tag: "" },
  { id: "noé",     name: "Noé",       italic: "il viaggiatore",  price: 300, edition: "1 of 1",  origin: "Trento, IT",   materials: "Tela di canapa, scarpe in cuoio", height: "38 cm", year: "2026",
    desc: "Zaino piccolo, intenzioni grandi. Noé parte sempre all'alba e torna con storie pieghettate in tasca.",
    tag: "new" },
  { id: "olmo",    name: "Olmo",      italic: "il silenzio",     price: 290, edition: "1 of 1",  origin: "Lana, IT",     materials: "Lana grezza tinta a mano", height: "33 cm", year: "2026",
    desc: "Non parla. Ascolta. Olmo è una pausa lunga fra due frasi importanti.",
    tag: "scarce" },
  { id: "vera",    name: "Vera",      italic: "la luce",         price: 360, edition: "1 of 1",  origin: "Merano, IT",   materials: "Cotone egiziano, ricamo a mano", height: "35 cm", year: "2026",
    desc: "Indossa un abito ricamato a punto croce. Ogni nodo è una piccola promessa.",
    tag: "" },
  { id: "barnaba", name: "Barnaba",   italic: "il sorriso",      price: 270, edition: "1 of 1",  origin: "Lana, IT",     materials: "Lana merino, ciuffo di seta", height: "31 cm", year: "2026",
    desc: "Ha un sorriso storto, di quelli che non si possono ignorare. Barnaba si fa amico di chiunque in tre minuti.",
    tag: "" },
];

function getDollId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "anouk";
}

function Placeholder({ label, dark = false, style }) {
  return (
    <div className={`ph ${dark ? "dark" : ""}`} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a className="nav-link" href="index.html">Collezione</a>
        <a className="nav-link" href="index.html#craft">Atelier</a>
      </div>
      <a className="nav-brand" href="index.html">dudidolls</a>
      <div className="nav-right">
        <a className="nav-link" href="index.html">Torna al sito</a>
      </div>
    </nav>
  );
}

function CloseButton() {
  return (
    <button
      onClick={() => window.location.href = 'index.html'}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid var(--line)',
        background: 'var(--paper)',
        color: 'var(--ink)',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
      aria-label="Chiudi"
    >
      ✕
    </button>
  );
}

function ProductGallery({ name, id }) {
  const thumbs = ["ritratto", "dettaglio", "schiena", "scatola"];
  const [active, setActive] = useState(0);
  return (
    <div className="product-gallery">
      <div className="product-main-img">
        <img src={dollImage(id)} alt={`${thumbs[active]} · ${name}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
      </div>
      <div className="product-thumbs">
        {thumbs.map((t, i) => (
          <div key={t} className="product-thumb" onClick={() => setActive(i)}>
            <img src={dollImage(id)} alt={`${t} · ${name}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductInfo({ doll }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };
  return (
    <div className="product-info">
      <div className="product-eyebrow">{doll.edition} · primavera {doll.year}</div>
      <h1 className="product-name">{doll.name}, <span className="it">{doll.italic}</span></h1>
      <p className="product-desc">{doll.desc}</p>
      <dl className="product-spec">
        <div><dt>Altezza</dt><dd>{doll.height}</dd></div>
        <div><dt>Materiali</dt><dd>{doll.materials}</dd></div>
        <div><dt>Atelier</dt><dd>{doll.origin}</dd></div>
        <div><dt>Edizione</dt><dd>{doll.edition}</dd></div>
      </dl>
      <div className="product-price-row">
        <div>
          <div className="product-eyebrow" style={{ marginBottom: 4 }}>Prezzo</div>
          <div className="product-price">€{doll.price}</div>
        </div>
        <button className="btn-primary" style={{ width: "auto", paddingLeft: 28, paddingRight: 24 }} onClick={handleAdd}>
          <span>{added ? "Aggiunta ✓" : "Aggiungi al carrello"}</span>
          <span className="arrow" style={{ marginLeft: 14 }}>→</span>
        </button>
      </div>
      {added && (
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", marginTop: 8 }}>
          {doll.name} aggiunta al carrello
        </div>
      )}
    </div>
  );
}

function Others({ excludeId }) {
  const others = DOLLS.filter((d) => d.id !== excludeId);
  return (
    <section className="others">
      <div className="others-head">
        <div className="index">— 02</div>
        <h2 className="title">Altre bambole <span className="it">da scoprire</span></h2>
        <div className="meta">{others.length} pezzi<br/>Edizione unica</div>
      </div>
      <div className="others-grid">
        {others.map((doll) => (
          <a key={doll.id} href={`product.html?id=${doll.id}`} className="card" style={{ textDecoration: "none" }}>
            <div className="card-img">
              <img src={dollImage(doll.id)} alt={`ritratto · ${doll.name}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
              {doll.tag === "new" && <span className="card-tag">nuova</span>}
              {doll.tag === "scarce" && <span className="card-tag scarce">ultima</span>}
            </div>
            <div className="card-info">
              <div>
                <div className="card-name">{doll.name}, <span className="it">{doll.italic}</span></div>
                <div className="card-meta">{doll.edition} · {doll.height}</div>
              </div>
              <div className="card-price">€{doll.price}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="col-foot">
        <div className="brand-large">dudi<span style={{ color: "var(--accent)" }}>.</span></div>
        <p>Bambole d'autore. Lana, Sudtirolo.</p>
      </div>
      <div>
        <h5>Negozio</h5>
        <ul>
          <li><a href="index.html#gallery">Collezione</a></li>
          <li><a href="index.html">Pezzi unici</a></li>
        </ul>
      </div>
      <div>
        <h5>Studio</h5>
        <ul>
          <li><a href="index.html#studio">Atelier</a></li>
          <li><a href="index.html#craft">Contatti</a></li>
        </ul>
      </div>
      <div className="footer-bottom" style={{ gridColumn: "1/-1" }}>
        <div>© 2026 dudidolls · Cucito a mano fra le mele</div>
        <div><a href="index.html">Torna alla home</a></div>
      </div>
    </footer>
  );
}

function ProductPage() {
  const dollId = getDollId();
  const doll = DOLLS.find((d) => d.id === dollId) || DOLLS[0];

  useEffect(() => {
    document.title = `dudidolls — ${doll.name}`;
  }, [doll]);

  return (
    <>
      <CloseButton />
      <Nav />
      <div className="product-page">
        <div className="product-wrap">
          <ProductGallery name={doll.name} id={doll.id} />
          <ProductInfo doll={doll} />
        </div>
      </div>
      <Others excludeId={doll.id} />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ProductPage />);
