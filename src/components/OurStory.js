"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Heart } from "lucide-react";

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section
      id="story"
      className="relative w-full py-24 md:py-32 bg-[#fdfbf7] overflow-hidden"
    >
      {/* Decorative background Mandala */}
      <div className="absolute top-20 right-[-100px] w-80 h-80 rounded-full border border-gold-500/10 opacity-30 pointer-events-none" />
      <div className="absolute bottom-20 left-[-100px] w-80 h-80 rounded-full border border-gold-500/10 opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-20">
        {/* Section Heading */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-gold-700 font-calligraphy-royal text-3xl md:text-4xl"
          >
            {t.story.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-serif-royal text-maroon-800 text-3xl md:text-5xl font-bold tracking-wider mt-2 uppercase"
          >
            {t.story.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mt-4"
          >
            <div className="w-10 h-[1px] bg-gold-500" />
            <Heart size={14} className="text-gold-500 fill-current animate-pulse" />
            <div className="w-10 h-[1px] bg-gold-500" />
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-[2px] before:h-full before:bg-gradient-to-b before:from-gold-500/10 before:via-gold-500/40 before:to-gold-500/10 lg:before:block before:hidden">
          {t.story.timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col lg:flex-row items-center justify-between w-full mb-16 lg:mb-24 last:mb-0"
              >
                {/* Time Indicator Point */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory border-2 border-gold-500 flex items-center justify-center z-10 lg:flex hidden shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                  <Heart size={12} className="text-maroon-800 fill-current" />
                </div>

                {/* Left Side Content Card */}
                <div
                  className={`w-full lg:w-[45%] flex ${
                    isEven ? "justify-end text-right" : "justify-start text-left lg:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="glass p-6 md:p-8 rounded-2xl w-full border border-gold-500/20 hover:border-gold-500/50 shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
                  >
                    {/* Floating hearts background */}
                    <div className="absolute top-2 right-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <Heart size={80} className="text-gold-500 fill-current" />
                    </div>

                    <span className="text-gold-700 font-serif-royal text-sm md:text-base font-semibold tracking-wider block mb-1">
                      {item.date}
                    </span>
                    <h3 className="font-serif-royal text-maroon-800 text-xl md:text-2.5xl font-bold tracking-wide mb-4">
                      {item.title}
                    </h3>
                    <p className="text-maroon-900/80 text-xs md:text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Right Side Image Card */}
                <div
                  className={`w-full lg:w-[45%] mt-6 lg:mt-0 ${
                    isEven ? "lg:order-2" : "justify-end"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gold-500/30 group shadow-md"
                  >
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent z-10" />
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Caption / Floating text in image */}
                    <div className="absolute bottom-4 left-6 z-20">
                      <p className="text-white font-serif-royal text-base tracking-wider drop-shadow-md">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
