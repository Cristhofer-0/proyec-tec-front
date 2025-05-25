"use client"
import Image from "next/image"
import { useState } from "react"
import {
  User,
  Settings,
  CreditCard,
  ChevronRight,
  LogOut,
  ShoppingBag,
  HelpCircle,
  Package,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { OrderMapped } from "@/components/types/carrito"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("account")
  const [comprados, setComprados] = useState<OrderMapped[]>([]);
  const router = useRouter()

  useEffect(() => {
    async function validarSesion() {
      try {
        const res = await fetch("http://localhost:3000/usuarios/validar", {
          method: "GET",
          credentials: "include", // para enviar las cookies httpOnly automáticamente
        });

        if (!res.ok) {
          router.push("/usuario/login");
        }
      } catch (error) {
        console.error("Error validando sesión:", error);
        router.push("/usuario/login");
      }
    }

    validarSesion();
  }, [router]);


  useEffect(() => {
    async function obtenerComprados() {
      try {
        const res = await fetch("http://localhost:3000/orders/historial", {
          method: "POST",
          credentials: "include", // para enviar las cookies httpOnly automáticamente
        });

        const data = await res.json();

        if (res.ok) {
          // El backend ya devuelve las órdenes mapeadas con la fecha incluida
          const ordenesMapeadas: OrderMapped[] = data.ordenes.map((orden: any) => ({
            id: orden.id,
            title: orden.title || "Sin título",
            description: orden.description || "Sin descripción",
            image: orden.image || "/placeholder.svg",
            quantity: orden.quantity,
            totalPrice: orden.totalPrice,
            price: orden.price,
            type: orden.type,
            date: orden.date, // La fecha ya viene del backend
          }));

          setComprados(ordenesMapeadas);
        } else {
          console.error("Error del servidor:", data.message);
        }
      } catch (error) {
        console.error("Error al obtener los productos comprados", error);
      }
    }

    obtenerComprados();
  }, []);



  async function cerrarSesion() {
    try {
      // Llamar al endpoint logout para que borre la cookie httpOnly en backend
      const response = await fetch("http://localhost:3000/usuarios/logout", {
        method: "DELETE",
        credentials: "include" // importante para enviar cookies
      })
      if (response.ok) {
        router.push("/usuario/login")
      } else {
        console.error("Error al cerrar sesión")
      }
    } catch (error) {
      console.error("Error en la llamada logout:", error)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
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

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveSection("account")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "account" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <User
                        className={`mr-3 h-5 w-5 ${activeSection === "account" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Mi cuenta</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveSection("purchases")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "purchases" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <ShoppingBag
                        className={`mr-3 h-5 w-5 ${activeSection === "purchases" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Mis compras</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveSection("payment")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "payment" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <CreditCard
                        className={`mr-3 h-5 w-5 ${activeSection === "payment" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Métodos de pago</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveSection("settings")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "settings" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <Settings
                        className={`mr-3 h-5 w-5 ${activeSection === "settings" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Configuración</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setActiveSection("help")}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 ${activeSection === "help" ? "bg-purple-50 text-purple-600" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <HelpCircle
                        className={`mr-3 h-5 w-5 ${activeSection === "help" ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <span>Ayuda</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>

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

          {/* Content Area */}
          <div className="md:col-span-2">
            {activeSection === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mi cuenta</CardTitle>
                  <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" defaultValue="María García" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" defaultValue="maria.garcia@ejemplo.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" defaultValue="+34 612 345 678" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label>Foto de perfil</Label>
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                            <AvatarFallback>MG</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Cambiar foto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button>Guardar cambios</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "purchases" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mis compras</CardTitle>
                  <CardDescription>Historial de tus compras recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  {comprados.length === 0 ? (
                    <p className="text-center text-gray-500">No tienes compras aún.</p>
                  ) : (
                    comprados.map((item) => (
                      <div key={item.id} className="mb-4 border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">Pedido #{item.id}</h3>
                            <p className="text-sm text-gray-500">
                              Realizado el {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={new Date(item.date) > new Date() ? "default" : "outline"}>
                            {new Date(item.date) > new Date() ? "Válido" : "No válido"}
                          </Badge>

                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">Entradas de: {item.title}</p>
                            <p className="text-sm text-gray-500">
                              Cantidad: {item.quantity} - Precio total: S/{item.totalPrice}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>

              </Card>
            )}

            {activeSection === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de pago</CardTitle>
                  <CardDescription>Gestiona tus tarjetas y métodos de pago</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-lg p-4 relative">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa terminada en 4242</p>
                        <p className="text-sm text-gray-500">Expira: 12/25</p>
                      </div>
                    </div>
                    <Badge className="absolute top-4 right-4">Predeterminada</Badge>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard terminada en 8888</p>
                        <p className="text-sm text-gray-500">Expira: 09/26</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Añadir nuevo método de pago
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeSection === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                  <CardDescription>Gestiona tus preferencias y configuración de la cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notificaciones</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Correos electrónicos de marketing</p>
                        <p className="text-xs text-gray-500">Recibe ofertas y promociones especiales</p>
                      </div>
                      <div>
                        <Label htmlFor="marketing" className="sr-only">
                          Correos electrónicos de marketing
                        </Label>
                        <input
                          type="checkbox"
                          id="marketing"
                          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Actualizaciones de pedidos</p>
                        <p className="text-xs text-gray-500">Recibe notificaciones sobre tus pedidos</p>
                      </div>
                      <div>
                        <Label htmlFor="orders" className="sr-only">
                          Actualizaciones de pedidos
                        </Label>
                        <input
                          type="checkbox"
                          id="orders"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Seguridad</h3>
                    <Button variant="outline" size="sm">
                      Cambiar contraseña
                    </Button>
                    <Button variant="outline" size="sm" className="ml-2">
                      Activar autenticación de dos factores
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-red-600">Zona de peligro</h3>
                    <Button variant="destructive" size="sm">
                      Eliminar cuenta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "help" && (
              <Card>
                <CardHeader>
                  <CardTitle>Centro de ayuda</CardTitle>
                  <CardDescription>Encuentra respuestas a tus preguntas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preguntas frecuentes</h3>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">¿Cómo puedo cambiar mi dirección de envío?</h4>
                        <p className="text-sm text-gray-600">
                          Puedes actualizar tu dirección de envío en la sección &quot;Mi cuenta&quot; &gt;
                          &quot;Direcciones&quot;. Allí podrás añadir, editar o eliminar tus direcciones.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">¿Cuánto tiempo tarda en llegar mi pedido?</h4>
                        <p className="text-sm text-gray-600">
                          El tiempo de entrega depende de tu ubicación. Normalmente, los pedidos se entregan en 2-5 días
                          laborables. Puedes consultar el estado de tu pedido en la sección &quot;Mis compras&quot;.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">¿Cómo puedo devolver un producto?</h4>
                        <p className="text-sm text-gray-600">
                          Para devolver un producto, ve a &quot;Mis compras&quot;, selecciona el pedido y haz clic en
                          &quot;Solicitar devolución&quot;. Tienes 30 días desde la fecha de entrega para realizar
                          devoluciones.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contacto</h3>
                    <p className="text-sm text-gray-600">
                      ¿No encuentras lo que buscas? Ponte en contacto con nuestro equipo de soporte.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar correo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
