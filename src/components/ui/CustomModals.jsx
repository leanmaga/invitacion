"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, X, Trash2 } from "lucide-react";

// 🗑️ MODAL DE CONFIRMACIÓN PARA ELIMINAR
export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-quince-50/80 to-gold-50/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-quince-100 max-w-md w-full p-6 sparkle"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con icono de alerta */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-quince-100 to-quince-200 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
              <AlertTriangle className="w-6 h-6 text-quince-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 font-elegant">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-quince-500 to-quince-600 text-white rounded-xl font-semibold hover:from-quince-600 hover:to-quince-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ✅ TOAST DE ÉXITO
export function SuccessToast({ isVisible, message, onClose }) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -50, x: "-50%" }}
        className="fixed top-6 left-1/2 transform z-50"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-quince-200 p-4 min-w-[320px] sparkle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-quince-100 to-quince-300 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
              <CheckCircle className="w-6 h-6 text-quince-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 font-elegant">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-quince-400 hover:text-quince-600 transition-colors p-1 hover:bg-quince-50 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Barra de progreso opcional */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 4, ease: "linear" }}
            className="h-1 bg-gradient-to-r from-quince-300 to-quince-500 rounded-full mt-3"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// 🎵 MODAL ESPECÍFICO PARA CANCIONES
export function DeleteSongModal({
  isOpen,
  onClose,
  onConfirm,
  song,
  isDeleting,
}) {
  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="¿Eliminar canción?"
      message={
        song
          ? `Se eliminará permanentemente "${song.song_name}"${
              song.artist_name ? ` de ${song.artist_name}` : ""
            } de la lista de solicitudes.`
          : "Se eliminará esta canción de la lista de solicitudes."
      }
    />
  );
}

// 📝 MODAL ESPECÍFICO PARA CONFIRMACIONES
export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  confirmation,
}) {
  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="¿Eliminar confirmación?"
      message={
        confirmation
          ? `Se eliminará permanentemente la confirmación de ${
              confirmation.name
            } (${confirmation.email}) con ${confirmation.guests} invitado${
              confirmation.guests !== 1 ? "s" : ""
            }.`
          : "Se eliminará esta confirmación de RSVP."
      }
    />
  );
}

// 🎊 TOAST DE ERROR (opcional)
export function ErrorToast({ isVisible, message, onClose }) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -50, x: "-50%" }}
        className="fixed top-6 left-1/2 transform z-50"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-red-200 p-4 min-w-[320px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 font-elegant">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
