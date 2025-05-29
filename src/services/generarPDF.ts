import jsPDF from "jspdf"

interface Evento {
  id: string
  titulo: string
  bannerUrl?: string
  categorias: string[]
  fechaInicio: string
  fechaFinalizacion: string
  direccion: string
  descripcion?: string
  precio?: number
  organizador?: string
}

export function generarPDF(evento: Evento) {
  const doc = new jsPDF()
  const formatearFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  doc.setFont("helvetica")
  doc.setFontSize(20)
  doc.setTextColor(147, 51, 234)
  doc.text("DETALLES DEL EVENTO", 20, 30)
  doc.setDrawColor(147, 51, 234)
  doc.setLineWidth(0.5)
  doc.line(20, 35, 190, 35)

  doc.setFontSize(16).setTextColor(0, 0, 0)
  doc.text(evento.titulo, 20, 50)

  doc.setFontSize(12)
  let y = 65

  doc.setFont("helvetica", "bold").text("Fecha de Inicio:", 20, y)
  doc.setFont("helvetica", "normal").text(formatearFecha(evento.fechaInicio), 60, y)
  y += 10

  doc.setFont("helvetica", "bold").text("Fecha de Fin:", 20, y)
  doc.setFont("helvetica", "normal").text(formatearFecha(evento.fechaFinalizacion), 60, y)
  y += 10

  doc.setFont("helvetica", "bold").text("Ubicación:", 20, y)
  doc.setFont("helvetica", "normal")

  const direccionTexto = evento.direccion ? evento.direccion.toString() : "No especificada"
    const direccion = doc.splitTextToSize(direccionTexto, 120)
    doc.text(direccion, 60, y)
  y += direccion.length * 5 + 5

  if (evento.categorias.length > 0) {
  doc.setFont("helvetica", "bold").text("Categorías:", 20, y)
  doc.setFont("helvetica", "normal").text(evento.categorias.join(", "), 60, y)
  y += 10
}
  doc.setFont("helvetica", "bold").text("ID del Evento:", 20, y)
  doc.setFont("helvetica", "normal").text(evento.id, 60, y)
  y += 15

  if (evento.descripcion) {
    doc.setFont("helvetica", "bold").text("Descripción:", 20, y)
    y += 7
    doc.setFont("helvetica", "normal")
    const descripcionTexto = evento.descripcion ? evento.descripcion.toString() : "No hay descripción"
    const desc = doc.splitTextToSize(descripcionTexto, 170)
    doc.text(desc, 20, y)

    y += desc.length * 5 + 10
  }

  if (evento.precio !== undefined) {
    doc.setFont("helvetica", "bold").text("Precio:", 20, y)
    doc.setFont("helvetica", "normal").text(`$${evento.precio.toLocaleString()}`, 60, y)
    y += 10
  }

  if (evento.organizador) {
    doc.setFont("helvetica", "bold").text("Organizador:", 20, y)
    doc.setFont("helvetica", "normal").text(evento.organizador, 60, y)
    y += 10
  }

  doc.setFontSize(10).setTextColor(128, 128, 128)
  doc.text(
    `Generado el ${new Date().toLocaleDateString("es-ES")} a las ${new Date().toLocaleTimeString("es-ES")}`,
    20,
    280
  )

  doc.save(`evento-${evento.id}-detalles.pdf`)
}
