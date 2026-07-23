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

        <span className="text-[#f5d67b] text-sm font-semibold tracking-wide">
          VybTek IT Solutions Udaipur
        </span>
      </div>
    </footer>
  );
}