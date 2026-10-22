"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";
import { Screenshot, type Shot } from "./screenshot";

/** The hero dashboard: rises in on load, starting slightly tilted and flattening as you scroll. */
export function HeroShots({ main, mainMock }: { main: Shot | null; mainMock: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 500], [6, 0]);

  return (
    <div className="[perspective:1400px]">
      <motion.div
        data-reveal
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.reveal, ease: EASE }}
      >
        <motion.div data-reveal className="will-change-transform" style={reduce ? undefined : { rotateX, transformOrigin: "50% 0%" }}>
          <Screenshot
            shot={main}
            mock={mainMock}
            file="hero.png"
            hint="The Home dashboard."
            alt="The Colder home dashboard"
            sizes="(min-width: 1280px) 1100px, 92vw"
            priority
            className="h-auto w-full rounded-xl shadow-[0_24px_60px_-24px_rgb(31_32_35/0.3)] ring-1 ring-ink/5"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
