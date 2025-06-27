"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Crown, Heart } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sparklePositions = [
    { left: "10%", top: "20%" },
    { left: "80%", top: "15%" },
    { left: "15%", top: "70%" },
    { left: "75%", top: "60%" },
    { left: "45%", top: "25%" },
    { left: "90%", top: "40%" },
    { left: "25%", top: "80%" },
    { left: "60%", top: "10%" },
    { left: "5%", top: "50%" },
    { left: "85%", top: "75%" },
    { left: "30%", top: "35%" },
    { left: "70%", top: "85%" },
    { left: "95%", top: "65%" },
    { left: "20%", top: "45%" },
    { left: "55%", top: "90%" },
    { left: "40%", top: "5%" },
    { left: "65%", top: "55%" },
    { left: "35%", top: "75%" },
    { left: "8%", top: "30%" },
    { left: "88%", top: "25%" },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          sparklePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              style={{
                left: position.left,
                top: position.top,
              }}
            >
              <Sparkles className="text-gold-400 w-4 h-4" />
            </motion.div>
          ))}
      </div>

      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Crown className="w-16 h-16 mx-auto text-gold-500 mb-4 animate-float" />
          <h1 className="font-elegant text-6xl md:text-8xl lg:text-9xl font-bold text-quince-600 mb-4">
            Isabella
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-quince-300 to-transparent w-20"></div>
            <Heart className="text-quince-400 w-6 h-6" />
            <div className="h-px bg-gradient-to-r from-transparent via-quince-300 to-transparent w-20"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-700 mb-2">
            Mis Quince Años
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Una celebración mágica que no puedes perderte
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8 max-w-md mx-auto backdrop-blur-md"
        >
          <div className="text-2xl md:text-3xl font-bold text-quince-600 mb-2">
            15 de Abril, 2024
          </div>
          <div className="text-lg text-gray-700 mb-4">7:00 PM</div>
          <div className="text-gray-600">Salón de Eventos Crystal</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-quince-500 to-quince-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 sparkle"
            onClick={() =>
              document
                .getElementById("details")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Descubre la Magia
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-quince-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-quince-400 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
