"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroIntroAtelier({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);

  const toolsRef = useRef<SVGGElement | null>(null);
  const threadRef = useRef<SVGPathElement | null>(null);
  const dollGroupRef = useRef<SVGGElement | null>(null);
  const dollHeadRef = useRef<SVGPathElement | null>(null);
  const dollEyesRef = useRef<SVGGElement | null>(null);
  const dollDressRef = useRef<SVGGElement | null>(null);
  const dollHairRef = useRef<SVGPathElement | null>(null);
  const blinkRef = useRef<SVGGElement | null>(null);
  const cameraRef = useRef<SVGGElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (stageRef.current) stageRef.current.style.display = "none";
      gsap.set(contentRef.current, { autoAlpha: 1 });
      return;
    }

    gsap.set(contentRef.current, { autoAlpha: 0 });

    // initial tool positions (off-stage, scattered)
    const tools = toolsRef.current?.children;
    if (tools) {
      gsap.set(tools, {
        transformOrigin: "center center",
        opacity: 0,
      });
    }
    if (threadRef.current) {
      const len = threadRef.current.getTotalLength();
      gsap.set(threadRef.current, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    }
    if (dollHeadRef.current) {
      const headLen = dollHeadRef.current.getTotalLength();
      gsap.set(dollHeadRef.current, {
        strokeDasharray: headLen,
        strokeDashoffset: headLen,
      });
    }
    gsap.set([dollEyesRef.current, dollDressRef.current, dollHairRef.current], {
      opacity: 0,
      scale: 0.3,
      transformOrigin: "center center",
    });
    gsap.set(blinkRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=340vh",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;

          // cue fade
          if (cueRef.current) {
            const cueAlpha = p < 0.05 ? 1 - p / 0.05 : 0;
            gsap.set(cueRef.current, { autoAlpha: cueAlpha });
          }

          // Phase 1 (0 → 0.20) — tools enter staggered
          if (p < 0.2 && tools) {
            const k = p / 0.2;
            Array.from(tools).forEach((el, i) => {
              const delay = i * 0.12;
              const local = Math.max(0, Math.min(1, (k - delay) / 0.4));
              const e = local * (2 - local);
              gsap.set(el, {
                opacity: e,
                y: (1 - e) * (i % 2 === 0 ? -80 : 80),
                x: (1 - e) * (i < 3 ? -120 : 120),
                rotate: (1 - e) * (i % 2 === 0 ? -20 : 20),
              });
            });
          } else if (tools) {
            // tools fully visible, gentle tremble
            const tremble = Math.sin(p * 24) * 1.5 * (1 - Math.min(1, (p - 0.55) / 0.25));
            Array.from(tools).forEach((el, i) => {
              gsap.set(el, {
                opacity: p < 0.85 ? 1 : Math.max(0, 1 - (p - 0.85) / 0.15),
                y: 0,
                x: 0,
                rotate: tremble * (i % 2 === 0 ? 1 : -1),
              });
            });
          }

          // Phase 2 (0.20 → 0.55) — thread unspools + head silhouette traces
          if (p >= 0.2 && p < 0.55 && threadRef.current && dollHeadRef.current) {
            const k = (p - 0.2) / 0.35;
            const e = k * (2 - k);
            const tLen = parseFloat(threadRef.current.getAttribute("stroke-dasharray") || "0");
            const hLen = parseFloat(dollHeadRef.current.getAttribute("stroke-dasharray") || "0");
            gsap.set(threadRef.current, { strokeDashoffset: tLen * (1 - e) });
            gsap.set(dollHeadRef.current, {
              strokeDashoffset: hLen * (1 - e),
              opacity: 1,
            });
          }

          // Phase 3 (0.55 → 0.80) — eyes / dress / hair snap in
          if (p >= 0.55 && p < 0.8) {
            const k = (p - 0.55) / 0.25;
            const stages = [
              { el: dollHairRef.current, t: 0.0 },
              { el: dollDressRef.current, t: 0.25 },
              { el: dollEyesRef.current, t: 0.55 },
            ];
            stages.forEach(({ el, t }) => {
              if (!el) return;
              const local = Math.max(0, Math.min(1, (k - t) / 0.35));
              const back = local < 0.5 ? local * 2 : 1 + (local - 0.5) * -0.1;
              gsap.set(el, {
                opacity: local,
                scale: 0.3 + back * 0.7,
              });
            });
          }

          // Phase 4 (0.80 → 1.0) — blink + zoom + reveal
          if (p >= 0.8) {
            const k = (p - 0.8) / 0.2;
            const e = k * k;

            // blink — 3 quick pulses in first half
            const blinkK = k < 0.4 ? Math.abs(Math.sin(k * Math.PI * 6)) : 0;
            gsap.set(blinkRef.current, { opacity: blinkK });

            // zoom in on doll
            gsap.set(cameraRef.current, {
              transformOrigin: "500px 380px",
              scale: 1 + e * 1.2,
            });

            gsap.set(stageRef.current, { autoAlpha: 1 - e });
            gsap.set(contentRef.current, {
              autoAlpha: e,
              y: `${(1 - e) * 36}px`,
            });
          } else {
            gsap.set(stageRef.current, { autoAlpha: 1 });
            gsap.set(cameraRef.current, { scale: 1 });
          }
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="intro-atelier-section">
      <div ref={contentRef} className="intro-atelier-content">
        {children}
      </div>

      <div ref={stageRef} className="intro-atelier-stage" aria-hidden="true">
        <div className="intro-atelier-kicker">
          <span className="dot" />
          atelier · sudtirolo · 1 / 1
        </div>

        <svg
          className="intro-atelier-svg"
          viewBox="0 0 1000 760"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="atelier-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M30 0H0V30" fill="none" stroke="rgba(28,25,22,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="760" fill="url(#atelier-grid)" />

          {/* scattered tools */}
          <g ref={toolsRef} stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* spool top-left */}
            <g transform="translate(140 200)">
              <rect x="-30" y="-12" width="60" height="55" rx="3" fill="var(--bg-2)" />
              <ellipse cx="0" cy="-12" rx="30" ry="6" fill="var(--bg)" />
              <ellipse cx="0" cy="43" rx="30" ry="6" fill="var(--bg-2)" />
              <line x1="-20" y1="0" x2="20" y2="0" stroke="var(--accent)" strokeWidth="2" />
              <line x1="-22" y1="10" x2="22" y2="10" stroke="var(--accent)" strokeWidth="2" />
              <line x1="-20" y1="20" x2="20" y2="20" stroke="var(--accent)" strokeWidth="2" />
              <text x="-30" y="78" fontSize="10" fontFamily="var(--mono)" fill="var(--muted)" stroke="none">
                · cotone n.40
              </text>
            </g>

            {/* scissors top-right */}
            <g transform="translate(830 140) rotate(25)">
              <circle cx="-18" cy="-12" r="10" />
              <circle cx="-18" cy="14" r="10" />
              <line x1="-10" y1="-8" x2="60" y2="6" />
              <line x1="-10" y1="10" x2="60" y2="-4" />
              <text x="-30" y="42" fontSize="10" fontFamily="var(--mono)" fill="var(--muted)" stroke="none">
                · forbici
              </text>
            </g>

            {/* needle bottom-right */}
            <g transform="translate(820 580) rotate(-35)">
              <line x1="-60" y1="0" x2="60" y2="0" />
              <ellipse cx="-50" cy="0" rx="6" ry="3" />
              <circle cx="-50" cy="0" r="1.5" fill="var(--ink)" />
            </g>

            {/* eye mechanism bottom-left */}
            <g transform="translate(170 580)">
              <circle cx="0" cy="0" r="36" fill="var(--bg-2)" />
              <circle cx="0" cy="0" r="22" fill="var(--bg)" />
              <circle cx="0" cy="0" r="8" fill="var(--ink)" />
              <line x1="-44" y1="0" x2="-36" y2="0" />
              <line x1="36" y1="0" x2="44" y2="0" />
              <line x1="0" y1="-44" x2="0" y2="-36" />
              <line x1="0" y1="36" x2="0" y2="44" />
              <text x="-44" y="60" fontSize="10" fontFamily="var(--mono)" fill="var(--muted)" stroke="none">
                · meccanismo occhi
              </text>
            </g>

            {/* ribbon top-center */}
            <g transform="translate(500 90) rotate(-8)">
              <path d="M -50 0 Q -20 -20 0 0 T 50 0" stroke="var(--accent)" strokeWidth="2.5" />
              <path d="M -50 10 Q -20 -10 0 10 T 50 10" stroke="var(--accent)" strokeWidth="2.5" opacity="0.6" />
            </g>

            {/* fabric square right */}
            <g transform="translate(880 380) rotate(-10)">
              <rect x="-30" y="-30" width="60" height="60" fill="var(--bg-2)" />
              <line x1="-30" y1="-15" x2="30" y2="-15" />
              <line x1="-30" y1="0" x2="30" y2="0" />
              <line x1="-30" y1="15" x2="30" y2="15" />
              <line x1="-15" y1="-30" x2="-15" y2="30" />
              <line x1="0" y1="-30" x2="0" y2="30" />
              <line x1="15" y1="-30" x2="15" y2="30" />
            </g>
          </g>

          {/* thread unspooling — from spool to head outline */}
          <path
            ref={threadRef}
            d="M 170 200 C 240 220, 320 260, 380 280 C 440 300, 470 320, 500 340"
            stroke="var(--accent)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* doll group — center */}
          <g ref={dollGroupRef}>
            <g ref={cameraRef}>
              {/* head outline (traced) */}
              <path
                ref={dollHeadRef}
                d="M 500 290 C 430 290, 395 350, 395 410 C 395 470, 430 510, 470 520 C 475 540, 525 540, 530 520 C 570 510, 605 470, 605 410 C 605 350, 570 290, 500 290 Z"
                stroke="var(--ink)"
                strokeWidth="2"
                fill="var(--bg-2)"
                opacity="0"
              />

              {/* hair */}
              <path
                ref={dollHairRef}
                d="M 405 350 C 410 310, 440 280, 500 278 C 560 280, 590 310, 595 350 C 600 360, 590 370, 585 360 C 575 330, 540 305, 500 305 C 460 305, 425 330, 415 360 C 410 370, 400 360, 405 350 Z"
                fill="var(--ink)"
                stroke="none"
              />

              {/* dress */}
              <g ref={dollDressRef}>
                <path
                  d="M 470 530 L 430 700 L 570 700 L 530 530 Z"
                  fill="var(--accent)"
                  opacity="0.85"
                />
                <line x1="500" y1="530" x2="500" y2="700" stroke="var(--bg)" strokeWidth="1" strokeDasharray="3,4" />
                <circle cx="500" cy="560" r="3" fill="var(--bg)" />
                <circle cx="500" cy="585" r="3" fill="var(--bg)" />
                <circle cx="500" cy="610" r="3" fill="var(--bg)" />
              </g>

              {/* eyes — iconic large Blythe eyes */}
              <g ref={dollEyesRef}>
                <ellipse cx="465" cy="415" rx="22" ry="20" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
                <ellipse cx="535" cy="415" rx="22" ry="20" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
                <circle cx="465" cy="415" r="14" fill="#4fa86b" />
                <circle cx="535" cy="415" r="14" fill="#4fa86b" />
                <circle cx="465" cy="415" r="5" fill="var(--ink)" />
                <circle cx="535" cy="415" r="5" fill="var(--ink)" />
                <circle cx="461" cy="411" r="2" fill="white" />
                <circle cx="531" cy="411" r="2" fill="white" />
                {/* lashes */}
                <path d="M 445 402 L 442 397 M 455 398 L 454 392 M 465 397 L 465 391 M 475 398 L 476 392 M 485 402 L 488 397" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M 515 402 L 512 397 M 525 398 L 524 392 M 535 397 L 535 391 M 545 398 L 546 392 M 555 402 L 558 397" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                {/* nose + lips */}
                <path d="M 500 440 L 497 460 L 503 460 Z" fill="var(--ink-2)" />
                <path d="M 488 478 Q 500 488 512 478" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>

              {/* blink overlay — covers eyes when active */}
              <g ref={blinkRef}>
                <ellipse cx="465" cy="415" rx="22" ry="20" fill="var(--ink)" />
                <ellipse cx="535" cy="415" rx="22" ry="20" fill="var(--ink)" />
              </g>
            </g>
          </g>
        </svg>

        <div ref={cueRef} className="intro-atelier-cue">
          <span>SCORRI · COSTRUISCI LA BAMBOLA</span>
          <span className="line" />
        </div>
      </div>
    </section>
  );
}
