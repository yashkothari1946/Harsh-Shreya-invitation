"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Countdown() {
  const { t } = useLanguage();
  
  // Target Wedding Date: December 11, 2026, 19:00:00 (07:00 PM)
  const targetDate = "2026-12-11T19:00:00";

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!mounted) return null;

  const timerItems = [
    { value: timeLeft.days, label: t.countdown.days },
    { value: timeLeft.hours, label: t.countdown.hours },
    { value: timeLeft.minutes, label: t.countdown.minutes },
    { value: timeLeft.seconds, label: t.countdown.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative w-full py-24 md:py-32 bg-[#3c030a] text-white overflow-hidden flex items-center justify-center"
    >
      {/* Background Soft Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />

      {/* Frame decoration */}
      <div className="absolute inset-6 md:inset-10 border border-gold-500/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif-royal text-gold-300 text-2xl md:text-4xl font-bold tracking-widest mb-12 uppercase"
        >
          {t.countdown.title}
        </motion.h2>

        {/* Timers Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {timerItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gold-500/30 bg-gold-500/5 backdrop-blur-md flex flex-col justify-center items-center shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:border-gold-500/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 relative group"
            >
              {/* Spinning subtle outer ring on hover */}
              <div className="absolute inset-[-4px] rounded-full border border-dashed border-gold-500/0 group-hover:border-gold-500/20 group-hover:animate-[spin_20s_linear_infinite] transition-colors duration-500 pointer-events-none" />

              {/* Number */}
              <span className="font-serif-royal text-gold-500 text-2xl md:text-4xl font-bold tracking-wider drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
                {String(item.value).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="text-[10px] md:text-xs text-gold-100/70 tracking-widest uppercase mt-1 md:mt-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

    
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="mt-16 text-center select-none font-serif-royal text-xs md:text-sm tracking-widest text-gold-500 italic max-w-lg mx-auto"
        >
          {t.lang === "hi"
            ? "“मङ्गलम् भगवान् विष्णुः, मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षः, मङ्गलाय तनो हरिः॥”"
            : "“May your union be blessed with love, laughter, and endless happiness.”"}
        </motion.div>
      </div>
    </section>
  );
}
