"use client"
import { useState,useEffect, } from "react"
import { useRouter } from "next/navigation"

import { Minus, Plus, ShoppingBag, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {


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



  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Mi Carrito</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
                  <p className="text-muted-foreground mb-4">Parece que aún no has añadido tickets a tu carrito.</p>
                  <Button asChild>
                    <Link href="/events">Ver eventos disponibles</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Tickets seleccionados ({cartItems.length})</h2>
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 text-muted-foreground hover:text-destructive z-10"
                          aria-label={`Eliminar ${item.title} del carrito`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </Button>
                        <div className="grid gap-4 sm:grid-cols-[1fr_2fr] md:gap-6">
                          <div className="aspect-video relative rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{item.title}</h3>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${item.type === "VIP" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"}`}
                              >
                                {item.type}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                  <span className="sr-only">Reducir cantidad</span>
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                  <Plus className="h-4 w-4" />
                                  <span className="sr-only">Aumentar cantidad</span>
                                </Button>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} / ticket</div>
                                <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.title} - {item.type} ({item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <Button className="w-full mt-6">Proceder al pago</Button>
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/events">Continuar comprando</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Datos de ejemplo para el carrito
const cartItems = [
  {
    id: 1,
    title: "Festival de Música Primavera 2025",
    description:
      "El festival más grande del año con los mejores artistas nacionales e internacionales. Tres días de música en vivo, comida y diversión.",
    image: "/placeholder.svg?height=400&width=600",
    quantity: 2,
    price: 89.99,
    type: "General",
  },
  {
    id: 2,
    title: "Festival de Música Primavera 2025",
    description: "Acceso a zonas exclusivas, meet & greet con artistas y barra libre durante todo el evento.",
    image: "/placeholder.svg?height=400&width=600",
    quantity: 1,
    price: 199.99,
    type: "VIP",
  },
  {
    id: 3,
    title: "Concierto de Rock Clásico",
    description:
      "Una noche inolvidable con las mejores bandas de rock clásico de todos los tiempos. Revive los grandes éxitos en un ambiente único.",
    image: "/placeholder.svg?height=400&width=600",
    quantity: 1,
    price: 59.99,
    type: "General",
  },
  {
    id: 4,
    title: "Concierto de Rock Clásico",
    description: "Incluye asientos premium, acceso al backstage y cóctel de bienvenida con los artistas.",
    image: "/placeholder.svg?height=400&width=600",
    quantity: 2,
    price: 129.99,
    type: "VIP",
  },
  {
    id: 5,
    title: "Teatro: Romeo y Julieta",
    description:
      "La obra clásica de Shakespeare interpretada por los mejores actores del momento. Una producción espectacular que no te puedes perder.",
    image: "/placeholder.svg?height=400&width=600",
    quantity: 3,
    price: 45.5,
    type: "General",
  },
]