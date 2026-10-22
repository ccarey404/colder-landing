"use client";

import {
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { createContext, useContext, useEffect, useRef } from "react";
import { DURATION, EASE, useBlink, useLive } from "@/lib/motion";

type Pointer = { x: MotionValue<number>; y: MotionValue<number>; inside: MotionValue<number> };
const PointerContext = createContext<Pointer | null>(null);

/** Faces inside this area look at the cursor while it is over the area. */
export function LookArea({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const inside = useMotionValue(0);
  return (
    <PointerContext.Provider value={{ x, y, inside }}>
      <div
        className={className}
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
          inside.set(1);
        }}
        onPointerLeave={() => inside.set(0)}
      >
        {children}
      </div>
    </PointerContext.Provider>
  );
}

const SPRING = { stiffness: 260, damping: 20 };
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * An agent face from the app. Blinks at random, glances left, right or up now and then (eyes shift, the head
 * moves and squashes that way, then settles), follows the cursor inside its LookArea, bounces on hover and
 * bobs "hello" whenever `hello` changes. Completely still with reduced motion.
 */
export function Face({ color, className = "size-10", hello = 0 }: { color: string; className?: string; hello?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const pointer = useContext(PointerContext);
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  // Loops only run while the face is on screen and the tab is visible.
  const live = useLive(ref) && !reduce;
  const blink = useBlink(2000, 5000, live);

  const lookX = useSpring(0, SPRING);
  const lookY = useSpring(0, SPRING);
  const eyeX = useTransform(lookX, (v) => `${v * 18}%`);
  const eyeY = useTransform(lookY, (v) => `${v * 14}%`);
  const headX = useTransform(lookX, (v) => `${v * 6}%`);
  const headY = useTransform(lookY, (v) => `${v * 5}%`);
  const squashX = useTransform(lookX, (v) => 1 - Math.abs(v) * 0.07);
  const squashY = useTransform(lookY, (v) => 1 - Math.abs(v) * 0.06);

  // Glance on its own random timer, so no two faces are in sync.
  useEffect(() => {
    if (!live) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const tracking = () => pointer?.inside.get() === 1;

    const glanceLoop = () =>
      later(() => {
        if (!tracking()) {
          const [x, y] = [[-1, 0], [1, 0], [0, -1]][Math.floor(Math.random() * 3)];
          lookX.set(x);
          lookY.set(y);
          later(() => {
            if (!tracking()) {
              lookX.set(0);
              lookY.set(0);
            }
          }, 750);
        }
        glanceLoop();
      }, rand(2500, 5000));

    glanceLoop();
    return () => timers.forEach(clearTimeout);
  }, [live, pointer, lookX, lookY]);

  // Follow the cursor while it is inside the LookArea.
  useEffect(() => {
    if (reduce || !pointer) return;
    const follow = () => {
      if (pointer.inside.get() !== 1) {
        lookX.set(0);
        lookY.set(0);
        return;
      }
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = pointer.x.get() - (r.left + r.width / 2);
      const dy = pointer.y.get() - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / 220);
      lookX.set((dx / dist) * reach);
      lookY.set((dy / dist) * reach);
    };
    const subs = [pointer.x.on("change", follow), pointer.y.on("change", follow), pointer.inside.on("change", follow)];
    return () => subs.forEach((unsub) => unsub());
  }, [reduce, pointer, lookX, lookY]);

  // "Hello" bob whenever the agent is selected.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce || !scope.current) return;
    animate(scope.current, { y: ["0%", "-16%", "0%", "-6%", "0%"], rotate: [0, -7, 6, 0, 0] }, { duration: DURATION.reveal, ease: EASE });
  }, [hello, reduce, animate, scope]);

  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={`relative inline-block shrink-0 ${className}`}
      whileHover={reduce ? undefined : { y: "-10%", transition: { type: "spring", stiffness: 500, damping: 12 } }}
    >
      <span ref={scope} className="absolute inset-0 block">
        {/* Flat, solid head: no gradient, shadow or outline. */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color, x: reduce ? 0 : headX, y: reduce ? 0 : headY, scaleX: reduce ? 1 : squashX, scaleY: reduce ? 1 : squashY }}
        >
          <motion.span className="absolute inset-0" style={{ x: reduce ? 0 : eyeX, y: reduce ? 0 : eyeY }}>
            {EYES.map((eye) => (
              <span key={eye.left} className="absolute h-[22%] w-[12%] -translate-x-1/2 -translate-y-1/2" style={{ left: eye.left, top: eye.top }}>
                {/* Both eyes lean the same way, like the app's faces. */}
                <span className="block size-full -rotate-[9deg]">
                  <motion.span className="block size-full rounded-full bg-eye" animate={blink} />
                </span>
              </span>
            ))}
          </motion.span>
        </motion.span>
      </span>
    </motion.span>
  );
}

// Measured from the app: eye centers 24% of the face apart, near the middle, right eye slightly higher.
const EYES = [
  { left: "38%", top: "51%" },
  { left: "62%", top: "47%" },
];

export const agentColors = { caller: "#535df5", mailer: "#e04691", chatter: "#935df5" };
