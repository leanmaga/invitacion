"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Phone,
  Mail,
  Users,
  Utensils,
  Heart,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📱 NÚMERO DE WHATSAPP DESDE VARIABLES DE ENTORNO
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  // ⚠️ Validación de variables de entorno
  if (!WHATSAPP_NUMBER) {
    console.error(
      "❌ NEXT_PUBLIC_WHATSAPP_NUMBER no está configurado en .env.local"
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatWhatsAppMessage = (data) => {
    const guestText =
      data.guests === "1" ? "Solo yo" : `${data.guests} personas`;

    let message = `🎉 *CONFIRMACIÓN DE ASISTENCIA - QUINCEAÑERA ISABELLA*\n\n`;
    message += `👤 *Nombre:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;
    message += `📱 *Teléfono:* ${data.phone || "No proporcionado"}\n`;
    message += `👥 *Invitados:* ${guestText}\n`;

    if (data.dietary) {
      message += `🍽️ *Restricciones alimentarias:* ${data.dietary}\n`;
    }

    if (data.message) {
      message += `💌 *Mensaje para Isabella:* ${data.message}\n`;
    }

    message += `\n📅 *Fecha:* ${new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = (data) => {
    const message = formatWhatsAppMessage(data);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  const saveToDatabase = async (data) => {
    const { error } = await supabase.from("rsvp_confirmations").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        guests: parseInt(data.guests),
        dietary_restrictions: data.dietary || null,
        message: data.message || null,
      },
    ]);

    if (error) throw error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // 1. Guardar en base de datos
      await saveToDatabase(formData);

      // 2. Enviar por WhatsApp
      sendToWhatsApp(formData);

      // 3. Mostrar confirmación
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "1",
          dietary: "",
          message: "",
        });
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(
        "Hubo un error al guardar la confirmación. El WhatsApp se abrirá de todas formas."
      );

      // Enviar por WhatsApp aunque falle la BD
      sendToWhatsApp(formData);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // 🎉 PANTALLA DE CONFIRMACIÓN (cuando submitted = true)
  if (submitted) {
    return (
      <section
        id="rsvp"
        className="py-20 bg-gradient-to-br from-quince-50 to-gold-50"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12"
          >
            <Heart className="w-20 h-20 text-quince-500 mx-auto mb-6" />
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              ¡Confirmación Enviada!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Tu confirmación se envió por WhatsApp y se guardó en nuestro
              sistema. ¡No podemos esperar a celebrar contigo!
            </p>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-green-500" />
                <span>Confirmación enviada por WhatsApp</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-quince-500" />
                <span>Te contactaremos para detalles adicionales</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // 📝 FORMULARIO PRINCIPAL (cuando submitted = false)
  return (
    <section
      id="rsvp"
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
          <Send className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Por favor, confirma tu asistencia antes del 1 de abril para que
            podamos preparar todo perfectamente para ti.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-xl flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-quince-500" />
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-quince-500" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-quince-500" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="+54 11 2776-4823"
                />
              </div>

              {/* Number of guests */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-quince-500" />
                  Número de Invitados *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                >
                  <option value="1">Solo yo</option>
                  <option value="2">2 personas (yo + acompañante)</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5 personas</option>
                </select>
              </div>
            </div>

            {/* Dietary restrictions */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-quince-500" />
                Restricciones Alimentarias
              </label>
              <input
                type="text"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Vegetariano, sin gluten, alergias, etc."
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-quince-500" />
                Mensaje Especial para Isabella
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                placeholder="Comparte tus mejores deseos para Isabella en su día especial..."
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-quince-500 to-quince-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Confirmar Asistencia
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-gold-100 to-gold-200 rounded-2xl"
          >
            <p className="text-gray-700 text-center">
              <strong>Fecha límite para confirmar:</strong> 30 de Julio, 2025
              <br />
              Para preguntas, contacta a: +54 11 2776-4823
              <br />
              <span className="text-sm text-gray-600">
                📱 Tu confirmación se enviará automáticamente por WhatsApp y se
                guardará en nuestro sistema
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
