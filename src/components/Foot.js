"use client";

export default function Foot() {
  return (
    <footer className="w-full bg-[#3b0008] border-t border-[#d4af37]/30 py-4 px-4">
      <div className="flex items-center justify-center gap-2">
        <span className="text-[#f8edd2]/70 text-sm">
          Developed by
        </span>

        <img
          src="/vybtek.jpg"
          alt="VybTek IT Solution"
          className="w-7 h-7 object-contain"
        />

        <a href="https://vybtek.com" target="_blank" rel="noopener noreferrer" className="text-[#f5d67b] text-sm font-semibold tracking-wide hover:underline cursor-pointer">
          VybTek IT Solutions Udaipur
        </a>
      </div>
    </footer>
  );
}