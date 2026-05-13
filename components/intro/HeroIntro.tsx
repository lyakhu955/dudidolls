"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroIntro({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dudiRef = useRef<HTMLSpanElement | null>(null);
  const dollsRef = useRef<HTMLSpanElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (stageRef.current) stageRef.current.style.display = "none";
      gsap.set(contentRef.current, { autoAlpha: 1 });
      return;
    }

    gsap.set(contentRef.current, { autoAlpha: 0 });

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;

          // Phase 1 (0 → 0.15): scroll cue fades
          if (p < 0.15) {
            const k = p / 0.15;
            gsap.set(cueRef.current, { autoAlpha: 1 - k });
          }
          // Phase 2 (0.15 → 0.70): text splits apart
          else if (p < 0.70) {
            const splitP = (p - 0.15) / 0.55;
            const ease = splitP * (2 - splitP);
            gsap.set(dudiRef.current, { x: `-${ease * 40}vw` });
            gsap.set(dollsRef.current, { x: `${ease * 40}vw` });
            gsap.set(cueRef.current, { autoAlpha: 0 });
          }
          // Phase 3 (0.70 → 0.90): text fades
          else if (p < 0.90) {
            const fadeP = (p - 0.70) / 0.20;
            gsap.set(dudiRef.current, { x: "-40vw", autoAlpha: 1 - fadeP });
            gsap.set(dollsRef.current, { x: "40vw", autoAlpha: 1 - fadeP });
            gsap.set(contentRef.current, { autoAlpha: 0 });
          }
          // Phase 4 (0.90 → 1): stage fades completely, content reveals
          else {
            const revealP = (p - 0.90) / 0.10;
            const ease = revealP * (2 - revealP);
            gsap.set(stageRef.current, { autoAlpha: 1 - ease });
            gsap.set(contentRef.current, { autoAlpha: ease });
          }
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-intro"
      style={{ height: "120vh", position: "relative", zIndex: 20 }}
    >
      {/* Site content behind — sticky so it stays in view during intro */}
      <div
        ref={contentRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {/* Overlay with split text only */}
      <div
        ref={stageRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 10,
          background: "var(--bg)",
          marginTop: "-100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(80px, 16vw, 240px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            ref={dudiRef}
            style={{
              color: "var(--ink)",
              fontWeight: 400,
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            dudi
          </span>
          <span
            ref={dollsRef}
            style={{
              color: "var(--accent)",
              fontStyle: "italic",
              marginLeft: "-0.05em",
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            dolls
          </span>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          style={{
            position: "absolute",
            bottom: "6vh",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--ink-2)",
            pointerEvents: "none",
          }}
        >
          <span>SCORRI</span>
          <span
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, transparent, var(--ink-2))",
              position: "relative",
              animation: "bounce-down 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
