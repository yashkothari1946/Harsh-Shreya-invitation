"use client";

import { useState } from "react";
import GroomNavbar from "@/components/groom/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/OurStory";
import Invitation from "@/components/groom/InvitationCard";
import WeddingEvents from "@/components/WeddingEvents";
import GroomScratchCard from "@/components/groom/ScratchCard";
import GroomVenue from "@/components/groom/Venue";
import GroomFooter from "@/components/groom/Footer";
import Foot from "@/components/Foot";
import MusicPlayer from "@/components/MusicPlayer";

export default function GroomPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FEFCF7]">

      <GroomNavbar />

      <Hero />

      <Story />

      <Invitation />

      <GroomScratchCard />

      <WeddingEvents />

      <GroomVenue />

      <GroomFooter />

      <Foot />

      <MusicPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

    </main>
  );
}