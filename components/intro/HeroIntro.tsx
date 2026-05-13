"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Scissors from "./Scissors";
import { buildCutPath, buildFrayHairs } from "./buildCutPath";

export default function HeroIntro({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fabricLeftRef = useRef<HTMLDivElement | null>(null);
  const fabricRightRef = useRef<HTMLDivElement | null>(null);
  const dudiRef = useRef<HTMLSpanElement | null>(null);
  const dollsRef = useRef<HTMLSpanElement | null>(null);
  const scissorsRef = useRef<SVGSVGElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const cutPathRef = useRef<SVGPathElement | null>(null);
  const frayGroupRef = useRef<SVGGElement | null>(null);
  const frayDispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const revealedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (revealedRef.current) revealedRef.current.style.opacity = "1";
      if (stageRef.current) stageRef.current.style.display = "none";
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const pinDistance = isMobile ? "+=200%" : "+=300%";

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinDistance,
        pin: stageRef.current,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Phase 1 (0 → 0.05): scroll cue fades, scissors fades in
          if (p < 0.05) {
            const k = p / 0.05;
            gsap.set(scissorsRef.current, { autoAlpha: k, y: "85vh", x: 0 });
            gsap.set(cueRef.current, { autoAlpha: 1 - k });
            updateCut(0);
            resetSplit();
          }
          // Phase 2-3 (0.05 → 0.7): scissors travels bottom→top, fabric tears
          else if (p < 0.7) {
            const cutP = (p - 0.05) / 0.65;
            const yPct = 85 - cutP * 85;
            const wobble = isMobile ? 0 : Math.sin(cutP * Math.PI * 5) * 6;
            gsap.set(scissorsRef.current, { autoAlpha: 1, y: `${yPct}vh`, x: wobble });
            gsap.set(cueRef.current, { autoAlpha: 0 });
            updateCut(cutP);
            resetSplit();
          }
          // Phase 4 (0.7 → 0.9): panels split horizontally
          else if (p < 0.9) {
            const splitP = (p - 0.7) / 0.2;
            updateCut(1);
            const ease = splitP * (2 - splitP); // ease-out quad
            gsap.set(fabricLeftRef.current, { x: `-${ease * 70}vw` });
            gsap.set(fabricRightRef.current, { x: `${ease * 70}vw` });
            gsap.set(dudiRef.current, { x: `-${ease * 35}vw`, autoAlpha: 1 - ease * 0.5 });
            gsap.set(dollsRef.current, { x: `${ease * 35}vw`, autoAlpha: 1 - ease * 0.5 });
            gsap.set(scissorsRef.current, { autoAlpha: 1 - splitP, scale: 1 + splitP * 0.3 });
          }
          // Phase 5 (0.9 → 1): reveal site
          else {
            const revealP = (p - 0.9) / 0.1;
            const ease = revealP * (2 - revealP);
            gsap.set(fabricLeftRef.current, { x: "-100vw" });
            gsap.set(fabricRightRef.current, { x: "100vw" });
            gsap.set(dudiRef.current, { x: "-50vw", autoAlpha: 0 });
            gsap.set(dollsRef.current, { x: "50vw", autoAlpha: 0 });
            gsap.set(scissorsRef.current, { autoAlpha: 0 });
            gsap.set(stageRef.current, { autoAlpha: 1 - ease });
            gsap.set(revealedRef.current, { autoAlpha: ease, scale: 0.96 + ease * 0.04 });
          }
        },
      });

      function updateCut(p: number) {
        if (cutPathRef.current) cutPathRef.current.setAttribute("d", buildCutPath(p));
        if (frayDispRef.current) frayDispRef.current.setAttribute("scale", String(0.5 + p * 5));
        if (frayGroupRef.current) {
          const hairs = buildFrayHairs(p);
          const frag = hairs
            .map(
              (h) =>
                `<line x1="${h.x}" y1="${h.y}" x2="${h.x + Math.cos((h.angle * Math.PI) / 180) * h.len}" y2="${h.y + Math.sin((h.angle * Math.PI) / 180) * h.len}" stroke="rgba(120,95,70,0.55)" stroke-width="0.5" stroke-linecap="round" />`
            )
            .join("");
          frayGroupRef.current.innerHTML = frag;
        }
      }

      function resetSplit() {
        gsap.set(fabricLeftRef.current, { x: 0 });
        gsap.set(fabricRightRef.current, { x: 0 });
        gsap.set(dudiRef.current, { x: 0, autoAlpha: 1 });
        gsap.set(dollsRef.current, { x: 0, autoAlpha: 1 });
        gsap.set(stageRef.current, { autoAlpha: 1 });
        gsap.set(revealedRef.current, { autoAlpha: 0, scale: 0.96 });
        gsap.set(scissorsRef.current, { scale: 1 });
      }

      // Initial state
      updateCut(0);
      gsap.set(scissorsRef.current, { autoAlpha: 0, y: "85vh" });
      gsap.set(revealedRef.current, { autoAlpha: 0, scale: 0.96 });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-intro"
      style={{ height: "400vh", position: "relative" }}
    >
      <div ref={stageRef} className="hero-intro-stage">
        {/* Two fabric halves */}
        <div ref={fabricLeftRef} className="fabric-half left" />
        <div ref={fabricRightRef} className="fabric-half right" />

        {/* SVG cut overlay with fray filter */}
        <svg
          className="cut-edge-svg"
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          style={{ height: "100vh" }}
        >
          <defs>
            <filter id="frayFilter" x="-20%" y="-5%" width="140%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="3" result="noise" />
              <feDisplacementMap ref={frayDispRef} in="SourceGraphic" in2="noise" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <linearGradient id="cutShadowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
            </linearGradient>
          </defs>

          {/* Cut path stroke (the dark seam line) */}
          <g filter="url(#frayFilter)">
            <path
              ref={cutPathRef}
              d=""
              stroke="#1a120c"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d=""
              stroke="rgba(40,28,18,0.4)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Frayed hair threads */}
          <g ref={frayGroupRef} />
        </svg>

        {/* dudidolls split text */}
        <div className="intro-text-layer">
          <span ref={dudiRef} className="word left">dudi</span>
          <span ref={dollsRef} className="word right">dolls</span>
        </div>

        {/* Scissors */}
        <Scissors ref={scissorsRef} />

        {/* Scroll cue */}
        <div ref={cueRef} className="intro-scroll-cue">
          <span>SCORRI</span>
          <span className="arrow-down" aria-hidden="true" />
        </div>
      </div>

      <div ref={revealedRef} className="intro-revealed">
        {children}
      </div>
    </section>
  );
}
