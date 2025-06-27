"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Heart, Send, Headphones } from "lucide-react";

export default function MusicRequests() {
  const [songRequest, setSongRequest] = useState("");
  const [artistRequest, setArtistRequest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songRequest.trim()) {
      // Here you would typically send the data to your backend
      console.log("Song request:", { songRequest, artistRequest, message });
      setSubmitted(true);
      setTimeout(() => {
        setSongRequest("");
        setArtistRequest("");
        setMessage("");
        setSubmitted(false);
      }, 3000);
    }
  };

  const popularSongs = [
    "Quinceañera - Cristian Castro",
    "Tiempo de Vals - Chayanne",
    "Mi Niña Bonita - Jesse & Joy",
    "Eres - Café Tacvba",
    "La Bikina - Luis Miguel",
    "Cielito Lindo - Tradicional",
  ];

  return (
    <section
      id="music"
      className="py-20 bg-gradient-to-br from-quince-50 to-gold-50"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Music className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pide tu Canción Favorita
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ayúdanos a crear la playlist perfecta para esta noche mágica. ¡Tu
            música favorita puede ser la que haga bailar a todos!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Headphones className="w-8 h-8 text-quince-500" />
              Solicita una Canción
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nombre de la Canción *
                  </label>
                  <input
                    type="text"
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all"
                    placeholder="Ej: Quinceañera"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Artista
                  </label>
                  <input
                    type="text"
                    value={artistRequest}
                    onChange={(e) => setArtistRequest(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all"
                    placeholder="Ej: Cristian Castro"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mensaje Especial (Opcional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all resize-none"
                    placeholder="¿Por qué es especial esta canción para ti?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-quince-500 to-quince-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar Solicitud
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <Heart className="w-16 h-16 text-quince-500 mx-auto mb-4" />
                <h4 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                  ¡Gracias por tu Solicitud!
                </h4>
                <p className="text-gray-600">
                  Tu canción ha sido agregada a nuestra lista. ¡Esperamos que
                  suene durante la fiesta!
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Popular Songs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                Canciones Populares
              </h3>
              <p className="text-gray-600 mb-6">
                Estas son algunas de las canciones más solicitadas para
                quinceañeras:
              </p>

              <div className="space-y-4">
                {popularSongs.map((song, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-all cursor-pointer"
                    onClick={() => {
                      const [songName, artist] = song.split(" - ");
                      setSongRequest(songName);
                      setArtistRequest(artist || "");
                    }}
                  >
                    <Music className="w-5 h-5 text-quince-400 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{song}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-gold-100 to-gold-200 rounded-2xl"
            >
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Music className="w-5 h-5 text-gold-600" />
                Nota Musical
              </h4>
              <p className="text-gray-700">
                Nuestro DJ profesional se encargará de crear el ambiente
                perfecto mezclando tus solicitudes con música tradicional y
                moderna para que todos disfruten.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
