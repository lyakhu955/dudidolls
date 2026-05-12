/* dudidolls — main app */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ─── data ─── */
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

const PALETTES = [
  ["#f4ede1", "#1c1916", "#c4623e"], // terracotta
  ["#ece4d4", "#1a1a18", "#6b7d4f"], // sage
  ["#e8dfd0", "#1f1a14", "#7d4a2a"], // tabacco
  ["#efe7d8", "#161514", "#3a4c5f"], // ottanio
];

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

const FONT_PAIRS = [
  { id: "instrument", display: '"Instrument Serif"', sans: '"DM Sans"', label: "Instrument + DM Sans" },
  { id: "newsreader", display: '"Newsreader"', sans: '"DM Sans"', label: "Newsreader + DM Sans" },
  { id: "playfair",   display: '"Playfair Display"', sans: '"Manrope"', label: "Playfair + Manrope" },
];

/* ─── small helpers ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ as = "div", className = "", style, children, delay = 0 }) {
  const ref = useReveal();
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ─── Craft background pieces ─── */
function CraftMarks() {
  // Pattern-paper marks scattered across hero. Each mark is a simple primitive.
  return (
    <div className="craft-bg">
      <div className="hero-pattern"></div>
      <svg className="stitch-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="6" y1="18" x2="40" y2="22" />
        <line x1="60" y1="15" x2="94" y2="24" />
        <line x1="4" y1="82" x2="96" y2="86" className="terra" />
        <line x1="15" y1="50" x2="30" y2="68" />
        <line x1="70" y1="55" x2="86" y2="75" />
      </svg>
      <div className="mark-grain" style={{ top: "18%", left: "3.5%" }}>
        <span className="arrow"></span> Drittofilo
      </div>
      <div className="mark-grain vert" style={{ top: "30%", right: "3%" }}>
        <span className="arrow"></span> Trama · 14 g/m²
      </div>
      <div className="mark-dim" style={{ bottom: "32%", left: "4%" }}>
        <span>32 cm</span><span className="line"></span>
      </div>
      <div className="mark-dim" style={{ top: "12%", right: "6%" }}>
        <span className="line"></span><span>seam 5 mm</span>
      </div>
      <div className="mark-button b4" style={{ top: "24%", left: "12%" }}></div>
      <div className="mark-button b4" style={{ top: "68%", left: "8%" }}></div>
      <div className="mark-button b4" style={{ top: "22%", right: "10%" }}></div>
      <div className="mark-button b4" style={{ bottom: "18%", right: "14%" }}></div>
      {/* tools in margins */}
      <Spool rot={-12} color="#c4623e" style={{ top: "38%", left: "2%" }} />
      <Needle rot={28} color="#6b7d4f" style={{ bottom: "22%", left: "6%" }} />
      <Pin rot={-30} style={{ top: "12%", right: "2%" }} />
      <Thimble rot={-10} style={{ bottom: "14%", right: "4%" }} />
      <div className="mark-note terra" style={{ top: "42%", left: "4%" }}>
        cucire qui ↘
      </div>
      <div className="mark-note" style={{ bottom: "38%", right: "5%", transform: "rotate(3deg)" }}>
        — punto invisibile
      </div>
    </div>
  );
}

function StitchDivider({ label = "piega · cucitura · piega", id = "00" }) {
  return (
    <div className="stitch-divider">
      <span>fold · {id}</span>
      <span className="notch"></span>
      <span>{label}</span>
      <span className="notch"></span>
      <span>fold · {id}</span>
    </div>
  );
}

function Selvedge() {
  return <div className="selvedge" aria-hidden="true"></div>;
}

function ThreadRail({ progress }) {
  // length grows with scroll; needle sits at the tip
  const top = Math.max(0, Math.min(1, progress)) * (window.innerHeight - 80) + 40;
  return (
    <div className="thread-rail" aria-hidden="true">
      <div className="line" style={{ height: top + "px" }}></div>
      <div className="needle" style={{ top: top + "px" }}></div>
    </div>
  );
}

