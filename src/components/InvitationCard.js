"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function InvitationCard() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const scrollLockRef = useRef(false);
  const cardsAreaRef = useRef(null);

  const cards = [
    lang === "hi" ?  "/ganpatisthaapna.png" : "/card.jpg",
    "/haldiceremony.jpg",
    "/sangeet.jpg",
    "/weddingceremony.jpg",
    "/receptionnn.jpg",
  ];

  useEffect(() => {
    setDecorations(
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
      }))
    );
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  // Page flip sound
  const flipAudioRef = useRef(null);

  // Play flip sound when card changes
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

      const canGoNext = currentCard < cards.length - 1;
      const canGoPrev = currentCard > 0;

      if (goingDown && !canGoNext) return;
      if (goingUp && !canGoPrev) return;

      e.preventDefault();
      e.stopPropagation();

      if (scrollLockRef.current) return;

      scrollLockRef.current = true;

      if (goingDown) {
        setCurrentCard((prev) => prev + 1);
      }

      if (goingUp) {
        setCurrentCard((prev) => prev - 1);
      }

      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1400);
    };

    cardsArea.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      cardsArea.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, currentCard, cards.length]);

  const handleCardWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (scrollLockRef.current) return;

    const goingDown = e.deltaY > 0;
    const goingUp = e.deltaY < 0;

    if (goingDown && currentCard >= cards.length - 1) return;
    if (goingUp && currentCard <= 0) return;

    scrollLockRef.current = true;

    if (goingDown) {
      setCurrentCard((prev) => prev + 1);
    }

    if (goingUp) {
      setCurrentCard((prev) => prev - 1);
    }

    setTimeout(() => {
      scrollLockRef.current = false;
    }, 1400);
  };

  return (
    <section
      id="invitation"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#250104] via-[#3c030a] to-[#250104] py-16 sm:py-20 md:py-24 px-4 flex items-center justify-center"
    >
      <audio ref={flipAudioRef} src="/Aaj Sajeya _ Wedding Song.mp3" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#d4af37]/30"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{ y: [-30, 30, -30], opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-[#d4af37] tracking-[0.45em] uppercase text-sm">ॐ</p>
          <h2 className="mt-3 font-calligraphy-royal text-4xl md:text-6xl text-[#d4af37]">
            ॥ श्री गणेशाय नमः ॥
          </h2>
          <div className="flex justify-center items-center gap-3 mt-5">
            <div className="w-14 h-px bg-[#d4af37]/40"></div>
            <Heart size={15} className="fill-[#d4af37] text-[#d4af37]" />
            <div className="w-14 h-px bg-[#d4af37]/40"></div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 50 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              onClick={() => setIsOpen(true)}
              className="relative mx-auto w-[96vw] max-w-[420px] sm:max-w-[520px] md:max-w-[900px] h-[540px] rounded-[40px] overflow-hidden cursor-pointer border-[3px] border-[#d4af37]/50 bg-gradient-to-br from-[#7a0714] via-[#5a0410] to-[#2f0107] shadow-[0_30px_80px_rgba(0,0,0,.55)]"
            >
              <div className="absolute inset-0 opacity-[0.08] bg-[url('/images/pattern.png')]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20" />

              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "140%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] pointer-events-none"
              />

              <div className="absolute inset-5 rounded-[30px] border border-[#d4af37]/35" />
              <div className="absolute inset-8 rounded-[26px] border border-[#d4af37]/15" />

              <div className="absolute top-5 left-5 w-24 h-24 border-l-2 border-t-2 border-[#d4af37]/40 rounded-tl-3xl" />
              <div className="absolute top-5 right-5 w-24 h-24 border-r-2 border-t-2 border-[#d4af37]/40 rounded-tr-3xl" />
              <div className="absolute bottom-5 left-5 w-24 h-24 border-l-2 border-b-2 border-[#d4af37]/40 rounded-bl-3xl" />
              <div className="absolute bottom-5 right-5 w-24 h-24 border-r-2 border-b-2 border-[#d4af37]/40 rounded-br-3xl" />

              {decorations.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#d4af37]/40 pointer-events-none"
                  style={{ left: `${item.left}%`, top: `${item.top}%` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
                  transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
                >
                  <Sparkles size={16} />
                </motion.div>
              ))}

              <div className="relative z-20 h-full flex flex-col justify-center items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                  <img src="/ornament.png" alt="Ornament" className="w-28 sm:w-36 md:w-48 opacity-90" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f7d977] to-[#b8860b] p-[4px] shadow-[0_0_50px_rgba(212,175,55,.45)]"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7b0915] via-[#5a0310] to-[#330107] flex items-center justify-center">
                    <Heart size={28} className="fill-[#d4af37] text-[#d4af37]" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="mt-10 text-[#f8e7b8] text-2xl xs:text-3xl sm:text-4xl md:text-6xl tracking-[.18em] font-serif uppercase"
                >
                  Harsh & Shreya
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4 text-[#d4af37] tracking-[.45em] uppercase text-[10px] sm:text-xs md:text-sm">
                  Wedding Invitation
                </motion.p>

                <div className="flex items-center gap-4 mt-8">
                  <div className="w-20 h-px bg-[#d4af37]/30"></div>
                  <Sparkles size={18} className="text-[#d4af37]" />
                  <div className="w-20 h-px bg-[#d4af37]/30"></div>
                </div>

                <motion.button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(212,175,55,.45)" }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-12 px-7 sm:px-10 md:px-12 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm rounded-full border-2 border-[#d4af37] bg-gradient-to-b from-[#8c0f1c] to-[#5b0310] text-[#f9e5ae] uppercase tracking-[.28em] font-semibold cursor-pointer"
                >
                  Click To Open
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative mx-auto w-full max-w-[970px] h-[420px] sm:h-[560px] md:h-[700px] lg:h-[780px] translate-y-[120px] sm:translate-y-[100px] md:translate-y-[80px]"
            >
              <motion.div className="absolute bottom-0 left-0 w-full h-[380px] rounded-[35px] bg-gradient-to-br from-[#7b0715] via-[#5b0410] to-[#340108] border-[3px] border-[#d4af37]/40 shadow-[0_30px_80px_rgba(0,0,0,.45)] overflow-hidden">
                <div className="absolute inset-5 rounded-[28px] border border-[#d4af37]/20" />
              </motion.div>

               {/* Stacked Cards with smooth scroll animation */}
               <div className="absolute inset-0 z-20" ref={cardsAreaRef}>
                 {cards.map((card, index) => (
                   <motion.img
                     key={index}
                     src={card}
                     alt={`Wedding Invitation Card ${index + 1}`}
                     initial={{ y: "120%", scale: 0.95, opacity: 0 }}
                     animate={{
                       y: index < currentCard ? "-100%" : index === currentCard ? "-50%" : "120%",
                       scale: index === currentCard ? 1 : 0.95,
                       opacity: index <= currentCard ? 1 : 0,
                     }}
                     transition={{
                       duration: 0.8,
                       ease: [0.22, 1, 0.36, 1],
                     }}
                     onWheel={index === currentCard ? handleCardWheel : undefined}
                     className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[84%] sm:w-[80%] md:w-[74%] lg:w-[64%] h-auto max-h-[78%] object-contain rounded-xl md:rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,.45)]"
                     style={{
                       zIndex: 20 + index,
                       pointerEvents: index === currentCard ? "auto" : "none",
                     }}
                   />
                 ))}
               </div>

              <motion.div
                initial={{ rotateX: 0, y: 0 }}
                animate={{ rotateX: -180, y: -40 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ transformOrigin: "top", perspective: 1200 }}
                className="absolute left-1/2 -translate-x-1/2 top-[-10px] sm:top-[-30px] md:top-[-55px] w-[96%] sm:w-[94%] md:w-[92%] h-[150px] sm:h-[220px] md:h-[300px]"
              >
                <svg viewBox="0 0 900 300" className="w-full h-full" preserveAspectRatio="none">
                  <polygon points="0,0 900,0 450,300" fill="#7b0715" stroke="#d4af37" strokeWidth="4" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[170px] md:h-[210px] rounded-b-[35px] bg-gradient-to-b from-[#8d0d1a] via-[#6a0612] to-[#3b0108] border-x-[3px] border-b-[3px] border-[#d4af37]/40 z-40 overflow-hidden"
              >
                <div className="absolute inset-4 rounded-[22px] border border-[#d4af37]/20" />
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "130%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
                />
              </motion.div>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 bottom-4 z-50 px-6 py-3 rounded-full border border-[#d4af37] bg-[#4b0209]/90 backdrop-blur-md text-[#f8e4ad] text-sm uppercase tracking-[0.25em] hover:bg-[#d4af37] hover:text-[#4b0209] transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,.35)]"
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