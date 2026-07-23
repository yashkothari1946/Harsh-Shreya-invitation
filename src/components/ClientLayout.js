"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <LenisProvider>
        {/* Global premium UI elements */}
        <ScrollProgress />
        <ScrollToTop />
        {children}
      </LenisProvider>
    </LanguageProvider>
  );
}
