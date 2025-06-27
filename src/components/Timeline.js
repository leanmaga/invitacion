"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Music,
  Camera,
  Utensils,
  Cake,
  PartyPopper,
} from "lucide-react";

const timelineEvents = [
  {
    time: "7:00 PM",
    title: "Recepción y Cóctel",
    description: "Bienvenida con bebidas y aperitivos",
    icon: Clock,
    color: "from-quince-400 to-quince-600",
  },
  {
    time: "8:00 PM",
    title: "Ceremonia de Presentación",
    description: "Entrada triunfal de la quinceañera",
    icon: PartyPopper,
    color: "from-gold-400 to-gold-600",
  },
  {
    time: "8:30 PM",
    title: "Vals de Honor",
    description: "Baile tradicional con el padre",
    icon: Music,
    color: "from-quince-400 to-quince-600",
  },
  {
    time: "9:00 PM",
    title: "Sesión de Fotos",
    description: "Capturando momentos mágicos",
    icon: Camera,
    color: "from-gold-400 to-gold-600",
  },
  {
    time: "9:30 PM",
    title: "Cena Especial",
    description: "Menú gourmet para todos los invitados",
    icon: Utensils,
    color: "from-quince-400 to-quince-600",
  },
  {
    time: "11:00 PM",
    title: "Corte de Pastel",
    description: "Momento dulce y especial",
    icon: Cake,
    color: "from-gold-400 to-gold-600",
  },
  {
    time: "11:30 PM",
    title: "¡Fiesta hasta el Amanecer!",
    description: "Música, baile y diversión",
    icon: PartyPopper,
    color: "from-quince-400 to-quince-600",
  },
];

export default function Timeline() {
  return (
    <section className="py-20 bg-gradient-to-br from-quince-50 to-gold-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Cronograma de la Noche
          </h2>
          <p className="text-xl text-gray-600">
            Cada momento planeado para crear recuerdos inolvidables
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-quince-300 to-gold-300 rounded-full"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-start mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center shadow-lg z-10`}
              >
                <event.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="ml-8 flex-1 glass rounded-2xl p-6 backdrop-blur-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-800">
                    {event.title}
                  </h3>
                  <span className="text-lg font-semibold text-quince-600 bg-quince-100 px-3 py-1 rounded-full">
                    {event.time}
                  </span>
                </div>
                <p className="text-gray-700">{event.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 p-6 glass rounded-2xl text-center"
        >
          <p className="text-lg text-gray-700 font-medium">
            Una noche perfectamente orquestada para celebrar 15 años de alegría
            y el comienzo de nuevos sueños
          </p>
        </motion.div>
      </div>
    </section>
  );
}
