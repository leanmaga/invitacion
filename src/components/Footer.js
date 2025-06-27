"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Crown,
  Sparkles,
  Instagram,
  Facebook,
  Apple as WhatsApp,
} from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  // Solo ejecutar en el cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Posiciones fijas para los sparkles flotantes (evita Math.random())
  const floatingSparklePositions = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "95%",
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "@isabella_quince" },
    { icon: Facebook, href: "#", label: "Isabella Quinceañera" },
    { icon: WhatsApp, href: "#", label: "+52 (555) 123-4567" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Crown className="w-12 h-12 mx-auto text-gold-400 mb-4" />
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-white mb-4">
            Isabella
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Gracias por ser parte de este momento tan especial en mi vida. Tu
            presencia hará que esta noche sea verdaderamente mágica.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
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
              <p>Familia García López</p>
              <p>+52 (555) 123-4567</p>
              <p>isabella.quince@email.com</p>
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
              <p>15 de Abril, 2024</p>
              <p>7:00 PM - 2:00 AM</p>
              <p>Salón Crystal</p>
              <p>Av. Principal 123</p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h3 className="font-serif text-xl font-bold mb-4 text-quince-300">
              Síguenos
            </h3>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 bg-quince-500 hover:bg-quince-400 rounded-full flex items-center justify-center transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-gray-300 text-sm">#Isabella15Años</p>
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
            <span>para Isabella • 2024</span>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted &&
          floatingSparklePositions.map((leftPosition, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                y: [0, -100, -200],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeOut",
              }}
              style={{
                left: leftPosition,
                top: "100%",
              }}
            >
              <Sparkles className="text-quince-400 w-3 h-3" />
            </motion.div>
          ))}
      </div>
    </footer>
  );
}
