'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from "@/components/ui/use-toast";

const socket = io('http://localhost:3000');

export default function SocketHandler() {
  useEffect(() => {
    socket.on('evento_modificado', (data) => {
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
      socket.off('evento_modificado');
    };
  }, []);

  return null;
}
