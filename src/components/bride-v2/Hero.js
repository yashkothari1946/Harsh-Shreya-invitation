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

useEffect(() => {
  setPetals(
    Array.from({ length: 110 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 5,
    }))
  );

  setRoses(
    Array.from({ length: 390 }, () => ({
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
     
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/hero_bg.png')",
          y: bgY,
          scale: bgScale
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fae6ec]/85 via-[#f5d8df]/75 to-[#f2c9d4]/90 z-0" />

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
          className="text-[#7b2c45] font-serif-royal text-sm md:text-base tracking-[0.25em] mb-6 uppercase"
        >
          {t.hero.familyIntro}
        </motion.p>

        {/* Bride & Groom names */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 my-6 md:my-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="font-calligraphy-royal text-[#7b2c45] text-6xl md:text-8xl drop-shadow-[0_2px_10px_rgba(123,44,69,0.2)]"
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
            className="font-calligraphy-royal text-[#7b2c45] text-6xl md:text-8xl drop-shadow-[0_2px_10px_rgba(123,44,69,0.2)]"
          >
             {t.hero.bride}
          </motion.h2>
        </div>

        {/* Invitation Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-[#96475d] text-lg md:text-2xl italic font-serif mt-2 mb-8 drop-shadow-sm"
        >
          {t.hero.brideinviteRequest}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#7b2c45]/60 to-transparent mb-8"
        />

      {/* Save The Date */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 1 }}
className="flex flex-col items-center mt-2 mb-2"
>
  <span className="text-sm md:text-base tracking-[0.45em] uppercase text-[#7b2c45] font-semibold mb-4">
    Save The Date
  </span>

  {/* Scratch Reveal */}
 <div className="relative w-[360px] md:w-[600px] h-[65px] md:h-[80px] flex items-center justify-center">
    <HeroScratchDate text={t.hero.date} theme="maroon" />
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
         className="group relative -mt-3 px-8 py-3.5 rounded-full overflow-hidden border border-[#7b2c45]/40 text-[#7b2c45] hover:text-white bg-transparent hover:bg-[#7b2c45] font-serif-royal text-xs md:text-sm tracking-[0.2em] cursor-pointer shadow-[0_0_15px_rgba(123,44,69,0.15)] transition-all duration-500 uppercase">
          <span className="relative z-10 flex items-center gap-2">
            {t.hero.openBtn}
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </span>
          <span className="absolute inset-0 bg-[#7b2c45] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-0" />
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
