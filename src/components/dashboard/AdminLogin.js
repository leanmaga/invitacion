"use client";

import { motion } from "framer-motion";
import { Crown, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin({
  password,
  showPassword,
  authError,
  handleLogin,
  setPassword,
  setShowPassword,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-quince-50 to-gold-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Crown className="w-12 h-12 text-quince-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Quinceañera Isabella - Acceso Restringido
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña de Administrador
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent"
                placeholder="Ingresa la contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {authError && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{authError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-quince-500 to-quince-600 text-white py-3 rounded-xl font-semibold hover:from-quince-600 hover:to-quince-700 transition-all"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Sitio Principal
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Solo para administradores autorizados
        </div>
      </motion.div>
    </div>
  );
}
