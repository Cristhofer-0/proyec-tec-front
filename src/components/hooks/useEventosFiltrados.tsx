// hooks/useEventosFiltrados.ts
import { useState, useEffect } from "react"
import { fetchEventos } from "@/services/eventos"
import type { ItemData } from "@/components/types/ItemData"

export function useEventosFiltrados() {
  const [eventos, setEventos] = useState<ItemData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    async function loadEventos() {
      try {
        setIsLoading(true)
        const data = await fetchEventos()

        // Filtrar los eventos: Solo incluir los que tengan estado 'published'
        const eventosFiltrados = data.filter(
          (evento) => evento.estado?.toLowerCase() === "published"
        )

        setEventos(eventosFiltrados)
        setError(null)
      } catch (err) {
        console.error("Error al cargar eventos:", err)
        setError("Error al cargar eventos")
      } finally {
        setIsLoading(false)
      }
    }

    loadEventos()
  }, [])

  return { eventos, isLoading, error }
}