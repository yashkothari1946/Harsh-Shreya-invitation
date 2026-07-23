"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Paintbrush,
  Flame,
  Wine,
} from "lucide-react";

export default function WeddingEvents() {
  const { t } = useLanguage();

  // Event Icons
  const getEventIcon = (name) => {
    const event = name.toLowerCase();

    if (event.includes("Ganpati Sthapana") || event.includes("गणपति स्थापना")) {
      return <Flower2 className="w-6 h-6 text-orange-500" />
    }
     if (event.includes("haldi") || event.includes("हल्दी")) {
      return <Sparkles className="text-yellow-500 w-6 h-6" />;
    }

    if (
      event.includes("mehendi") ||
      event.includes("mehndi") ||
      event.includes("मेहंदी")
    ) {
      return <Paintbrush className="text-emerald-500 w-6 h-6" />;
    }

    if (
      event.includes("wedding") ||
      event.includes("विवाह") ||
      event.includes("शुभ विवाह") ||
      event.includes("पाणिग्रहण")
    ) {
      return <Flame className="text-red-500 w-6 h-6" />;
    }

    return <Wine className="text-indigo-500 w-6 h-6" />;
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="events"
      className="relative overflow-hidden py-24 md:py-32 bg-[#fdfbf7]"
    >

      {/* Decorative Background */}
      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[140px]" />

        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-maroon-700/5 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/pattern.png')] bg-repeat" />

      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >

          <span className="font-calligraphy-royal text-3xl md:text-5xl text-gold-700">
            {t.events.subtitle}
          </span>

          <h2 className="mt-3 font-serif-royal text-4xl md:text-6xl uppercase font-bold tracking-widest text-maroon-800">
            {t.events.title}
          </h2>

          <div className="flex items-center justify-center gap-3 mt-6">

            <div className="w-14 h-[1px] bg-gold-500/50" />

            <div className="w-3 h-3 rounded-full bg-gold-500 shadow-[0_0_15px_rgba(212,175,55,.5)]" />

            <div className="w-14 h-[1px] bg-gold-500/50" />

          </div>

          <p className="mt-6 max-w-2xl mx-auto text-maroon-900/70 text-sm md:text-base leading-7">
            {t.events.description}
          </p>

        </motion.div>

        {/* Events Grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10"
        >

          {t.events.list.map((event, index) => (
            
          <motion.div
  key={index}
  variants={itemVariants}
  whileHover={{
    y: -10,
    scale: 1.02,
    transition: { duration: 0.35 },
  }}
  className={`relative overflow-hidden rounded-3xl border border-gold-500/20 bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-[0_25px_60px_rgba(212,175,55,0.18)] transition-all duration-500 group
    ${index === 4 ? "md:col-span-2 md:max-w-xl md:mx-auto w-full" : ""}
  `}
>

  {/* Shine Effect */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -left-40 top-0 h-full w-20 rotate-12 bg-white/20 blur-md group-hover:left-[130%] transition-all duration-[1800ms]" />
  </div>

  {/* Golden Border */}
  <div className="absolute inset-2 rounded-[22px] border border-gold-500/10 pointer-events-none" />

  {/* Event Number */}
  <div className="absolute top-5 right-5 text-5xl font-bold text-gold-500/10">
    {String(index + 1).padStart(2, "0")}
  </div>

  <div className="p-8 relative z-10">

   <div className="relative mb-6 overflow-hidden rounded-2xl">

  <img
    src={event.image}
    alt={event.name}
    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

  <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-white/90 border border-gold-500 flex items-center justify-center shadow-lg">
    {getEventIcon(event.name)}
  </div>

</div>

    {/* Event Name */}
    <h3 className="font-serif-royal text-2xl md:text-3xl text-maroon-800 font-bold mb-6">
      {event.name}
    </h3>

    {/* Details */}
    <div className="space-y-4 text-maroon-900/80">

      <div className="flex items-center gap-3">
        <Calendar size={16} className="text-gold-700" />
        <span className="text-sm">{event.date}</span>
      </div>

      <div className="flex items-center gap-3">
        <Clock size={16} className="text-gold-700" />
        <span className="text-sm">{event.time}</span>
      </div>

      <div className="flex items-center gap-3">
        <MapPin size={16} className="text-gold-700" />
        <span className="text-sm font-semibold">
          {event.venue}
        </span>
      </div>

    </div>

    {/* Divider */}
    <div className="my-6 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

    {/* Description */}
    <p className="text-sm leading-7 text-maroon-900/70">
      {event.desc}
    </p>

    {/* Bottom Decoration */}
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2">
        <div className="w-10 h-[1px] bg-gold-500/30" />
        <div className="w-2 h-2 rounded-full bg-gold-500" />
        <div className="w-10 h-[1px] bg-gold-500/30" />
      </div>
    </div>

  </div>
  </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mt-20"
        >
          <div className="flex items-center gap-4">

            <div className="w-20 h-[1px] bg-gold-500/30" />

            <div className="w-4 h-4 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(212,175,55,.5)]" />

            <div className="w-20 h-[1px] bg-gold-500/30" />

          </div>
        </motion.div>

      </div>
    </section>
  );
}