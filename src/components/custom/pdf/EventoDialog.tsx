// components/custom/EventoDialog.tsx
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/custom/pdf/EventCard"
import { useEffect, useState } from "react"
import { generarPDF } from "@/services/generarPDF"
import { PDFDownloadLink } from '@react-pdf/renderer'
// import { EventoPDF } from '@/components/custom/pdf/EventoPDF'
// Update the import path below to match the actual file location and name, e.g.:
import { EventoPDF } from './EventPDF'


type Evento = {
  id: string;
  titulo: string;
  categorias: string[];
  fechaInicio: string;
  fechaFinalizacion: string;
  direccion: string;
  descripcion?: string;
  precio?: number;
  organizador?: string;
  [key: string]: any;
};

export default function EventoDialog({ id }: { id: string }) {
  const [evento, setEvento] = useState<Evento | null>(null)

  useEffect(() => {
    const fetchEvento = async () => {
      const res = await fetch(`http://localhost:3000/orders/${id}`)
      if (res.ok) {
        const data = await res.json()
        setEvento(data)
      }
    }
    fetchEvento()
  }, [id])

  if (!evento) return null

  return (
    <Dialog>
      <div className="mt-4 flex justify-end">
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">Ver detalles</Button>
        </DialogTrigger>
      </div>

      <DialogContent className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
        <DialogHeader>
          <DialogTitle>Detalles del evento</DialogTitle>
        </DialogHeader>
        <EventCard evento={evento} />
        {/* <Button onClick={() => generarPDF(evento)} className="bg-purple-600 text-white hover:bg-purple-700">
            Descargar PDF
        </Button> */}
        {evento ? (
            <PDFDownloadLink
                document={<EventoPDF evento={evento} />}
                fileName={`evento-${evento.id}-detalles.pdf`}
            >
                {({ loading }) => (
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                    {loading ? 'Generando PDF...' : 'Descargar PDF'}
                </Button>
                )}
            </PDFDownloadLink>
            ) : (
            <p className="text-sm text-gray-500">Cargando PDF…</p>
        )}

        
        <DialogClose asChild>
            <Button variant="outline" size="sm">Cerrar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
