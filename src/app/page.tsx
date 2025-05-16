import type { Metadata } from "next";
import Link from "next/link"
import Image from "next/image"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export const metadata: Metadata = {
  title: "Joint With Us | Los mejores eventos de la comunidad",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  description: "Pagina principal de Joint With Us",
};

export default function Home() {
  return (
   <main className="flex-1">
        <section className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
              <div className="relative min-w-full h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=1920"
                  alt="Festival de música"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-600/50 flex items-center">
                  <div className="container px-4 md:px-6">
                    <div className="max-w-xl space-y-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Destacado</Badge>
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                        Festival de Música Primavera 2025
                      </h1>
                      <p className="text-white/90 md:text-xl">
                        Disfruta de los mejores artistas en un ambiente increíble. ¡No te lo pierdas!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Reservar ahora</Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white/10">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Siguiente</span>
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <Button variant="ghost" size="sm" className="h-2 w-2 rounded-full bg-white p-0" />
            <Button variant="ghost" size="sm" className="h-2 w-2 rounded-full bg-white/50 p-0" />
            <Button variant="ghost" size="sm" className="h-2 w-2 rounded-full bg-white/50 p-0" />
          </div>
        </section>

        {/* Categorías */}
        <section className="py-12 bg-gradient-to-b from-white to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Servicios</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Organizamos todo tipo de eventos para que tú solo te preocupes de disfrutar
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Fiestas" fill className="object-cover" />
                </div>
                <CardContent className="p-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  <h3 className="text-xl font-bold mb-2">Fiestas Privadas</h3>
                  <p className="text-white/80">Cumpleaños, aniversarios y celebraciones especiales</p>
                  <Button variant="outline" className="mt-4 border-white text-white hover:bg-white/10">
                    Ver opciones
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Conciertos" fill className="object-cover" />
                </div>
                <CardContent className="p-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                  <h3 className="text-xl font-bold mb-2">Conciertos y Festivales</h3>
                  <p className="text-white/80">Organización completa de eventos musicales</p>
                  <Button variant="outline" className="mt-4 border-white text-white hover:bg-white/10">
                    Ver opciones
                  </Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Corporativos" fill className="object-cover" />
                </div>
                <CardContent className="p-6 bg-gradient-to-r from-purple-800 to-indigo-600 text-white">
                  <h3 className="text-xl font-bold mb-2">Eventos Corporativos</h3>
                  <p className="text-white/80">Reuniones, conferencias y team buildings</p>
                  <Button variant="outline" className="mt-4 border-white text-white hover:bg-white/10">
                    Ver opciones
                  </Button>
                </CardContent>
              </Card>
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
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt={`Evento ${item}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-600">Destacado</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Concierto de Rock Alternativo</h3>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>15 de Junio, 2025</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>20:00 - 23:00</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Arena Central, Madrid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-lg font-bold text-purple-600">€45.00</div>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">Comprar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button className="bg-purple-600 hover:bg-purple-700">Ver todos los eventos</Button>
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
                <Button className="bg-white text-purple-600 hover:bg-gray-100">Solicitar presupuesto</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Ver más información
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
