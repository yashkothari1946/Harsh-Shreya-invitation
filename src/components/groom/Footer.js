"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Heart } from "lucide-react";

export default function GroomFooter() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full py-16 bg-[#F5F0E8] text-[#1B2340] overflow-hidden border-t border-[#B8952A]/20">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,149,42,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-8">
        {/* Botanical dots decoration */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-[#B8952A]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8952A]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#6B8F71]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8952A]/50" />
          <div className="w-12 h-px bg-[#B8952A]/30" />
        </div>

        {/* Spinning heart badge */}
        <div className="w-16 h-16 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#B8952A]/30 animate-[spin_40s_linear_infinite]" />
          <Heart size={16} className="text-[#B8952A] fill-current" />
        </div>

        {/* Thank you */}
        <h3 className="font-serif-royal text-[#1B2340] text-2xl md:text-3xl font-bold tracking-wider leading-relaxed max-w-2xl">
          {t.footer?.thankYou || "Thank you for being part of our special day"}
        </h3>

        {/* Social icons */}
        <div className="flex items-center gap-6 mt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#B8952A]/25 bg-[#B8952A]/5 flex items-center justify-center text-[#1B2340] hover:text-white hover:bg-[#1B2340] hover:border-[#1B2340] transition-all duration-300"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href=""
            className="w-10 h-10 rounded-full border border-[#B8952A]/25 bg-[#B8952A]/5 flex items-center justify-center text-[#1B2340] hover:text-white hover:bg-[#1B2340] hover:border-[#1B2340] transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-[#5A4A2E]/60 text-[10px] md:text-xs tracking-widest uppercase mt-4">
          {t.footer?.madeWith || "Made with love ♥"}
        </p>
        <p className="text-[#5A4A2E]/40 text-[9px] md:text-[10px] tracking-wider">
          {t.footer?.copyright || "© 2026 Harsh & Shreya. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
