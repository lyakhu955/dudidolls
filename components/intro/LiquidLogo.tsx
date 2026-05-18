"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";

export interface LiquidLogoHandle {
  setProgress: (p: number) => void;
  setReveal: (r: number) => void;
  retriggerEntrance: () => void;
}

interface Props {
  className?: string;
  accent?: string;
  base?: string;
  fontFamily?: string;
}

const LiquidLogo = forwardRef<LiquidLogoHandle, Props>(function LiquidLogo(
  {
    className,
    accent = "#c87a4b",
    base = "#f4ede1",
    fontFamily = "var(--serif), Georgia, 'Times New Roman', serif",
  },
  ref
) {
  const mountRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uReveal: { value: number };
    uProgress: { value: number };
    uNoise: { value: number };
    uTex: { value: THREE.Texture };
    uAspect: { value: number };
  } | null>(null);
  const entranceStartRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textCanvas = document.createElement("canvas");
    const tctx = textCanvas.getContext("2d", { alpha: true })!;
    const tex = new THREE.CanvasTexture(textCanvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;

    const resolveColor = (val: string, fallback: string): string => {
      if (!val) return fallback;
      if (!val.includes("var(")) return val;
      const match = val.match(/var\(([^,)]+)/);
      if (!match) return fallback;
      const name = match[1].trim();
      const resolved = getComputedStyle(mount)
        .getPropertyValue(name)
        .trim();
      return resolved || fallback;
    };

    const drawText = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      const dpr = Math.min(window.devicePixelRatio, 2);
      textCanvas.width = Math.floor(w * dpr);
      textCanvas.height = Math.floor(h * dpr);
      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.scale(dpr, dpr);
      tctx.clearRect(0, 0, w, h);
      tctx.textAlign = "left";
      tctx.textBaseline = "middle";

      const fs = Math.min(w * 0.16, h * 0.72);
      const dudiFont = `400 ${fs}px ${fontFamily}`;
      const dollsFont = `italic 400 ${fs}px ${fontFamily}`;

      const baseColor = resolveColor(base, "#f4ede1");
      const accentColor = resolveColor(accent, "#c87a4b");

      tctx.font = dudiFont;
      const dudiW = tctx.measureText("dudi").width;
      tctx.font = dollsFont;
      const dollsW = tctx.measureText("dolls").width;
      const gap = -fs * 0.04;
      const totalW = dudiW + gap + dollsW;
      const startX = (w - totalW) / 2;
      const cy = h / 2;

      tctx.shadowColor = "rgba(0,0,0,0.55)";
      tctx.shadowBlur = fs * 0.18;
      tctx.shadowOffsetY = fs * 0.04;

      tctx.fillStyle = baseColor;
      tctx.font = dudiFont;
      tctx.fillText("dudi", startX, cy);

      tctx.fillStyle = accentColor;
      tctx.font = dollsFont;
      tctx.fillText("dolls", startX + dudiW + gap, cy);

      tex.needsUpdate = true;
    };

    const uniforms = {
      uTime: { value: 0 },
      uReveal: { value: reduced ? 1 : 0 },
      uProgress: { value: 0 },
      uNoise: { value: reduced ? 0 : 1 },
      uTex: { value: tex },
      uAspect: { value: 1 },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTex;
        uniform float uTime;
        uniform float uReveal;
        uniform float uProgress;
        uniform float uNoise;
        uniform float uAspect;

        float hash(vec2 p){
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float vnoise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0;
          float a = 0.5;
          for(int i = 0; i < 5; i++){
            v += a * vnoise(p);
            p *= 2.02;
            a *= 0.5;
          }
          return v;
        }

        void main(){
          vec2 uv = vUv;
          vec2 np = vec2(uv.x * uAspect, uv.y);

          // Two-layer fbm for organic liquid feel
          float n1 = fbm(np * 2.6 + vec2(uTime * 0.18, uTime * 0.11));
          float n2 = fbm(np * 4.4 - vec2(uTime * 0.09, uTime * 0.13));
          vec2 disp = vec2(n1 - 0.5, n2 - 0.5);

          // Distortion strength: high during entrance + outro, low when settled
          float entranceBoost = (1.0 - smoothstep(0.6, 1.0, uReveal));
          float outroBoost = smoothstep(0.0, 1.0, uProgress);
          float idle = 0.012;
          float strength = uNoise * (idle + entranceBoost * 0.10 + outroBoost * 0.18);

          uv += disp * strength;

          vec4 col = texture2D(uTex, uv);

          // Entrance liquid wipe (left → right) with noisy edge
          float edge = uReveal * 1.3 - 0.15;
          float noisy = vUv.x + (n1 - 0.5) * 0.20;
          float wipe = smoothstep(edge - 0.10, edge + 0.05, noisy);

          // Outro: dissolve via noise threshold
          float dissolve = 1.0 - smoothstep(0.0, 1.0,
            uProgress * 1.3 - (n1 * 0.7 + n2 * 0.3) * 0.55
          );

          float reveal = uReveal < 0.999 ? wipe : 1.0;
          float alpha = col.a * reveal * dissolve;

          // Subtle chromatic shimmer when distortion is high
          if (strength > 0.02) {
            float chroma = strength * 0.6;
            float r = texture2D(uTex, uv + vec2(chroma * 0.01, 0.0)).r;
            float b = texture2D(uTex, uv - vec2(chroma * 0.01, 0.0)).b;
            col.r = mix(col.r, r, 0.5);
            col.b = mix(col.b, b, 0.5);
          }

          gl_FragColor = vec4(col.rgb, alpha);
        }
      `,
    });

    const geo = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    const resize = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      renderer.setSize(w, h, false);
      uniforms.uAspect.value = w / h;
      drawText();
    };

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    resize();

    let rafId = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      uniforms.uTime.value += dt;

      if (
        entranceStartRef.current !== null &&
        uniforms.uReveal.value < 1
      ) {
        const t = (now - entranceStartRef.current) / 1800;
        const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
        uniforms.uReveal.value = Math.min(1, eased);
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      entranceStartRef.current = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      geo.dispose();
      material.dispose();
      tex.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [accent, base, fontFamily]);

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      if (uniformsRef.current) {
        uniformsRef.current.uProgress.value = Math.max(0, Math.min(1, p));
      }
    },
    setReveal: (r: number) => {
      if (uniformsRef.current) {
        uniformsRef.current.uReveal.value = Math.max(0, Math.min(1, r));
      }
    },
    retriggerEntrance: () => {
      if (uniformsRef.current) {
        uniformsRef.current.uReveal.value = 0;
        entranceStartRef.current = performance.now();
      }
    },
  }));

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
});

export default LiquidLogo;
