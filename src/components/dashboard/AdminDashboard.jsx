"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, RefreshCw, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  AdminLogin,
  AdminStats,
  AdminFilters,
  AdminConfirmationsTable,
  AdminSongsTable,
} from "@/components/dashboard"; // Ajustá la ruta según tu estructura

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error(
    "❌ NEXT_PUBLIC_ADMIN_PASSWORD no está configurado en .env.local"
  );
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const [confirmations, setConfirmations] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGuests, setFilterGuests] = useState("all");

  useEffect(() => {
    const auth = localStorage.getItem("admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadDashboardData();
    }
    setAuthLoading(false);
  }, []);

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

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { data: rsvpData, error: rsvpError } = await supabase
        .from("rsvp_confirmations")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: songsData, error: songsError } = await supabase
        .from("song_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (rsvpError) throw rsvpError;
      if (songsError) throw songsError;

      setConfirmations(rsvpData || []);
      setSongs(songsData || []);
      calculateStats(rsvpData || [], songsData || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const deleteConfirmation = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta confirmación?")) return;
    try {
      const { error } = await supabase
        .from("rsvp_confirmations")
        .delete()
        .eq("id", id);
      if (error) throw error;
      const updated = confirmations.filter((c) => c.id !== id);
      setConfirmations(updated);
      calculateStats(updated, songs);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSong = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta canción?")) return;
    try {
      const { error } = await supabase
        .from("song_requests")
        .delete()
        .eq("id", id);
      if (error) throw error;
      const updated = songs.filter((s) => s.id !== id);
      setSongs(updated);
      calculateStats(confirmations, updated);
    } catch (error) {
      console.error(error);
    }
  };

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
    const rows = confirmations.map((item) => [
      item.name,
      item.email,
      item.phone || "",
      item.guests,
      item.dietary_restrictions || "",
      item.message || "",
      new Date(item.created_at).toLocaleDateString("es-ES"),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((f) => `"${f}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `confirmaciones-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  const filteredConfirmations = confirmations.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone && item.phone.includes(searchTerm));

    const matchFilter =
      filterGuests === "all" ||
      (filterGuests === "1" && item.guests === 1) ||
      (filterGuests === "2+" && item.guests >= 2) ||
      (filterGuests === "dietary" && item.dietary_restrictions);

    return matchSearch && matchFilter;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-quince-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleLogin={handleLogin}
        authError={authError}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-quince-500" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Panel de Administración - Isabella
              </h1>
              <p className="text-sm text-gray-600">Gestión de confirmaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Actualizar
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <AdminStats stats={stats} />
        <AdminFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterGuests={filterGuests}
          setFilterGuests={setFilterGuests}
          exportToCSV={exportToCSV}
          hasData={confirmations.length > 0}
        />
        <AdminConfirmationsTable
          filteredConfirmations={filteredConfirmations}
          deleteConfirmation={deleteConfirmation}
        />
        <AdminSongsTable songs={songs} deleteSong={deleteSong} />
      </main>
    </div>
  );
}