/* ─── Atelier tools ─── */
function Pin({ rot = -12, style }) {
  return (
    <div className="tool tool-pin" style={{ "--rot": rot + "deg", ...style }}>
      <span className="head"></span><span className="shaft"></span>
    </div>
  );
}
function Spool({ rot = 0, color = "#c4623e", style }) {
  return (
    <div className="tool tool-spool" style={{ "--rot": rot + "deg", "--thread": color, ...style }}>
      <span className="top"></span>
      <span className="body"></span>
      <span className="bot"></span>
      <span className="strand"></span>
    </div>
  );
}
function Needle({ rot = -8, color = "#c4623e", style }) {
  return (
    <div className="tool tool-needle" style={{ "--rot": rot + "deg", "--thread": color, ...style }}>
      <span className="thread"></span>
      <span className="eye"></span>
      <span className="body"></span>
      <span className="tip"></span>
    </div>
  );
}
function Thimble({ rot = 4, style }) {
  return <div className="tool tool-thimble" style={{ "--rot": rot + "deg", ...style }}></div>;
}
function Tape({ style }) {
  return (
    <div className="tool tool-tape" style={style}>
      <span className="nums">
        <span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span>
      </span>
    </div>
  );
}
function Polaroid({ caption, date = "—", rot = -3, label, hue, img }) {
  return (
    <div className="polaroid" style={{ "--rot": rot + "deg" }}>
      <span className="tape"></span>
      <div className="pic">{img ? <img src={img} alt={label} style={{width:"100%",height:"100%",objectFit:"cover"}} /> : <Placeholder label={label} hue={hue} />}</div>
      <div className="caption">{caption}<span className="date">{date}</span></div>
    </div>
  );
}
function Swatch({ color, label, rot }) {
  return (
    <div className="swatch" style={{ "--c": color, "--rot": (rot ?? 0) + "deg" }}>
      <span className="lbl">{label}</span>
    </div>
  );
}
function WaxSeal({ rot = -8 }) {
  return (
    <div className="wax-seal" style={{ "--rot": rot + "deg" }}>
      <span>d<small>dudi atelier</small></span>
    </div>
  );
}
function Schema() {
  return (
    <div className="schema">
      <div className="schema-head">
        <span>Scheda № 047 · Anouk · in lavorazione</span>
        <span>03 / 14 gg</span>
      </div>
      <div className="schema-title">studio della testa,<br/><em>volto da definire</em></div>
      <div className="schema-body">
        <img src="foto/studio.jpg" alt="doll in progress" style={{width:"100%",height:"100%",objectFit:"cover"}} />
        <div className="schema-callout" style={{ top: "8%", right: "8px" }}>
          <span className="line" style={{ right: 0, top: 11, position: "absolute" }}></span>
          <span style={{ paddingRight: 36 }}>occhi Ø 22 mm</span>
        </div>
        <div className="schema-callout" style={{ top: "32%", right: "8px" }}>
          <span className="line" style={{ right: 0, top: 11, position: "absolute" }}></span>
          <span style={{ paddingRight: 36 }}>guance — rosa antico</span>
        </div>
        <div className="schema-callout" style={{ top: "58%", left: "8px" }}>
          <span style={{ paddingLeft: 36 }}>piega bocca</span>
          <span className="line" style={{ left: 0, top: 11, position: "absolute" }}></span>
        </div>
        <div className="schema-callout" style={{ top: "82%", left: "8px" }}>
          <span style={{ paddingLeft: 36 }}>firma sotto piede sx</span>
          <span className="line" style={{ left: 0, top: 11, position: "absolute" }}></span>
        </div>
      </div>
      <div className="schema-foot">
        <div>Materiale<strong>resina + carving</strong></div>
        <div>Tecnica<strong>scolpita a mano</strong></div>
        <div>Pastelli<strong>Pan Pastel · 7 tonalità</strong></div>
        <div>Vernice<strong>opaca, 3 passate</strong></div>
      </div>
    </div>
  );
}

