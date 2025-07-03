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

// Tipo para las notificaciones
interface Notificacion {
  id: string
  titulo: string
  mensaje: string
  fecha: Date
  leida: boolean
  tipo: "evento" | "sistema" | "promocion"
}

const Header: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false)
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const { cantidad, actualizarCarrito } = useCarrito()

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }

    const cargarNotificaciones = () => {
      const local = localStorage.getItem("notificaciones");
      const datos: Notificacion[] = local ? JSON.parse(local) : [];
      // Asegurarse que fecha esté como Date
      const parsed = datos.map(n => ({ ...n, fecha: new Date(n.fecha) }));
      setNotificaciones(parsed);
    };

    cargarNotificaciones();

    // Escuchar nuevas notificaciones
    const handler = () => {
      cargarNotificaciones();
    };

    window.addEventListener("nueva-notificacion", handler);

    return () => {
      window.removeEventListener("nueva-notificacion", handler);
    };
  }, [setUser]);


  useEffect(() => {
    actualizarCarrito()
  }, [actualizarCarrito])

  // 🔢 Contar notificaciones no leídas
  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  // ✅ Marcar notificación como leída
  const marcarComoLeida = (id: string) => {
    setNotificaciones((prev) => {
      const actualizadas = prev.map((notif) =>
        notif.id === id ? { ...notif, leida: true } : notif
      );
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
      return actualizadas;
    });
  };


  // ✅ Marcar todas como leídas
  const marcarTodasComoLeidas = () => {
    setNotificaciones((prev) => {
      const actualizadas = prev.map((notif) => ({ ...notif, leida: true }));
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
      return actualizadas;
    });
  };

  // ✅ Eliminar notificación
  const eliminarNotificacion = (id: string) => {
    setNotificaciones((prev) => {
      const actualizadas = prev.filter((notif) => notif.id !== id);
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas));
      return actualizadas;
    });
  };
  // Formatear fecha
  const formatearFecha = (fecha: Date) => {
    const ahora = new Date()
    const diferencia = ahora.getTime() - fecha.getTime()
    const minutos = Math.floor(diferencia / (1000 * 60))
    const horas = Math.floor(diferencia / (1000 * 60 * 60))
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))

    if (minutos < 60) {
      return `Hace ${minutos} min`
    } else if (horas < 24) {
      return `Hace ${horas}h`
    } else {
      return `Hace ${dias}d`
    }
  }

  // Obtener color según tipo de notificación
  const obtenerColorTipo = (tipo: string) => {
    switch (tipo) {
      case "evento":
        return "bg-blue-100 text-blue-800"
      case "sistema":
        return "bg-green-100 text-green-800"
      case "promocion":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          {isClient && user  && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificacionesNoLeidas > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

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
                                <p className="text-xs text-muted-foreground mt-1 leading-tight">{notificacion.mensaje}</p>
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
          {isClient && user  ? (
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
