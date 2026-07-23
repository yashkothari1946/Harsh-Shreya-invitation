"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Palette } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const targetDate = new Date("2026-12-11T19:00:00");
  
  const pathname = usePathname();
  const router = useRouter();

const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

  const menuItems = [
    { id: "home", label: t.nav.home },
    { id: "story", label: t.nav.story },
    { id: "invitation", label: t.nav.invitation },
    { id: "events", label: t.nav.events },
    { id: "countdown", label: t.nav.countdown },
    { id: "venue", label: t.nav.venue },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }


      const scrollPosition = window.scrollY + 100;
      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
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

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
     className="fixed top-0 left-0 w-full z-50 bg-transparent py-5 transition-all duration-500"
    >
    <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
    <div
  onClick={() => handleLinkClick("home")}
  className="
    flex flex-col items-center justify-center
    cursor-pointer

    px-3 md:px-5
    py-2

    rounded-2xl

    border border-[#d4af37]/20

    bg-white/5
    backdrop-blur-xl

    shadow-[0_8px_30px_rgba(0,0,0,.15)]

    hover:bg-white/10
    transition-all
    duration-500

    relative
    overflow-hidden
  "
>
  {/* Shine */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent
      -translate-x-full
      animate-[shine_5s_linear_infinite]
    "
  />

  {/* Date */}
  <span
    className="
      relative
      z-10
      text-[#d4af37]
      text-[7px]
      md:text-[10px]
      uppercase
      tracking-[0.28em]
      font-semibold
    "
  >
    11 December 2026
  </span>

  {/* Countdown */}
  <span
    className="
      relative
      z-10

      mt-1

      text-white

      text-[11px]
      md:text-[14px]

      font-bold
      tracking-wide
      whitespace-nowrap
    "
  >
    {String(timeLeft.days).padStart(3, "0")} :
    {String(timeLeft.hours).padStart(2, "0")} :
    {String(timeLeft.minutes).padStart(2, "0")} :
    {String(timeLeft.seconds).padStart(2, "0")}
  </span>
</div>

        {/* Controls: Language Switch & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher Button */}
          {(pathname === "/bride" || pathname === "/bride-v2") && (
            <button
              onClick={() => router.push(pathname === "/bride" ? "/bride-v2" : "/bride")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 hover:bg-gold-500 text-maroon-900 hover:text-white transition-all duration-300 text-xs font-semibold cursor-pointer shadow-sm"
            >
              <Palette size={13} />
              <span className="hidden sm:inline">{pathname === "/bride" ? "Pastel Theme" : "Royal Theme"}</span>
              <span className="sm:hidden">{pathname === "/bride" ? "V2" : "V1"}</span>
            </button>
          )}

          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 hover:bg-gold-500 text-maroon-900 hover:text-white transition-all duration-300 text-xs font-semibold cursor-pointer shadow-sm"
          >
            <Globe size={13} />
            <span>{lang === "en" ? "हिंदी" : "EN"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
