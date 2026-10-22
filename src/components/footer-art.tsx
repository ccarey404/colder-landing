"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useBlink, useLive } from "@/lib/motion";

// The agent face as 1px outlines: a large head arc and two leaning eyes, cropped by the divider below.
const CROP = 340;
const EYES = [
  { x: 432, y: 214 },
  { x: 672, y: 196 },
];

export function FooterArt() {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const blink = useBlink(7000, 12000, useLive(ref) && !reduce);

  return (
    <svg ref={ref} viewBox={`0 0 1200 ${CROP}`} className="block h-auto w-full" fill="none" aria-hidden>
      <circle cx="600" cy="430" r="430" stroke="var(--color-line-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {EYES.map((e) => (
        <g key={e.x} transform={`rotate(-9 ${e.x + 48} ${e.y + 110})`}>
          <motion.rect
            x={e.x}
            y={e.y}
            width="96"
            height="220"
            rx="48"
            stroke="var(--color-line-strong)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            // Close toward the divider: the lid comes down to the eye's visible bottom edge.
            style={{ transformBox: "fill-box", transformOrigin: `50% ${CROP - e.y}px` }}
            animate={blink}
          />
        </g>
      ))}
    </svg>
  );
}
