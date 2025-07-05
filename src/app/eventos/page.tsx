"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Tag, Search } from "lucide-react"
import { fetchEventos } from "@/services/eventos"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { formatearFecha } from "@/components/types/Fechas"
import type { ItemData } from "@/components/types/ItemData"
import { useEventosFiltrados } from "@/components/hooks/useEventosFiltrados"


export default function EventosPage() {
  const { eventos, isLoading, error } = useEventosFiltrados()
  //const [eventos, setEventos] = useState<ItemData[]>([])
  const [filteredEventos, setFilteredEventos] = useState<ItemData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all")
  const [categorias, setCategorias] = useState<string[]>([])
  //const [isLoading, setIsLoading] = useState(true)

  // Función para normalizar texto
  function normalizeText(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }

  useEffect(() => {
    async function loadEventos() {
      try {
        const data = await fetchEventos()
        const publicados = data.filter((evento) => evento.estado === "published")
        setFilteredEventos(publicados)
        //setEventos(data)

        //setIsLoading(false)

        const categoriasMap = new Map()

        data.flatMap((evento) => evento.categorias || []).forEach((cat) => {
          const catTrimmed = cat.trim()
          if (catTrimmed === "") return

          const catNorm = normalizeText(catTrimmed)

          if (!categoriasMap.has(catNorm)) {
            const displayCat = catTrimmed.charAt(0).toUpperCase() + catTrimmed.slice(1).toLowerCase()
            categoriasMap.set(catNorm, displayCat)
          }
        })

        setCategorias(Array.from(categoriasMap.values()))
      } catch (error) {
        console.error("Error fetching eventos:", error)
        //setIsLoading(false)
      }
    }

    loadEventos()
  }, [])

  // Función de filtrado
  const aplicarFiltros = () => {
    const texto = normalizeText(searchTerm)
    const catSeleccionadaNorm = normalizeText(categoriaSeleccionada)

    const filtrados = eventos.filter((evento) => {
      const coincideTexto =
        normalizeText(evento.titulo).includes(texto) ||
        (Array.isArray(evento.categorias) &&
          evento.categorias.some((cat) => normalizeText(cat).includes(texto))) ||
        (typeof evento.direccion === "string" && normalizeText(evento.direccion).includes(texto))

      const coincideCategoria =
        categoriaSeleccionada === "all" ||
        (Array.isArray(evento.categorias) &&
          evento.categorias.some((cat) => normalizeText(cat) === catSeleccionadaNorm))

      return coincideTexto && coincideCategoria
    })

    setFilteredEventos(filtrados)
  }

  // Filtrado automático (opcional)
  useEffect(() => {
    aplicarFiltros()
  }, [searchTerm, categoriaSeleccionada, eventos])

  return (
    <main className="py-12 bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">Todos los Eventos</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubre los mejores eventos disponibles y encuentra el que más te interese
        </p>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto mb-10 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Buscar por título, categoría o ubicación..."
              className="pl-10 h-10 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/4">
            <Select value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada}>
              <SelectTrigger className="h-10 bg-white border-gray-300 shadow-sm">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Todas</SelectItem>
                {categorias
                  .filter((cat) => cat && cat.trim() !== "")
                  .map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredEventos.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-600">No se encontraron eventos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEventos.map((evento, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white"
              >
                <div className="relative h-56">
                  <Image
                    src={evento.bannerUrl || "/placeholder.svg?height=200&width=400"}
                    alt={evento.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {Array.isArray(evento.categorias) && evento.categorias.length > 0 && (
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {evento.categorias[0]}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">{evento.titulo}</h2>

                  <div className="space-y-2 mb-4">
                    <div className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                      <span className="text-sm">
                        {evento.fechaInicio ? formatearFecha(evento.fechaInicio) : "Fecha no disponible"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                      <span className="text-sm">
                        {evento.fechaFinalizacion ? formatearFecha(evento.fechaFinalizacion) : "Fecha no disponible"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-start">
                      <MapPin className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm line-clamp-1">{evento.direccion}</span>
                    </div>

                    {Array.isArray(evento.categorias) && evento.categorias.length > 0 && (
                      <div className="text-gray-600 flex items-start">
                        <Tag className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm line-clamp-1">{evento.categorias.join(", ")}</span>
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
                    <Link href={`/eventos/${evento.id}`}>Ver Detalles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
