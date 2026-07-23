"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/bride/Hero";
import Story from "@/components/OurStory";
import EventsScrolls from "@/components/bride/Events";
import InvitationCard from "@/components/bride/InvitationCard";
import MusicPlayer from "@/components/bride/MusicPlayer";
import Venue from "@/components/Venue";
import Footer from "@/components/Footer";
import Foot from "@/components/Foot";
import ScratchCardSection from "@/components/ScratchCard";

export default function GroomPage() {
   const [isPlaying, setIsPlaying] = useState(true);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fdfbf7]">

      <Navbar />

      <Hero />

      <Story />
      <InvitationCard/>
      <ScratchCardSection />
      <EventsScrolls/>

       <Venue />
      
        <Footer />
        <Foot />
         <MusicPlayer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
     

    </main>
  );
}