function Studio() {
  return (
    <section className="studio" id="studio">
      <Reveal className="studio-head">
        <div className="index">— 00</div>
        <h2 className="title">Lo studio,<br/>tra <span className="it">spilli e pensieri</span></h2>
        <div className="meta">Atelier di Simona<br/>Lana, IT</div>
      </Reveal>

      {/* corner pins on the cutting mat */}
      <span className="corner-pin" style={{ top: 18, left: 22 }}></span>
      <span className="corner-pin" style={{ top: 18, right: 22 }}></span>
      <span className="corner-pin" style={{ bottom: 18, left: 22 }}></span>
      <span className="corner-pin" style={{ bottom: 18, right: 22 }}></span>

      <div className="studio-grid">
        <Reveal className="studio-tools">
          <div>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 18 }}>— strumenti del banco</div>
            <div className="tools-row">
              <Spool rot={-4} color="#c4623e" />
              <Spool rot={6} color="oklch(50% 0.08 145)" />
              <Spool rot={-2} color="oklch(40% 0.04 60)" />
              <Thimble rot={3} />
              <Pin rot={-18} />
              <Pin rot={12} />
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 14 }}>— ago infilato</div>
            <Needle rot={-6} color="#c4623e" />
          </div>
          <div>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 10 }}>— fettuccia da sarta</div>
            <Tape />
          </div>
          <div className="paper-pin" style={{ "--rot": "-1.5deg", maxWidth: 380 }}>
            <div className="mono" style={{ color: "var(--muted)", marginBottom: 10 }}>Lista del giorno · 12 mag</div>
            <ul style={{ listStyle: "none", fontFamily: "'Caveat', cursive", fontSize: 22, lineHeight: 1.55, color: "var(--ink-2)" }}>
              <li>✓ carving fronte Anouk</li>
              <li>✓ cucire abito Miele</li>
              <li style={{ color: "var(--accent)" }}>○ dipingere occhi Tobia</li>
              <li style={{ color: "var(--muted)" }}>○ provare lino antico</li>
              <li style={{ color: "var(--muted)" }}>○ spedire Maria, Lione</li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="studio-pol-1">
          <Polaroid caption="Anouk — prima passata" date="08 apr 2026" rot={-4} label="doll in progress · testa" img="foto/1.png" />
        </Reveal>
        <Reveal className="studio-pol-2" delay={80}>
          <Polaroid caption="il cassetto delle lane" date="11 apr 2026" rot={3} label="fili · lane · ritagli" hue={30} img="foto/spools.jpg" />
        </Reveal>

        <Reveal className="studio-schema" delay={40}>
          <Schema />
        </Reveal>

        <Reveal className="studio-pol-3" delay={120}>
          <Polaroid caption="primo punto, sempre tremante" date="14 apr 2026" rot={-2} label="mano · ago · lino" hue={-10} img="foto/needle.jpg" />
        </Reveal>

        <Reveal className="studio-swatches" delay={160}>
          <div className="mono" style={{ color: "var(--muted)", marginBottom: 22 }}>— tessuti scelti per la stagione</div>
          <div className="swatch-strip">
            <Swatch color="#c4623e" label="terra · 4m" rot={-2} />
            <Swatch color="#a89572" label="sabbia · 2m" rot={1} />
            <Swatch color="#6b7d4f" label="salvia · 3m" rot={-1} />
            <Swatch color="#3d4a5f" label="notte · 1m" rot={2} />
            <Swatch color="#e0d4ba" label="latte · 5m" rot={-2} />
          </div>
        </Reveal>

        <Reveal className="studio-paper paper-pin" delay={100} style={{ "--rot": "1deg" }}>
          Ogni giorno entro qui alle sette e mezza.<br/>
          Accendo la lampada gialla, scelgo una bambola che ha bisogno di me, e comincio.<br/>
          Alcune chiedono un orecchio più alto, altre uno sguardo che ancora non hanno trovato.<br/>
          <span className="sign">— Simona</span>
        </Reveal>
      </div>
    </section>
  );
}

