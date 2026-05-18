"use client";
import { useLayoutEffect, useRef, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/lib/store";

const TOTAL_FRAMES = 304;
const CRITICAL_FRAMES = 40; // unlock UX after these; rest loads in background
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

  // Progressive preload — unlock UX after critical batch, stream rest.
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

    for (let i = 1; i <= CRITICAL_FRAMES; i++) loadOne(i, "high");

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
      let img = framesRef.current[idx];
      // Fallback: if requested frame still streaming, draw nearest earlier loaded frame
      if (!(img && img.complete && img.naturalWidth > 0)) {
        for (let off = 1; off <= 12; off++) {
          const back = framesRef.current[idx - off];
          if (back && back.complete && back.naturalWidth > 0) {
            img = back;
            break;
          }
        }
      }
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
            gsap.set(logoInnerRef.current, {
              scale: 1,
              letterSpacing: "-0.03em",
              filter: "blur(0px)",
            });
            gsap.set(stageRef.current, {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
            });
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          }
          // Phase 2 (0.10 → 0.70): camera enters workshop
          else if (p < 0.70) {
            gsap.set(cueRef.current, { autoAlpha: 0 });
            gsap.set(logoRef.current, { autoAlpha: 1, y: 0 });
            gsap.set(logoInnerRef.current, {
              scale: 1,
              letterSpacing: "-0.03em",
              filter: "blur(0px)",
            });
            gsap.set(stageRef.current, {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
            });
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          }
          // Phase 3 (0.70 → 0.88): logo letter-spacing expands, scale ramps
          else if (p < 0.88) {
            const expandP = (p - 0.70) / 0.18;
            const ease = expandP * expandP;
            gsap.set(logoRef.current, { autoAlpha: 1, y: -ease * 30 });
            gsap.set(logoInnerRef.current, {
              scale: 1 + ease * 0.35,
              letterSpacing: `${-0.03 + ease * 0.18}em`,
              filter: `blur(${ease * 2}px)`,
            });
            gsap.set(stageRef.current, {
              autoAlpha: 1,
              scale: 1 + ease * 0.06,
              filter: "blur(0px)",
            });
            gsap.set(contentRef.current, { autoAlpha: 0 });
            if (introTriggeredRef.current) {
              introTriggeredRef.current = false;
              setIntroFinished(false);
            }
          }
          // Phase 4 (0.88 → 1.0): mask scale-up — logo explodes, stage dissolves into content
          else {
            const rP = (p - 0.88) / 0.12;
            const eased = 1 - Math.pow(1 - rP, 3);
            const contentE = rP * (2 - rP);
            gsap.set(logoRef.current, {
              autoAlpha: 1 - eased,
              y: -30 - eased * 50,
            });
            gsap.set(logoInnerRef.current, {
              scale: 1.35 + eased * 4.5,
              letterSpacing: `${0.15 + eased * 0.3}em`,
              filter: `blur(${2 + eased * 14}px)`,
            });
            gsap.set(stageRef.current, {
              autoAlpha: 1 - eased,
              scale: 1.06 + eased * 0.18,
              filter: `blur(${eased * 8}px)`,
            });
            gsap.set(contentRef.current, {
              autoAlpha: contentE,
              y: `${(1 - contentE) * 40}px`,
              scale: 0.96 + contentE * 0.04,
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
