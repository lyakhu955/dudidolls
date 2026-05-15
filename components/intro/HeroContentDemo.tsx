"use client";

export default function HeroContentDemo({ concept }: { concept: "eye" | "atelier" | "curtain" }) {
  const accentLabel = {
    eye: "occhi che cambiano",
    atelier: "atelier · 1 / 1",
    curtain: "édition limitée",
  }[concept];

  return (
    <header className="intro-demo-hero">
      <p className="intro-demo-eyebrow">
        <span className="intro-demo-dot" /> {accentLabel}
      </p>
      <h1 className="intro-demo-title">
        bambole <span className="it">d'autore</span>,<br />
        cucite una alla volta.
      </h1>
      <p className="intro-demo-tagline">
        Ogni Blythe nasce in una mansarda del Sudtirolo. Occhi iconici,
        vestiti su misura, un nome scelto a mano.
      </p>
      <div className="intro-demo-cta">
        <a href="/" className="intro-demo-btn">
          torna alla home <span>↩</span>
        </a>
        <span className="intro-demo-meta">
          concept demo · <code>/intro/{concept}</code>
        </span>
      </div>
    </header>
  );
}
