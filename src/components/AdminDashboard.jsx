"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Users,
  Download,
  Calendar,
  Utensils,
  Mail,
  Phone,
  Crown,
  RefreshCw,
  Trash2,
  Search,
  AlertCircle,
  Music,
} from "lucide-react";
import { supabase } from "../lib/supabase";

// 🔐 CONTRASEÑA DE ADMIN DESDE VARIABLES DE ENTORNO
const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "TU_CONTRASEÑA_AQUI";

// ⚠️ Validación de variables de entorno (DEBUG)
if (!process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
  console.error(
    "❌ NEXT_PUBLIC_ADMIN_PASSWORD no está configurado, usando fallback"
  );
  console.log("🔍 DEBUG - Variables disponibles:", {
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ? "EXISTE"
      : "NO EXISTE",
    ALL_ENV: Object.keys(process.env).filter((key) =>
      key.startsWith("NEXT_PUBLIC")
    ),
  });
}

export default function AdminDashboard() {
  // Estados de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  // Estados del dashboard
  const [confirmations, setConfirmations] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGuests, setFilterGuests] = useState("all");

  useEffect(() => {
    // Verificar si ya está autenticado
    const auth = localStorage.getItem("admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadDashboardData();
    }
    setAuthLoading(false);
  }, []);

  // 🔐 AUTENTICACIÓN
  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setAuthError("");
      loadDashboardData();
    } else {
      setAuthError("Contraseña incorrecta");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setPassword("");
    setConfirmations([]);
    setSongs([]);
  };

  // 📊 CARGAR DATOS
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Cargar confirmaciones RSVP
      const { data: rsvpData, error: rsvpError } = await supabase
        .from("rsvp_confirmations")
        .select("*")
        .order("created_at", { ascending: false });

      if (rsvpError) throw rsvpError;

      // Cargar canciones solicitadas (TODAS - sin filtro de aprobación)
      const { data: songsData, error: songsError } = await supabase
        .from("song_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (songsError) console.log("Error loading songs:", songsError);

      setConfirmations(rsvpData || []);
      setSongs(songsData || []);
      calculateStats(rsvpData || [], songsData || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📊 CALCULAR ESTADÍSTICAS
  const calculateStats = (rsvpData, songsData = songs) => {
    const totalGuests = rsvpData.reduce((sum, item) => sum + item.guests, 0);
    const withDietary = rsvpData.filter(
      (item) => item.dietary_restrictions
    ).length;
    const withMessages = rsvpData.filter((item) => item.message).length;
    const withPhone = rsvpData.filter((item) => item.phone).length;

    setStats({
      totalConfirmations: rsvpData.length,
      totalGuests,
      withDietary,
      withMessages,
      withPhone,
      totalSongs: songsData.length,
      avgGuestsPerConfirmation:
        rsvpData.length > 0 ? (totalGuests / rsvpData.length).toFixed(1) : 0,
    });
  };

  // 📤 EXPORTAR A CSV
  const exportToCSV = () => {
    const headers = [
      "Nombre",
      "Email",
      "Teléfono",
      "Invitados",
      "Restricciones",
      "Mensaje",
      "Fecha",
    ];
    const csvData = confirmations.map((item) => [
      item.name,
      item.email,
      item.phone || "",
      item.guests,
      item.dietary_restrictions || "",
      item.message || "",
      new Date(item.created_at).toLocaleDateString("es-ES"),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `confirmaciones-isabella-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  // 🗑️ ELIMINAR CONFIRMACIÓN
  const deleteConfirmation = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta confirmación?")) return;

    try {
      const { error } = await supabase
        .from("rsvp_confirmations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Actualizar estado local
      const updatedConfirmations = confirmations.filter(
        (item) => item.id !== id
      );
      setConfirmations(updatedConfirmations);
      calculateStats(updatedConfirmations, songs);
    } catch (error) {
      console.error("Error deleting confirmation:", error);
      alert("Error al eliminar la confirmación");
    }
  };

  // 🗑️ ELIMINAR CANCIÓN
  const deleteSong = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta canción?")) return;

    try {
      const { error } = await supabase
        .from("song_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Actualizar estado local
      const updatedSongs = songs.filter((item) => item.id !== id);
      setSongs(updatedSongs);
      calculateStats(confirmations, updatedSongs);
    } catch (error) {
      console.error("Error deleting song:", error);
      alert("Error al eliminar la canción");
    }
  };

  // 🔍 FILTRAR CONFIRMACIONES
  const filteredConfirmations = confirmations.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone && item.phone.includes(searchTerm));

    const matchesFilter =
      filterGuests === "all" ||
      (filterGuests === "1" && item.guests === 1) ||
      (filterGuests === "2+" && item.guests >= 2) ||
      (filterGuests === "dietary" && item.dietary_restrictions);

    return matchesSearch && matchesFilter;
  });

  // 🔐 PANTALLA DE LOGIN
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-quince-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
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

          {/* Botón para volver al sitio principal */}
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

  // 📊 DASHBOARD PRINCIPAL
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f472b6 #fdf2f8;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fdf2f8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f472b6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ec4899;
        }
        .message-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f472b6 #fdf2f8;
        }
        .message-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .message-scrollbar::-webkit-scrollbar-track {
          background: #fdf2f8;
          border-radius: 10px;
        }
        .message-scrollbar::-webkit-scrollbar-thumb {
          background: #f472b6;
          border-radius: 10px;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-quince-500 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  Admin - Isabella
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Gestión de confirmaciones
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <button
                onClick={loadDashboardData}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 text-sm"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Confirmaciones
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {stats.totalConfirmations}
                </p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-quince-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Total Invitados
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {stats.totalGuests}
                </p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Con Restricciones
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {stats.withDietary}
                </p>
              </div>
              <Utensils className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Canciones</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {stats.totalSongs || 0}
                </p>
              </div>
              <Music className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quince-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <select
                value={filterGuests}
                onChange={(e) => setFilterGuests(e.target.value)}
                className="px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quince-500 focus:border-transparent text-sm flex-1 sm:flex-none"
              >
                <option value="all">Todos</option>
                <option value="1">Solo 1 persona</option>
                <option value="2+">2+ personas</option>
                <option value="dietary">Con restricciones</option>
              </select>

              <button
                onClick={exportToCSV}
                disabled={confirmations.length === 0}
                className="bg-quince-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-quince-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
            </div>
          </div>
        </div>

        {/* Confirmations Table - Con altura fija y scroll */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Confirmaciones de Asistencia ({filteredConfirmations.length})
            </h2>
          </div>

          <div
            className="overflow-auto custom-scrollbar"
            style={{ maxHeight: "400px" }}
          >
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Invitado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Personas
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
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredConfirmations.map((confirmation) => (
                    <motion.tr
                      key={confirmation.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {confirmation.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {confirmation.email}
                        </div>
                        {confirmation.phone && (
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {confirmation.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-quince-100 text-quince-800">
                          {confirmation.guests}{" "}
                          {confirmation.guests === 1 ? "persona" : "personas"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {confirmation.dietary_restrictions ? (
                            <div
                              className="message-scrollbar overflow-y-auto"
                              style={{ maxHeight: "60px" }}
                            >
                              {confirmation.dietary_restrictions}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              Sin restricciones
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {confirmation.message ? (
                            <div
                              className="message-scrollbar overflow-y-auto"
                              style={{ maxHeight: "60px" }}
                              title={confirmation.message}
                            >
                              {confirmation.message}
                            </div>
                          ) : (
                            <span className="text-gray-400">Sin mensaje</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(confirmation.created_at).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteConfirmation(confirmation.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Eliminar confirmación"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredConfirmations.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm sm:text-base px-4">
                {searchTerm || filterGuests !== "all"
                  ? "No se encontraron confirmaciones con los filtros aplicados."
                  : "Aún no hay confirmaciones de asistencia."}
              </p>
            </div>
          )}
        </div>

        {/* Gestión de Canciones Solicitadas - Con altura fija y scroll */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              🎵 Canciones Solicitadas ({songs.length})
            </h2>
          </div>

          {songs.length > 0 ? (
            <div
              className="overflow-auto custom-scrollbar"
              style={{ maxHeight: "400px" }}
            >
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Canción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Artista
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
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {songs.map((song) => (
                      <motion.tr
                        key={song.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {song.song_name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {song.artist_name || (
                              <span className="text-gray-400">Sin artista</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {song.message ? (
                              <div
                                className="message-scrollbar overflow-y-auto"
                                style={{ maxHeight: "60px" }}
                                title={song.message}
                              >
                                {song.message}
                              </div>
                            ) : (
                              <span className="text-gray-400">Sin mensaje</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(song.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteSong(song.id)}
                            className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                            title="Eliminar canción"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <Music className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">
                Aún no hay canciones solicitadas.
              </p>
            </div>
          )}

          {/* Indicador de scroll */}
          {songs.length > 5 && (
            <div className="px-6 py-3 bg-gray-50 border-t text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <span>Desliza para ver más canciones</span>
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
        </div>
      </div>
    </div>
  );
}
