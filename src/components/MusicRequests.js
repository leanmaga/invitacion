"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Heart,
  Send,
  Headphones,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MusicRequests() {
  const [songRequest, setSongRequest] = useState("");
  const [artistRequest, setArtistRequest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para la base de datos
  const [dbSongs, setDbSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);

  // Cargar canciones al montar el componente
  useEffect(() => {
    loadSongs();

    // Suscripción en tiempo real para nuevas canciones
    const subscription = supabase
      .channel("song_requests")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "song_requests",
          filter: "approved=eq.true",
        },
        (payload) => {
          setDbSongs((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const loadSongs = async () => {
    try {
      setLoadingSongs(true);
      const { data, error } = await supabase
        .from("song_requests")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setDbSongs(data || []);
    } catch (error) {
      console.error("Error loading songs:", error);
    } finally {
      setLoadingSongs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songRequest.trim()) return;

    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("song_requests")
        .insert([
          {
            song_name: songRequest.trim(),
            artist_name: artistRequest.trim() || null,
            message: message.trim() || null,
            ip_address: null, // Podrías obtener la IP si quieres
            approved: true, // Auto-aprobar por ahora, puedes cambiar esto
          },
        ])
        .select();

      if (error) throw error;

      setSubmitted(true);

      setTimeout(() => {
        setSongRequest("");
        setArtistRequest("");
        setMessage("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting song:", error);
      setError(
        "Hubo un error al enviar tu solicitud. Por favor intenta de nuevo."
      );
    } finally {
      setLoading(false);
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
      <div className="max-w-6xl mx-auto px-4">
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
                {error && (
                  <div className="p-4 bg-red-100 border border-red-300 rounded-xl flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-quince-500 to-quince-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {loading ? "Enviando..." : "Enviar Solicitud"}
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

          {/* Songs Lists */}
          <div className="space-y-8">
            {/* Canciones solicitadas por usuarios */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8"
            >
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                <span>Canciones Solicitadas</span>
                <span className="text-sm bg-quince-100 text-quince-800 px-3 py-1 rounded-full">
                  {dbSongs.length} canciones
                </span>
              </h3>

              {loadingSongs ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-quince-500" />
                </div>
              ) : dbSongs.length > 0 ? (
                <div
                  className="space-y-3 overflow-y-auto pr-2"
                  style={{
                    height: "240px", // Altura fija para aproximadamente 3 canciones
                    scrollbarWidth: "thin",
                    scrollbarColor: "#f472b6 #fdf2f8",
                  }}
                >
                  {/* Custom scrollbar styles */}
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      width: 6px;
                    }
                    div::-webkit-scrollbar-track {
                      background: #fdf2f8;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: #f472b6;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: #ec4899;
                    }
                  `}</style>

                  <AnimatePresence>
                    {dbSongs.map((song, index) => (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-white/70 rounded-xl hover:bg-white/90 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <Music className="w-4 h-4 text-quince-400 flex-shrink-0 mt-1 group-hover:text-quince-600 transition-colors" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate group-hover:text-quince-700 transition-colors">
                              {song.song_name}
                            </p>
                            {song.artist_name && (
                              <p className="text-sm text-gray-600 truncate">
                                {song.artist_name}
                              </p>
                            )}
                            {song.message && (
                              <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">
                                {song.message}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(song.created_at).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Music className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Aún no hay canciones solicitadas. ¡Sé el primero!
                  </p>
                </div>
              )}

              {/* Indicador visual de más canciones */}
              {dbSongs.length > 3 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <span>Desliza para ver más canciones</span>
                    <svg
                      className="w-4 h-4 animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </p>
                </div>
              )}
            </motion.div>

            {/* Popular Songs */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8"
            >
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
            </motion.div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
