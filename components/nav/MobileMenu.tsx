"use client";
import { useStore } from "@/lib/store";

const LINKS = [
  { label: "Collezione", href: "/#gallery" },
  { label: "Atelier", href: "/#craft" },
  { label: "Diario", href: "#" },
  { label: "Cerca", href: "#" },
  { label: "Accedi", href: "#" },
];

export default function MobileMenu() {
  const open = useStore((s) => s.menuOpen);
  const setMenu = useStore((s) => s.setMenu);

  const handle = (href: string) => {
    setMenu(false);
    if (href.startsWith("/#")) {
      setTimeout(() => {
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <>
      <div className={`mobile-menu-backdrop ${open ? "open" : ""}`} onClick={() => setMenu(false)} />
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mobile-menu-head">
          <span className="mobile-menu-brand">dudidolls</span>
          <button className="mobile-menu-close" onClick={() => setMenu(false)} aria-label="Chiudi menu">
            ✕
          </button>
        </div>
        <nav className="mobile-menu-links">
          {LINKS.map((l) => (
            <a key={l.label} className="mobile-menu-link" href={l.href}
              onClick={(e) => {
                if (l.href.startsWith("/#")) {
                  e.preventDefault();
                  handle(l.href);
                }
              }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">Lana · Sudtirolo · IT</div>
      </div>
    </>
  );
}
