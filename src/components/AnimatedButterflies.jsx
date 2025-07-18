"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Mariposa from "../../public/assets/mariposa_vectorizada.svg";

const Butterfly = ({ color = "text-purple-300", size = "w-6 h-6" }) => (
  <div className={`${size} ${color}`}>
    <Mariposa className="w-full h-full rotate-180" />
  </div>
);

// Función para generar posiciones aleatorias de mariposas
const generateButterflyPositions = (count = 20) => {
  const positions = [];
  const sizes = ["w-6 h-6", "w-7 h-7", "w-8 h-8"];
  const colors = [
    "text-purple-300",
    "text-pink-300",
    "text-blue-300",
    "text-indigo-300",
  ];

  for (let i = 0; i < count; i++) {
    positions.push({
      left: `${Math.random() * 90 + 5}%`, // Entre 5% y 95%
      top: `${Math.random() * 80 + 10}%`, // Entre 10% y 90%
      size: sizes[Math.floor(Math.random() * sizes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  return positions;
};

// Posiciones predefinidas (las originales de tu código)
const defaultPositions = [
  { left: "10%", top: "20%", size: "w-8 h-8", color: "text-purple-300" },
  { left: "80%", top: "15%", size: "w-6 h-6", color: "text-pink-300" },
  { left: "15%", top: "70%", size: "w-7 h-7", color: "text-blue-300" },
  { left: "75%", top: "60%", size: "w-8 h-8", color: "text-indigo-300" },
  { left: "45%", top: "25%", size: "w-6 h-6", color: "text-purple-300" },
  { left: "90%", top: "40%", size: "w-7 h-7", color: "text-pink-300" },
  { left: "25%", top: "80%", size: "w-8 h-8", color: "text-blue-300" },
  { left: "60%", top: "10%", size: "w-6 h-6", color: "text-indigo-300" },
  { left: "5%", top: "50%", size: "w-7 h-7", color: "text-purple-300" },
  { left: "85%", top: "75%", size: "w-8 h-8", color: "text-pink-300" },
  { left: "30%", top: "35%", size: "w-6 h-6", color: "text-blue-300" },
  { left: "70%", top: "85%", size: "w-7 h-7", color: "text-indigo-300" },
  { left: "95%", top: "65%", size: "w-8 h-8", color: "text-purple-300" },
  { left: "20%", top: "45%", size: "w-6 h-6", color: "text-pink-300" },
  { left: "55%", top: "90%", size: "w-7 h-7", color: "text-blue-300" },
  { left: "40%", top: "5%", size: "w-8 h-8", color: "text-indigo-300" },
  { left: "65%", top: "55%", size: "w-6 h-6", color: "text-purple-300" },
  { left: "35%", top: "75%", size: "w-7 h-7", color: "text-pink-300" },
  { left: "8%", top: "30%", size: "w-8 h-8", color: "text-blue-300" },
  { left: "88%", top: "25%", size: "w-6 h-6", color: "text-indigo-300" },
];

export default function AnimatedButterflies({
  count = 20,
  useRandomPositions = false,
  customPositions = null,
  animationDuration = 4,
  delayBetweenButterflies = 0.3,
  className = "",
  zIndex = "z-0",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determinar qué posiciones usar
  const getPositions = () => {
    if (customPositions) return customPositions;
    if (useRandomPositions) return generateButterflyPositions(count);
    return defaultPositions.slice(0, count);
  };

  const butterflyPositions = getPositions();

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${zIndex} ${className}`}>
      {butterflyPositions.map((butterfly, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            delay: i * delayBetweenButterflies,
            ease: "easeInOut",
          }}
          style={{
            left: butterfly.left,
            top: butterfly.top,
          }}
        >
          <Butterfly
            color={butterfly.color || "text-purple-300"}
            size={butterfly.size || "w-6 h-6"}
          />
        </motion.div>
      ))}
    </div>
  );
}
