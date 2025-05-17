"use client"

import Link from "next/link"
import Image from "next/image"
import {
  User,
  Settings,
  CreditCard,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  LogOut,
  Edit,
  Bell,
  ShoppingBag,
  Heart,
  HelpCircle,
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"

export default function ProfilePage() {

  useEffect(() => {
  const usuario = localStorage.getItem("user")
  if (!usuario) {
    router.push("/usuario/login")
  }
}, [])

  const router = useRouter()  // Hook

    function cerrarSesion() {
        // Borrar la cookie
        document.cookie = "loggedUser=; path=/; max-age=0";
        // Limpiar localStorage si guardas algo de sesión
        localStorage.removeItem("user");

        // Redirigir al login
        router.push("/");
    }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <main className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=64&width=64" alt="Avatar" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <CardTitle>María García</CardTitle>
                  <p className="text-sm text-gray-500">maria.garcia@ejemplo.com</p>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mt-2 mb-6" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar perfil
                </Button>

                <nav className="space-y-1">
                  <Link
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                  >
                    <div className="flex items-center">
                      <User className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Mi cuenta</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                  >
                    <div className="flex items-center">
                      <ShoppingBag className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Mis compras</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                  >
                    <div className="flex items-center">
                      <Heart className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Favoritos</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                  >
                    <div className="flex items-center">
                      <CreditCard className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Métodos de pago</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                  >
                    <div className="flex items-center">
                      <Settings className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Configuración</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                  >
                    <div className="flex items-center">
                      <HelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                      <span>Ayuda</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Separator className="my-2" />
<button
  onClick={cerrarSesion}
  className="flex w-full items-center rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
>
  <LogOut className="mr-3 h-5 w-5" />
  <span>Cerrar sesión</span>
</button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="proximos" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="proximos">Próximos eventos</TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
                <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
              </TabsList>

              <TabsContent value="proximos">
                <h2 className="text-2xl font-bold mb-4">Próximos eventos</h2>

                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 w-full md:h-auto md:w-48">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt={`Evento ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-2">Festival de Música Primavera 2025</h3>
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
                              <Badge className="bg-green-500 mb-4">Confirmado</Badge>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                              <div className="text-lg font-bold text-purple-600 mb-2">€45.00</div>
                              <div className="text-sm text-gray-500 mb-4">2 entradas</div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Ver detalles
                                </Button>
                                <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                                  Descargar entradas
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="historial">
                <h2 className="text-2xl font-bold mb-4">Historial de eventos</h2>

                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 w-full md:h-auto md:w-48">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt={`Evento ${item}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Badge className="bg-gray-500">Finalizado</Badge>
                          </div>
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-2">Concierto de Rock Alternativo</h3>
                              <div className="flex items-center text-gray-500 mb-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>10 de Marzo, 2025</span>
                              </div>
                              <div className="flex items-center text-gray-500 mb-1">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>19:00 - 22:00</span>
                              </div>
                              <div className="flex items-center text-gray-500 mb-4">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>Sala Apolo, Barcelona</span>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                              <div className="text-lg font-bold text-gray-600 mb-2">€35.00</div>
                              <div className="text-sm text-gray-500 mb-4">1 entrada</div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Ver detalles
                                </Button>
                                <Button variant="outline" size="sm">
                                  Valorar evento
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favoritos">
                <h2 className="text-2xl font-bold mb-4">Eventos favoritos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          alt={`Evento ${item}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 rounded-full"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold mb-2">Festival de Jazz</h3>
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>22 de Julio, 2025</span>
                        </div>
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Parque Central, Valencia</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-lg font-bold text-purple-600">€55.00</div>
                          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                            Ver detalles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

    </div>
  )
}

