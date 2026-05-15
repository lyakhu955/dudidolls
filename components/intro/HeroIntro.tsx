"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroIntro({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dudiRef = useRef<HTMLSpanElement | null>(null);
  const dollsRef = useRef<HTMLSpanElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
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
        end: "+=320vh",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Phase 1 (0 → 0.08): scroll cue fades
          if (p < 0.08) {
            const k = p / 0.08;
            gsap.set(cueRef.current, { autoAlpha: 1 - k });
          }
          // Phase 2 (0.08 → 0.55): text splits apart
          else if (p < 0.55) {
            const splitP = (p - 0.08) / 0.47;
            const e = splitP * (2 - splitP); // ease-out quad
            gsap.set(dudiRef.current, { x: `-${e * 42}vw`, autoAlpha: 1 });
            gsap.set(dollsRef.current, { x: `${e * 42}vw`, autoAlpha: 1 });
            gsap.set(cueRef.current, { autoAlpha: 0 });
          }
          // Phase 3 (0.55 → 0.72): text fades, stage holds solid
          else if (p < 0.72) {
            const fadeP = (p - 0.55) / 0.17;
            const e = fadeP * fadeP;
            gsap.set(dudiRef.current, { x: "-42vw", autoAlpha: 1 - e });
            gsap.set(dollsRef.current, { x: "42vw", autoAlpha: 1 - e });
            gsap.set(stageRef.current, { autoAlpha: 1, scale: 1 });
            gsap.set(contentRef.current, { autoAlpha: 0, y: 0 });
          }
          // Phase 4 (0.72 → 1.0): stage dissolves + content breathes in — più spazio scroll
          else {
            const rP = (p - 0.72) / 0.28;
            const stageE = rP * (2 - rP);
            const contentE = rP * rP;
            gsap.set(stageRef.current, {
              autoAlpha: 1 - stageE,
              scale: 1 + stageE * 0.03,
            });
            gsap.set(contentRef.current, {
              autoAlpha: contentE,
              y: `${(1 - contentE) * 32}px`,
            });
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
      style={{ height: "100vh", position: "relative", zIndex: 20 }}
    >
      {/* Site content behind — sticky so it stays in view during intro */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          inset: 0,
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
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 10,
          background: "var(--bg)",
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
