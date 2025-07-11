"use client"

import type React from "react"
import Link from "next/link"
import { Menu, ShoppingCart, User, Bell, X, MenuIcon } from "lucide-react"
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
import { useRouter } from "next/navigation"

const Header: React.FC = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const { cantidad, actualizarCarrito } = useCarrito()

  const {
    notificaciones,
    notificacionesNoLeidas,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
  } = useNotifications()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData)); // actualiza tu store o estado
        } else {
          setUser(null); // usuario se deslogueó en otra pestaña
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  useEffect(() => {
    console.log("🔔 Notificaciones actuales en Header:", notificaciones);
  }, [notificaciones]);

  useEffect(() => {
    actualizarCarrito()
  }, [actualizarCarrito])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
              <button onClick={() => setOpen(!open)}>
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              JoinWithUs!
            </span>
          </Link>
        </div>

        {/* Menú para escritorio */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/eventos" className="font-medium transition-colors hover:text-primary">
            Eventos
          </Link>
          <Link href="/solicitud-evento">Solicitud</Link>
          <Link href="/ayuda" className="font-medium transition-colors hover:text-primary">
            Ayuda
          </Link>
        </nav>

        {/* Menú desplegable en mobile */}
        {open && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden">
            <Link href="/eventos" className="block py-2">Eventos</Link>
            <Link href="/solicitud-evento" className="block py-2">Solicitud</Link>
            <Link href="/ayuda" className="block py-2">Ayuda</Link>
          </div>
        )}

        <div className="flex items-center gap-4">
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
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    No tienes notificaciones
                  </div>
                ) : (
                  <ScrollArea className="h-80">
                    <div className="divide-y">
                      {notificaciones.map((notificacion) => (
                        <div key={notificacion.NotificationId}>
                          <DropdownMenuItem
                            className={`flex items-start justify-between gap-3 px-4 py-3 cursor-pointer transition-all rounded-md
                              ${!notificacion.IsRead ? "bg-muted/40 hover:bg-muted" : "hover:bg-accent"}
                            `}
                            onClick={() => {
                              marcarComoLeida(notificacion.NotificationId)
                              if (notificacion.EventId) {
                                router.push(`/eventos/${notificacion.EventId}`)
                              }
                            }}
                          >
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                {!notificacion.IsRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                )}
                                <h4 className="text-sm font-medium">
                                  {notificacion.Message || "Notificación"}
                                </h4>
                              </div>
                              {notificacion.createdAt && (
                                <p className="text-xs text-muted-foreground">
                                  {new Date(notificacion.createdAt).toLocaleString("es-PE")}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                eliminarNotificacion(notificacion.NotificationId);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </DropdownMenuItem>
                        </div>
                      ))}
                    </div>
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
