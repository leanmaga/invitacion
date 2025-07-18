"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Crown, Sparkles, Apple as WhatsApp } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";
import AnimatedButterflies from "./AnimatedButterflies";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { nombre, telefono, fechaEvento, horaEvento, lugar, direccion } =
    useQuinceaneraConfig();

  // Solo ejecutar en el cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
      <AnimatedButterflies
        count={20}
        animationDuration={4}
        delayBetweenButterflies={0.3}
      />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Crown className="w-12 h-12 mx-auto text-gold-400 mb-4" />
          <h2 className="font-coockie text-4xl md:text-5xl font-bold text-white mb-4">
            {nombre}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Gracias por ser parte de este momento tan especial en mi vida.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-12 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="font-serif text-xl font-bold mb-4 text-quince-300">
              Información de Contacto
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>{telefono}</p>
            </div>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-serif text-xl font-bold mb-4 text-quince-300">
              Detalles del Evento
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>{fechaEvento}</p>
              <p>{horaEvento}</p>
              <p>{lugar}</p>
              <p>{direccion}</p>
            </div>
          </motion.div>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-quince-400 to-transparent w-32"></div>
          <Sparkles className="mx-4 text-gold-400 w-6 h-6" />
          <div className="h-px bg-gradient-to-r from-transparent via-quince-400 to-transparent w-32"></div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Una princesa no necesita ser salvada. Ella puede salvarse a sí
            misma.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-quince-400" />
            <span>
              para {nombre} • {new Date().getFullYear()}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
