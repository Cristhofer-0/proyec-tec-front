"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Notificacion {
  id: string
  titulo: string
  mensaje: string
  fecha: Date
  leida: boolean
  tipo: "evento" | "sistema" | "promocion"
}

interface NotificationsContextType {
  notificaciones: Notificacion[]
  notificacionesNoLeidas: number
  marcarComoLeida: (id: string) => void
  marcarTodasComoLeidas: () => void
  eliminarNotificacion: (id: string) => void
  formatearFecha: (fecha: Date) => string
  obtenerColorTipo: (tipo: string) => string
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

interface NotificationsProviderProps {
  children: ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])

  // Cargar notificaciones desde localStorage al inicializar
  useEffect(() => {
    const cargarNotificaciones = () => {
      const local = localStorage.getItem("notificaciones")
      const datos: Notificacion[] = local ? JSON.parse(local) : []
      // Asegurarse que fecha esté como Date
      const parsed = datos.map((n) => ({ ...n, fecha: new Date(n.fecha) }))
      setNotificaciones(parsed)
    }

    cargarNotificaciones()

    // Escuchar nuevas notificaciones
    const handler = () => {
      cargarNotificaciones()
    }

    window.addEventListener("nueva-notificacion", handler)

    return () => {
      window.removeEventListener("nueva-notificacion", handler)
    }
  }, [])

  // Contar notificaciones no leídas
  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  // Marcar notificación como leída
  const marcarComoLeida = (id: string) => {
    setNotificaciones((prev) => {
      const actualizadas = prev.map((notif) => (notif.id === id ? { ...notif, leida: true } : notif))
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas))
      return actualizadas
    })
  }

  // Marcar todas como leídas
  const marcarTodasComoLeidas = () => {
    setNotificaciones((prev) => {
      const actualizadas = prev.map((notif) => ({ ...notif, leida: true }))
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas))
      return actualizadas
    })
  }

  // Eliminar notificación
  const eliminarNotificacion = (id: string) => {
    setNotificaciones((prev) => {
      const actualizadas = prev.filter((notif) => notif.id !== id)
      localStorage.setItem("notificaciones", JSON.stringify(actualizadas))
      return actualizadas
    })
  }

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

  const value = {
    notificaciones,
    notificacionesNoLeidas,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
    formatearFecha,
    obtenerColorTipo,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}
