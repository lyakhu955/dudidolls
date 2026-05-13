import { forwardRef } from "react";

const Scissors = forwardRef<SVGSVGElement>(function Scissors(_, ref) {
  return (
    <svg
      ref={ref}
      className="scissors-svg"
      viewBox="0 0 64 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* tip point (top, where it cuts) */}
      <path d="M32 2 L30 18 L34 18 Z" fill="#9aa3ad" />

      {/* top blade */}
      <g className="blade top">
        <path
          d="M30 18 L31.5 70 L24 78 L21.5 75 L28 18 Z"
          fill="url(#bladeGrad)"
          stroke="#3d4751"
          strokeWidth="0.5"
        />
        {/* shine */}
        <path d="M28.5 22 L29.5 60" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none" />
      </g>

      {/* bottom blade */}
      <g className="blade bot">
        <path
          d="M34 18 L32.5 70 L40 78 L42.5 75 L36 18 Z"
          fill="url(#bladeGrad)"
          stroke="#3d4751"
          strokeWidth="0.5"
        />
        <path d="M35.5 22 L34.5 60" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" fill="none" />
      </g>

      {/* pivot screw */}
      <circle cx="32" cy="70" r="3.5" fill="#2a3138" stroke="#1a1f24" strokeWidth="0.5" />
      <circle cx="32" cy="70" r="1.2" fill="#0f1316" />

      {/* handles - rings */}
      <ellipse
        cx="22"
        cy="100"
        rx="11"
        ry="14"
        fill="none"
        stroke="#1c1916"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="42"
        cy="100"
        rx="11"
        ry="14"
        fill="none"
        stroke="#1c1916"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* handle connectors */}
      <path d="M32 70 L22 88" stroke="#1c1916" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 70 L42 88" stroke="#1c1916" strokeWidth="3" strokeLinecap="round" />

      <defs>
        <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cdd5dc" />
          <stop offset="40%" stopColor="#eaeef1" />
          <stop offset="100%" stopColor="#7d8893" />
        </linearGradient>
      </defs>
    </svg>
  );
});

export default Scissors;
