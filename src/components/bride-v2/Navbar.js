"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Palette } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

export default function NavbarPastel() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const targetDate = new Date("2026-12-11T19:00:00");

  const pathname = usePathname();
  const router = useRouter();

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
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;
      if (difference <= 0) return;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-3 md:py-4 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#e8aebf]/40 shadow-[0_4px_30px_rgba(123,44,69,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo / Countdown */}
        <div
          onClick={() => handleLinkClick("home")}
          className="flex flex-col items-center cursor-pointer px-4 py-2 rounded-2xl border border-[#e8aebf]/40 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 shadow-sm"
        >
          <span className="text-[#d88c9f] text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-semibold">
            11 December 2026
          </span>
          <span className="text-[#7b2c45] text-[11px] md:text-sm font-bold tracking-wide whitespace-nowrap font-serif-royal mt-0.5">
            {String(timeLeft.days).padStart(3, "0")} :
            {String(timeLeft.hours).padStart(2, "0")} :
            {String(timeLeft.minutes).padStart(2, "0")} :
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`font-serif-royal text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer pb-0.5 ${
                activeSection === item.id
                  ? "text-[#7b2c45] border-b-2 border-[#e8aebf]"
                  : "text-[#96475d]/70 hover:text-[#7b2c45]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Switcher */}
          {(pathname === "/bride" || pathname === "/bride-v2") && (
            <button
              onClick={() => router.push(pathname === "/bride" ? "/bride-v2" : "/bride")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8aebf] bg-white/60 hover:bg-[#7b2c45] text-[#7b2c45] hover:text-white transition-all duration-300 text-xs font-semibold cursor-pointer shadow-sm"
            >
              <Palette size={12} />
              <span className="hidden sm:inline">{pathname === "/bride" ? "Pastel" : "Royal"}</span>
            </button>
          )}

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8aebf] bg-white/60 hover:bg-[#7b2c45] text-[#7b2c45] hover:text-white transition-all duration-300 text-xs font-semibold cursor-pointer shadow-sm"
          >
            <Globe size={12} />
            <span>{lang === "en" ? "हिंदी" : "EN"}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 rounded-full border border-[#e8aebf] bg-white/60 flex items-center justify-center text-[#7b2c45] cursor-pointer"
          >
            {isOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-[#e8aebf]/50 shadow-xl p-4 flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-serif-royal text-xs tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                activeSection === item.id
                  ? "bg-[#fdf2f4] text-[#7b2c45] font-semibold"
                  : "text-[#96475d]/80 hover:bg-[#fdf2f4]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
