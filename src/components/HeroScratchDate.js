"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function HeroScratchDate({ text, theme = "dark" }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const revealedRef = useRef(false);

  // Theme colors
  const overlayColors = {
    dark: ["#c69320", "#f5d67b", "#c69320"], // Gold for bride
    light: ["#5a0008", "#b31325", "#5a0008"], // Crimson for groom (Wait, groom is light theme, crimson is for groom? Let me check)
  };
  
  // Gold overlay for bride theme, crimson for groom
  const currentColors = theme === "bride"
    ? ["#c69320", "#f9e5ae", "#d88c9f", "#f9e5ae", "#c69320"]  // rose-gold
    : ["#5a0008", "#b31325", "#5a0008"];  // crimson

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawOverlay(ctx, canvas);
    };

    const drawOverlay = (ctx, canvas) => {
      if (revealedRef.current) return;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, currentColors[0]);
      gradient.addColorStop(0.5, currentColors[1]);
      gradient.addColorStop(1, currentColors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add "Scratch Here" text
      ctx.font = "bold 18px 'Cinzel', serif";
      ctx.fillStyle = theme === "bride" ? "rgba(253,251,247,0.92)" : "rgba(253, 251, 247, 0.8)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✦  Scratch to Reveal Date  ✦", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [theme]);

  const scratch = (e) => {
    if (!isDrawing.current || revealedRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();

    checkReveal(ctx, canvas, e);
  };

  const checkReveal = (ctx, canvas, e) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    // Check every 4th pixel (alpha channel) with a step for performance
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 128) transparent++;
    }

    // Total pixels checked
    const totalChecks = pixels.length / 16;
    const pct = Math.round((transparent / totalChecks) * 100);
    setScratchPercent(pct);

    if (pct > 25 && !revealedRef.current) {
      revealedRef.current = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsRevealed(true);

      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate(50);

      // Confetti logic based on touch position
      let clientX, clientY;
      if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        clientX = e.clientX || window.innerWidth / 2;
        clientY = e.clientY || window.innerHeight / 2;
      }
      
      const origin = {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight
      };

      confetti({
        particleCount: 50,
        spread: 60,
        origin,
        colors: ["#d4af37", "#f7d977", "#7b0915", "#fff"],
        scalar: 0.8,
        disableForReducedMotion: true
      });
    }
  };

  const startScratching = (e) => {
    isDrawing.current = true;
    scratch(e);
  };

  const stopScratching = () => {
    isDrawing.current = false;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md border border-[#d4af37]/20 cursor-crosshair touch-none group">
      
      {/* Date Text (hidden behind canvas) */}
      <motion.p
        className={`absolute whitespace-nowrap font-serif-royal text-2xl md:text-4xl tracking-[0.1em] font-bold z-10 select-none ${
          theme === "bride" ? "text-[#7b2c45]" : "text-[#8b0a16] drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
        }`}
      >
        {text}
      </motion.p>

      {/* Scratch Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full z-20 ${isRevealed ? 'pointer-events-none' : ''}`}
        onMouseDown={startScratching}
        onMouseMove={scratch}
        onMouseUp={stopScratching}
        onMouseLeave={stopScratching}
        onTouchStart={startScratching}
        onTouchMove={scratch}
        onTouchEnd={stopScratching}
      />

      {/* Pulse Hint (disappears on interaction) */}
      <AnimatePresence>
        {!isRevealed && scratchPercent === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-30 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle shine sweep */}
      {!isRevealed && (
        <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none z-30">
          <motion.div
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12`}
          />
        </div>
      )}
    </div>
  );
}
