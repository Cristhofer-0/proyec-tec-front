'use client';

import { useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/userStore";
import { io, Socket } from 'socket.io-client';

export default function SocketHandler() {
  const user = useUserStore((state) => state.user);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      // 🔌 Desconecta si no hay usuario
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    // 🔌 Conecta solo si hay usuario
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('evento_modificado', (data: any) => {
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
            ha sido actualizado.
          </span>
        ),
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  return null;
}
