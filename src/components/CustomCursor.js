"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only enable on non-touch devices
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);

    const updatePos = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el);
        setIsPointer(style.cursor === "pointer" || el.tagName === "BUTTON" || el.tagName === "A");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", updatePos);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePos);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          width: isClicking ? 8 : isPointer ? 0 : 10,
          height: isClicking ? 8 : isPointer ? 0 : 10,
          opacity: isHidden ? 0 : 1,
          backgroundColor: "#d4af37",
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full border"
        animate={{
          x: pos.x - (isPointer ? 22 : 18),
          y: pos.y - (isPointer ? 22 : 18),
          width: isPointer ? 44 : isClicking ? 28 : 36,
          height: isPointer ? 44 : isClicking ? 28 : 36,
          borderColor: isPointer ? "rgba(184,149,42,0.8)" : "rgba(212,175,55,0.5)",
          backgroundColor: isPointer ? "rgba(212,175,55,0.08)" : "rgba(0,0,0,0)",
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22, mass: 0.5 }}
      />
    </>
  );
}
