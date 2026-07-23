"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full py-16 bg-[#3c030a] text-gold-300 overflow-hidden border-t border-gold-500/20">
      {/* Decorative center mandala */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-8">
        {/* Decorative divider logo */}
        <div className="w-16 h-16 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border border-dashed border-gold-500/30 animate-[spin_40s_linear_infinite]" />
          <Heart size={16} className="text-gold-500 fill-current" />
        </div>

        {/* Thank You Note */}
        <h3 className="font-serif-royal text-gold-500 text-2xl md:text-3.5xl font-bold tracking-wider leading-relaxed max-w-2xl">
          {t.footer.thankYou}
        </h3>

        {/* Social / Contact Icons */}
        <div className="flex items-center gap-6 mt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-300 hover:text-white hover:bg-gold-500 hover:border-gold-300 transition-all duration-300 shadow-inner"
            aria-label="Instagram Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href=""
            className="w-10 h-10 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-300 hover:text-white hover:bg-gold-500 hover:border-gold-300 transition-all duration-300 shadow-inner"
            aria-label="Email Link"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Small Note */}
        <p className="text-gold-100/50 text-[10px] md:text-xs tracking-widest uppercase mt-4">
          {t.footer.madeWith}
        </p>

        {/* Copyright */}
        <p className="text-gold-100/30 text-[9px] md:text-[10px] tracking-wider mt-2">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
