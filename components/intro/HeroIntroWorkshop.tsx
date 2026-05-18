"use client";
import { useLayoutEffect, useRef, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/lib/store";

const TOTAL_FRAMES = 304;
const FRAME_PATH = (i: number) =>
  `/frames/workshop/frame_${String(i).padStart(3, "0")}.webp`;

export default function HeroIntroWorkshop({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const logoInnerRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const introTriggeredRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [preloadCount, setPreloadCount] = useState(0);
  const setIntroFinished = useStore((s) => s.setIntroFinished);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let done = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        done++;
        setPreloadCount(done);
        if (done === TOTAL_FRAMES) {
          framesRef.current = images;
          setReady(true);
        }
      };
      img.onerror = () => {
        done++;
        setPreloadCount(done);
        if (done === TOTAL_FRAMES) {
          framesRef.current = images;
          setReady(true);
        }
      };
      images.push(img);
    }

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Draw the correct frame based on scroll progress
  useLayoutEffect(() => {
    if (!ready) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (stageRef.current) stageRef.current.style.display = "none";
      gsap.set(contentRef.current, { autoAlpha: 1 });
      return;
    }

    gsap.set(contentRef.current, { autoAlpha: 0 });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas internal resolution to match frames (HD)
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const drawFrame = (progress: number) => {
      const idx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * TOTAL_FRAMES))
      );
      const img = framesRef.current[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const ctxGSAP = gsap.context(() => {
      // quickSetters: faster than gsap.set per tick (no string parsing/lookup)
      const setCueAlpha = gsap.quickSetter(cueRef.current, "autoAlpha");
      const setLogoAlpha = gsap.quickSetter(logoRef.current, "autoAlpha");
      const setLogoY = gsap.quickSetter(logoRef.current, "y", "px");
      const setLogoScaleX = gsap.quickSetter(logoInnerRef.current, "scaleX");
      const setLogoScaleY = gsap.quickSetter(logoInnerRef.current, "scaleY");
      const setStageAlpha = gsap.quickSetter(stageRef.current, "autoAlpha");
      const setContentAlpha = gsap.quickSetter(contentRef.current, "autoAlpha");
      const setContentY = gsap.quickSetter(contentRef.current, "y", "px");

      let lastPhase = -1;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600vh",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          drawFrame(p);

          const phase = p < 0.10 ? 1 : p < 0.70 ? 2 : p < 0.88 ? 3 : 4;
          const phaseChanged = phase !== lastPhase;

          if (phase === 1) {
            setCueAlpha(1 - p / 0.10);
            if (phaseChanged) {
              setLogoAlpha(1);
              setLogoY(0);
              setLogoScaleX(1);
              setLogoScaleY(1);
              setStageAlpha(1);
              setContentAlpha(0);
              if (introTriggeredRef.current) {
                introTriggeredRef.current = false;
                setIntroFinished(false);
              }
            }
          } else if (phase === 2) {
            if (phaseChanged) {
              setCueAlpha(0);
              setLogoAlpha(1);
              setLogoY(0);
              setLogoScaleX(1);
              setLogoScaleY(1);
              setStageAlpha(1);
              setContentAlpha(0);
              if (introTriggeredRef.current) {
                introTriggeredRef.current = false;
                setIntroFinished(false);
              }
            }
          } else if (phase === 3) {
            const expandP = (p - 0.70) / 0.18;
            const ease = expandP * expandP;
            // scaleX widens letters (replaces letter-spacing — no reflow)
            setLogoScaleX(1 + ease * 0.55);
            setLogoScaleY(1 + ease * 0.15);
            setLogoY(-ease * 30);
            if (phaseChanged) {
              setLogoAlpha(1);
              setStageAlpha(1);
              setContentAlpha(0);
              if (introTriggeredRef.current) {
                introTriggeredRef.current = false;
                setIntroFinished(false);
              }
            }
          } else {
            const rP = (p - 0.88) / 0.12;
            const eased = 1 - (1 - rP) * (1 - rP) * (1 - rP);
            const contentE = rP * (2 - rP);
            setLogoAlpha(1 - eased);
            setLogoY(-30 - eased * 50);
            setLogoScaleX(1.55 + eased * 4.5);
            setLogoScaleY(1.15 + eased * 2.0);
            setStageAlpha(1 - eased);
            setContentAlpha(contentE);
            setContentY((1 - contentE) * 40);
            if (rP > 0.3 && !introTriggeredRef.current) {
              introTriggeredRef.current = true;
              setIntroFinished(true);
            }
          }

          lastPhase = phase;
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctxGSAP.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="hero-intro"
      style={{ height: "100vh", position: "relative", zIndex: 20 }}
    >
      {/* Real site content behind the overlay */}
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

      {/* Workshop overlay stage — solid background so nothing bleeds through */}
      <div
        ref={stageRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 10,
          background: "#1a1209",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Canvas draws the frame sequence */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradient overlays for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.15) 35%, rgba(10,8,6,0.10) 65%, rgba(10,8,6,0.45) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Preloader */}
        {!ready && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              zIndex: 20,
              background: "#1a1209",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(244,237,225,0.6)",
            }}
          >
            <span>Caricamento scene</span>
            <div
              style={{
                width: 120,
                height: 2,
                background: "rgba(244,237,225,0.15)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(preloadCount / TOTAL_FRAMES) * 100}%`,
                  height: "100%",
                  background: "var(--accent)",
                  transition: "width 0.2s ease",
                }}
              />
            </div>
          </div>
        )}

        {/* Logo / Brand — positioned at top, scales up dramatically */}
        <div
          className="hero-intro-logo"
          style={{
            position: "absolute",
            top: "10vh",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <div
            ref={logoRef}
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center center",
            }}
          >
            <div
              ref={logoInnerRef}
              className="hero-intro-logo-text"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(64px, 10vw, 160px)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#f4ede1",
                textShadow:
                  "0 4px 30px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformOrigin: "center center",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {"dudi".split("").map((ch, i) => (
                <span
                  key={`d-${i}`}
                  className="char"
                  style={{ ["--i" as string]: i }}
                >
                  {ch}
                </span>
              ))}
              {"dolls".split("").map((ch, i) => (
                <span
                  key={`s-${i}`}
                  className="char char--accent"
                  style={{
                    ["--i" as string]: i + 4,
                    marginLeft: i === 0 ? "-0.04em" : undefined,
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
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
            color: "#f4ede1",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <span>SCORRI</span>
          <span
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, transparent, #f4ede1)",
              position: "relative",
              animation: "bounce-down 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
