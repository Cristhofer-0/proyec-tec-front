//EventoPage.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/custom/pdf/EventCard"
import { notFound } from "next/navigation"
import { API_BASE_URL } from "@/lib/config"

export default async function EventoPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE_URL}/orders/${params.id}`)

  if (!res.ok) return notFound()

  const data = await res.json()
  console.log(data)
  const event = data // <- Extraer el evento anidado

  return (
    <div className="p-6">
      <Dialog>
        <div className="mt-4 flex justify-end">
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Ver detalles</Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del evento</DialogTitle>
          </DialogHeader>
          <EventCard evento={event} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
