"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const PETAL_EMOJIS = ["🌸", "🌺", "🌼", "🌹", "🏵️"];

function generatePetals(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
    left: Math.random() * 100, // vw %
   size: 18 + Math.random() * 14,
  duration: 1 + Math.random() * 1,
  delay: Math.random() * 2,
  drift: (Math.random() - 0.5) * 250,
    spin: Math.random() > 0.5 ? 360 : -360,
  }));
}

function PetalRain({ count = 1000 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    setPetals(generatePetals(count));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
          }}
          initial={{ y: "-10%", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, p.drift, 0],
            rotate: p.spin,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default function InvitationCard() {
  const { lang } = useLanguage();

  return (
  <section
  id="invitation"
  className="relative w-full min-h-screen overflow-hidden py-16 sm:py-20 md:py-24 px-4 flex flex-col items-center justify-center"
  style={{ background: "linear-gradient(180deg, #fdf2f4 0%, #fae6ec 50%, #f5d8df 100%)" }}
>
      {/* Soft blur blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#e8aebf]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5d8df]/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle floret corners */}
      <div className="absolute top-6 left-6 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
      <div className="absolute top-6 right-6 text-3xl opacity-20 pointer-events-none select-none">🌷</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-20 pointer-events-none select-none">🏵️</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-20 pointer-events-none select-none">🌺</div>

      {/* Falling flower petals - just a few */}
      <PetalRain count={10} />

      {/* Section label */}
      <div className="relative z-20 text-center mb-8">
        <span className="font-calligraphy-royal text-[#d88c9f] text-3xl md:text-4xl">Our Invitation</span>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="w-12 h-[2px] bg-[#e8aebf] rounded-full" />
          <span className="text-lg">🌸</span>
          <div className="w-12 h-[2px] bg-[#e8aebf] rounded-full" />
        </div>
      </div>

      {/* Card with elegant border */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 p-2 rounded-[28px] shadow-[0_30px_80px_rgba(123,44,69,0.15)]"
        style={{ background: "linear-gradient(135deg, #e8aebf, #f5d8df, #d88c9f, #e8aebf)" }}
      >
        <img
          src={lang === "hi" ? "/bridecardhindi.jpg" : "/bridecard.jpg"}
          alt="Wedding Card"
          className="w-[88vw] sm:w-[72%] md:w-[58%] lg:w-[44%] max-w-[540px] rounded-[22px] block"
        />
      </motion.div>
    </section>
  );
}