function Placeholder({ label, dark = false, hue }) {
  // optional dynamic hue tint via inline style
  const tint = hue !== undefined ? { filter: `hue-rotate(${hue}deg)` } : null;
  return (
    <div className={`ph ${dark ? "dark" : ""}`} style={tint}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ─── Hero ─── */
function Hero({ scrollY, intensity, showMarks }) {
  const f = intensity;
  return (
    <header className="hero">
      {showMarks && <CraftMarks />}
      <div className="hero-display">
        <div className="hero-img-wrap" style={{
          transform: `translate(-50%, calc(-42% + ${scrollY * 0.15 * f}px)) scale(${1 - scrollY * 0.0003})`,
        }}>
          <img src="foto/hero.jpg" alt="Ritratto · Anouk" style={{width:"100%",height:"100%",objectFit:"cover"}} />
        </div>
        <h1 className="hero-title" aria-label="dudidolls">
          <span className="word" style={{ transform: `translateX(${-scrollY * 0.25 * f}px)` }}>dudi</span>
          <span className="word it" style={{ transform: `translateX(${scrollY * 0.25 * f}px)` }}>dolls</span>
        </h1>
      </div>

      <div>
        <div className="hero-bottom-row">
          <p className="hero-tagline">
            Bambole d'autore cucite una alla volta,<br />
            tra le valli del Sudtirolo. Ogni pezzo è <span className="it" style={{ color: "var(--accent)" }}>unico</span>,
            firmato, e ha già un nome.
          </p>
          <div className="hero-cta-group">
            <button className="btn-outline" onClick={() => document.getElementById("gallery").scrollIntoView({ behavior: "smooth" })}>
              Scopri la collezione <span>→</span>
            </button>
            <span className="scroll-cue">
              <span className="bar"></span>
              Scroll
            </span>
          </div>
        </div>

        <div className="hero-meta" style={{ marginTop: 40 }}>
          <div><span className="num">128<span className="sup">★</span></span>Pezzi cuciti nel 2026</div>
          <div><span className="num">1 / 1</span>Ogni bambola è unica</div>
          <div><span className="num">14<span className="sup">gg</span></span>Tempo medio di lavorazione</div>
          <div><span className="num">IT</span>Spedizione in 24h</div>
        </div>
      </div>
    </header>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ["fatto a mano", "cucito una alla volta", "edizione unica", "consegnato in 24h", "made in sudtirolo", "pezzi numerati"];
  const row = (
    <span>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          {t}
          <span className="dot"></span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row}{row}
      </div>
    </div>
  );
}

/* ─── Gallery card ─── */
function DollCard({ doll }) {
  const ref = useRef(null);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
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
        <div style={{ width: "100%", height: "100%", transform: `translateY(${parallax}px) scale(1.08)` }}>
          <img src={dollImage(doll.id)} alt={`ritratto · ${doll.name}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
        </div>
        {doll.tag === "new" && <span className="card-tag">nuova</span>}
        {doll.tag === "scarce" && <span className="card-tag scarce">ultima</span>}
      </div>
      <div className="card-info">
        <div>
          <div className="card-name">{doll.name}, <span className="it">{doll.italic}</span></div>
          <div className="card-meta">{doll.edition} · {doll.height}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, position: "relative", zIndex: 2 }}>
          <div className="card-price">€{doll.price}</div>
          <a
            onClick={(e) => { e.stopPropagation(); window.location.href = 'product.html?id=' + doll.id; }}
            style={{ fontSize: 13, color: "var(--accent)", cursor: "pointer", textDecoration: "underline" }}
          >
            Vedi dettagli →
          </a>
        </div>
      </div>
      <div
        onClick={() => window.location.href = 'product.html?id=' + doll.id}
        style={{ position: "absolute", inset: 0, cursor: "pointer", zIndex: 1 }}
        aria-label={`Apri ${doll.name}`}
      />
    </Reveal>
  );
}

/* ─── Gallery section ─── */
function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <Reveal className="section-head">
        <div className="index">— 01</div>
        <h2 className="title">La collezione, <span className="it">nata in primavera</span></h2>
        <div className="meta">Otto pezzi<br />Edizione unica</div>
      </Reveal>
      <div className="gallery-grid">
        {DOLLS.map((d) => <DollCard key={d.id} doll={d} />)}
      </div>
    </section>
  );
}

/* ─── Craft sticky ─── */
function Craft() {
  return (
    <section style={{ padding: "120px 0" }} id="craft">
      <Reveal className="section-head" style={{ color: "var(--ink)" }}>
        <div className="index">— 02</div>
        <h2 className="title">Il rituale <span className="it">del fare</span></h2>
        <div className="meta">Quattro tempi<br />Una sola mano</div>
      </Reveal>
      <div className="craft">
        <div className="craft-sticky">
          <img src="foto/craft.jpg" alt="Atelier · Lana" style={{width:"100%",height:"100%",objectFit:"cover"}} />
        </div>
        <div className="craft-text">
          <Reveal className="craft-block">
            <div className="step">— Atto I</div>
            <h3>Si <span className="it">ascolta</span> la stoffa</h3>
            <p>Ogni rotolo di lino, ogni avanzo di velluto antico ha un carattere. Aspettiamo che ci dica che bambola vuole diventare. A volte sono giorni di attesa.</p>
          </Reveal>
          <Reveal className="craft-block" delay={80}>
            <div className="step">— Atto II</div>
            <h3>Si <span className="it">disegna</span> il volto</h3>
            <p>Un occhio leggermente più basso dell'altro, una piega d'espressione vicino alla bocca. Mai due volti uguali. È qui che nasce il nome.</p>
          </Reveal>
          <Reveal className="craft-block" delay={160}>
            <div className="step">— Atto III</div>
            <h3>Si <span className="it">cuce</span> a mano</h3>
            <p>Punto dopo punto, in silenzio. Il corpo è imbottito a strati con lana cardata di pecora locale. Un singolo pezzo richiede circa 14 giorni.</p>
          </Reveal>
          <Reveal className="craft-block" delay={240}>
            <div className="step">— Atto IV</div>
            <h3>Si <span className="it">firma</span> e parte</h3>
            <p>Numerazione, firma a inchiostro sotto il piede sinistro, certificato su carta cotone. Spedita in scatola di legno con paglia di segale.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured quote ─── */
function Featured() {
  return (
    <section className="featured">
      <Reveal className="featured-left">
        <p className="quote">Sono bambole che invecchiano bene, come certi mobili di famiglia. Le compri per una bambina e finiscono sul comò di sua nonna.</p>
        <div className="by">— Vogue Italia · primavera 2026</div>
      </Reveal>
      <Reveal className="featured-right" delay={100}>
        <img src="foto/fabric.jpg" alt="Atelier · dettaglio cucitura" style={{width:"100%",height:"100%",objectFit:"cover"}} />
      </Reveal>
    </section>
  );
}

/* ─── Process ─── */
function Process() {
  const tools = [
    <Spool color="#c4623e" rot={-6} />,
    <Pin rot={-22} />,
    <Needle color="#6b7d4f" rot={6} />,
    <Thimble rot={4} />,
  ];
  const items = [
    { n: "01", t: "Scegli", d: "Ogni bambola è un pezzo unico. Quando trovi la tua, è già tua." },
    { n: "02", t: "Personalizza", d: "Una piccola dedica ricamata sotto il vestito, su richiesta. Senza costo." },
    { n: "03", t: "Ricevi", d: "Confezione in legno, paglia di segale, certificato firmato a mano." },
    { n: "04", t: "Custodisci", d: "Cucita per durare cinquant'anni. Riparazioni a vita, gratuite." },
  ];
  return (
    <section className="process">
      <div className="process-grid">
        {items.map((it, i) => (
          <Reveal key={i} className="process-item" delay={i * 60}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div className="n">{it.n}</div>
              <div style={{ opacity: 0.7 }}>{tools[i]}</div>
            </div>
            <h4>{it.t}</h4>
            <p>{it.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Newsletter ─── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="news">
      <Reveal>
        <h2>Una lettera <span className="it">ogni stagione.</span><br/>Niente di più.</h2>
      </Reveal>
      <Reveal delay={120}>
        <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }}>
          <input
            type="email"
            placeholder={done ? "Grazie, ci leggiamo a giugno." : "la tua email"}
            value={done ? "" : email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">{done ? "↻" : "Iscriviti →"}</button>
        </form>
        <div className="micro">Quattro lettere all'anno · annulla l'iscrizione quando vuoi</div>
      </Reveal>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="col-foot">
        <div className="brand-large">dudi<span style={{ color: "var(--accent)" }}>.</span></div>
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
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: "var(--accent)", transform: "rotate(-3deg)", display: "inline-block" }}>Simona Calloni</span>
      </div>
      <div className="footer-bottom">
        <div>© 2026 dudidolls · Cucito a mano fra le mele</div>
        <div>IT · EN · DE</div>
      </div>
    </footer>
  );
}

/* ─── Cart drawer ─── */
function Drawer({ open, onClose, items, setItems }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const change = (id, delta) => setItems((arr) =>
    arr.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );
  const remove = (id) => setItems((arr) => arr.filter((i) => i.id !== id));
  return (
    <>
      <div className={`drawer-backdrop ${open ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-h">
          <h3>Il tuo carrello</h3>
          <button className="x" onClick={onClose}>Chiudi ✕</button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <div className="serif italic">Ancora nessuna<br/>bambola scelta.</div>
              <div className="mono">torna nella collezione →</div>
            </div>
          ) : items.map((it) => (
            <div className="cart-item" key={it.id}>
              <div className="cart-item-img"><img src={dollImage(it.id)} alt={it.name} style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
              <div>
                <h4>{it.name}, <span className="italic">{it.italic}</span></h4>
                <div className="meta">{it.edition} · {it.height}</div>
                <div className="qty">
                  <button onClick={() => change(it.id, -1)}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => change(it.id, +1)}>+</button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="price">€{it.price * it.qty}</div>
                <button className="remove" onClick={() => remove(it.id)}>Rimuovi</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="drawer-f">
            <div className="drawer-total">
              <span className="label">Totale</span>
              <span className="amount">€{total}</span>
            </div>
            <button className="btn-primary">
              <span>Vai al checkout</span>
              <span className="arrow">→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

/* ─── Product modal ─── */
function ProductModal({ doll, onClose, onAdd }) {
  const open = !!doll;
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <>
      <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`modal ${open ? "open" : ""}`}>
        {doll && <>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-img"><img src={dollImage(doll.id)} alt={`ritratto · ${doll.name}`} style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>
          <div className="modal-info">
            <div className="eyebrow">{doll.edition} · primavera {doll.year}</div>
            <h2>{doll.name},<br/><span className="it">{doll.italic}</span></h2>
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
              <button className="btn-primary" style={{ width: "auto", paddingLeft: 28, paddingRight: 24 }} onClick={() => onAdd(doll)}>
                <span>Aggiungi al carrello</span>
                <span className="arrow" style={{ marginLeft: 14 }}>→</span>
              </button>
            </div>
            <a
              onClick={() => window.location.href = 'product.html?id=' + doll.id}
              style={{ display: "inline-block", marginTop: 14, fontSize: 14, color: "var(--accent)", cursor: "pointer", textDecoration: "underline" }}
            >
              Vedi pagina dedicata →
            </a>
          </div>
        </>}
      </div>
    </>
  );
}

/* ─── Top nav ─── */
function Nav({ onCart, cartCount }) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a className="nav-link" href="#gallery">Collezione</a>
        <a className="nav-link" href="#craft">Atelier</a>
        <a className="nav-link" href="#">Diario</a>
      </div>
      <div className="nav-brand">dudidolls</div>
      <div className="nav-right">
        <a className="nav-link" href="#">Cerca</a>
        <a className="nav-link" href="#">Accedi</a>
        <button className="cart-pill" onClick={onCart}>
          <span className="cart-dot"></span>
          Carrello ({cartCount})
        </button>
      </div>
    </nav>
  );
}

/* ─── Toast ─── */
function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <span className="dot"></span>
      {message}
    </div>
  );
}

