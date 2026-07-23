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
  className="
    relative
    w-full
    min-h-screen
    overflow-hidden
    py-16
    sm:py-20
    md:py-24
    px-4
    flex
    items-center
    justify-center
    bg-center
    bg-cover
    bg-no-repeat
  "
  style={{
    backgroundImage: "url('/background.jpg')",
  }}
>
      {/* Falling flower petals over the whole section */}
      <PetalRain count={26} />

      {/* Plain card, no envelope/cover */}
      <motion.img
        src={lang === "hi" ? "/bridecardhindi.jpg" : "/bridecard.jpg"}
        alt="Wedding Card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          relative
          z-20
          w-[92vw]
          sm:w-[80%]
          md:w-[65%]
          lg:w-[46%]
          max-w-[560px]
          rounded-xl
          md:rounded-[28px]
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
        "
      />
    </section>
  );
}