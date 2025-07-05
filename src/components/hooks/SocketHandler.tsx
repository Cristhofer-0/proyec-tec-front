"use client";

import { useEffect, useRef } from 'react';
import { API_BASE_URL } from "@/lib/config"
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/userStore";
import { io, Socket } from 'socket.io-client';

export default function SocketHandler() {
  const user = useUserStore((state) => state.user);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Conectar el socket siempre (con o sin usuario)
    if (!socketRef.current) {
      const socket = io(`${API_BASE_URL}`);
      socketRef.current = socket;

      socket.on('evento_modificado', (data: any) => {
        const nuevaNotificacion = {
          id: crypto.randomUUID(),
          titulo: "Evento modificado",
          mensaje: `El evento "${data.nombre}" ha sido actualizado, verifica los cambios si has hecho alguna compra.`,
          fecha: new Date().toISOString(),
          leida: false,
          tipo: "evento",
          // Agrega el userId si existe (opcional)
          userId: user?.id ?? null,
        };

        const prev = JSON.parse(localStorage.getItem("notificaciones") || "[]");
        localStorage.setItem("notificaciones", JSON.stringify([nuevaNotificacion, ...prev]));

        // Notificar al header que se actualice
        window.dispatchEvent(new Event("nueva-notificacion"));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  return null;
}
