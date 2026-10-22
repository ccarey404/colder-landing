"use client";

import { useAnimationControls, useInView, type TargetAndTransition } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/*
 * One motion vocabulary for the whole site: a single easing curve and three durations.
 * Movement stays small (≤40px) and nothing runs longer than 0.8s.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  /** Small UI: presses, pills, text swaps. */
  ui: 0.2,
  /** Cards, rows and panels. */
  card: 0.4,
  /** Big scroll reveals. */
  reveal: 0.6,
} as const;

/** Scroll reveals fire once, a little before the element is fully in view. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** False while the browser tab is hidden. */
export function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

/** True while `ref` is on screen and the tab is visible: loops run only then and resume afterwards. */
export function useLive(ref: RefObject<Element | null>, amount = 0.1) {
  const inView = useInView(ref, { amount });
  const page = usePageVisible();
  return inView && page;
}

// One natural blink: quick close, slightly slower open.
const BLINK: TargetAndTransition = {
  scaleY: [1, 0.1, 1],
  transition: { duration: 0.28, times: [0, 0.4, 1], ease: ["easeIn", "easeOut"] },
};

/**
 * Blinks at random intervals between `min` and `max` ms while `live`, with an occasional (1 in 5) soft
 * double blink. Bind the returned controls to the eyes with `animate={controls}`.
 */
export function useBlink(min: number, max: number, live: boolean) {
  const controls = useAnimationControls();
  useEffect(() => {
    if (!live) return;
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;
    const next = () => {
      timer = setTimeout(async () => {
        await controls.start(BLINK);
        if (!stopped && Math.random() < 0.2) {
          await new Promise((r) => setTimeout(r, 90));
          if (!stopped) await controls.start(BLINK);
        }
        if (!stopped) next();
      }, min + Math.random() * (max - min));
    };
    next();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [controls, min, max, live]);
  return controls;
}
