"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { obtenerNotificacionesDB, marcarNotificacionLeidaDB, marcarTodasNotificacionesLeidasDB, eliminarNotificacionDB } from "@/services/notificaciones";
import { useUserStore } from "@/stores/userStore";
import { socket } from "@/lib/socket"; // ✅ Usamos el socket compartido

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
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      let userId = user?.id || user?.UserId;

      if (!userId) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("👤 Usuario cargado desde localStorage:", parsedUser);
          setUser(parsedUser);
          userId = parsedUser.UserId || parsedUser.id;
        }
      }

      if (userId) {
        const notis = await obtenerNotificacionesDB(userId.toString());
        setNotificaciones(notis);
        localStorage.setItem("notificaciones", JSON.stringify(notis));
      } else {
        console.warn("⚠️ Usuario no definido, no se cargan notificaciones.");
      }
    };

    if (user) {
      cargarNotificaciones();
    }
  }, [user]); 

  useEffect(() => {
    const userId = user?.UserId || user?.id;
    if (!userId) return;

    console.log("🔧 Socket conectado para userId:", userId);

    socket.emit("joinRoom", userId);

    const handleNuevaNotificacion = (nuevaNoti: Notification) => {
      console.log("🔔 Notificación en tiempo real:", nuevaNoti);
      setNotificaciones((prev) => {
        const actualizadas = [nuevaNoti, ...prev];
        localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
        return actualizadas;
      });
    };

    socket.on("nuevaNotificacion", handleNuevaNotificacion);

    return () => {
      socket.off("nuevaNotificacion", handleNuevaNotificacion);
    };
  }, [user]);

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
    const userId = user?.UserId || user?.id;
    if (!userId) return;

    const ok = await marcarTodasNotificacionesLeidasDB(userId);
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
