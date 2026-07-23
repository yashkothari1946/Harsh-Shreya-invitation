"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function Gallery() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(null);

  const photos = [
    { src: "/images/gallery_decor.png", caption: "Traditional Mandap Decor" },
    { src: "/images/story_timeline.png", caption: "Couple Silhouette at Palace Sunset" },
    { src: "/images/hero_bg.png", caption: "Royal Backdrop Garlands" },
    { src: "/images/gallery_decor.png", caption: "Sacred Ceremonial Setup" },
    { src: "/images/story_timeline.png", caption: "Eternal Promises Silhouette" },
    { src: "/images/hero_bg.png", caption: "Palace Lighting & Decor" },
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-24 md:py-32 bg-[#fdfbf7] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="text-gold-700 font-calligraphy-royal text-3xl md:text-4xl">
            {t.gallery.subtitle}
          </span>
          <h2 className="font-serif-royal text-maroon-800 text-3xl md:text-5xl font-bold tracking-wider mt-2 uppercase">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/40 mt-4" />
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setActiveIdx(index)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold-500/20 shadow-md group cursor-pointer"
            >
              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-[#3c030a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-gold-500/90 text-maroon-900 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ZoomIn size={18} />
                </div>
              </div>

              {/* Photo Image */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent z-15 pointer-events-none">
                <p className="text-white font-serif-royal text-xs md:text-sm tracking-wider">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Gallery Image Display */}
            <div className="relative max-w-4xl max-h-[80vh] aspect-[4/3] w-full flex items-center justify-center select-none">
              <motion.img
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={photos[activeIdx].src}
                alt={photos[activeIdx].caption}
                className="max-w-full max-h-full object-contain rounded-lg border border-gold-500/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Text Caption */}
              <div className="absolute bottom-[-40px] left-0 w-full text-center">
                <p className="text-gold-300 font-serif-royal text-sm md:text-base tracking-widest uppercase">
                  {photos[activeIdx].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
