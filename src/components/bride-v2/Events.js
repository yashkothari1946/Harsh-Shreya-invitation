"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function ScrollItem({ ceremony, index }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, {
    once: true,
    amount: 0.35,
  });

  useEffect(() => {
    if (isInView) {
      setIsOpen(true);
    }
  }, [isInView]);

  return (
    <div
      ref={scrollRef}
      className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-4 relative flex flex-col items-center"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 sm:mb-8 z-30 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 text-maroon-950 font-serif font-bold text-[10px] sm:text-xs tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer text-center max-w-[90%]"
      >
        {isOpen ? "Close Scroll" : `Open Scroll ${index + 1}: ${ceremony.name}`}
      </motion.button>

      {/* Scroll Container */}
      <div className="w-full flex justify-center px-1 sm:px-4 relative select-none">

        <motion.div
          initial={{
            clipPath: "inset(0 0 100% 0)",
            scaleY: 0.1,
          }}
          animate={{
            clipPath: isOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            scaleY: isOpen ? 1 : 0.1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-[760px] aspect-[3/2] min-h-[410px] sm:min-h-0 relative flex flex-col items-center animate-wind-sway"
          style={{
            transformOrigin: "top",
            backgroundImage: "url('/roller2.jpg')",
            backgroundSize: "100% calc(100% + 30px)",
            backgroundRepeat: "no-repeat",
            border: "8px solid #c69320",
            borderImage: "linear-gradient(45deg, #d4af37, #f7d977, #7b0915, #d4af37) 1",
            borderRadius: "40px 40px 0 0",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
          }}
        >
          {/* Jharokha Arch Overlay */}
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-[#7b0915]/20 rounded-t-[32px] pointer-events-none z-0 border-b-[4px] border-[#d4af37]/60" />
          {/* Inner Golden border framing, kept inside the "paper" zone of the image */}
          <div
            className="absolute pointer-events-none opacity-45 border border-dashed"
            style={{
              borderColor: ceremony.accentColor,
              top: "20%",
              bottom: "16%",
              left: "15%",
              right: "15%",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 30,
            }}
            transition={{
              delay: 1.2,
              duration: 0.6,
            }}
         className="absolute flex flex-col items-center text-center z-10 pt-6 sm:pt-0"
           style={{
  top: "16%",
  bottom: "20%",
  left: "15%",
  right: "15%",
}}
  
          >
            <div
              className="w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center shrink-0 border"
              style={{ borderColor: ceremony.accentColor }}
            >
              <img
                src={ceremony.logo}
                alt={ceremony.name}
                className="w-full h-full object-cover"
              />
            </div>

            {ceremony.mantra && (
              <span
                className="font-serif text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest block mt-2 sm:mt-3 mb-2 italic opacity-80"
                style={{ color: ceremony.accentColor }}
              >
                {ceremony.mantra}
              </span>
            )}

            {/* Title */}
            <h3 className="font-serif text-[11px] sm:text-sm md:text-lg lg:text-xl font-bold tracking-wide mb-1.5 sm:mb-2 uppercase break-words text-center leading-snug">
              {ceremony.name}
            </h3>

            {/* Custom separator line */}
            <div className="flex items-center gap-2 my-1.5 sm:my-3 w-full justify-center">
              <div
                className="w-5 sm:w-8 h-[1px]"
                style={{ backgroundColor: ceremony.accentColor + "50" }}
              />
              <Star
                className="w-2 h-2 sm:w-3 sm:h-3 rotate-45"
                style={{ color: ceremony.accentColor }}
              />
              <div
                className="w-5 sm:w-8 h-[1px]"
                style={{ backgroundColor: ceremony.accentColor + "50" }}
              />
            </div>

            {/* Date and Time block */}
            <div className="flex flex-col gap-1 sm:gap-2 font-serif text-[10px] sm:text-xs md:text-sm text-maroon-900 mb-2 sm:mb-4 bg-wood-950/[0.03] p-2 sm:p-3 md:p-4 rounded-sm border border-gold-700/10 w-full">
              <span className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-center font-semibold w-full">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gold-700 shrink-0" />
                {ceremony.date}
              </span>
              <span className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-center text-[9px] sm:text-xs w-full">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gold-700 shrink-0" />
                {ceremony.time}
              </span>
            </div>

            {/* Little bottom gold ornament */}
            <div className="mt-1 sm:mt-2 text-gold-600/40 text-[9px] sm:text-xs shrink-0">
              ❈ ❈ ❈
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function EventsScrolls() {
  const { t } = useLanguage();
  const ceremonies = t.events.list;

  return (
    <section id="invitation-scrolls" className="py-16 sm:py-24 px-4 sm:px-6 bg-maroon-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,rgba(59,9,15,1)_90%)] pointer-events-none" />

      {/* Decorative divider line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-script text-2xl sm:text-3xl md:text-4xl text-gold-300 block mb-2">
            Sacred Events
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-gold-200 tracking-wider uppercase mb-4">
            The Royal Invitations
          </h2>
          <div className="w-20 sm:w-24 h-[1px] bg-gold-500/30 mx-auto mt-6" />
        </div>

        {/* Scroll Rollers Grid */}
        <div className="space-y-4 sm:space-y-6 relative z-10 mb-20">
          {ceremonies.map((ceremony, idx) => (
            <ScrollItem key={idx} ceremony={ceremony} index={idx} />
          ))}
        </div>

        {/* Royal Procession Animation Marquee */}
        <div className="relative w-full h-[150px] overflow-hidden border-t-2 border-b-2 border-[#d4af37]/30 bg-[#1a0105] z-10 mt-10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[200%] h-full flex"
          >
            <div className="w-1/2 h-full relative">
              <img src="/procession.jpg" alt="Procession" className="w-full h-full object-cover mix-blend-screen opacity-70" />
            </div>
            <div className="w-1/2 h-full relative">
              <img src="/procession.jpg" alt="Procession" className="w-full h-full object-cover mix-blend-screen opacity-70" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}