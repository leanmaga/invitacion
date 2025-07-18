import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// Crear el contexto
const AudioContext = createContext();

// Provider del contexto - este componente maneja TODO el audio
export const AudioProvider = ({
  children,
  audioSrc = "/AThousandYears.mp3",
}) => {
  // Estados del audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Referencia al elemento audio (SOLO UNO para toda la app)
  const audioRef = useRef(null);

  // Función para verificar el estado real del audio
  const checkAndSyncState = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Verificar si realmente está reproduciéndose
    const reallyPlaying = !audio.paused && !audio.ended;
    if (reallyPlaying !== isPlaying) {
      setIsPlaying(reallyPlaying);
    }

    // Verificar si ya cargó
    if (audio.readyState >= 2 && isLoading) {
      setIsLoading(false);
    }
  };

  // Configurar el audio cuando se monta el componente
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar volumen inicial
    audio.volume = volume;

    // Verificar estado cada 200ms
    const interval = setInterval(checkAndSyncState, 200);

    // Event listeners para sincronizar estado
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Intentar autoplay después de un momento
    setTimeout(() => {
      if (audio.readyState >= 2) {
        audio.play().catch(() => {
          // Si el autoplay falla (bloqueado por navegador), no pasa nada
          setIsLoading(false);
        });
      }
    }, 100);

    // Limpiar al desmontar
    return () => {
      clearInterval(interval);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Controlar el volumen cuando cambie
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Función para play/pause
  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.error("Error al reproducir audio:", err);
      setError(true);
    }
  };

  // Función para cambiar volumen
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Función para mutear/desmutear
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.7);
    } else {
      setIsMuted(true);
    }
  };

  // Valores que compartiremos con todos los componentes
  const audioContextValue = {
    // Estados
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    // Funciones
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
  };

  return (
    <AudioContext.Provider value={audioContextValue}>
      {/* El elemento audio ÚNICO - invisible para el usuario */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        loop
        playsInline
        crossOrigin="anonymous"
        style={{ display: "none" }}
      >
        Tu navegador no soporta el elemento audio.
      </audio>

      {/* Renderizar todos los hijos */}
      {children}
    </AudioContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio debe ser usado dentro de AudioProvider");
  }
  return context;
};
