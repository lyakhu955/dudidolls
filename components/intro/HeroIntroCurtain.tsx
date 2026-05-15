"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PORTRAITS = [
  { src: "/foto/vera.jpg",    name: "Vera"    },
  { src: "/foto/olmo.jpg",    name: "Olmo"    },
  { src: "/foto/barnaba.jpg", name: "Barnaba" },
  { src: "/foto/tobia.jpg",   name: "Tobia"   },
];

export default function HeroIntroCurtain({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const leftCurtainRef = useRef<HTMLDivElement | null>(null);
  const rightCurtainRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const stripFarRef = useRef<HTMLDivElement | null>(null);
  const stripNearRef = useRef<HTMLDivElement | null>(null);
  const portraitsRef = useRef<HTMLDivElement | null>(null);
  const centerZoomRef = useRef<HTMLDivElement | null>(null);
  const grainRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (stageRef.current) stageRef.current.style.display = "none";
      gsap.set(contentRef.current, { autoAlpha: 1 });
      return;
    }

    gsap.set(contentRef.current, { autoAlpha: 0 });
    gsap.set(portraitsRef.current, { autoAlpha: 0 });
    gsap.set(centerZoomRef.current, { autoAlpha: 0, scale: 1 });

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=320vh",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;

          // cue + grain always active until final reveal
          if (cueRef.current) {
            const cueAlpha = p < 0.08 ? 1 - p / 0.08 : 0;
            gsap.set(cueRef.current, { autoAlpha: cueAlpha });
          }

          // Phase 1 (0 → 0.15) — logo pulses, curtains closed
          if (p < 0.15) {
            const k = p / 0.15;
            gsap.set(logoRef.current, { autoAlpha: 1, scale: 1 + Math.sin(p * 18) * 0.01 });
            gsap.set(leftCurtainRef.current, { x: "0%" });
            gsap.set(rightCurtainRef.current, { x: "0%" });
            gsap.set(stripRef.current, { x: "0%", autoAlpha: 0 });
          }
          // Phase 2 (0.15 → 0.50) — curtain crack 8%, strip scrolls behind
          else if (p < 0.5) {
            const k = (p - 0.15) / 0.35;
            const e = k * (2 - k);
            const crack = e * 8; // % each side
            gsap.set(logoRef.current, { autoAlpha: Math.max(0, 1 - k * 2) });
            gsap.set(leftCurtainRef.current, { x: `-${crack}%` });
            gsap.set(rightCurtainRef.current, { x: `${crack}%` });
            gsap.set(stripRef.current, {
              autoAlpha: 1,
              x: `${-e * 30}%`,
            });
            if (stripFarRef.current)  gsap.set(stripFarRef.current,  { x: `${-e * 12}%` });
            if (stripNearRef.current) gsap.set(stripNearRef.current, { x: `${-e * 48}%` });
          }
          // Phase 3 (0.50 → 0.85) — curtain fully splits, portraits dominate
          else if (p < 0.85) {
            const k = (p - 0.5) / 0.35;
            const e = k * (2 - k);
            const slide = 8 + e * 92; // 8% → 100%
            gsap.set(logoRef.current, { autoAlpha: 0 });
            gsap.set(leftCurtainRef.current, { x: `-${slide}%` });
            gsap.set(rightCurtainRef.current, { x: `${slide}%` });
            gsap.set(portraitsRef.current, {
              autoAlpha: e,
              scale: 1.2 - e * 0.2,
            });
            gsap.set(stripRef.current, { x: `${-30 - e * 10}%` });
          }
          // Phase 4 (0.85 → 1.0) — center zoom + reveal
          else {
            const k = (p - 0.85) / 0.15;
            const e = k * k;
            gsap.set(leftCurtainRef.current, { x: "-100%" });
            gsap.set(rightCurtainRef.current, { x: "100%" });
            gsap.set(portraitsRef.current, { autoAlpha: 1 - e, scale: 1 });
            gsap.set(centerZoomRef.current, {
              autoAlpha: e,
              scale: 1 + e * 0.4,
            });
            gsap.set(stageRef.current, { autoAlpha: 1 - e });
            gsap.set(contentRef.current, {
              autoAlpha: e,
              y: `${(1 - e) * 36}px`,
            });
          }

          // grain breathes
          if (grainRef.current) {
            gsap.set(grainRef.current, { autoAlpha: 0.18 + Math.sin(p * 30) * 0.04 });
          }
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="intro-curtain-section">
      <div ref={contentRef} className="intro-curtain-content">
        {children}
      </div>

      <div ref={stageRef} className="intro-curtain-stage" aria-hidden="true">
        {/* photo strip layers — behind curtains */}
        <div ref={stripRef} className="intro-curtain-strip">
          <div ref={stripFarRef} className="intro-curtain-strip-layer far">
            {[...PORTRAITS, ...PORTRAITS].map((p, i) => (
              <div key={`far-${i}`} className="intro-curtain-strip-card">
                <Image src={p.src} alt="" fill sizes="40vw" priority={i < 2} />
              </div>
            ))}
          </div>
          <div className="intro-curtain-strip-layer mid">
            {[...PORTRAITS, ...PORTRAITS].map((p, i) => (
              <div key={`mid-${i}`} className="intro-curtain-strip-card">
                <Image src={p.src} alt="" fill sizes="35vw" />
              </div>
            ))}
          </div>
          <div ref={stripNearRef} className="intro-curtain-strip-layer near">
            {[...PORTRAITS, ...PORTRAITS].map((p, i) => (
              <div key={`near-${i}`} className="intro-curtain-strip-card">
                <Image src={p.src} alt="" fill sizes="30vw" />
              </div>
            ))}
          </div>
        </div>

        {/* dominant portraits trio — phase 3 */}
        <div ref={portraitsRef} className="intro-curtain-portraits">
          {PORTRAITS.slice(0, 3).map((p, i) => (
            <figure key={p.name} className={`intro-curtain-portrait pos-${i}`}>
              <Image src={p.src} alt={p.name} fill sizes="33vw" priority />
              <figcaption>
                <span className="num">0{i + 1}</span>
                <span className="name">{p.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* center final zoom portrait */}
        <div ref={centerZoomRef} className="intro-curtain-zoom">
          <Image src={PORTRAITS[0].src} alt="" fill sizes="100vw" priority />
        </div>

        {/* curtains */}
        <div ref={leftCurtainRef} className="intro-curtain-panel left">
          <span className="intro-curtain-folds" />
        </div>
        <div ref={rightCurtainRef} className="intro-curtain-panel right">
          <span className="intro-curtain-folds" />
        </div>

        {/* logo */}
        <div ref={logoRef} className="intro-curtain-logo">
          <span className="kicker">capitolo 03 · édition</span>
          <h2>
            dudi<span className="it">dolls</span>
          </h2>
          <span className="sub">— premium collection · italia —</span>
        </div>

        {/* film grain */}
        <div ref={grainRef} className="intro-curtain-grain" />

        {/* cue */}
        <div ref={cueRef} className="intro-curtain-cue">
          <span>SCORRI · APRI IL SIPARIO</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}
