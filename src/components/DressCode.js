"use client";

import { motion } from "framer-motion";
import { Shirt, Sparkles, Crown, Heart } from "lucide-react";
import Image from "next/image";

const dressCodeOptions = [
  {
    title: "Caballeros",
    description: "Elegancia Formal",
    items: [
      "Traje oscuro (negro, azul marino o gris)",
      "Camisa blanca o de color claro",
      "Corbata o moño",
      "Zapatos de vestir",
    ],
    icon: Shirt,
    color: "from-gray-600 to-gray-800",
    image: "/assets/manTraje.jpg", // Ruta desde public/
  },
  {
    title: "Damas",
    description: "Glamour y Sofisticación",
    items: [
      "Vestido elegante largo o midi",
      "Colores: dorado, rosa, azul o blanco",
      "Evitar el negro (reservado para la quinceañera)",
      "Zapatos cómodos para bailar",
    ],
    icon: Crown,
    color: "from-quince-400 to-quince-600",
    image: "/assets/vestidoMujer.jpg", // Ruta desde public/
  },
];

export default function DressCode() {
  return (
    <section
      id="dresscode"
      className="py-20 bg-gradient-to-br from-quince-50 to-gold-50"
    >
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vístete para brillar en esta noche mágica. Tu elegancia
            complementará la belleza de la celebración.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {dressCodeOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  width={400}
                  height={300}
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-contain"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${option.color} opacity-70`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/20 backdrop-blur-md rounded-full p-4"
                  >
                    <option.icon className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-6 font-medium">
                  {option.description}
                </p>

                <ul className="space-y-3">
                  {option.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Heart className="w-5 h-5 text-quince-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-3xl text-center max-w-3xl mx-auto"
        >
          <h3 className="font-elegant text-3xl font-bold text-quince-600 mb-4">
            ¡Tu elegancia hará que la noche sea aún más especial!
          </h3>
          <p className="text-gray-700 text-lg mb-6">
            Recuerda que lo más importante es que te sientas cómodo(a) y
            seguro(a) para disfrutar al máximo de esta celebración única.
          </p>
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
