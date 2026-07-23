"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Navigation, Info } from "lucide-react";

export default function Venue() {
  const { t } = useLanguage();

  const mapEmbedUrl = "https://www.google.com/maps?q=Amrutham+Bagh+Resort+%26+Spa+Udaipur+Rajasthan&output=embed";
  const directionsUrl = "https://www.google.com/maps/place/Amrutham+Bagh+Resort+%26+Spa/@24.6491485,73.6438752,17z/data=!3m1!4b1!4m9!3m8!1s0x3967fb7f5c12ee05:0x2b19aba304afa5ec!5m2!4m1!1i2!8m2!3d24.6491485!4d73.6438752!16s%2Fg%2F11q45k1grv?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section
      id="venue"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf2f4 0%, #fae6ec 60%, #f5d8df 100%)" }}
    >
      {/* Decorative floating floral */}
      <div className="absolute top-8 left-8 text-6xl opacity-15 pointer-events-none animate-pulse select-none">🌸</div>
      <div className="absolute top-16 right-8 text-5xl opacity-15 pointer-events-none select-none">🌷</div>
      <div className="absolute bottom-8 left-16 text-7xl opacity-10 pointer-events-none select-none">🏵️</div>
      <div className="absolute bottom-16 right-12 text-5xl opacity-15 pointer-events-none animate-bounce select-none">🌺</div>

      {/* Soft radial blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#e8aebf]/30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#f5d8df]/40 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-calligraphy-royal text-[#d88c9f] text-4xl md:text-5xl"
          >
            {t.venue.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-serif-royal text-[#7b2c45] text-2xl md:text-4xl font-bold tracking-[0.15em] mt-2 uppercase"
          >
            {t.venue.title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[3px] mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #e8aebf, transparent)" }}
          />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Map Frame Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto rounded-3xl overflow-hidden border-2 border-[#e8aebf]/60 shadow-[0_20px_60px_rgba(123,44,69,0.12)]"
          >
            <iframe
              title="Wedding Venue Map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[300px] lg:min-h-[420px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-2/5 flex flex-col justify-between bg-white/70 backdrop-blur-sm p-8 rounded-3xl border-2 border-[#f5d8df] shadow-xl relative overflow-hidden group"
          >
            {/* Corner decorative flowers */}
            <div className="absolute top-3 right-3 text-2xl opacity-30 pointer-events-none select-none">🌸</div>
            <div className="absolute bottom-3 left-3 text-2xl opacity-30 pointer-events-none select-none">🌷</div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#f5d8df] flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#7b2c45]" />
                </div>
                <h3 className="font-serif-royal text-[#7b2c45] text-xl md:text-2xl font-bold tracking-wide">
                  {t.venue.name}
                </h3>
              </div>

              {/* Address */}
              <p className="text-[#96475d]/90 text-sm leading-relaxed tracking-wide mb-6 font-light pl-2 border-l-2 border-[#e8aebf]">
                {t.venue.address}
              </p>

              {/* Udaipur Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg">🏰</span>
                <span className="text-[#7b2c45] text-xs font-serif-royal tracking-[0.2em] uppercase font-semibold">
                  Udaipur, The City of Lakes
                </span>
              </div>

              {/* Note */}
              <div className="flex gap-3 items-start p-4 rounded-2xl bg-[#fdf2f4] border border-[#f5d8df] mb-6 text-xs text-[#96475d]/80 leading-relaxed">
                <Info size={15} className="text-[#d88c9f] shrink-0 mt-0.5" />
                <p>
                  {t.lang === "hi"
                    ? "कृपया ध्यान दें कि समारोह स्थल सिटी पैलेस, उदयपुर । मार्ग में यातायात के अनुसार अतिरिक्त समय लेकर चलें।"
                    : "Venue is at Amrutham Bagh Resort, Udaipur. Please plan travel keeping traffic conditions in mind."}
                </p>
              </div>
            </div>

            {/* Directions button */}
            <motion.a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(123,44,69,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-full font-serif-royal text-xs md:text-sm tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer uppercase text-white"
              style={{ background: "linear-gradient(135deg, #b05070, #7b2c45)" }}
            >
              <Navigation size={15} />
              {t.venue.directions}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
