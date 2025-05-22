"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, User, Ticket, Share2, Heart } from "lucide-react"
import { fetchEventoById } from "@/services/eventos"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatearFecha } from "@/components/types/Fechas"
import type { ItemData } from "@/components/types/ItemData"
import { useParams } from "next/navigation"
import type { TicketData } from "@/components/types/TicketData"
import { fetchTicketsByEventoId } from "@/services/eventos"
import { MapView } from "@/components/principales/map-view"


export default function EventoDetalle() {
  const params = useParams()
  const id = params?.id as string // asegúrate de que sea string
  const [evento, setEvento] = useState<ItemData | null>(null)
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        setIsLoading(true);
        const dataEvento = await fetchEventoById(id);
        setEvento(dataEvento);

        const dataTickets = await fetchTicketsByEventoId(id);
        setTickets(dataTickets);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información");
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);



  const ticket = tickets.length > 0 ? tickets[0] : null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error || !evento) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || "No se encontró el evento solicitado"}</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/eventos">Volver a Eventos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-16">

      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={evento.bannerUrl || "/default-banner.jpg"}
          alt={evento.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <Link
              href="/eventos"
              className="inline-flex items-center text-white bg-opacity-30 hover:bg-opacity-50 px-4 py-2 rounded-full mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a eventos
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-md">{evento.titulo}</h1>
            {Array.isArray(evento.categorias) && evento.categorias.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {evento.categorias.map((categoria, index) => (
                  <Badge key={index} className="bg-purple-600 hover:bg-purple-700 text-white border-none px-3 py-1">
                    {categoria}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detalles principales */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg border-none rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Acerca de este evento</h2>
                  <p className="text-gray-700 mb-6">
                    {evento.descripcion ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus in enim tincidunt, vel feugiat nunc commodo. Nullam auctor, justo vitae tincidunt ultrices, nisi nulla hendrerit magna, vel tincidunt felis nisi a lectus."}
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Detalles del evento</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Fecha de inicio</p>
                        <p className="text-gray-600">
                          {evento.fechaInicio ? formatearFecha(evento.fechaInicio) : "Fecha no disponible"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Fecha de finalización</p>
                        <p className="text-gray-600">
                          {evento.fechaFinalizacion ? formatearFecha(evento.fechaFinalizacion) : "Fecha no disponible"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p className="text-gray-600">{evento.direccion || "Ubicación no disponible"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <User className="w-5 h-5 mr-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Organizador</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mapa */}
<div className="mt-8">
  <MapView item={evento} />
</div>

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white shadow-lg border-none rounded-xl overflow-hidden mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Información de entradas</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Precio:</span>
                      <span className="font-bold text-lg">
                        S/. {ticket ? ticket.precio : "Entrada no creada"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Disponibilidad:</span>
                      <span className="font-medium text-green-600">
                        {ticket ? (ticket.stockDisponible > 0 ? `${ticket.stockDisponible} disponibles` : "Agotado") : "N/A"}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                    <Ticket className="w-4 h-4 mr-2" />
                    Reservar entrada
                  </Button>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="icon" className="flex-1">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
