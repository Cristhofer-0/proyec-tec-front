"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Iconos
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
} from "lucide-react";

// Componentes UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Servicios y utilidades
import { fetchEventos } from "@/services/eventos";
import { formatearFecha } from "@/components/types/Fechas";

// Carrusel de eventos
import Eventos from "./carrusel-eventos/page";

// Tipado
type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  estado?: string;
  bannerUrl?: string;
  fechaInicio?: string;
  fechaFinalizacion?: string;
  direccion?: string;
  categorias?: string[] | string;
};

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const obtenerEventos = async () => {
      const data = await fetchEventos();
      setEventos(data.map((item: any) => ({ ...item, id: String(item.id) })));
    };

    obtenerEventos();
  }, []);

  const eventosFiltrados = eventos.filter(
    (evento) => evento.estado?.toLowerCase() === "published"
  );

  return (
    <main className="flex-1">
      <Eventos />

      {/* Categorías */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Próximos Eventos</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Organizamos todo tipo de eventos para que tú solo te preocupes de disfrutar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {eventosFiltrados.slice(0, 3).map((evento, index) => (
              <Card key={index} 
                className="flex-col h-full overflow-hidden border-0 shadow-xl rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl flex-grow min-h-[200px]">
                  <Image
                    src={evento.bannerUrl || "/placeholder.svg?height=200&width=400"}
                    alt={evento.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col flex-grow p-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white relative w-full overflow-hidden rounded-b-2xl border-b-4 border-white">
                  <h3 className="text-xl font-bold mb-2">{evento.titulo}</h3>
                  <p className="text-white/80 flex-grow">{evento.descripcion}</p>
                  <Button className="mt-4 bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-colors">
                    <Link href={`/eventos/${evento.id}`}>Ver Detalles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Eventos */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Eventos</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre los eventos más esperados y asegura tu lugar
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {eventosFiltrados.slice(3, 6).map((evento, index) => (
              <Card key={index} className="flex-col h-full overflow-hidden border-0 shadow-xl rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl min-h-[200px]">
                  <Image
                    src={evento.bannerUrl || "/placeholder.svg?height=200&width=400"}
                    alt={evento.titulo}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600">Destacado</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{evento.titulo}</h3>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{evento.fechaInicio ? formatearFecha(evento.fechaInicio) : "Fecha no disponible"}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{evento.fechaFinalizacion ? formatearFecha(evento.fechaFinalizacion) : "Fecha no disponible"}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{evento.direccion}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>{Array.isArray(evento.categorias) ? evento.categorias.join(", ") : evento.categorias}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Link href={`/eventos/${evento.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Link href="/eventos">Ver todos los eventos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                ¿Listo para organizar tu evento?
              </h2>
              <p className="max-w-[700px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contáctanos hoy mismo y comienza a planificar el evento de tus sueños
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/solicitud-evento">Ver más información</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
