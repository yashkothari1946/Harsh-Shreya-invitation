"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none"
        aria-hidden="true"
      >
        {/* Gradient fill */}
        <div className="w-full h-full bg-gradient-to-r from-[#d4af37] via-[#f7d977] to-[#B8952A]" />
      </motion.div>

      {/* Glowing trailing dot */}
      <motion.div
        style={{ left: useSpring(scrollYProgress, { stiffness: 120, damping: 30 }).get ? undefined : scaleX }}
        className="fixed top-0 right-0 z-[9999] pointer-events-none"
      >
        <motion.div
          style={{ scaleX, transformOrigin: "0%" }}
          className="w-full flex justify-end"
          aria-hidden="true"
        >
        </motion.div>
      </motion.div>
    </>
  );
}
