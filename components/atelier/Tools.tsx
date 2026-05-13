import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

type ToolProps = { rot?: number; style?: CSSProperties };
type ColorTool = ToolProps & { color?: string };

function styleVars(style: CSSProperties | undefined, vars: Record<string, string>): CSSProperties {
  return { ...style, ...(vars as unknown as CSSProperties) };
}

export function Pin({ rot = -12, style }: ToolProps) {
  return (
    <div className="tool tool-pin" style={styleVars(style, { "--rot": `${rot}deg` })}>
      <span className="head" />
      <span className="shaft" />
    </div>
  );
}

export function Spool({ rot = 0, color = "#c4623e", style }: ColorTool) {
  return (
    <div className="tool tool-spool" style={styleVars(style, { "--rot": `${rot}deg`, "--thread": color })}>
      <span className="top" />
      <span className="body" />
      <span className="bot" />
      <span className="strand" />
    </div>
  );
}

export function Needle({ rot = -8, color = "#c4623e", style }: ColorTool) {
  return (
    <div className="tool tool-needle" style={styleVars(style, { "--rot": `${rot}deg`, "--thread": color })}>
      <span className="thread" />
      <span className="eye" />
      <span className="body" />
      <span className="tip" />
    </div>
  );
}

export function Thimble({ rot = 4, style }: ToolProps) {
  return <div className="tool tool-thimble" style={styleVars(style, { "--rot": `${rot}deg` })} />;
}

export function Tape({ style }: { style?: CSSProperties }) {
  return (
    <div className="tool tool-tape" style={style}>
      <span className="nums">
        <span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span>
      </span>
    </div>
  );
}

export function Placeholder({ label, dark = false, hue }: { label?: string; dark?: boolean; hue?: number }) {
  const tint = hue !== undefined ? { filter: `hue-rotate(${hue}deg)` } : undefined;
  return (
    <div className={`ph ${dark ? "dark" : ""}`} style={tint}>
      {label && <span className="ph-label">{label}</span>}
    </div>
  );
}

type PolaroidProps = {
  caption: string;
  date?: string;
  rot?: number;
  label?: string;
  hue?: number;
  img?: string;
};

export function Polaroid({ caption, date = "—", rot = -3, label, hue, img }: PolaroidProps) {
  return (
    <div className="polaroid" style={styleVars(undefined, { "--rot": `${rot}deg` })}>
      <span className="tape" />
      <div className="pic">
        {img ? (
          <Image src={img} alt={label ?? caption} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 25vw" />
        ) : (
          <Placeholder label={label} hue={hue} />
        )}
      </div>
      <div className="caption">
        {caption}
        <span className="date">{date}</span>
      </div>
    </div>
  );
}

export function Swatch({ color, label, rot = 0 }: { color: string; label: string; rot?: number }) {
  return (
    <div className="swatch" style={styleVars(undefined, { "--c": color, "--rot": `${rot}deg` })}>
      <span className="lbl">{label}</span>
    </div>
  );
}

export function WaxSeal({ rot = -8 }: { rot?: number }) {
  return (
    <div className="wax-seal" style={styleVars(undefined, { "--rot": `${rot}deg` })}>
      <span>
        d<small>dudi atelier</small>
      </span>
    </div>
  );
}

export function Schema() {
  return (
    <div className="schema">
      <div className="schema-head">
        <span>Scheda № 047 · Anouk · in lavorazione</span>
        <span>03 / 14 gg</span>
      </div>
      <div className="schema-title">
        studio della testa,
        <br />
        <em>volto da definire</em>
      </div>
      <div className="schema-body">
        <Image src="/foto/studio.jpg" alt="doll in progress" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="schema-callout" style={{ top: "8%", right: "8px" }}>
          <span className="line" style={{ right: 0, top: 11, position: "absolute" }} />
          <span style={{ paddingRight: 36 }}>occhi Ø 22 mm</span>
        </div>
        <div className="schema-callout" style={{ top: "32%", right: "8px" }}>
          <span className="line" style={{ right: 0, top: 11, position: "absolute" }} />
          <span style={{ paddingRight: 36 }}>guance — rosa antico</span>
        </div>
        <div className="schema-callout" style={{ top: "58%", left: "8px" }}>
          <span style={{ paddingLeft: 36 }}>piega bocca</span>
          <span className="line" style={{ left: 0, top: 11, position: "absolute" }} />
        </div>
        <div className="schema-callout" style={{ top: "82%", left: "8px" }}>
          <span style={{ paddingLeft: 36 }}>firma sotto piede sx</span>
          <span className="line" style={{ left: 0, top: 11, position: "absolute" }} />
        </div>
      </div>
      <div className="schema-foot">
        <div>
          Materiale<strong>resina + carving</strong>
        </div>
        <div>
          Tecnica<strong>scolpita a mano</strong>
        </div>
        <div>
          Pastelli<strong>Pan Pastel · 7 tonalità</strong>
        </div>
        <div>
          Vernice<strong>opaca, 3 passate</strong>
        </div>
      </div>
    </div>
  );
}

export function PaperPin({ rot = -2, children, style }: { rot?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="paper-pin" style={styleVars(style, { "--rot": `${rot}deg` })}>
      {children}
    </div>
  );
}
