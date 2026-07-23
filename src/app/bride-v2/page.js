"use client";

import { useState } from "react";
import Navbar from "@/components/bride-v2/Navbar";
import Hero from "@/components/bride-v2/Hero";
import Story from "@/components/bride-v2/OurStory";
import EventsScrolls from "@/components/bride-v2/Events";
import InvitationCard from "@/components/bride-v2/InvitationCard";
import MusicPlayer from "@/components/bride-v2/MusicPlayer";
import Venue from "@/components/bride-v2/Venue";
import Footer from "@/components/bride-v2/Footer";
import Foot from "@/components/Foot";
import ScratchCardSection from "@/components/ScratchCard";

export default function BrideV2Page() {
   const [isPlaying, setIsPlaying] = useState(true);
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "#fdf2f4" }}>

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