"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { obtenerNotificacionesDB } from "@/services/notificaciones";
import { useUserStore } from "@/stores/userStore";
import { marcarNotificacionLeidaDB } from "@/services/notificaciones";
import { marcarTodasNotificacionesLeidasDB } from "@/services/notificaciones";
import { eliminarNotificacionDB } from "@/services/notificaciones";

// Tipos
interface Notification {
  NotificationId: number;
  UserId: number;
  EventId: number;
  Message: string;
  IsRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationsContextType {
  notificaciones: Notification[];
  notificacionesNoLeidas: number;
  marcarComoLeida: (id: number) => void;
  marcarTodasComoLeidas: () => void;
  eliminarNotificacion: (id: number) => void;
  setNotificaciones: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [initialized, setInitialized] = useState(false); // ✅ evitar bucles infinitos

  useEffect(() => {
    const cargarUsuarioYNotificaciones = async () => {
      let userId = user?.id || user?.id;

      if (!userId) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("👤 Usuario cargado desde localStorage en NotificationsProvider:", parsedUser);
          setUser(parsedUser);
          userId = parsedUser.UserId || parsedUser.id;
        }
      }

      console.log("🔄 Cargando notificaciones para el usuario:", userId);

      if (userId) {
        const notis = await obtenerNotificacionesDB(userId.toString());
        console.log("📥 Notificaciones recibidas:", notis);
        setNotificaciones(notis);
        localStorage.setItem("notificaciones", JSON.stringify(notis));
      } else {
        console.warn("⚠️ No hay usuario aún, no se cargan notificaciones.");
      }

      setInitialized(true); // ✅ evitar repetir ejecución
    };

    // solo ejecuta si no se inicializó ya
    if (!initialized) {
      cargarUsuarioYNotificaciones();
    }
  }, [initialized]); // ✅ evitar bucles al no depender directamente de `user`

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.IsRead).length;

  const marcarComoLeida = async (id: number) => {
    try {
      const ok = await marcarNotificacionLeidaDB(id);
      if (ok) {
        const actualizadas = notificaciones.map((n) =>
          n.NotificationId === id ? { ...n, IsRead: true } : n
        );
        setNotificaciones(actualizadas);
        localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
      }
    } catch (error) {
      console.error("❌ Error marcando como leída:", error);
    }
  };

  const marcarTodasComoLeidas = async () => {
    const userId = user?.UserId || user?.id; // <- asegúrate que no sea undefined
    console.log("🧪 marcando todas como leídas para userId:", userId);

    if (!userId) return;

    const ok = await marcarTodasNotificacionesLeidasDB(userId);
    console.log("🧪 resultado de marcarTodasNotificacionesLeidasDB:", ok);

    if (ok) {
      const actualizadas = notificaciones.map((n) => ({ ...n, IsRead: true }));
      setNotificaciones(actualizadas);
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
    }
  };


  const eliminarNotificacion = async (id: number) => {
    const ok = await eliminarNotificacionDB(id);
    if (ok) {
      const filtradas = notificaciones.filter((n) => n.NotificationId !== id);
      setNotificaciones(filtradas);
      localStorage.setItem("notificaciones", JSON.stringify(filtradas));
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificaciones,
        notificacionesNoLeidas,
        marcarComoLeida,
        marcarTodasComoLeidas,
        eliminarNotificacion,
        setNotificaciones,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications debe usarse dentro de un NotificationsProvider");
  }
  return context;
}
