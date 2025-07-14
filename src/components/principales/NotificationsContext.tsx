"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  obtenerNotificacionesDB,
  marcarNotificacionLeidaDB,
  marcarTodasNotificacionesLeidasDB,
  eliminarNotificacionDB,
} from "@/services/notificaciones";
import { validarSesion } from "@/services/usuarios";
import { useUserStore } from "@/stores/userStore";
import { socket } from "@/lib/socket";

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
  const [cargando, setCargando] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const tieneTokenUsuario = () => {
        if (typeof document === "undefined") return false;
        return document.cookie
          .split("; ")
          .some((cookie) => cookie.startsWith("tokenUsuario="));
      };

      if (!user && tieneTokenUsuario()) {
        console.log("🔍 Detectando tokenUsuario en cookies...");
        const result = await validarSesion();

        if (result?.user) {
          console.log("✅ Usuario validado desde API:", result.user);
          setUser(result.user);
        } else {
          console.log("⚠️ Token inválido o sesión caducada.");
        }
      }
    };

    checkSession();
  }, [user, setUser]);

  useEffect(() => {
    const initNotifications = async () => {
      if (!user) {
        console.log("⚠️ No hay usuario autenticado. No se cargan notificaciones.");
        setCargando(false);
        return;
      }

      const userId = user.UserId ?? user.id;

      if (!userId) {
        console.warn("⚠️ Usuario no tiene UserId ni id:", user);
        setCargando(false);
        return;
      }

      const notis = await obtenerNotificacionesDB(userId.toString());
      setNotificaciones(notis);
      localStorage.setItem("notificaciones", JSON.stringify(notis));
      setCargando(false);

      if (!socketConnected) {
        console.log("🔧 Conectando socket para userId:", userId);
        socket.emit("joinRoom", userId);

        const handleNuevaNotificacion = (nuevaNoti: Notification) => {
          console.log("🔔 Notificación recibida en tiempo real:", nuevaNoti);
          setNotificaciones((prev) => {
            const actualizadas = [nuevaNoti, ...prev];
            localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
            return actualizadas;
          });
        };

        socket.on("nuevaNotificacion", handleNuevaNotificacion);

        setSocketConnected(true);

        return () => {
          socket.off("nuevaNotificacion", handleNuevaNotificacion);
        };
      }
    };

    initNotifications();
  }, [user, socketConnected]);

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
    const userId = user?.UserId ?? user?.id;
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

  if (!hasMounted) {
    return null;
  }

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
      {cargando ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        children
      )}
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
