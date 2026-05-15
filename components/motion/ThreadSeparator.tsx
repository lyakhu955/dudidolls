"use client";
import { motion } from "motion/react";
import { useId } from "react";

const W = 800;
const H = 70;
const AMP = 15;
const CYCLES = 3;

function makePath(phase: number, n = 400): string {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * W;
    const y = H / 2 + AMP * Math.sin((i / n) * Math.PI * 2 * CYCLES + phase);
    d += i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : ` L${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return d;
}

const THREADS = [
  {
    phase: 0,
    base: "#1c1a18",
    shimmer: ["#1c1a18", "#8b6c52", "#1c1a18"] as [string, string, string],
    strokeWidth: 6,
    duration: 3.2,
    delay: 0,
  },
  {
    phase: (Math.PI * 2) / 3,
    base: "#b85c44",
    shimmer: ["#b85c44", "#f2a27e", "#b85c44"] as [string, string, string],
    strokeWidth: 6,
    duration: 4.1,
    delay: 0.9,
  },
  {
    phase: (Math.PI * 4) / 3,
    base: "#8a6d52",
    shimmer: ["#8a6d52", "#d4b48a", "#8a6d52"] as [string, string, string],
    strokeWidth: 5,
    duration: 5.0,
    delay: 1.8,
  },
];

const PATHS = THREADS.map((t) => makePath(t.phase));

export default function ThreadSeparator() {
  const uid = useId().replace(/:/g, "");

  return (
    <div aria-hidden="true" style={{ width: "100%", padding: "8px 0 20px" }}>
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <filter id={`${uid}-shadow`} x="-10%" y="-60%" width="120%" height="220%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.18" />
          </filter>
        </defs>

        {THREADS.map((t, idx) => {
          const gid = `${uid}-g${idx}`;
          return (
            <g key={idx} filter={`url(#${uid}-shadow)`}>
              {/* Base thread body */}
              <path
                d={PATHS[idx]}
                stroke={t.base}
                strokeOpacity={0.25}
                strokeWidth={t.strokeWidth}
                strokeLinecap="round"
              />
              {/* Animated shimmer */}
              <path
                d={PATHS[idx]}
                stroke={`url(#${gid})`}
                strokeWidth={t.strokeWidth}
                strokeLinecap="round"
              />
              <defs>
                <motion.linearGradient
                  id={gid}
                  gradientUnits="userSpaceOnUse"
                  animate={{
                    x1: [0, W * 2],
                    x2: [0, W],
                  }}
                  transition={{
                    duration: t.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: t.delay,
                  }}
                >
                  <stop stopColor={t.shimmer[0]} stopOpacity={0} />
                  <stop offset="0.5" stopColor={t.shimmer[1]} />
                  <stop offset="1" stopColor={t.shimmer[2]} stopOpacity={0} />
                </motion.linearGradient>
              </defs>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
