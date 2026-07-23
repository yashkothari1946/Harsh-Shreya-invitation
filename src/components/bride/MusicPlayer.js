"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/music2.mp3.mpeg");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay block or failure: ", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  const toggleMute = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setMuted(false);
    } else {
      setMuted(!muted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Soundwaves animation */}
      {isPlaying && !muted && (
        <div className="flex items-end gap-[3px] h-5 px-2 bg-black/30 backdrop-blur-md rounded-full border border-gold-500/20">
          <span className="w-[3px] bg-gold-500 rounded-full animate-bounce h-2" style={{ animationDuration: "0.8s" }}></span>
          <span className="w-[3px] bg-gold-500 rounded-full animate-bounce h-4" style={{ animationDuration: "0.5s" }}></span>
          <span className="w-[3px] bg-gold-500 rounded-full animate-bounce h-3" style={{ animationDuration: "0.7s" }}></span>
          <span className="w-[3px] bg-gold-500 rounded-full animate-bounce h-1" style={{ animationDuration: "0.6s" }}></span>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleMute}
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 cursor-pointer shadow-lg shadow-black/20 ${
          isPlaying && !muted
            ? "bg-gold-500 border-gold-300 text-maroon-900 animate-[spin_8s_linear_infinite]"
            : "bg-maroon-800 border-gold-500/40 text-gold-300 hover:bg-maroon-900"
        }`}
        aria-label="Toggle Music"
      >
        {isPlaying && !muted ? (
          <Volume2 size={20} className="animate-pulse" />
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </div>
  );
}
