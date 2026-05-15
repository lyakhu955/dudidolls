"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform float uColorMix;
  uniform float uRipple;
  uniform float uLid;
  uniform float uZoom;
  uniform float uDissolve;
  uniform vec2  uRes;

  // 4 Blythe pull-string iris colors
  const vec3 C1 = vec3(0.227, 0.490, 0.847); // blue
  const vec3 C2 = vec3(0.310, 0.659, 0.420); // green
  const vec3 C3 = vec3(0.827, 0.420, 0.627); // pink
  const vec3 C4 = vec3(0.831, 0.576, 0.251); // amber

  // hash + noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  vec3 irisPalette(float t) {
    // t in [0,1], cycles through 4 colors with smooth lerp
    float k = clamp(t, 0.0, 1.0) * 3.0;
    vec3 col;
    if (k < 1.0)      col = mix(C1, C2, smoothstep(0.0, 1.0, k));
    else if (k < 2.0) col = mix(C2, C3, smoothstep(0.0, 1.0, k - 1.0));
    else              col = mix(C3, C4, smoothstep(0.0, 1.0, k - 2.0));
    return col;
  }

  void main() {
    // aspect-correct centered UV
    vec2 uv = vUv - 0.5;
    uv.x *= uRes.x / uRes.y;

    // camera zoom (1 close → 0.35 far)
    uv /= max(uZoom, 0.05);

    // ripple displacement
    float r = length(uv);
    float ripple = sin(r * 28.0 - uTime * 1.8) * uRipple;
    uv += normalize(uv + 1e-6) * ripple * 0.06;

    r = length(uv);
    float ang = atan(uv.y, uv.x);

    // ---------- iris construction ----------
    // pupil
    float pupil = smoothstep(0.07, 0.05, r);

    // iris band
    float irisMask = smoothstep(0.42, 0.40, r) - smoothstep(0.10, 0.08, r);

    // radial striations
    float strips = 0.5 + 0.5 * sin(ang * 36.0 + noise(vec2(r * 8.0, ang * 2.0)) * 6.0);
    strips = pow(strips, 1.6);

    // base iris color (animated)
    vec3 irisCol = irisPalette(uColorMix);
    irisCol = mix(irisCol * 0.55, irisCol * 1.25, strips);

    // limbal ring (dark outer edge)
    float limb = smoothstep(0.42, 0.38, r) - smoothstep(0.40, 0.36, r);
    irisCol = mix(irisCol, vec3(0.06, 0.04, 0.05), limb * 0.85);

    // specular highlight (offset upper-left)
    vec2 hl = uv - vec2(-0.10, 0.13);
    float spec = smoothstep(0.085, 0.04, length(hl));

    // sclera (cream white) outside iris
    float sclera = smoothstep(0.44, 0.46, r);
    vec3 scleraCol = vec3(0.96, 0.93, 0.86);

    vec3 col = mix(irisCol, vec3(0.02, 0.01, 0.02), pupil);
    col = mix(col, scleraCol, sclera);
    col += spec * vec3(1.0, 0.97, 0.92) * 0.9 * (1.0 - sclera);

    // ---------- eyelid mask ----------
    // upper lid descends as uLid grows (0 = open, 1 = closed)
    float lidY = mix(0.6, -0.6, uLid); // open: lid above frame; closed: covers
    float lid = smoothstep(lidY - 0.02, lidY + 0.02, uv.y);
    // bottom lid
    float bLid = smoothstep(-lidY - 0.02, -lidY + 0.02, -uv.y);
    float lidMask = max(lid, bLid);
    vec3 lidCol = vec3(0.078, 0.067, 0.055);
    col = mix(col, lidCol, lidMask);

    // ---------- vignette / background ----------
    float vig = smoothstep(1.3, 0.2, length(vUv - 0.5));
    col = mix(col, col * 0.35, 1.0 - vig);

    // background fill behind everything (cream)
    vec3 bg = vec3(0.957, 0.929, 0.882);
    float frame = smoothstep(0.65, 0.55, r);
    col = mix(bg, col, frame);

    // ---------- dissolve to noise ----------
    float n = noise(vUv * vec2(uRes.x, uRes.y) * 0.012 + uTime * 0.3);
    col = mix(col, bg + n * 0.04, smoothstep(0.0, 1.0, uDissolve));

    // film grain
    float grain = (hash(vUv * uRes + uTime) - 0.5) * 0.04;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroIntroEye({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uScroll: { value: number };
    uColorMix: { value: number };
    uRipple: { value: number };
    uLid: { value: number };
    uZoom: { value: number };
    uDissolve: { value: number };
    uRes: { value: THREE.Vector2 };
  } | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (stageRef.current) stageRef.current.style.display = "none";
      gsap.set(contentRef.current, { autoAlpha: 1 });
      return;
    }

    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorMix: { value: 0 },
      uRipple: { value: 0 },
      uLid: { value: 1 },
      uZoom: { value: 1 },
      uDissolve: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    gsap.set(contentRef.current, { autoAlpha: 0 });

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=360vh",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;
          uniforms.uScroll.value = p;

          // cue fade 0-0.06
          if (cueRef.current) {
            const cueAlpha = p < 0.06 ? 1 - p / 0.06 : 0;
            gsap.set(cueRef.current, { autoAlpha: cueAlpha });
          }

          // Phase 1 — lid open (0 → 0.18)
          if (p < 0.18) {
            uniforms.uLid.value = 1 - p / 0.18;
            uniforms.uColorMix.value = 0;
            uniforms.uRipple.value = 0;
            uniforms.uZoom.value = 1;
          }
          // Phase 2 — iris color cycle (0.18 → 0.50)
          else if (p < 0.5) {
            const k = (p - 0.18) / 0.32;
            uniforms.uLid.value = 0;
            uniforms.uColorMix.value = k * 0.95;
            uniforms.uRipple.value = k * 0.04;
            uniforms.uZoom.value = 1;
          }
          // Phase 3 — zoom out + ripple (0.50 → 0.78)
          else if (p < 0.78) {
            const k = (p - 0.5) / 0.28;
            const e = k * (2 - k);
            uniforms.uLid.value = 0;
            uniforms.uColorMix.value = 0.95 + e * 0.05;
            uniforms.uRipple.value = 0.04 + e * 0.11;
            uniforms.uZoom.value = 1 - e * 0.65;
          }
          // Phase 4 — dissolve + content reveal (0.78 → 1.0)
          else {
            const k = (p - 0.78) / 0.22;
            const e = k * k;
            uniforms.uDissolve.value = e;
            uniforms.uZoom.value = 0.35 - e * 0.1;
            gsap.set(stageRef.current, { autoAlpha: 1 - e });
            gsap.set(contentRef.current, {
              autoAlpha: e,
              y: `${(1 - e) * 36}px`,
            });
          }
        },
      });

      return () => st.kill();
    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.revert();
      plane.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="intro-eye-section">
      <div ref={contentRef} className="intro-eye-content">
        {children}
      </div>
      <div ref={stageRef} className="intro-eye-stage" aria-hidden="true">
        <canvas ref={canvasRef} className="intro-eye-canvas" />
        <div className="intro-eye-overlay">
          <span className="intro-eye-kicker">capitolo 01</span>
          <h2 className="intro-eye-title">
            <span>uno</span>
            <span className="it">sguardo</span>
            <span>che cambia.</span>
          </h2>
        </div>
        <div ref={cueRef} className="intro-eye-cue">
          <span>SCORRI · APRI L'OCCHIO</span>
          <span className="intro-eye-cue-line" />
        </div>
      </div>
    </section>
  );
}
