import type { Metadata } from "next";
import Link from "next/link"
import Image from "next/image"
import Eventos from "./carrusel-eventos/page";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Star,
  ShoppingCart,
  Search,
  Menu,
  User,
  Tag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchEventos } from "@/services/eventos"
import { formatearFecha } from "@/components/types/Fechas"


export default async function Home() {
  const eventos = await fetchEventos()

  return (
    <main className="flex-1">
      <Eventos eventId={7} />

      {/* Categorías */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Eventos</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Organizamos todo tipo de eventos para que tú solo te preocupes de disfrutar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {eventos.slice(0, 3).map((evento, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={evento.bannerUrl || "/placeholder.svg?height=200&width=400"}
                    alt={evento.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  <h3 className="text-xl font-bold mb-2">{evento.titulo}</h3>
                  <p className="text-white/80">{evento.descripcion}</p>
                  <Button variant="outline" className="mt-4 border-white text-white hover:bg-white/10">
                    <Link href={`/eventos/${evento.id}`}>Ver Detalles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Próximos Eventos</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre los eventos más esperados y asegura tu lugar
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {eventos.slice(3, 6).map((evento, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48">
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

      {/* Testimonios */}
      <section className="py-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Lo que dicen nuestros clientes
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Miles de personas han confiado en nosotros para sus eventos
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Increíble servicio. Organizaron mi boda a la perfección y todos los invitados quedaron encantados.
                  Definitivamente los recomendaré a todos mis amigos."
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=50&width=50" alt="Avatar" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">María García</h4>
                    <p className="text-sm text-gray-500">Boda en Madrid</p>
                  </div>
                </div>
              </Card>
            ))}
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
              <Button className="bg-white text-purple-600 hover:bg-gray-100">Ver más información</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
