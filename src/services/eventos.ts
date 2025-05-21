import { ItemData } from "@/components/types/ItemData"
import { TicketData } from "@/components/types/TicketData"


export async function fetchEventos(): Promise<ItemData[]> {
	const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
	const response = await fetch(`${API_BASE_URL}/eventos`)
	if (!response.ok) {
		throw new Error("No se pudo obtener la lista de eventos")
	}

	const rawData = await response.json()

	const transformedData: ItemData[] = rawData.map((event: any) => ({
		id: event.EventId.toString(),
		orgId: event.OrganizerId.toString(),
		titulo: event.Title,
		descripcion: event.Description,
		//categoria: "General", // Puedes ajustar esto si tu evento tiene una categoría real
		fechaInicio: event.StartDate,
		fechaFinalizacion: event.EndDate,
		direccion: event.Address,
		visibilidad: event.Visibility,
		categorias: event.Categories?.split(",").map((c: string) => c.trim()) || [],
		capacidad: event.Capacity,
		estado: event.Status,
		ubicacion: {
			lat: event.Latitude,
			lng: event.Longitude,
		},
		bannerUrl: event.BannerUrl,
		videoUrl: event.VideoUrl,
		createdAt: event.createdAt,
		updatedAt: event.updatedAt
	}))

	return transformedData
}

export async function fetchEventoById(id: string): Promise<ItemData> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const response = await fetch(`${API_BASE_URL}/eventos/${id}`)

  if (!response.ok) {
    throw new Error(`No se pudo obtener el evento con ID ${id}`)
  }

  const event = await response.json()

  const transformedEvento: ItemData = {
	  id: event.EventId.toString(),
	  organizerId: event.OrganizerId.toString(),
	  titulo: event.Title,
	  descripcion: event.Description,
	  fechaInicio: event.StartDate,
	  fechaFinalizacion: event.EndDate,
	  direccion: event.Address,
	  visibilidad: event.Visibility,
	  categorias: event.Categories?.split(",").map((c: string) => c.trim()) || [],
	  capacidad: event.Capacity,
	  estado: event.Status,
	  ubicacion: {
		  lat: event.Latitude,
		  lng: event.Longitude,
	  },
	  bannerUrl: event.BannerUrl,
	  videoUrl: event.VideoUrl,
	  createdAt: event.createdAt,
	  updatedAt: event.updatedAt,
	  Latitude: "",
	  Longitude: ""
  }

  return transformedEvento
}

export async function fetchTicketsByEventoId(eventoId: string): Promise<TicketData[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/tickets?eventoId=${eventoId}`);
  if (!response.ok) throw new Error("Error fetching tickets");
  const tickets = await response.json();
  return tickets.map((t: any) => ({
    id: t.TicketId,
    eventoId: t.EventoId,
    tipo: t.Type,
    titulo: t.Title,
    precio: t.Price,
    descripcion: t.Description,
    stockDisponible: t.StockAvailable,
  }));
}