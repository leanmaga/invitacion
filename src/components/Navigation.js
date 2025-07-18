"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music } from "lucide-react";
import MusicPlayer from "./MusicPlayer"; // Importar el nuevo componente

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Detalles", href: "#details" },
  { name: "Dress Code", href: "#dresscode" },
  { name: "Ubicación", href: "#location" },
  { name: "Música", href: "#music" },
  { name: "RSVP", href: "#rsvp" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil cuando se hace click en un enlace
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar fijo siempre arriba */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg backdrop-blur-md bg-white/80"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-coockie text-xl sm:text-2xl md:text-3xl font-bold text-quince-400 flex-shrink-0"
            >
              Cami
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    color: "var(--color-purple-500)",
                  }}
                  className="text-gray-700 hover:text-purple-500 font-medium transition-colors text-sm lg:text-base whitespace-nowrap px-3 py-2"
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Reproductor de música en desktop */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="ml-2 lg:ml-4"
              >
                {/* AHORA SOLO UNA INSTANCIA - todas estarán sincronizadas */}
                <MusicPlayer showVolumeControl={true} />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Reproductor de música en móvil */}
              <div>
                {/* ESTA instancia también estará sincronizada */}
                <MusicPlayer showVolumeControl={false} />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-purple-500 p-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
                style={{ top: "64px" }}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200"
              >
                <div className="px-4 py-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={handleLinkClick}
                      className="block py-3 px-3 text-gray-700 hover:text-purple-500 hover:bg-purple-50 font-medium rounded-lg transition-all"
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* Control de música adicional en menú móvil */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-2 mt-2 border-t border-gray-200"
                  >
                    <div className="py-2 px-3 text-gray-500 text-sm font-medium flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Music size={16} />
                      </motion.div>
                      Control de Música
                    </div>
                    <div className="px-3 py-2">
                      {/* Y ESTA instancia TAMBIÉN estará sincronizada */}
                      <MusicPlayer
                        className="w-full justify-center"
                        showVolumeControl={true}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer para compensar el navbar fijo */}
      <div className="h-16 md:h-20" />
    </>
  );
}
