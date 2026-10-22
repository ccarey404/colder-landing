"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

/** Fades and slides its content up 32px the first time it scrolls into view. */
export function Reveal({ delay = 0, className = "", children }: { delay?: number; className?: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={`will-change-transform ${className}`}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.reveal, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
