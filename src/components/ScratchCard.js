"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, MapPin, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ─── Individual Scratch Card ────────────────────────────────────────────────
function ScratchTile({ event, index, onFullyScratched }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const isDrawing = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const lastPos = useRef(null);
  const revealedRef = useRef(false);

  // ── Load scratch overlay onto canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      // Deep crimson + golden gradient overlay
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#6a0010");
      grad.addColorStop(0.45, "#8c0a1c");
      grad.addColorStop(1, "#5a0008");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sheen stripe
      const sheen = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      sheen.addColorStop(0, "rgba(212,175,55,0)");
      sheen.addColorStop(0.5, "rgba(212,175,55,0.18)");
      sheen.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // "Scratch Here" text
      ctx.fillStyle = "rgba(212,175,55,0.80)";
      ctx.font = `bold ${Math.max(13, canvas.width * 0.06)}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✦ Scratch to Reveal ✦", canvas.width / 2, canvas.height / 2 - 14);

      ctx.font = `${Math.max(10, canvas.width * 0.045)}px serif`;
      ctx.fillStyle = "rgba(248,231,184,0.55)";
      ctx.fillText("~ Your Date Awaits ~", canvas.width / 2, canvas.height / 2 + 16);
    };

    draw();
  }, []);

  // ── Pointer helpers ──
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback((e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const pos = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";

    // Draw a soft eraser stroke
    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineWidth = 44;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // Small circle at cursor
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
    ctx.fill();
    lastPos.current = pos;

    // ── Measure how much is scratched ──
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 30) transparent++;
    }
    const pct = Math.round((transparent / (canvas.width * canvas.height)) * 100);
    setScratchPercent(pct);

    if (pct > 30 && !revealedRef.current) {
      revealedRef.current = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsRevealed(true);
      // Haptic feedback on mobile
      if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
      // Confetti burst at the actual card position
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        onFullyScratched(index, {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        });
      } else {
        onFullyScratched(index, { x: 0.5, y: 0.6 });
      }
    }
  }, [index, onFullyScratched]);

  const startScratch = useCallback((e) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = null;
    setHasStarted(true);
  }, []);

  const endScratch = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Card reveal content */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        style={{ background: "linear-gradient(135deg,#fff9ee 0%,#fdf3d8 50%,#fff9ee 100%)" }}
      >
        {/* Ornamental corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#d4af37]/50 rounded-tl-xl pointer-events-none z-10" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#d4af37]/50 rounded-tr-xl pointer-events-none z-10" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#d4af37]/50 rounded-bl-xl pointer-events-none z-10" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#d4af37]/50 rounded-br-xl pointer-events-none z-10" />

        {/* Revealed content */}
        <div className="p-6 md:p-8">
          {/* Event number badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8c0a1c]/60 font-semibold">Event {String(index + 1).padStart(2, "0")}</span>
            {isRevealed && (
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 14 }}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40"
              >
                <Sparkles size={11} className="text-[#d4af37]" />
                <span className="text-[9px] uppercase tracking-widest text-[#8c0a1c] font-bold">Revealed!</span>
              </motion.div>
            )}
          </div>

          {/* Event image */}
          <div className="relative mb-5 rounded-2xl overflow-hidden h-40 md:h-48">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3b0108]/70 via-transparent to-transparent" />
          </div>

          {/* Event name */}
          <h3 className="font-calligraphy-royal text-2xl md:text-3xl text-[#7b0915] mb-4">{event.name}</h3>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#5a0310]/80">
              <Calendar size={14} className="text-[#d4af37] shrink-0" />
              <span className="text-sm font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-[#5a0310]/80">
              <MapPin size={14} className="text-[#d4af37] shrink-0" />
              <span className="text-sm">{event.venue}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2 text-[#5a0310]/80">
                <Star size={14} className="text-[#d4af37] shrink-0" />
                <span className="text-sm">{event.time}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

          <p className="text-xs leading-6 text-[#5a0310]/60 italic">{event.desc}</p>
        </div>

        {/* Scratch overlay canvas */}
        <AnimatePresence>
          {!isRevealed && (
            <>
              <motion.canvas
                ref={canvasRef}
                width={600}
                height={500}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="absolute inset-0 w-full h-full rounded-3xl touch-none z-20"
                onMouseDown={startScratch}
                onMouseMove={scratch}
                onMouseUp={endScratch}
                onMouseLeave={endScratch}
                onTouchStart={startScratch}
                onTouchMove={scratch}
                onTouchEnd={endScratch}
              />
              {/* Shimmer hint sweep — pointer-events-none */}
              {!hasStarted && (
                <div className="absolute inset-0 overflow-hidden rounded-3xl z-30 pointer-events-none">
                  <div className="animate-scratch-hint absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              )}
              {/* Pulsing finger indicator */}
              {!hasStarted && (
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-1"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-2xl select-none">👆</span>
                  <span className="text-[10px] text-[#f8e7b8]/80 uppercase tracking-widest font-semibold">Scratch me</span>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Progress hint */}
        {!isRevealed && scratchPercent > 5 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#d4af37]/30">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#d4af37] to-[#f7d977] rounded-full"
                    animate={{ width: `${scratchPercent}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] text-[#f8e7b8]">{scratchPercent}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function ScratchCardSection() {
  const { t } = useLanguage();
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const [particles, setParticles] = useState([]);
  const totalRef = useRef(0);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }).map(() => ({
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 5 + 5,
      }))
    );
  }, []);

  // Build event list from language context (same as WeddingEvents)
  const events = t?.events?.list ?? [];
  totalRef.current = events.length;

  const handleFullyScratched = useCallback((index, origin = { x: 0.5, y: 0.6 }) => {
    setRevealedCount((prev) => {
      const next = prev + 1;

      // Burst at the actual card position
      confetti({
        particleCount: 100,
        spread: 65,
        origin,
        colors: ["#d4af37", "#f7d977", "#7b0915", "#fff", "#f9e5ae"],
        scalar: 1.1,
      });
      // Second burst with slight delay for layered effect
      setTimeout(() => confetti({
        particleCount: 50,
        spread: 40,
        origin: { x: origin.x, y: origin.y + 0.05 },
        colors: ["#d4af37", "#ff6b9d", "#fff"],
        scalar: 0.8,
        startVelocity: 20,
      }), 150);

      if (next >= totalRef.current) {
        setTimeout(() => {
          confetti({ particleCount: 250, spread: 130, startVelocity: 50,
            origin: { x: 0.5, y: 0.5 },
            colors: ["#d4af37", "#f7d977", "#7b0915", "#fff", "#f9e5ae", "#ff6b9d"],
            scalar: 1.3 });
        }, 400);
        setAllRevealed(true);
      }

      return next;
    });
  }, []);

  if (!events.length) return null;

  return (
    <section
      id="scratch-reveal"
      className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-[#250104] via-[#3c030a] to-[#250104]"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#d4af37]/20"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p className="text-[#d4af37] tracking-[0.45em] uppercase text-xs mb-3">✦ Interactive ✦</p>
          <h2 className="font-calligraphy-royal text-4xl md:text-6xl text-[#f5d67b] drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]">
            Scratch &amp; Reveal
          </h2>
          <p className="mt-4 text-[#f8edd2]/70 text-sm md:text-base max-w-xl mx-auto leading-7">
            Our special dates are hidden just for you — scratch each card to uncover the magic moments we&apos;d love to share with you.
          </p>

          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="w-14 h-px bg-[#d4af37]/40" />
            <Sparkles size={16} className="text-[#d4af37]" />
            <div className="w-14 h-px bg-[#d4af37]/40" />
          </div>

          {/* Progress counter */}
          <motion.div
            className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 backdrop-blur-sm"
            animate={{ opacity: 1 }}
          >
            <span className="text-[#d4af37] text-sm font-semibold">{revealedCount}</span>
            <span className="text-[#f8edd2]/50 text-xs uppercase tracking-widest">of {events.length} Revealed</span>
            <div className="w-20 h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#f7d977]"
                animate={{ width: `${(revealedCount / Math.max(events.length, 1)) * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <ScratchTile
              key={i}
              event={event}
              index={i}
              onFullyScratched={handleFullyScratched}
            />
          ))}
        </div>

        {/* All Revealed Celebration Banner */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="mt-16 text-center"
            >
              <div className="inline-block px-10 py-8 rounded-[32px] border-2 border-[#d4af37]/50 bg-gradient-to-br from-[#7b0715]/80 via-[#5a0410]/90 to-[#2f0107]/80 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <p className="text-[#d4af37] text-xs uppercase tracking-[0.5em] mb-3">You Found Them All!</p>
                <h3 className="font-calligraphy-royal text-3xl md:text-5xl text-[#f5d67b]">
                  We Can&apos;t Wait to See You ✨
                </h3>
                <p className="mt-4 text-[#f8edd2]/70 text-sm max-w-md mx-auto leading-7">
                  All dates have been revealed. Mark your calendar and join us for the celebration of a lifetime!
                </p>
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-px bg-[#d4af37]/40" />
                    <span className="text-[#d4af37] text-lg">♥</span>
                    <div className="w-12 h-px bg-[#d4af37]/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
