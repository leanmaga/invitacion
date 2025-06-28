// src/components/dashboard/AdminConfirmationsTable.js
"use client";

import { motion } from "framer-motion";
import { Users, X } from "lucide-react";

export default function AdminConfirmationsTable({
  filteredConfirmations,
  onDeleteConfirmation,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Confirmaciones de Asistencia ({filteredConfirmations?.length || 0})
        </h2>
      </div>

      {filteredConfirmations?.length > 0 ? (
        <div
          className="overflow-auto custom-scrollbar"
          style={{ maxHeight: "400px" }}
        >
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Invitados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Restricciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredConfirmations.map((guest) => (
                <motion.tr
                  key={guest.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {guest.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {guest.totalGuests}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {guest.dietaryRestrictions || (
                      <span className="text-gray-400">Ninguna</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(guest.created_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onDeleteConfirmation(guest.id)}
                      className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                      title="Eliminar confirmación"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Aún no hay confirmaciones de asistencia.
          </p>
        </div>
      )}
    </motion.div>
  );
}
