"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, X } from "lucide-react";
import Image from "next/image";

const photos = [
  {
    id: 1,
    src: "/assets/preparativos.jpg",
    alt: "Momento especial 1",
    category: "preparativos",
  },
  {
    id: 2,
    src: "/assets/familia2.jpg",
    alt: "Momento especial 2",
    category: "familia",
  },
  {
    id: 3,
    src: "/assets/celebracion.jpg",
    alt: "Momento especial 3",
    category: "celebracion",
  },
  {
    id: 4,
    src: "/assets/preparativos2.jpg",
    alt: "Momento especial 4",
    category: "preparativos",
  },
  {
    id: 5,
    src: "/assets/familia2.jpg",
    alt: "Momento especial 5",
    category: "familia",
  },
  {
    id: 6,
    src: "/assets/celebracion2.jpg",
    alt: "Momento especial 6",
    category: "celebracion",
  },
];

const categories = ["todos", "preparativos", "familia", "celebracion"];

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos =
    selectedCategory === "todos"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Camera className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Galería de Momentos
          </h2>
          <p className="text-xl text-gray-600">
            Capturando la magia antes del gran día
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-quince-500 to-quince-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-quince-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    width={400}
                    height={400}
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-sm font-medium">
                        {photo.category.charAt(0).toUpperCase() +
                          photo.category.slice(1)}
                      </span>
                      <Heart className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <Image
                  width={800}
                  height={600}
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
