"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";
import { FaLeaf } from "react-icons/fa";

export default function Hero({ onOpenInvitation }){
  const { t } = useLanguage();

 const [petals, setPetals] = useState([]);
 const [roses, setRoses] = useState([]);

useEffect(() => {
  setPetals(
    Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 5,
    }))
  );

  setRoses(
    Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
    }))
  );
}, []);

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
  <section
  id="home"
  className="relative w-full min-h-[108vh] md:min-h-[112vh] flex flex-col justify-center items-center overflow-hidden text-center select-none"
>
  {/* Flower Rain */}

<div className="absolute inset-0 overflow-hidden pointer-events-none z-30">

 {petals.map((petal, i) => (
    <motion.img
      key={i}
      src="/petall.png"

     className="absolute w-8 md:w-14 opacity-95"

      style={{
        left: `${Math.random() * 100}%`,
        top: "-10%",
      }}

      animate={{
  y: ["-20vh", "130vh"],
  x: [0, 60, -60, 40, -30, 0],
  rotate: [0, 180, 360, 540],
  scale: [0.8, 1.1, 0.9, 1],
}}

      transition={{
  duration: Math.random() * 4 + 5, 
  repeat: Infinity,
  ease: "linear",
  delay: Math.random() * 3,
}}
    />

  ))}

{roses.map((rose, i) => (

  <motion.img
    key={`flower-${i}`}
    src="/rose.png"

    className="absolute w-6 md:w-10 opacity-95"

    style={{
      left: `${Math.random() * 100}%`,
      top: "-10%",
    }}

    animate={{
      y: ["-15vh", "125vh"],
      x: [0, -50, 50, -30, 0],
      rotate: [0, -90, 90, 180, 360],
      scale: [0.7, 1.2, 0.8, 1],
    }}

    transition={{
      duration: Math.random() * 3 + 4,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 2,
    }}
  />

))}

</div>
     
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{
          //backgroundImage: "url('/images/hero_bg.png')",
          backgroundImage: "url('lightbg.jpg')",
        }}
      />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#3c030a]/85 via-[#3c030a]/75 to-[#3c030a]/90 z-0" /> */}

      {/* Decorative Traditional Border Overlay */}
      <div className="absolute inset-4 md:inset-8 border border-gold-500/10 pointer-events-none z-10" />
      <div className="absolute inset-5 md:inset-9 border border-dashed border-gold-500/5 pointer-events-none z-10" />

      {/* Hero Content */}
    <div className="relative z-20 max-w-4xl px-6 pt-12 md:pt-16 flex flex-col items-center">
        {/* Intro Tag */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-[#7a0b16] font-serif-royal text-sm md:text-base tracking-[0.25em] mb-6 uppercase font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
        >
          {t.hero.familyIntro}
        </motion.p>

        {/* Bride & Groom names */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 my-6 md:my-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
             className="font-calligraphy-royal text-6xl md:text-8xl leading-[1.35] px-3 pt-6 pb-3 bg-gradient-to-b from-[#5a0008] via-[#a30d1c] to-[#3b0006] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(90,0,8,0.35)]"
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
    className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]"
  />
</motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
           className="font-calligraphy-royal text-6xl md:text-8xl leading-[1.35] px-3 py-3 bg-gradient-to-b from-[#5a0008] via-[#a30d1c] to-[#3b0006] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(90,0,8,0.35)]"
          >
             {t.hero.bride}
          </motion.h2>
        </div>

        {/* Invitation Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        className="text-[#8b0a16] text-xs md:text-sm tracking-[0.2em] max-w-xl mx-auto leading-relaxed uppercase mb-8 font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
        >
          {t.hero.groominviteRequest}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-8"
        />

      {/* Save The Date */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 1 }}
className="flex flex-col items-center mt-2 mb-2"
>
  <span className="text-[#8b0a16] uppercase tracking-[0.35em] text-sm md:text-base font-serif-royal mb-6 font-semibold">
    Save The Date
  </span>

  {/* Scratch Reveal */}
 <div className="relative w-[360px] md:w-[600px] h-[55px] md:h-[70px] flex items-center justify-center overflow-hidden">

    {/* Date */}
    <motion.p
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 2.2,
        duration: 0.8,
      }}
    className="absolute whitespace-nowrap text-[#8b0a16] font-serif-royal text-lg md:text-3xl tracking-[0.12em] font-semibold z-10 drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
      {t.hero.date}
    </motion.p>

    {/* Golden Scratch */}
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "120%" }}
      transition={{
        delay: 1.2,
        duration: 1.4,
        ease: "easeInOut",
      }}
     className="absolute inset-0 bg-gradient-to-r from-[#5a0008] via-[#b31325] to-[#5a0008] z-20"
    />

    {/* Shine */}
    <motion.div
      initial={{ x: "-120%" }}
      animate={{ x: "120%" }}
      transition={{
        delay: 2.4,
        duration: 1,
      }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffb3bd]/60 to-transparent z-30"
    />
  </div>
</motion.div>

        {/* Floating Button */}
        <motion.button
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
       className="group relative -mt-3 px-8 py-3.5 rounded-full overflow-hidden border border-[#8b0a16]/50 text-[#8b0a16] hover:text-white bg-transparent hover:bg-[#8b0a16] font-serif-royal text-xs md:text-sm tracking-[0.2em] cursor-pointer shadow-[0_0_15px_rgba(139,10,22,0.2)] transition-all duration-500 uppercase">
          <span className="relative z-10 flex items-center gap-2">
            {t.hero.openBtn}
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </span>
          <span className="absolute inset-0 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-0" />
        </motion.button>
      </div>

      {/* Decorative Corner Flowers SVG or graphics */}
      <div className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 border-t border-l border-gold-500/30 opacity-70 pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 border-t border-r border-gold-500/30 opacity-70 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 md:w-16 md:h-16 border-b border-l border-gold-500/30 opacity-70 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 border-b border-r border-gold-500/30 opacity-70 pointer-events-none" />
    </section>
  );
}
