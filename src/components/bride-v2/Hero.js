"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";
import { FaLeaf } from "react-icons/fa";
import HeroScratchDate from "../HeroScratchDate";

export default function Hero({ onOpenInvitation }){
  const { t } = useLanguage();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const flowersY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

 const [petals, setPetals] = useState([]);
 const [roses, setRoses] = useState([]);

  const [gatesOpen, setGatesOpen] = useState(false);

useEffect(() => {
  setPetals(
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 5,
    }))
  );

  setRoses(
    Array.from({ length: 25 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
    }))
  );
}, []);

  // Lock body scroll when gates are closed
  useEffect(() => {
    if (!gatesOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [gatesOpen]);

  const handleOpen = () => {

    const inviteSection = document.getElementById("story");
    if (inviteSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = inviteSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    if (onOpenInvitation) {
      onOpenInvitation();
    }
  };

  return (
    <>
      {/* 3D Palace Gates Overlay */}
      <motion.div
        className="fixed inset-0 z-[100] flex perspective-[1200px]"
        initial={false}
        animate={{ pointerEvents: gatesOpen ? "none" : "auto" }}
      >
        {/* Left Gate - WebP */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: gatesOpen ? -110 : 0, opacity: gatesOpen ? 0 : 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          className="absolute inset-0 w-full h-full shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
        >
          <picture>
            <source srcSet="/udaipur_gate.webp" type="image/webp" />
            <img src="/udaipur_gate.jpg" alt="" className="w-full h-full object-cover" fetchpriority="high" decoding="async" />
          </picture>
        </motion.div>
        {/* Right Gate - WebP */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: gatesOpen ? 110 : 0, opacity: gatesOpen ? 0 : 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 1, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
          className="absolute inset-0 w-full h-full shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
        >
          <picture>
            <source srcSet="/udaipur_gate.webp" type="image/webp" />
            <img src="/udaipur_gate.jpg" alt="" className="w-full h-full object-cover" fetchpriority="high" decoding="async" />
          </picture>
        </motion.div>

        {/* Enter Button */}
        {!gatesOpen && (
          <motion.button
            onClick={() => setGatesOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-gradient-to-br from-[#8d0d1a] to-[#3b0108] border-2 border-[#d4af37] text-[#f9e5ae] uppercase tracking-[0.3em] text-sm md:text-lg font-serif-royal rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.7)] z-50 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Push to Enter
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent -translate-x-full animate-[shine_3s_infinite]" />
          </motion.button>
        )}
      </motion.div>

  <section
  id="home"
  ref={containerRef}
  className="relative w-full min-h-[108vh] md:min-h-[112vh] flex flex-col justify-center items-center overflow-hidden text-center select-none"
>
  {/* Flower Rain */}
  <motion.div 
    style={{ y: flowersY }}
    className="absolute inset-0 overflow-hidden pointer-events-none z-30"
  >

 {petals.map((petal, i) => (

    <motion.img
      key={i}
      src="/petall.png"

     className="absolute w-8 md:w-14 opacity-95"

     style={{
  left: `${petal.left}%`,
  top: "-10%",
}}

      animate={{
  y: ["-20vh", "130vh"],
  x: [0, 60, -60, 40, -30, 0],
  rotate: [0, 180, 360, 540],
  scale: [0.8, 1.1, 0.9, 1],
}}

      transition={{
  duration: petal.duration,
  repeat: Infinity,
  ease: "linear",
  delay: petal.delay,
}}
    />

  ))}

{roses.map((rose, i) => (

  <motion.img
    key={`flower-${i}`}
    src="/rose.png"

    className="absolute w-6 md:w-10 opacity-95"

   style={{
  left: `${rose.left}%`,
  top: "-10%",
}}

    animate={{
      y: ["-15vh", "125vh"],
      x: [0, -50, 50, -30, 0],
      rotate: [0, -90, 90, 180, 360],
      scale: [0.7, 1.2, 0.8, 1],
    }}

   transition={{
  duration: rose.duration,
  repeat: Infinity,
  ease: "linear",
  delay: rose.delay,
}}
  />

))}

</motion.div>
     
      {/* Background image - WebP first, JPG fallback */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <picture>
          <source srcSet="/udaipur_bg.webp" type="image/webp" />
          <img
            src="/udaipur_bg.jpg"
            alt=""
            className="w-full h-full object-cover"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </motion.div>
      {/* Dark scrim so text is always visible over the palace bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0008]/60 via-transparent to-transparent z-0" />

      {/* Decorative corner borders */}
      <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none z-10" />
      <div className="absolute inset-5 md:inset-9 border border-dashed border-white/5 pointer-events-none z-10" />

      {/* Hero Content */}
    <div className="relative z-20 max-w-4xl px-6 pt-12 md:pt-16 flex flex-col items-center">
        {/* Intro Tag */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-white/90 font-serif-royal text-xs md:text-sm tracking-[0.35em] mb-6 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {t.hero.familyIntro}
        </motion.p>

        {/* Bride & Groom names */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 my-6 md:my-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="font-calligraphy-royal text-white text-6xl md:text-8xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
          >
           {t.hero.groom}
          </motion.h2>

         <motion.div
                     initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                     whileHover={{ scale: 1.01, rotate: 3 }}
                      className="my-2 md:my-0 flex items-center justify-center"
>
  <img
    src="/couplee.jpg"
    alt="Wedding Logo"
    className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
  />
</motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="font-calligraphy-royal text-white text-6xl md:text-8xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
          >
             {t.hero.bride}
          </motion.h2>
        </div>

        {/* Invitation Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-white/85 text-sm md:text-base italic font-serif mt-2 mb-8 text-center max-w-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-4"
        >
          {t.hero.brideinviteRequest}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8"
        />

      {/* Save The Date */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 1 }}
  className="flex flex-col items-center mt-2 mb-6 w-full px-6"
>
  {/* Label with pill background */}
  <div className="mb-5 px-6 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
    <span className="text-white text-xs md:text-sm tracking-[0.45em] uppercase font-serif-royal font-semibold drop-shadow-md">
      ✦ Save The Date ✦
    </span>
  </div>

  {/* Enlarged Scratch Card */}
  <div className="relative w-full max-w-[420px] md:max-w-[580px] h-[120px] md:h-[150px] flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-2 border-white/20">
    <HeroScratchDate text={t.hero.date} theme="bride" />
  </div>
  <p className="mt-3 text-white/50 text-[10px] tracking-[0.3em] uppercase">Scratch the card to reveal</p>
</motion.div>

        {/* Floating Button */}
        <motion.button
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.98 }}
          className="group relative px-10 py-4 rounded-full overflow-hidden border border-white/40 text-white bg-white/10 backdrop-blur-sm font-serif-royal text-xs md:text-sm tracking-[0.25em] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 uppercase">
          <span className="relative z-10 flex items-center gap-2">
            {t.hero.openBtn}
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </span>
          <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
        </motion.button>
      </div>

      {/* Decorative Corner Flowers SVG or graphics */}
      <div className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 border-t border-l border-gold-500/30 opacity-70 pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 border-t border-r border-gold-500/30 opacity-70 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 md:w-16 md:h-16 border-b border-l border-gold-500/30 opacity-70 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 border-b border-r border-gold-500/30 opacity-70 pointer-events-none" />
    </section>
    </>
  );
}
