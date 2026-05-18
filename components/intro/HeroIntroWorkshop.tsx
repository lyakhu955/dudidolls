"use client";
import { useLayoutEffect, useRef, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/lib/store";

const TOTAL_FRAMES = 304;
const CRITICAL_FRAMES = 32; // mark ready after these load — rest streams in background
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

  // Progressive frame preload — critical batch unblocks UX, rest streams.
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    framesRef.current = images;
    let done = 0;
    let criticalDone = 0;
    let readyFired = false;

    const loadOne = (i: number, priority: "high" | "low") => {
      const img = new Image();
      img.decoding = "async";
      try {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
          priority;
      } catch {}
      images[i - 1] = img;
      const finish = () => {
        done++;
        setPreloadCount(done);
        if (i <= CRITICAL_FRAMES) {
          criticalDone++;
          if (!readyFired && criticalDone >= CRITICAL_FRAMES) {
            readyFired = true;
            setReady(true);
          }
        }
      };
      img.onload = finish;
      img.onerror = finish;
      img.src = FRAME_PATH(i);
    };

    // Critical batch first
    for (let i = 1; i <= CRITICAL_FRAMES; i++) loadOne(i, "high");

    // Remainder scheduled after first paint
    const scheduleRest = () => {
      for (let i = CRITICAL_FRAMES + 1; i <= TOTAL_FRAMES; i++) {
        loadOne(i, "low");
      }
    };
    const ric = (window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    }).requestIdleCallback;
    if (ric) ric(scheduleRest);
    else setTimeout(scheduleRest, 80);

    return () => {
      images.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
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
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    // Adaptive canvas resolution — full HD on desktop, viewport-sized on mobile.
    // Frames are 1920x1080; downscaling on draw is essentially free for the GPU,
    // and dropping internal canvas size massively cuts per-tick composite cost.
    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const targetW = Math.min(1920, Math.ceil(vw * dpr));
      const targetH = Math.min(1080, Math.ceil(vh * dpr));
      // Maintain 16:9 to match source frames
      const ratio = 16 / 9;
      let w = targetW;
      let h = Math.round(w / ratio);
      if (h < targetH) {
        h = targetH;
        w = Math.round(h * ratio);
      }
      canvas.width = w;
      canvas.height = h;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };
    sizeCanvas();
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeCanvas();
        lastIdx = -1; // force redraw at new size
      }, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    let lastIdx = -1;
    const drawFrame = (progress: number) => {
      const idx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * TOTAL_FRAMES))
      );
      if (idx === lastIdx) return; // skip identical redraws
      // Find nearest loaded frame (handles in-progress streaming preload)
      let useIdx = idx;
      let img = framesRef.current[useIdx];
      if (!(img && img.complete && img.naturalWidth > 0)) {
        for (let off = 1; off <= 8; off++) {
          const back = framesRef.current[useIdx - off];
          if (back && back.complete && back.naturalWidth > 0) {
            img = back;
            useIdx = idx - off;
            break;
          }
        }
      }
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastIdx = idx;
      }
    };

    const ctxGSAP = gsap.context(() => {
      // quickSetters — bypass gsap.set's per-call property/string parsing.
      const qCueAlpha = gsap.quickSetter(cueRef.current, "autoAlpha");
      const qLogoAlpha = gsap.quickSetter(logoRef.current, "autoAlpha");
      const qLogoY = gsap.quickSetter(logoRef.current, "y", "px");
      const qLogoScale = gsap.quickSetter(logoInnerRef.current, "scale");
      const qLogoLetter = gsap.quickSetter(
        logoInnerRef.current,
        "letterSpacing",
        "em"
      );
      const qLogoFilter = gsap.quickSetter(
        logoInnerRef.current,
        "filter"
      ) as (val: string) => void;
      const qStageAlpha = gsap.quickSetter(stageRef.current, "autoAlpha");
      const qStageScale = gsap.quickSetter(stageRef.current, "scale");
      const qStageFilter = gsap.quickSetter(stageRef.current, "filter") as (
        val: string
      ) => void;
      const qContentAlpha = gsap.quickSetter(contentRef.current, "autoAlpha");
      const qContentY = gsap.quickSetter(contentRef.current, "y", "px");
      const qContentScale = gsap.quickSetter(contentRef.current, "scale");

      let lastPhase = -1;
      const applyStatic = (phase: number) => {
        if (phase === lastPhase) return;
        lastPhase = phase;
        if (phase === 1 || phase === 2) {
          qLogoAlpha(1);
          qLogoY(0);
          qLogoScale(1);
          qLogoLetter(-0.03);
          qLogoFilter("blur(0px)");
          qStageAlpha(1);
          qStageScale(1);
          qStageFilter("blur(0px)");
          qContentAlpha(0);
          qContentScale(0.96);
          qContentY(0);
          if (phase === 1) qCueAlpha(1);
          else qCueAlpha(0);
        }
      };

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600vh",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;
          drawFrame(p);

          if (p < 0.10) {
            // Phase 1
            applyStatic(1);
            qCueAlpha(1 - p / 0.10);
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          } else if (p < 0.70) {
            // Phase 2 — fully static
            applyStatic(2);
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          } else if (p < 0.88) {
            // Phase 3
            lastPhase = 3;
            const expandP = (p - 0.70) / 0.18;
            const ease = expandP * expandP;
            qLogoAlpha(1);
            qLogoY(-ease * 30);
            qLogoScale(1 + ease * 0.35);
            qLogoLetter(-0.03 + ease * 0.18);
            qLogoFilter(`blur(${ease * 2}px)`);
            qStageAlpha(1);
            qStageScale(1 + ease * 0.06);
            qStageFilter("blur(0px)");
            qContentAlpha(0);
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          } else {
            // Phase 4
            lastPhase = 4;
            const rP = (p - 0.88) / 0.12;
            const eased = 1 - Math.pow(1 - rP, 3);
            const contentE = rP * (2 - rP);
            qLogoAlpha(1 - eased);
            qLogoY(-30 - eased * 50);
            qLogoScale(1.35 + eased * 4.5);
            qLogoLetter(0.15 + eased * 0.3);
            qLogoFilter(`blur(${2 + eased * 14}px)`);
            qStageAlpha(1 - eased);
            qStageScale(1.06 + eased * 0.18);
            qStageFilter(`blur(${eased * 8}px)`);
            qContentAlpha(contentE);
            qContentY((1 - contentE) * 40);
            qContentScale(0.96 + contentE * 0.04);
            if (rP > 0.3 && !introTriggeredRef.current) {
              introTriggeredRef.current = true;
              setIntroFinished(true);
            }
          }
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      ctxGSAP.revert();
    };
  }, [ready, setIntroFinished]);

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
                  width: `${Math.min(100, (preloadCount / CRITICAL_FRAMES) * 100)}%`,
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
                willChange: "transform, letter-spacing, filter",
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
