"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <MapPin className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Ubicación del Evento
          </h2>
          <p className="text-xl text-gray-600">
            Un lugar mágico para una noche inolvidable
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="font-serif text-3xl font-bold text-gray-800 mb-6">
                Salón de Eventos Crystal
              </h3>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-quince-50 transition-colors"
                >
                  <MapPin className="w-6 h-6 text-quince-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Dirección
                    </h4>
                    <p className="text-gray-600">
                      Av. Principal 123, Colonia Elegante
                      <br />
                      Ciudad Mágica, CP 12345
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-quince-50 transition-colors"
                >
                  <Phone className="w-6 h-6 text-quince-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Contacto
                    </h4>
                    <p className="text-gray-600">
                      +52 (555) 123-4567
                      <br />
                      eventos@crystalsalon.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-quince-50 transition-colors"
                >
                  <Clock className="w-6 h-6 text-quince-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Horario
                    </h4>
                    <p className="text-gray-600">
                      Recepción: 7:00 PM
                      <br />
                      Evento hasta: 2:00 AM
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-quince-500 to-quince-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={() =>
                    window.open("https://maps.google.com", "_blank")
                  }
                >
                  <Navigation className="w-5 h-5 inline mr-2" />
                  Ver en Google Maps
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border-2 border-quince-500 text-quince-600 px-6 py-3 rounded-full font-semibold hover:bg-quince-50 transition-all duration-300"
                  onClick={() => window.open("https://waze.com", "_blank")}
                >
                  Abrir en Waze
                </motion.button>
              </div>
            </div>

            {/* Parking Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-gold-100 to-gold-200 rounded-2xl"
            >
              <h4 className="font-semibold text-gray-800 mb-2">
                Información de Estacionamiento
              </h4>
              <p className="text-gray-700">
                Estacionamiento gratuito disponible para todos los invitados.
                Servicio de valet parking incluido para mayor comodidad.
              </p>
            </motion.div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-quince-100 to-gold-100 rounded-3xl overflow-hidden shadow-xl">
              {/* Map placeholder - In a real app, you'd use Google Maps API */}
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-quince-500 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                    Salón Crystal
                  </h3>
                  <p className="text-gray-600">
                    Haz clic para ver el mapa interactivo
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-8 h-8 border-2 border-gold-400 border-dashed rounded-full"
                  ></motion.div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-quince-400 rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Click overlay */}
              <motion.div
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/20 opacity-0 transition-opacity cursor-pointer flex items-center justify-center"
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="font-semibold text-gray-800">
                    Ver Mapa Completo
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
