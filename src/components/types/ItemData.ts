import type { TicketData } from "./TicketData"

export type ItemData = {
  id?: string
  organizerId: string
  Latitude: string
  Longitude: string
  titulo: string
  descripcion: string
  fechaInicio?: string
  fechaFinalizacion?: string
  direccion?: string
  visibilidad?: "público" | "privado" | "solo invitación"
  categorias?: string[]
  capacidad?: number
  estado?: "draft" | "published"
  ubicacion: {
    lat: number
    lng: number
  }
  bannerUrl?: string
  videoUrl?: string
  createdAt?: string
  updatedAt?: string
   tickets?: TicketData[]  
}