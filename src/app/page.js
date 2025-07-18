"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import EventDetails from "@/components/EventDetails";
import DressCode from "@/components/DressCode";
import MusicRequests from "@/components/MusicRequests";
import LocationSection from "@/components/LocationSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { AudioProvider } from "@/components/AudioContext";

export default function Home() {
  return (
    <AudioProvider audioSrc="/HayUnCuento.mp3">
      <div className="min-h-screen w-full overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen bg-gradient-to-br from-quince-50 via-white to-gold-50"
        >
          <Navigation />

          {/* Contenedor principal con control de ancho */}
          <main className="w-full overflow-x-hidden">
            <HeroSection />
            <CountdownSection />
            <EventDetails />
            <DressCode />
            <LocationSection />
            <MusicRequests />
            <RSVPSection />
            <Footer />
          </main>
        </motion.div>
      </div>
    </AudioProvider>
  );
}
