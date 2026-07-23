"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CEREMONY_COLORS = [
  { bg: "from-[#fff0f5] to-[#fce4ec]", accent: "#d88c9f", border: "#e8aebf", tag: "#7b2c45" },
  { bg: "from-[#fff8e7] to-[#fef3c7]", accent: "#c9971c", border: "#f9e5ae", tag: "#7a4c00" },
  { bg: "from-[#f0fff8] to-[#dcfce7]", accent: "#22a675", border: "#a7f3d0", tag: "#065f46" },
  { bg: "from-[#fdf4ff] to-[#f3e8ff]", accent: "#9b59b6", border: "#e9d5ff", tag: "#4c1d95" },
  { bg: "from-[#fff5f0] to-[#ffedd5]", accent: "#ea7b3a", border: "#fed7aa", tag: "#7c2d12" },
  { bg: "from-[#f0f9ff] to-[#e0f2fe]", accent: "#0ea5e9", border: "#bae6fd", tag: "#0c4a6e" },
];

function EventCard({ ceremony, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const theme = CEREMONY_COLORS[index % CEREMONY_COLORS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: `0 28px 60px rgba(0,0,0,0.12)` }}
      className="relative flex flex-col rounded-[28px] overflow-hidden cursor-default group"
      style={{
        background: `linear-gradient(145deg, ${theme.bg.replace("from-", "").replace(" to-", ", ").replace("[", "").replace("]", "")})`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.07)`,
        border: `1.5px solid ${theme.border}`,
        minHeight: "360px"
      }}
    >
      {/* Top image strip */}
      {ceremony.image && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={ceremony.image}
            alt={ceremony.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Index badge */}
          <div
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white font-serif-royal text-sm font-bold shadow-md"
            style={{ backgroundColor: theme.tag }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Logo + title */}
        <div className="flex items-center gap-3 mb-3">
          {ceremony.logo && (
            <div
              className="w-11 h-11 rounded-full overflow-hidden border-2 shrink-0"
              style={{ borderColor: theme.border }}
            >
              <img src={ceremony.logo} alt={ceremony.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h3
              className="font-serif-royal text-base md:text-lg font-bold tracking-wide uppercase leading-tight"
              style={{ color: theme.tag }}
            >
              {ceremony.name}
            </h3>
            {ceremony.mantra && (
              <p className="text-[10px] italic opacity-60 mt-0.5 truncate max-w-[180px]" style={{ color: theme.accent }}>
                {ceremony.mantra}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1.5px] w-full rounded-full mb-4" style={{ backgroundColor: theme.border }} />

        {/* Description */}
        {ceremony.desc && (
          <p className="text-xs md:text-sm leading-relaxed text-[#555]/80 mb-4 flex-1">
            {ceremony.desc}
          </p>
        )}

        {/* Date / Time / Venue chips */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.border }}>
              <Calendar size={12} style={{ color: theme.tag }} />
            </span>
            <span className="text-xs font-semibold" style={{ color: theme.tag }}>{ceremony.date}</span>
          </div>
          {ceremony.time && (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.border }}>
                <Clock size={12} style={{ color: theme.tag }} />
              </span>
              <span className="text-xs" style={{ color: theme.accent }}>{ceremony.time}</span>
            </div>
          )}
          {ceremony.venue && (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.border }}>
                <MapPin size={12} style={{ color: theme.tag }} />
              </span>
              <span className="text-xs" style={{ color: theme.accent }}>{ceremony.venue}</span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle bottom glow bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-40"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default function EventsScrolls() {
  const { t } = useLanguage();
  const ceremonies = t.events.list;

  return (
    <section
      id="events"
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f5d8df 0%, #fae6ec 30%, #fdf2f4 70%, #fae6ec 100%)" }}
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, transparent, #e8aebf, #d88c9f, #e8aebf, transparent)" }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#e8aebf]/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-60 rounded-full bg-[#f5d8df]/30 blur-[90px] pointer-events-none" />

      {/* Scattered petals */}
      <div className="absolute top-10 left-6 text-5xl opacity-10 pointer-events-none select-none animate-pulse">🌸</div>
      <div className="absolute top-1/3 right-4 text-6xl opacity-10 pointer-events-none select-none">🌺</div>
      <div className="absolute bottom-16 left-10 text-4xl opacity-10 pointer-events-none select-none animate-bounce">🌷</div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        {/* ── Section Heading ── */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-calligraphy-royal text-[#d88c9f] text-4xl md:text-5xl"
          >
            {t.events.subtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif-royal text-[#7b2c45] text-2xl md:text-4xl font-bold uppercase tracking-[0.15em] mt-2"
          >
            {t.events.title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-5 h-[3px] w-40 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #e8aebf, #d88c9f, #e8aebf, transparent)" }}
          />
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ceremonies.map((ceremony, idx) => (
            <EventCard key={idx} ceremony={ceremony} index={idx} />
          ))}
        </div>

        {/* ── Royal Procession Marquee ── */}
        <div className="mt-20 relative overflow-hidden rounded-2xl border border-[#e8aebf]/40 shadow-inner"
          style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(10px)" }}
        >
          <p className="text-center font-calligraphy-royal text-[#d88c9f] text-2xl pt-4 pb-1 tracking-wide">
            The Royal Procession
          </p>
          <div className="relative h-[120px] md:h-[150px] overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[200%] h-full flex"
            >
              <img src="/procession.jpg" alt="Procession" className="w-1/2 h-full object-cover opacity-80" />
              <img src="/procession.jpg" alt="Procession" className="w-1/2 h-full object-cover opacity-80" />
            </motion.div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />
          </div>
          <div className="flex justify-center gap-2 py-3">
            <div className="w-12 h-[1px] bg-[#e8aebf]" />
            <span className="text-[#d88c9f] text-xs">✦</span>
            <div className="w-12 h-[1px] bg-[#e8aebf]" />
          </div>
        </div>
      </div>
    </section>
  );
}