"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Navigation, Info } from "lucide-react";

export default function GroomVenue() {
  const { t } = useLanguage();

  const mapEmbedUrl =
    "https://www.google.com/maps?q=Amrutham+Bagh+Resort+%26+Spa+Udaipur+Rajasthan&output=embed";
  const directionsUrl =
    "https://www.google.com/maps/place/Amrutham+Bagh+Resort+%26+Spa/@24.6491485,73.6438752,17z/data=!3m1!4b1!4m9!3m8!1s0x3967fb7f5c12ee05:0x2b19aba304afa5ec!5m2!4m1!1i2!8m2!3d24.6491485!4d73.6438752!16s%2Fg%2F11q45k1grv?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section
      id="venue"
      className="relative w-full py-24 md:py-32 bg-gradient-to-b from-[#F5F0E8] to-[#FEFCF7] overflow-hidden"
    >
      {/* Decorative soft circles */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-[#B8952A]/4 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full bg-[#6B8F71]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[#B8952A] font-calligraphy-royal text-3xl md:text-4xl">
            {t.venue.subtitle}
          </span>
          <h2 className="font-serif-royal text-[#1B2340] text-3xl md:text-5xl font-bold tracking-wider mt-2 uppercase">
            {t.venue.title}
          </h2>
          <div className="w-16 h-[1px] bg-[#B8952A]/40 mt-4" />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto rounded-2xl overflow-hidden border border-[#B8952A]/30 shadow-[0_15px_40px_rgba(184,149,42,0.12)]"
          >
            <iframe
              title="Wedding Venue Map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[300px] lg:min-h-[400px] border-0"
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
            className="w-full lg:w-2/5 flex flex-col justify-between bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-[#B8952A]/25 shadow-[0_15px_40px_rgba(184,149,42,0.1)] relative overflow-hidden"
          >
            {/* Corner ornaments */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B8952A]/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B8952A]/30 pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin size={24} className="text-[#B8952A]" />
                <h3 className="font-serif-royal text-[#1B2340] text-xl md:text-2xl font-bold tracking-wide">
                  {t.venue.name}
                </h3>
              </div>

              <p className="text-[#3D3D4E] text-sm leading-relaxed tracking-wide mb-8 font-light">
                {t.venue.address}
              </p>

              <div className="flex gap-3 items-start p-4 rounded-xl bg-[#B8952A]/5 border border-[#B8952A]/15 mb-8 text-xs text-[#5A4A2E] leading-relaxed">
                <Info size={16} className="text-[#B8952A] shrink-0 mt-0.5" />
                <p>
                  Note: The venue is located at Amrutham Bagh Resort. Please plan
                  your travel keeping traffic conditions in mind.
                </p>
              </div>
            </div>

            <motion.a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(27,35,64,0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-[#1B2340] via-[#2A3A60] to-[#1B2340] text-white rounded-full font-serif-royal text-xs md:text-sm tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(27,35,64,0.2)] transition-all duration-300 cursor-pointer uppercase border border-[#2A3A60]"
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
