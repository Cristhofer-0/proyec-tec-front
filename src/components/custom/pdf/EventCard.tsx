//EventCard.tsx
"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin, Tag, DollarSign, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function EventCard({ evento }: { evento: any }) {
function formatearFechaUTC(utcString: string) {
  return utcString.slice(0, 10).split("-").reverse().join("/") // "2025/07/26"
}

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg">
      {/* Imagen del evento */}
      {/* <div className="relative h-48 w-full rounded-lg overflow-hidden">
        <Image
          src={evento.BannerUrl || "/placeholder.svg?height=200&width=400"}
          alt={evento.Title || "Imagen del evento"}
          fill
          className="object-cover"
        />
      </div> */}

      {/* Título */}
      <h2 className="text-2xl font-bold text-purple-600">{evento.Title}</h2>

      {/* Descripción */}
      {evento.Description && (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {evento.Description}
        </p>
      )}

      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Fecha de Inicio</p>
              <p className="text-gray-600 dark:text-gray-400">
                 {formatearFechaUTC(evento.StartDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Fecha de Finalización</p>
              <p className="text-gray-600 dark:text-gray-400">
                {formatearFechaUTC(evento.EndDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Ubicación</p>
              <p className="text-gray-600 dark:text-gray-400">{evento.Address}</p>
            </div>
          </div>

          {evento.Price && (
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Precio</p>
                <p className="text-gray-600 dark:text-gray-400">
                  ${evento.Price.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Categorías */}
      {evento.Categories && (
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-purple-600" />
            Categorías
          </h3>
          <div className="flex flex-wrap gap-2">
            {evento.Categories.split(",").map((cat: string, i: number) => (
              <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-700">
                {cat.trim()}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Organizador */}
      {evento.Organizer && (
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-600" />
            Organizador
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{evento.Organizer}</p>
        </div>
      )}
    </div>
  )
}
