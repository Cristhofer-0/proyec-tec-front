import { Document, Page, Text, View, Image } from "@react-pdf/renderer"
import { styles } from "../../types/styles"
import logo from "../../../../public/images/logo-joinwithus.png"

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

function formatFechaManual(fecha: string, incluirHora = false): string {
  if (!fecha) return "Fecha no disponible"

  // Normaliza el formato para que lo entienda Date
  const fechaIso = fecha.includes("T") ? fecha : fecha.replace(" ", "T")
  const date = new Date(fechaIso)

  if (isNaN(date.getTime())) return "Fecha inválida"

  const dia = String(date.getDate()).padStart(2, "0")
  const mes = String(date.getMonth() + 1).padStart(2, "0")
  const anio = date.getFullYear()
  const hora = String(date.getHours()).padStart(2, "0")
  const minuto = String(date.getMinutes()).padStart(2, "0")

  return incluirHora ? `${dia}/${mes}/${anio} ${hora}:${minuto}` : `${dia}/${mes}/${anio}`
}

export const EventoPDF = ({ evento, qrBase64, orderId, orderDate, fullName, dni, quantity }: { evento: Evento; qrBase64?: string, orderId?: number, orderDate?: string, fullName?: string, dni?: string, quantity?: number }) => {
  const {
    id = "",
    titulo = "",
    bannerUrl = "",
    categorias = [],
    fechaInicio = "",
    fechaFinalizacion = "",
    direccion = "",
    descripcion = "",
    precio,
    organizador = "",
  } = evento

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src="/images/logonew.png" style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{titulo}</Text>
            <Text style={styles.headerSubtitle}>
              {formatFechaManual(fechaInicio)} - {formatFechaManual(fechaFinalizacion)}
            </Text>
          </View>
        </View>

        {orderId && (
          <View style={styles.content}>
            <View style={styles.eventIdBox}>
              <Text style={styles.eventIdLabel}>ID de la Orden</Text>
              <Text style={styles.eventIdText}>{orderId}</Text>
            </View>
          </View>
        )}

        {orderDate && (
          <View style={styles.content}>

            <View style={styles.eventIdBox}>
              <Text style={styles.eventIdLabel}>Fecha de la Orden</Text>
              <Text style={styles.eventIdText}>{formatFechaManual(orderDate || "", true)}</Text>
            </View>
          </View>
        )}

        {/* Event ID */}
        <View style={styles.content}>
          <View style={styles.eventIdBox}>
            <Text style={styles.eventIdLabel}>ID del Evento</Text>
            <Text style={styles.eventIdText}>{id}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Banner Image (if available) */}
          {bannerUrl && <Image src={bannerUrl || "/placeholder.svg"} style={styles.banner} />}

          {/* Main Info Box */}
          <View style={styles.infoBox}>
            {/* Información del usuario */}
            <View style={styles.section}>
              <Text style={styles.label}>Nombre completo:</Text>
              <Text style={styles.text}>{fullName}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>DNI:</Text>
              <Text style={styles.text}>{dni}</Text>
            </View>
            {quantity !== undefined && (
              <View style={styles.section}>
                <Text style={styles.label}>Cantidad de Entradas:</Text>
                <Text style={styles.text}>{quantity}</Text>
              </View>
            )}

            {/* Más contenido del PDF aquí... */}
            <View style={styles.section}>
              <Text style={styles.label}>Fecha de Inicio:</Text>
             <Text style={styles.text}>{formatFechaManual(fechaInicio, true)}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Fecha de Fin:</Text>
              <Text style={styles.text}>{formatFechaManual(fechaFinalizacion, true)}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Ubicación:</Text>
              <Text style={styles.text}>{direccion}</Text>
            </View>

            {organizador && (
              <View style={styles.section}>
                <Text style={styles.label}>Organizador:</Text>
                <Text style={styles.text}>{organizador}</Text>
              </View>
            )}

            {precio !== undefined && (
              <View style={styles.section}>
                <Text style={styles.label}>Precio:</Text>
                <Text style={[styles.text, styles.priceTag]}>${precio}</Text>
              </View>
            )}
          </View>

          {/* Categories */}
          {Array.isArray(categorias) && categorias.length > 0 && (
            <View style={styles.sectionFull}>
              <Text style={styles.label}>Categorías:</Text>
              <View style={styles.badgeContainer}>
                {categorias.map((categoria, index) => (
                  <Text key={index} style={styles.badge}>
                    {categoria}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* QR Code */}
          {qrBase64 && (
            <View style={styles.qrContainer}>
              <Image src={qrBase64 || "/placeholder.svg"} style={styles.qrCode} />
              <Text style={styles.qrText}>Escanea este código para más información</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>
            Generado el {new Date().toLocaleDateString("es-ES")} a las {new Date().toLocaleTimeString("es-ES")}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
