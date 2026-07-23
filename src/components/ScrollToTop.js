"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-[#d4af37] text-[#3c030a] shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.6)] hover:scale-110 transition-all duration-300"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#d4af37] animate-pulse-ring opacity-40" />
          <ArrowUp size={18} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
