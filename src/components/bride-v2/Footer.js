"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="relative w-full py-20 overflow-hidden border-t border-[#e8aebf]/40"
      style={{ background: "linear-gradient(180deg, #f5d8df 0%, #fae6ec 50%, #fdf2f4 100%)" }}
    >
      {/* Floating floral decor */}
      <div className="absolute top-4 left-6 text-5xl opacity-10 pointer-events-none select-none animate-pulse">🌸</div>
      <div className="absolute top-8 right-8 text-4xl opacity-10 pointer-events-none select-none">🌺</div>
      <div className="absolute bottom-4 left-1/4 text-4xl opacity-10 pointer-events-none select-none animate-bounce">🌷</div>
      <div className="absolute bottom-6 right-1/4 text-5xl opacity-10 pointer-events-none select-none">🏵️</div>

      {/* Soft blur blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#e8aebf]/20 blur-[60px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-6">
        {/* Floral divider icon */}
        <div className="w-16 h-16 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#e8aebf]/50 animate-[spin_40s_linear_infinite]" />
          <span className="text-2xl">🌸</span>
        </div>

        {/* Thank You Note */}
        <h3 className="font-calligraphy-royal text-[#7b2c45] text-3xl md:text-5xl leading-relaxed max-w-2xl">
          {t.footer.thankYou}
        </h3>

        {/* Couple names */}
        <p className="font-serif-royal text-[#d88c9f] text-sm tracking-[0.3em] uppercase">
          Harsh &amp; Shreya
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-[1px] bg-[#e8aebf]" />
          <Heart size={12} className="text-[#e8aebf] fill-current" />
          <div className="w-16 h-[1px] bg-[#e8aebf]" />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border-2 border-[#e8aebf] bg-white/60 flex items-center justify-center text-[#7b2c45] hover:bg-[#7b2c45] hover:text-white hover:border-[#7b2c45] transition-all duration-300 shadow-sm"
            aria-label="Instagram Link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href=""
            className="w-10 h-10 rounded-full border-2 border-[#e8aebf] bg-white/60 flex items-center justify-center text-[#7b2c45] hover:bg-[#7b2c45] hover:text-white hover:border-[#7b2c45] transition-all duration-300 shadow-sm"
            aria-label="Email Link"
          >
            <Mail size={17} />
          </a>
        </div>

        {/* Small Note */}
        <p className="text-[#96475d]/50 text-[10px] md:text-xs tracking-widest uppercase mt-2">
          {t.footer.madeWith}
        </p>

        {/* Copyright */}
        <p className="text-[#96475d]/30 text-[9px] md:text-[10px] tracking-wider">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
