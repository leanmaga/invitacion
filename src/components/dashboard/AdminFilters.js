// src/components/dashboard/AdminFilters.js
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md px-6 py-4 mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Filtrar Datos
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={localFilters.name || ""}
            onChange={handleChange}
            placeholder="Buscar por nombre"
            className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Restricción
          </label>
          <input
            type="text"
            name="dietaryRestrictions"
            value={localFilters.dietaryRestrictions || ""}
            onChange={handleChange}
            placeholder="Buscar por restricción"
            className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </form>
    </motion.div>
  );
}
