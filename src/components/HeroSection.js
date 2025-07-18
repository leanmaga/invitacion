// 1. HeroSection actualizado usando el componente
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";
import AnimatedButterflies from "@/components/AnimatedButterflies";

import Mariposa from "../../public/assets/mariposa_vectorizada.svg";

const Butterfly = ({ color = "text-purple-300", size = "w-6 h-6" }) => (
  <div className={`${size} ${color}`}>
    <Mariposa className="w-full h-full rotate-180" />
  </div>
);

export default function HeroSection() {
  const { nombre, edad, fechaEvento, horaEvento, lugar } =
    useQuinceaneraConfig();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Mariposas animadas de fondo */}
      <AnimatedButterflies
        count={20}
        animationDuration={4}
        delayBetweenButterflies={0.3}
      />

      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Crown className="w-16 h-16 mx-auto text-gold-500 mb-4 animate-float" />
          <h1 className="font-coockie text-6xl md:text-8xl lg:text-9xl font-bold text-quince-600 mb-4">
            {nombre}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-quince-300 to-transparent w-20"></div>
            <motion.div
              animate={{
                rotate: [180, 190, 170, 180],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Butterfly color="lila" size="w-8 h-8" />
            </motion.div>
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
            Mis {edad} Años
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Una celebración que no puedes perderte
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8 max-w-md mx-auto"
        >
          <div className="text-2xl md:text-3xl font-bold text-quince-600 mb-2">
            {fechaEvento}
          </div>
          <div className="text-lg text-gray-700 mb-4">
            {horaEvento.split(" - ")[0]}
          </div>
          <div className="text-gray-600">{lugar}</div>
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
