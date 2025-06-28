"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import PhotoGallery from "@/components/PhotoGallery";
import EventDetails from "@/components/EventDetails";
import DressCode from "@/components/DressCode";
import MusicRequests from "@/components/MusicRequests";
import LocationSection from "@/components/LocationSection";
import HashtagSection from "@/components/HashtagSection";
import RSVPSection from "@/components/RSVPSection";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
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
          <Timeline />
          <PhotoGallery />
          <DressCode />
          <LocationSection />
          <MusicRequests />
          <HashtagSection />
          <RSVPSection />
          <Footer />
        </main>
      </motion.div>
    </div>
  );
}
