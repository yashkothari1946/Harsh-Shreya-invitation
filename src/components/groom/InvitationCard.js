"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GroomInvitationCard() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const scrollLockRef = useRef(false);
  const cardsAreaRef = useRef(null);
  const touchStartY = useRef(0);

  // Lock body scroll when card is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Ensure we are viewing the section
      document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const cards = [
    lang === "hi" ? "/ganpatisthaapna.png" : "/card.jpg",
    "/haldiceremony.jpg",
    "/sangeet.jpg",
    "/weddingceremony.jpg",
    "/receptionnn.jpg",
  ];

  useEffect(() => {
    setDecorations(Array.from({ length: 12 }, () => ({ left: Math.random() * 80 + 10, top: Math.random() * 80 + 10 })));
    setParticles(Array.from({ length: 30 }, () => ({
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })));
  }, []);

  const flipAudioRef = useRef(null);
  useEffect(() => {
    if (isOpen && flipAudioRef.current) {
      flipAudioRef.current.currentTime = 0;
      flipAudioRef.current.play().catch(() => {});
    }
  }, [currentCard, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const cardsArea = cardsAreaRef.current;
    if (!cardsArea) return;

    const handleWheel = (e) => {
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;
      if (goingDown && currentCard >= cards.length - 1) return;
      if (goingUp && currentCard <= 0) return;
      e.preventDefault();
      e.stopPropagation();
      if (scrollLockRef.current) return;
      scrollLockRef.current = true;
      if (goingDown) setCurrentCard((p) => p + 1);
      if (goingUp) setCurrentCard((p) => p - 1);
      setTimeout(() => { scrollLockRef.current = false; }, 1400);
    };

    cardsArea.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      cardsArea.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, currentCard, cards.length]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!isOpen || scrollLockRef.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    // Ignore small swipes
    if (Math.abs(diff) < 40) return;
    
    const goingDown = diff > 0;
    const goingUp = diff < 0;

    const canGoNext = currentCard < cards.length - 1;
    const canGoPrev = currentCard > 0;

    if (goingDown && !canGoNext) return;
    if (goingUp && !canGoPrev) return;

    scrollLockRef.current = true;
    if (goingDown) setCurrentCard((prev) => prev + 1);
    if (goingUp) setCurrentCard((prev) => prev - 1);

    setTimeout(() => { scrollLockRef.current = false; }, 800);
  };

  const handleCardWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollLockRef.current) return;
    const goingDown = e.deltaY > 0;
    const goingUp = e.deltaY < 0;
    if (goingDown && currentCard >= cards.length - 1) return;
    if (goingUp && currentCard <= 0) return;
    scrollLockRef.current = true;
    if (goingDown) setCurrentCard((p) => p + 1);
    if (goingUp) setCurrentCard((p) => p - 1);
    setTimeout(() => { scrollLockRef.current = false; }, 1400);
  };

  return (
    <section
      id="invitation"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#FEFCF7] via-[#F5F0E8] to-[#FEFCF7] py-16 sm:py-20 md:py-24 px-4 flex items-center justify-center"
    >
      <audio ref={flipAudioRef} src="/Aaj Sajeya _ Wedding Song.mp3" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,149,42,0.06),transparent_70%)] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#B8952A]/20"
            style={{ width: `${p.width}px`, height: `${p.height}px`, left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [-30, 30, -30], opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-[#B8952A] tracking-[0.45em] uppercase text-sm">ॐ</p>
          <h2 className="mt-3 font-calligraphy-royal text-4xl md:text-6xl text-[#1B2340]">
            ॥ श्री गणेशाय नमः ॥
          </h2>
          <div className="flex justify-center items-center gap-3 mt-5">
            <div className="w-14 h-px bg-[#B8952A]/40" />
            <Heart size={15} className="fill-[#B8952A] text-[#B8952A]" />
            <div className="w-14 h-px bg-[#B8952A]/40" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ── CLOSED CARD ── */
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 50 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              onClick={() => setIsOpen(true)}
              className="relative mx-auto w-[96vw] max-w-[420px] sm:max-w-[520px] md:max-w-[900px] h-[540px] rounded-[40px] overflow-hidden cursor-pointer border-[3px] border-[#B8952A]/40 bg-gradient-to-br from-white via-[#FDF9EF] to-[#F5EED8] shadow-[0_30px_80px_rgba(184,149,42,0.18)]"
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/pattern.png')]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#B8952A]/5" />

              {/* Shine sweep — pointer-events-none */}
              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "140%" }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8952A]/8 to-transparent skew-x-[-25deg] pointer-events-none"
              />

              {/* Inner border frames */}
              <div className="absolute inset-5 rounded-[30px] border border-[#B8952A]/30" />
              <div className="absolute inset-8 rounded-[26px] border border-[#B8952A]/15" />

              {/* Corner accents */}
              <div className="absolute top-5 left-5 w-24 h-24 border-l-2 border-t-2 border-[#B8952A]/40 rounded-tl-3xl" />
              <div className="absolute top-5 right-5 w-24 h-24 border-r-2 border-t-2 border-[#B8952A]/40 rounded-tr-3xl" />
              <div className="absolute bottom-5 left-5 w-24 h-24 border-l-2 border-b-2 border-[#B8952A]/40 rounded-bl-3xl" />
              <div className="absolute bottom-5 right-5 w-24 h-24 border-r-2 border-b-2 border-[#B8952A]/40 rounded-br-3xl" />

              {/* Sparkle decorations — pointer-events-none */}
              {decorations.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#6B8F71]/40 pointer-events-none"
                  style={{ left: `${item.left}%`, top: `${item.top}%` }}
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
                  transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
                >
                  <Sparkles size={14} />
                </motion.div>
              ))}

              {/* Card content */}
              <div className="relative z-20 h-full flex flex-col justify-center items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                  <img src="/ornament.png" alt="Ornament" className="w-28 sm:w-36 md:w-48 opacity-80" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#B8952A] via-[#D4AF37] to-[#8B6914] p-[4px] shadow-[0_0_50px_rgba(184,149,42,0.35)]"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FEFCF7] via-[#FDF9EF] to-[#F5EED8] flex items-center justify-center">
                    <Heart size={28} className="fill-[#B8952A] text-[#B8952A]" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="mt-10 text-[#1B2340] text-2xl xs:text-3xl sm:text-4xl md:text-6xl tracking-[.18em] font-serif uppercase"
                >
                  Harsh &amp; Shreya
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                  className="mt-4 text-[#B8952A] tracking-[.45em] uppercase text-[10px] sm:text-xs md:text-sm"
                >
                  Wedding Invitation
                </motion.p>

                <div className="flex items-center gap-4 mt-8">
                  <div className="w-20 h-px bg-[#B8952A]/30" />
                  <Sparkles size={18} className="text-[#B8952A]" />
                  <div className="w-20 h-px bg-[#B8952A]/30" />
                </div>

                <motion.button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(184,149,42,0.35)" }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-12 px-7 sm:px-10 md:px-12 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm rounded-full border-2 border-[#1B2340] bg-[#1B2340] text-white uppercase tracking-[.28em] font-semibold cursor-pointer hover:bg-[#B8952A] hover:border-[#B8952A] transition-all duration-300"
                >
                  Click To Open
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ── OPENED CARD ── */
            <motion.div
              key="opened"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative mx-auto w-full max-w-[970px] h-[75vh] min-h-[420px] max-h-[600px] sm:max-h-none sm:h-[560px] md:h-[700px] lg:h-[780px] translate-y-4 sm:translate-y-[100px] md:translate-y-[80px]"
            >
              {/* Card body */}
              <motion.div className="absolute bottom-0 left-0 w-full h-[380px] rounded-[35px] bg-gradient-to-br from-[#FDF9EF] via-[#F5EED8] to-[#EDE0C4] border-[3px] border-[#B8952A]/40 shadow-[0_30px_80px_rgba(184,149,42,0.2)] overflow-hidden">
                <div className="absolute inset-5 rounded-[28px] border border-[#B8952A]/20" />
              </motion.div>

              {/* Stacked Cards with smooth scroll animation */}
               <div 
                 className="absolute inset-0 z-20" 
                 ref={cardsAreaRef}
                 onTouchStart={handleTouchStart}
                 onTouchEnd={handleTouchEnd}
               >
                {cards.map((card, index) => (
                  <motion.img
                    key={index}
                    src={card}
                    alt={`Wedding Card ${index + 1}`}
                    initial={{ y: "120%", scale: 0.95, opacity: 0 }}
                    animate={{
                      y: index < currentCard ? "-100%" : index === currentCard ? "-50%" : "120%",
                      scale: index === currentCard ? 1 : 0.95,
                      opacity: index <= currentCard ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                     onWheel={index === currentCard ? handleCardWheel : undefined}
                     className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[84%] sm:w-[80%] md:w-[74%] lg:w-[64%] h-auto max-h-[70vh] sm:max-h-[78%] object-contain rounded-xl md:rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,.15)]"
                     style={{ zIndex: 20 + index, pointerEvents: index === currentCard ? "auto" : "none" }}
                  />
                ))}
              </div>

              {/* Envelope flap (cream/gold) */}
              <motion.div
                initial={{ rotateX: 0, y: 0 }}
                animate={{ rotateX: -180, y: -40 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ transformOrigin: "top", perspective: 1200 }}
                className="absolute left-1/2 -translate-x-1/2 top-[-10px] sm:top-[-30px] md:top-[-55px] w-[96%] sm:w-[94%] md:w-[92%] h-[150px] sm:h-[220px] md:h-[300px]"
              >
                <svg viewBox="0 0 900 300" className="w-full h-full" preserveAspectRatio="none">
                  <polygon points="0,0 900,0 450,300" fill="#EDE0C4" stroke="#B8952A" strokeWidth="4" />
                </svg>
              </motion.div>

              {/* Bottom flap */}
              <motion.div
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[170px] md:h-[210px] rounded-b-[35px] bg-gradient-to-b from-[#F5EED8] via-[#EDE0C4] to-[#DDD0A8] border-x-[3px] border-b-[3px] border-[#B8952A]/40 z-40 overflow-hidden"
              >
                <div className="absolute inset-4 rounded-[22px] border border-[#B8952A]/20" />
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "130%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
                />
              </motion.div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 bottom-4 z-50 px-6 py-3 rounded-full border border-[#1B2340] bg-white/80 backdrop-blur-md text-[#1B2340] text-sm uppercase tracking-[0.25em] hover:bg-[#1B2340] hover:text-white transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              >
                ✕ Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
