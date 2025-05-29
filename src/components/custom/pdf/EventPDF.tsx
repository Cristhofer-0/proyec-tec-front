import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"

// Register fonts (optional - you would need to provide these font files)
// Font.register({
//   family: 'Montserrat',
//   fonts: [
//     { src: '/fonts/Montserrat-Regular.ttf' },
//     { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 'bold' },
//   ],
// })

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

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    backgroundColor: "#9333ea",
    padding: 30,
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
  content: {
    padding: "0 30px",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#9333ea",
    fontWeight: "bold",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 5,
  },
  section: {
    marginBottom: 15,
    flexDirection: "row",
  },
  sectionFull: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    width: "30%",
    color: "#4b5563",
  },
  text: {
    width: "70%",
  },
  descriptionText: {
    lineHeight: 1.6,
    textAlign: "justify",
  },
  divider: {
    borderBottom: "1px solid #e5e7eb",
    marginVertical: 15,
  },
  footer: {
    marginTop: 30,
    padding: "15px 30px",
    borderTop: "1px solid #e5e7eb",
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  qrCode: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  qrText: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#f3e8ff",
    color: "#9333ea",
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  banner: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: "#f3e8ff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderLeft: "4px solid #9333ea",
  },
  priceTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9333ea",
  },
  eventIdBox: {
    backgroundColor: "#f3e8ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeft: "4px solid #9333ea",
    alignItems: "center",
  },
  eventIdLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  eventIdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9333ea",
    letterSpacing: 1,
  },
})

const formatFecha = (fecha: string) => {
  if (!fecha) return "Fecha no disponible"
  const d = new Date(fecha)
  if (isNaN(d.getTime())) return "Fecha inválida"

  const pad = (n: number) => (n < 10 ? "0" + n : n)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const EventoPDF = ({ evento, qrBase64 }: { evento: Evento; qrBase64?: string }) => {
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
          <Text style={styles.headerTitle}>{titulo}</Text>
          <Text style={styles.headerSubtitle}>
            {formatFecha(fechaInicio)} - {formatFecha(fechaFinalizacion)}
          </Text>
        </View>

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
            <View style={styles.section}>
              <Text style={styles.label}>Fecha de Inicio:</Text>
              <Text style={styles.text}>{formatFecha(fechaInicio)}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Fecha de Fin:</Text>
              <Text style={styles.text}>{formatFecha(fechaFinalizacion)}</Text>
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

          <View style={styles.divider} />

          {/* Description */}
          {descripcion && (
            <View style={styles.sectionFull}>
              <Text style={[styles.label, { marginBottom: 5 }]}>Descripción:</Text>
              <Text style={styles.descriptionText}>{descripcion}</Text>
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
