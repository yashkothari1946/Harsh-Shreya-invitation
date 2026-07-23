"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Navigation, Info } from "lucide-react";

export default function Venue() {
  const { t } = useLanguage();

  // Maps URL pointing to Amber Palace, Jaipur
  const mapEmbedUrl = "https://www.google.com/maps?q=Amrutham+Bagh+Resort+%26+Spa+Udaipur+Rajasthan&output=embed";
  const directionsUrl = "https://www.google.com/maps/place/Amrutham+Bagh+Resort+%26+Spa/@24.6491485,73.6438752,17z/data=!3m1!4b1!4m9!3m8!1s0x3967fb7f5c12ee05:0x2b19aba304afa5ec!5m2!4m1!1i2!8m2!3d24.6491485!4d73.6438752!16s%2Fg%2F11q45k1grv?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section
      id="venue"
      className="relative w-full py-24 md:py-32 bg-[#3c030a] text-white overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-gold-500 font-calligraphy-royal text-3xl md:text-4xl">
            {t.venue.subtitle}
          </span>
          <h2 className="font-serif-royal text-gold-300 text-3xl md:text-5xl font-bold tracking-wider mt-2 uppercase">
            {t.venue.title}
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/40 mt-4" />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Map Frame Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto rounded-2xl overflow-hidden border border-gold-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          >
            <iframe
              title="Wedding Venue Map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[300px] lg:min-h-[400px] border-0 filter invert-[90%] hue-rotate-[180deg] brightness-[95%] contrast-[95%]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-2/5 flex flex-col justify-between glass-dark p-8 rounded-2xl border border-gold-500/25 shadow-lg relative group overflow-hidden"
          >
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold-500/20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold-500/20 pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={24} className="text-gold-500" />
                <h3 className="font-serif-royal text-gold-300 text-xl md:text-2xl font-bold tracking-wide">
                  {t.venue.name}
                </h3>
              </div>

              {/* Address */}
              <p className="text-gold-100/90 text-sm leading-relaxed tracking-wide mb-8 font-light">
                {t.venue.address}
              </p>

              {/* Note */}
              <div className="flex gap-3 items-start p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 mb-8 text-xs text-gold-100/60 leading-relaxed">
                <Info size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <p>
                  {t.lang === "hi"
                    ? "कृपया ध्यान दें कि समारोह स्थल सिटी पैलेस, उदयपुर । मार्ग में यातायात के अनुसार अतिरिक्त समय लेकर चलें।"
                    : "Note: The venue is located Amrutham bagh resort.. Please plan your travel keeping traffic conditions in mind."}
                </p>
              </div>
            </div>

            {/* Directions button */}
            <motion.a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 text-maroon-900 rounded-full font-serif-royal text-xs md:text-sm tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)] transition-all duration-300 cursor-pointer uppercase border border-gold-300"
            >
              <Navigation size={15} />
              <span>{t.venue.directions}</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
