"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline scroll progress bar pinned to the top of the page in the brand
 * accent color. Uses a spring for a smooth, premium feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[60] pointer-events-none"
    />
  );
}
