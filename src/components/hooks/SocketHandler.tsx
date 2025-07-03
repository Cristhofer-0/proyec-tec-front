"use client";

import { useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/userStore";
import { io, Socket } from 'socket.io-client';

export default function SocketHandler() {
  const user = useUserStore((state) => state.user);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('evento_modificado', (data: any) => {
      {/* Mostrar toast
      toast({
        title: "🔔 Evento modificado",
        description: (
          <span>
            El evento{" "}
            <a
              href={`/eventos/${data.id}`}
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              {data.nombre}
            </a>{" "}
            ha sido actualizado, verifica los cambios si has hecho alguna compra.
          </span>
        ),
      });*/}

      // Guardar notificación en localStorage
      const nuevaNotificacion = {
        id: crypto.randomUUID(), // o genera un ID único
        titulo: "Evento modificado",
        mensaje: `El evento "${data.nombre}" ha sido actualizado, verifica los cambios si has hecho alguna compra.`,
        fecha: new Date().toISOString(),
        leida: false,
        tipo: "evento",
      };

      const prev = JSON.parse(localStorage.getItem("notificaciones") || "[]");
      localStorage.setItem("notificaciones", JSON.stringify([nuevaNotificacion, ...prev]));
      
      // 🚨 IMPORTANTE: Dispara evento para que Header se actualice
      window.dispatchEvent(new Event("nueva-notificacion"));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  return null;
}
