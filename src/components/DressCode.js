"use client";

import { motion } from "framer-motion";
import { Shirt, Sparkles, Crown } from "lucide-react";
import Image from "next/image";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";
import AnimatedButterflies from "./AnimatedButterflies";

export default function DressCode() {
  const { nombre } = useQuinceaneraConfig();

  return (
    <section
      id="dresscode"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >
      <AnimatedButterflies
        count={20}
        animationDuration={4}
        delayBetweenButterflies={0.3}
      />

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Sparkles className="w-12 h-12 mx-auto text-gold-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Código de Vestimenta
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Contenedor unificado con glassmorfismo auténtico */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-intense rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-3 items-stretch min-h-[400px]">
              {/* Caballeros - Izquierda */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-8 border-r border-quince-200/30 flex flex-col justify-center"
              >
                {/* Imagen del caballero */}
                <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
                  <Image
                    width={300}
                    height={250}
                    src="/assets/manTraje.jpg"
                    alt="Caballeros"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-elegant-800/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white/20 backdrop-blur-md rounded-full p-3"
                    >
                      <Shirt className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-3xl font-bold text-elegant-800 mb-4">
                    Caballeros
                  </h3>
                </div>
              </motion.div>

              {/* Centro - "Elegante" */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-quince-50/50 to-gold-50/50"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-8"
                >
                  <Crown className="w-20 h-20 text-gold-500" />
                </motion.div>

                <h2 className="font-coockie text-4xl font-bold text-gradient-quince mb-6">
                  Elegante
                </h2>
              </motion.div>

              {/* Damas - Derecha */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="p-8 border-l border-quince-200/30 flex flex-col justify-center"
              >
                {/* Imagen de la dama */}
                <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
                  <Image
                    width={300}
                    height={250}
                    src="/assets/vestidoMujer.jpg"
                    alt="Damas"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-quince-600/70 to-transparent"></div>
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white/20 backdrop-blur-md rounded-full p-3"
                    >
                      <Crown className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-3xl font-bold text-elegant-800 mb-4">
                    Damas
                  </h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-3xl text-center max-w-3xl mx-auto p-8"
        >
          <h3 className="font-elegant text-2xl font-bold text-quince-600 mb-4">
            Recuerda que lo más importante es que te sientas cómodo(a) y
            seguro(a) para disfrutar al máximo de esta celebración única.
          </h3>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-quince-300 to-transparent w-20"></div>
            <Sparkles className="text-gold-400 w-6 h-6" />
            <div className="h-px bg-gradient-to-r from-transparent via-quince-300 to-transparent w-20"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
