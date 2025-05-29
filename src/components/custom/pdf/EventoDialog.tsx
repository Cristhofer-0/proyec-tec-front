// components/custom/EventoDialog.tsx
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/custom/pdf/EventCard"
import { useEffect, useState } from "react"
import { PDFDownloadLink } from '@react-pdf/renderer'
import { EventoPDF } from './EventPDF'
import { generarQRBase64 } from '../../types/generarQR'


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
  const [orden, setOrden] = useState<any | null>(null)
  const [evento, setEvento] = useState<Evento | null>(null)
  const [qrBase64, setQrBase64] = useState<string | null>(null)

  useEffect(() => {
  if (!orden) return
  const generar = async () => {
    const qr = await generarQRBase64({
      OrderId: orden.OrderId,
      EventoId: orden.Event?.EventId,
      Fecha: orden.OrderDate,
      EstadoPago: orden.PaymentStatus,
      Evento: orden.Event?.Title,
      Dirección: orden.Event?.Address,
      Precio: orden.Ticket?.Price,
    })
    setQrBase64(qr)
  }
  generar()
}, [orden])

  useEffect(() => {
    const fetchEvento = async () => {
      const res = await fetch(`http://localhost:3000/orders/${id}`)
      if (res.ok) {
        const data = await res.json()
        setOrden(data)
        setEvento(data.Event)
      }
    }
    fetchEvento()
  }, [id])

  if (!evento) return null

  const normalizarEvento = (eventoOriginal: any): Evento => ({
      id: String(eventoOriginal.EventId),
      titulo: eventoOriginal.Title,
      categorias: typeof eventoOriginal.Categories === 'string'
        ? eventoOriginal.Categories.split(',').map((c: string) => c.trim())
        : [],
      fechaInicio: eventoOriginal.StartDate,
      fechaFinalizacion: eventoOriginal.EndDate,
      direccion: eventoOriginal.Address,
      descripcion: eventoOriginal.Description,
      precio: eventoOriginal.Price,
      organizador: eventoOriginal.OrganizerName || eventoOriginal.organizador || '',
    })
    
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
          <DialogDescription>
            Información detallada del evento, incluyendo fecha, ubicación y más.
          </DialogDescription>
        </DialogHeader>
        <EventCard evento={evento} />
        {/* <Button onClick={() => generarPDF(evento)} className="bg-purple-600 text-white hover:bg-purple-700">
            Descargar PDF
        </Button> */}
        
        {evento ? (
          <PDFDownloadLink
            document={<EventoPDF 
              evento={normalizarEvento(evento)} 
              qrBase64={qrBase64 || ''} 
              orderId={orden?.OrderId}
              orderDate={orden?.OrderDate}/>}
            fileName={`Factura-de-la-orden-${orden.OrderId}.pdf`}
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
