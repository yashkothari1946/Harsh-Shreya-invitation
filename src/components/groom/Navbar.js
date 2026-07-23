"use client";

import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GroomNavbar() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const targetDate = new Date("2026-12-11T19:00:00");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const menuItems = [
    { id: "home", label: t.nav.home },
    { id: "story", label: t.nav.story },
    { id: "invitation", label: t.nav.invitation },
    { id: "events", label: t.nav.events },
    { id: "venue", label: t.nav.venue },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top && scrollPosition < top + el.offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]);

  useEffect(() => {
    const update = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleLinkClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-[#FEFCF7]/95 backdrop-blur-xl border-b border-[#B8952A]/20 shadow-[0_4px_20px_rgba(184,149,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo / Countdown Badge */}
        <div
          onClick={() => handleLinkClick("home")}
          className="flex flex-col items-center justify-center cursor-pointer px-3 md:px-5 py-2 rounded-2xl border border-[#B8952A]/30 bg-white/70 backdrop-blur-xl shadow-[0_4px_15px_rgba(184,149,42,0.1)] hover:bg-white/90 transition-all duration-500"
        >
          <span className="text-[7px] md:text-[10px] uppercase tracking-[0.28em] font-semibold text-[#B8952A]">
            11 December 2026
          </span>
          <span className="mt-1 text-[11px] md:text-[14px] font-bold tracking-wide whitespace-nowrap text-[#1B2340]">
            {String(timeLeft.days).padStart(3, "0")} :{String(timeLeft.hours).padStart(2, "0")} :{String(timeLeft.minutes).padStart(2, "0")} :{String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Nav Links — desktop hidden for now, language shown */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? "text-[#B8952A]"
                  : "text-[#1B2340]/70 hover:text-[#B8952A]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B8952A]/40 bg-[#B8952A]/8 hover:bg-[#B8952A] text-[#1B2340] hover:text-white transition-all duration-300 text-xs font-semibold cursor-pointer"
          >
            <Globe size={13} />
            <span>{lang === "en" ? "हिंदी" : "EN"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
