"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Hash, Instagram, Copy, Check } from "lucide-react";

export default function HashtagSection() {
  const [copied, setCopied] = useState(false);
  const hashtag = "#Isabella15Años";

  const copyHashtag = () => {
    navigator.clipboard.writeText(hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialTips = [
    {
      title: "Comparte tus Fotos",
      description: "Usa nuestro hashtag oficial en todas tus publicaciones",
      icon: Camera,
    },
    {
      title: "Etiqueta a Isabella",
      description: "@isabella_quince para que pueda ver y compartir tus fotos",
      icon: Instagram,
    },
    {
      title: "Crea Recuerdos",
      description: "Todas las fotos serán recopiladas en un álbum especial",
      icon: Hash,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Hash className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Comparte la Magia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ayúdanos a capturar cada momento especial de esta noche única. Usa
            nuestro hashtag oficial y sé parte de los recuerdos eternos.
          </p>
        </motion.div>

        {/* Main Hashtag Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="glass rounded-3xl p-12 max-w-2xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
              <h3 className="font-elegant text-6xl md:text-7xl font-bold bg-gradient-to-r from-quince-500 to-gold-500 bg-clip-text text-transparent mb-4">
                {hashtag}
              </h3>
              <p className="text-gray-600 text-lg">
                ¡Úsalo en todas tus fotos y videos!
              </p>
            </motion.div>

            <motion.button
              onClick={copyHashtag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-quince-500 to-quince-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              {copied ? (
                <>
                  <Check className="w-6 h-6" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  Copiar Hashtag
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Social Tips */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {socialTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center p-8 bg-gradient-to-br from-quince-50 to-gold-50 rounded-2xl border border-quince-100 hover:border-quince-300 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-quince-400 to-quince-600 rounded-full mb-6"
              >
                <tip.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">
                {tip.title}
              </h3>

              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Photo Contest */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          <Camera className="w-16 h-16 mx-auto text-gold-500 mb-6" />
          <h3 className="font-serif text-3xl font-bold text-gray-800 mb-4">
            Concurso de Fotografía
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ¡Las mejores fotos con nuestro hashtag serán premiadas! Al final de
            la noche, anunciaremos al ganador del mejor momento capturado.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2">🥇 Primer Lugar</h4>
              <p className="text-gray-700">Sesión de fotos profesional</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-quince-100 to-quince-200 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2">🥈 Segundo Lugar</h4>
              <p className="text-gray-700">Album de fotos personalizado</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
              <h4 className="font-bold text-gray-800 mb-2">🥉 Tercer Lugar</h4>
              <p className="text-gray-700">Marco de fotos elegante</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
