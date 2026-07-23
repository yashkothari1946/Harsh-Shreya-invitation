"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FLOWERS = ["🌸", "🌺", "🌷", "🏵️", "🌼"];

// Individual story card that animates in on scroll
function StoryCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Step Number Badge */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-top-5 z-20"
        style={{ [isEven ? "right" : "left"]: "calc(50% - 20px)" }}
      >
        <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#e8aebf] flex items-center justify-center shadow-lg text-lg">
          {FLOWERS[index % FLOWERS.length]}
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row gap-6 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: index * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 group"
        >
          <div className="relative rounded-[24px] overflow-hidden border-[3px] border-[#e8aebf]/60 shadow-[0_20px_50px_rgba(123,44,69,0.12)]">
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 z-10 ${
                isEven
                  ? "bg-gradient-to-r from-[#7b2c45]/40 to-transparent"
                  : "bg-gradient-to-l from-[#7b2c45]/40 to-transparent"
              }`}
            />
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Floating date badge on image */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#e8aebf]/60">
              <span className="font-serif-royal text-[#7b2c45] text-xs tracking-[0.2em] uppercase font-semibold">
                {item.date}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2"
        >
          <div className="relative p-7 md:p-9 rounded-[24px] overflow-hidden group"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1.5px solid rgba(232,174,191,0.5)",
              boxShadow: "0 12px 40px rgba(123,44,69,0.08)"
            }}
          >
            {/* Decorative large floral watermark */}
            <div className="absolute -top-4 -right-4 text-[100px] opacity-[0.06] pointer-events-none select-none group-hover:rotate-12 transition-transform duration-700">
              🌸
            </div>

            {/* Accent bar */}
            <div className="w-10 h-1 rounded-full mb-4" style={{ background: "linear-gradient(90deg, #d88c9f, #e8aebf)" }} />

            <h3 className="font-calligraphy-royal text-[#7b2c45] text-3xl md:text-4xl mb-3 leading-snug">
              {item.title}
            </h3>
            <p className="text-[#96475d]/80 text-sm md:text-base leading-relaxed font-light">
              {item.desc}
            </p>

            {/* Bottom decorative */}
            <div className="flex items-center gap-2 mt-5">
              <div className="h-[1px] w-8 bg-[#e8aebf]" />
              <span className="text-[#e8aebf] text-xs">✦</span>
              <div className="h-[1px] w-8 bg-[#e8aebf]" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section
      id="story"
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff8f9 0%, #fdf2f4 40%, #fae6ec 80%, #f5d8df 100%)" }}
    >
      {/* Background large ambient circles */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#f5d8df]/30 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#e8aebf]/20 blur-[100px] pointer-events-none" />

      {/* Scattered floral emojis */}
      {[
        { top: "8%", left: "3%", size: "text-5xl", opacity: "opacity-[0.12]", anim: "animate-pulse" },
        { top: "22%", right: "2%", size: "text-6xl", opacity: "opacity-[0.10]", anim: "" },
        { top: "55%", left: "1%", size: "text-4xl", opacity: "opacity-[0.12]", anim: "animate-bounce" },
        { bottom: "12%", right: "3%", size: "text-7xl", opacity: "opacity-[0.08]", anim: "" },
        { bottom: "6%", left: "8%", size: "text-4xl", opacity: "opacity-[0.12]", anim: "animate-pulse" },
      ].map((f, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none select-none ${f.size} ${f.opacity} ${f.anim || ""}`}
          style={{ top: f.top, left: f.left, right: f.right, bottom: f.bottom }}
        >
          {FLOWERS[i % FLOWERS.length]}
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-calligraphy-royal text-[#d88c9f] text-4xl md:text-5xl"
          >
            {t.story.subtitle}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif-royal text-[#7b2c45] text-2xl md:text-4xl font-bold uppercase tracking-[0.15em] mt-2"
          >
            {t.story.title}
          </motion.h2>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-5 h-[3px] w-48 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #e8aebf, #d88c9f, #e8aebf, transparent)" }}
          />
        </div>

        {/* ── Story Cards ── */}
        <div className="relative flex flex-col gap-16 md:gap-24">
          {/* Vertical connecting thread — desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden lg:block pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent, #e8aebf 15%, #d88c9f 50%, #e8aebf 85%, transparent)" }}
          />

          {t.story.timeline.map((item, i) => (
            <StoryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* ── Bottom closure ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-[1px] bg-[#e8aebf]" />
            <span className="text-3xl animate-pulse">🌸</span>
            <div className="w-16 h-[1px] bg-[#e8aebf]" />
          </div>
          <p className="font-calligraphy-royal text-[#d88c9f] text-2xl mt-1">
            And the story continues…
          </p>
        </motion.div>
      </div>
    </section>
  );
}
