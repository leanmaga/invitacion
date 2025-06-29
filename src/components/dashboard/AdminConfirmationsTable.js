// src/components/dashboard/AdminConfirmationsTable.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Trash2, Loader2, Mail, Phone, UserCheck } from "lucide-react";

export default function AdminConfirmationsTable({
  filteredConfirmations,
  deleteConfirmation,
  isDeleting = false,
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
          👥 Confirmaciones de Asistencia ({filteredConfirmations?.length || 0})
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
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Invitados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Restricciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mensaje
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
              <AnimatePresence>
                {filteredConfirmations.map((guest) => (
                  <motion.tr
                    key={guest.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-quince-100 to-quince-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserCheck className="w-4 h-4 text-quince-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {guest.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-xs">{guest.email}</span>
                        </div>
                        {guest.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs">{guest.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-quince-100 text-quince-800">
                        {guest.guests}{" "}
                        {guest.guests === 1 ? "persona" : "personas"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {guest.dietary_restrictions ? (
                        <div
                          className="overflow-y-auto bg-amber-50 text-amber-800 px-2 py-1 rounded-lg text-xs"
                          style={{ maxHeight: "40px" }}
                          title={guest.dietary_restrictions}
                        >
                          {guest.dietary_restrictions}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Ninguna</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {guest.message ? (
                        <div
                          className="overflow-y-auto bg-blue-50 text-blue-800 px-2 py-1 rounded-lg text-xs"
                          style={{ maxHeight: "50px" }}
                          title={guest.message}
                        >
                          {guest.message}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Sin mensaje
                        </span>
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
                        onClick={() => deleteConfirmation(guest.id)}
                        disabled={isDeleting}
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar confirmación"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
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

      {filteredConfirmations?.length > 5 && (
        <div className="px-6 py-3 bg-gray-50 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span>Desliza para ver más confirmaciones</span>
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
  );
}