/* ─── App ─── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#f4ede1", "#1c1916", "#c4623e"],
  "fontPair": "instrument",
  "scrollIntensity": 1,
  "showMarquee": true,
  "threadRail": true,
  "craftMarks": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [active, setActive] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Apply tweaks live (palette / font)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", t.palette[0]);
    root.style.setProperty("--ink", t.palette[1]);
    root.style.setProperty("--accent", t.palette[2]);
    const pair = FONT_PAIRS.find((p) => p.id === t.fontPair) || FONT_PAIRS[0];
    root.style.setProperty("--serif", `${pair.display}, "Cormorant Garamond", serif`);
    root.style.setProperty("--sans", `${pair.sans}, ui-sans-serif, system-ui, sans-serif`);
  }, [t.palette, t.fontPair]);

  // scroll listeners
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = useCallback((doll) => {
    setCart((arr) => {
      const ex = arr.find((i) => i.id === doll.id);
      if (ex) return arr.map((i) => i.id === doll.id ? { ...i, qty: i.qty + 1 } : i);
      return [...arr, { ...doll, qty: 1 }];
    });
    setActive(null);
    setToast({ show: true, message: `${doll.name} aggiunta al carrello` });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className="scroll-progress"><div className="bar" style={{ width: `${progress * 100}%` }}></div></div>
      <Nav onCart={() => setDrawer(true)} cartCount={cartCount} />
      <Hero scrollY={scrollY} intensity={t.scrollIntensity} showMarks={t.craftMarks} />
      {t.showMarquee && <Marquee />}
      <Selvedge />
      <Studio />
      <StitchDivider label="taglio · imbastitura · rifinitura" id="01" />
      <Gallery onOpen={setActive} />
      <StitchDivider label="il rituale del fare" id="02" />
      <Craft />
      <StitchDivider label="vivagno · margine 1,5 cm" id="03" />
      <Featured />
      <Process />
      <Newsletter />
      <Footer />

      {t.threadRail && <ThreadRail progress={progress} />}

      <Drawer open={drawer} onClose={() => setDrawer(false)} items={cart} setItems={setCart} />
      <ProductModal doll={active} onClose={() => setActive(null)} onAdd={addToCart} />
      <Toast message={toast.message} show={toast.show} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor
          label="Schema cromatico"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakSection label="Tipografia" />
        <TweakRadio
          label="Font pair"
          value={t.fontPair}
          options={FONT_PAIRS.map((p) => p.id)}
          onChange={(v) => setTweak("fontPair", v)}
        />
        <TweakSection label="Movimento" />
        <TweakSlider
          label="Intensità scroll"
          value={t.scrollIntensity}
          min={0} max={2} step={0.1}
          onChange={(v) => setTweak("scrollIntensity", v)}
        />
        <TweakToggle
          label="Marquee"
          value={t.showMarquee}
          onChange={(v) => setTweak("showMarquee", v)}
        />
        <TweakSection label="Atelier" />
        <TweakToggle
          label="Filo + ago a scorrimento"
          value={t.threadRail}
          onChange={(v) => setTweak("threadRail", v)}
        />
        <TweakToggle
          label="Segni da cartamodello"
          value={t.craftMarks}
          onChange={(v) => setTweak("craftMarks", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
