"use client"

import type React from "react"
import Link from "next/link"
import { Menu, ShoppingCart, User, Bell, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/stores/userStore"
import { useCarrito } from "@/components/principales/CarritoContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotifications } from "@/components/principales/NotificationsContext"

const Header: React.FC = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const { cantidad, actualizarCarrito } = useCarrito()

  // Usar el contexto de notificaciones
  const {
    notificaciones,
    notificacionesNoLeidas,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
    formatearFecha,
    obtenerColorTipo,
  } = useNotifications()

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [setUser])

  useEffect(() => {
    actualizarCarrito()
  }, [actualizarCarrito])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              JoinWithUs!
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/eventos" className="font-medium transition-colors hover:text-primary">
            Eventos
          </Link>
          <Link href="/solicitud-evento">Solicitud</Link>
          <Link href="/ayuda" className="font-medium transition-colors hover:text-primary">
            Ayuda
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          {isClient && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificacionesNoLeidas > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {notificacionesNoLeidas > 9 ? "9+" : notificacionesNoLeidas}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80 bg-white shadow-lg rounded-md">
                <div className="flex items-center justify-between p-2">
                  <DropdownMenuLabel className="p-0">Notificaciones</DropdownMenuLabel>
                  {notificacionesNoLeidas > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={marcarTodasComoLeidas}
                      className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Marcar todas como leídas
                    </Button>
                  )}
                </div>
                <DropdownMenuSeparator />

                {notificaciones.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No tienes notificaciones</div>
                ) : (
                  <ScrollArea className="h-80">
                    {notificaciones.map((notificacion) => (
                      <div key={notificacion.id}>
                        <DropdownMenuItem
                          className={`p-3 cursor-pointer ${!notificacion.leida ? "bg-muted/50" : ""}`}
                          onClick={() => marcarComoLeida(notificacion.id)}
                        >
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${obtenerColorTipo(notificacion.tipo)}`}
                                  >
                                    {notificacion.tipo}
                                  </span>
                                  {!notificacion.leida && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                                </div>
                                <h4 className="font-medium text-sm leading-tight">{notificacion.titulo}</h4>
                                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                                  {notificacion.mensaje}
                                </p>
                                <span className="text-xs text-muted-foreground mt-1">
                                  {formatearFecha(notificacion.fecha)}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  eliminarNotificacion(notificacion.id)
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>
                    ))}
                  </ScrollArea>
                )}

                {notificaciones.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/usuario/perfil"
                        className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        Ver todas las notificaciones
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Carrito */}
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/carrito">
              <ShoppingCart className="h-5 w-5" />
              {isClient && cantidad > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cantidad}
                </span>
              )}
            </Link>
          </Button>

          {/* Usuario */}
          {isClient && user ? (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/usuario/perfil">
                <User className="h-5 w-5 text-purple-600" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/usuario/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
