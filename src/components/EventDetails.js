"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const details = [
  {
    icon: Calendar,
    title: "Fecha",
    value: "Sábado, 15 de Abril 2024",
    description: "Una fecha especial para una ocasión especial",
  },
  {
    icon: Clock,
    title: "Hora",
    value: "7:00 PM - 2:00 AM",
    description: "Una noche llena de celebración y alegría",
  },
  {
    icon: MapPin,
    title: "Lugar",
    value: "Salón de Eventos Crystal",
    description: "Av. Principal 123, Ciudad Mágica",
  },
  {
    icon: Users,
    title: "Capacidad",
    value: "150 Invitados",
    description: "Espacio elegante para todos nuestros seres queridos",
  },
];

export default function EventDetails() {
  return (
    <section id="details" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Detalles del Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber para ser parte de esta celebración única
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-6 rounded-2xl border border-quince-100 hover:border-quince-300 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-quince-50"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-quince-400 to-quince-600 rounded-full mb-4"
              >
                <detail.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
                {detail.title}
              </h3>

              <p className="text-lg font-semibold text-quince-600 mb-2">
                {detail.value}
              </p>

              <p className="text-gray-600 text-sm">{detail.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-3xl text-center"
        >
          <h3 className="font-elegant text-3xl font-bold text-quince-600 mb-4">
            ¡Tu presencia es el mejor regalo!
          </h3>
          <p className="text-gray-700 text-lg">
            Acompáñanos en esta noche mágica llena de música, baile y momentos
            inolvidables
          </p>
        </motion.div>
      </div>
    </section>
  );
}
