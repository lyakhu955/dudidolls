"use client";
import { useLayoutEffect, useRef, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/lib/store";
import LiquidLogo, { type LiquidLogoHandle } from "./LiquidLogo";

const TOTAL_FRAMES = 304;
const FRAME_PATH = (i: number) =>
  `/frames/workshop/frame_${String(i).padStart(3, "0")}.webp`;

export default function HeroIntroWorkshop({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const liquidRef = useRef<LiquidLogoHandle | null>(null);
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
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600vh",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Draw the matching frame
          drawFrame(p);

          // Phase 1 (0 → 0.10): scroll cue fades, logo settled
          if (p < 0.10) {
            const k = p / 0.10;
            gsap.set(cueRef.current, { autoAlpha: 1 - k });
            gsap.set(logoRef.current, { autoAlpha: 1, y: 0 });
            liquidRef.current?.setProgress(0);
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          }
          // Phase 2 (0.10 → 0.70): camera enters workshop
          else if (p < 0.70) {
            gsap.set(cueRef.current, { autoAlpha: 0 });
            gsap.set(logoRef.current, { autoAlpha: 1, y: 0 });
            liquidRef.current?.setProgress(0);
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          }
          // Phase 3 (0.70 → 0.88): liquid distortion ramps up, logo drifts
          else if (p < 0.88) {
            const expandP = (p - 0.70) / 0.18;
            const ease = expandP * expandP;
            gsap.set(logoRef.current, {
              autoAlpha: 1,
              y: -ease * 50,
            });
            liquidRef.current?.setProgress(expandP * 0.6);
            gsap.set(contentRef.current, { autoAlpha: 0 });
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          }
          // Phase 4 (0.88 → 1.0): liquid dissolves, content breathes in
          else {
            const rP = (p - 0.88) / 0.12;
            const stageE = rP;
            const contentE = rP * (2 - rP);
            gsap.set(logoRef.current, { y: -50 - stageE * 30 });
            liquidRef.current?.setProgress(0.6 + rP * 0.4);
            gsap.set(stageRef.current, { autoAlpha: 1 - stageE });
            gsap.set(contentRef.current, {
              autoAlpha: contentE,
              y: `${(1 - contentE) * 40}px`,
            });
            if (rP > 0.3 && !introTriggeredRef.current) {
              introTriggeredRef.current = true;
              setIntroFinished(true);
            }
          }
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
              width: "min(78vw, 1100px)",
              height: "clamp(110px, 16vw, 240px)",
              willChange: "transform, opacity",
              transformOrigin: "center center",
            }}
          >
            <LiquidLogo ref={liquidRef} accent="var(--accent)" />
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
