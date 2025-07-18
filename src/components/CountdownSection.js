"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { fechaEvento, horaEvento, nombre } = useQuinceaneraConfig();

  useEffect(() => {
    // Parsear la fecha del evento desde las variables de entorno
    const parseEventDate = () => {
      try {
        // Convertir fecha del formato "15 de Abril, 2024" a formato que Date pueda parsear
        const fechaLimpia = fechaEvento
          .replace(" de ", " ")
          .replace("Enero", "January")
          .replace("Febrero", "February")
          .replace("Marzo", "March")
          .replace("Abril", "April")
          .replace("Mayo", "May")
          .replace("Junio", "June")
          .replace("Julio", "July")
          .replace("Agosto", "August")
          .replace("Septiembre", "September")
          .replace("Octubre", "October")
          .replace("Noviembre", "November")
          .replace("Diciembre", "December");

        // Extraer la hora de inicio (ej: "7:00 PM" de "7:00 PM - 2:00 AM")
        const horaInicio = horaEvento.split(" - ")[0];

        // Combinar fecha y hora
        const fechaCompleta = `${fechaLimpia} ${horaInicio}`;

        return new Date(fechaCompleta).getTime();
      } catch (error) {
        console.error("Error parsing event date:", error);
        // Fecha de fallback: 1 año desde hoy
        const fallback = new Date();
        fallback.setFullYear(fallback.getFullYear() + 1);
        return fallback.getTime();
      }
    };

    const targetDate = parseEventDate();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        // Si el evento ya pasó, mostrar zeros
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaEvento, horaEvento]);

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  // Verificar si el evento ya pasó
  const eventPassed =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section className="py-20 bg-gradient-to-r from-quince-50 to-quince-400">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Clock className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {eventPassed
              ? "¡El Evento de " + nombre + " ya Pasó!"
              : "Cuenta Regresiva"}
          </h2>
          <p className="text-xl text-gray-600">
            {eventPassed
              ? "Esperamos que hayas disfrutado de esta celebración mágica"
              : "¡La fiesta de " + nombre + " está por comenzar!"}
          </p>
        </motion.div>

        {!eventPassed && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 backdrop-blur-md shadow-lg"
              >
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-quince-600 mb-2"
                >
                  {unit.value.toString().padStart(2, "0")}
                </motion.div>
                <div className="text-gray-700 font-medium uppercase tracking-wide">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 p-6 glass rounded-2xl max-w-2xl mx-auto"
        >
          <p className="text-lg text-gray-700 font-medium">
            {eventPassed
              ? `Gracias por ser parte de la celebración de ${nombre}. Los recuerdos durarán para siempre.`
              : "Cada momento cuenta cuando se trata de crear recuerdos mágicos"}
          </p>
        </motion.div>

        {/* Información del evento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="text-lg font-semibold text-quince-600 mb-2">
            {fechaEvento}
          </div>
          <div className="text-gray-600">{horaEvento}</div>
        </motion.div>
      </div>
    </section>
  );
}
