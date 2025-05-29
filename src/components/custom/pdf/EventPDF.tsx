// components/custom/pdf/EventoPDF.tsx
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

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
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#9333ea',
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 2,
  },
})

const formatFecha = (fecha: string) => {
  if (!fecha) return 'Fecha no disponible';
  const d = new Date(fecha)
  if (isNaN(d.getTime())) return 'Fecha inválida'

  const pad = (n: number) => (n < 10 ? '0' + n : n)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}


export const EventoPDF = ({ evento, qrBase64, orderDate }: { evento: Evento, qrBase64?: string, orderDate?: string }) => {
  console.log('Evento en PDF:', evento); 
  const {
    id = '',
    titulo = '',
    categorias = [],
    fechaInicio = '',
    fechaFinalizacion = '',
    direccion = '',
    descripcion,
    precio,
    organizador,
  } = evento;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>DETALLES DEL EVENTO</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Título:</Text>
          <Text style={styles.text}>{titulo}</Text>
        </View>

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

        {Array.isArray(categorias) && categorias.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Categorías:</Text>
            <Text style={styles.text}>{categorias.join(', ')}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>ID del Evento:</Text>
          <Text style={styles.text}>{id}</Text>
        </View>

        {evento.descripcion && (
          <View style={styles.section}>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.text}>{descripcion}</Text>
          </View>
        )}

        {evento.precio !== undefined && (
          <View style={styles.section}>
            <Text style={styles.label}>Precio:</Text>
            <Text style={styles.text}>${precio}</Text>
          </View>
        )}

        {evento.organizador && (
          <View style={styles.section}>
            <Text style={styles.label}>Organizador:</Text>
            <Text style={styles.text}>{organizador}</Text>
          </View>
        )}
        
        {orderDate && (
          <View style={styles.section}>
            <Text style={styles.label}>Fecha de Orden:</Text>
            <Text style={styles.text}>{formatFecha(orderDate)}</Text>
          </View>
        )}
        {qrBase64 && (
          <View style={styles.section}>
            <Text style={styles.label}>Código QR:</Text>
            <Image src={qrBase64} style={{ width: 100, height: 100 }} />
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={{ color: 'gray', fontSize: 10 }}>
            Generado el {new Date().toLocaleDateString("es-ES")} a las {new Date().toLocaleTimeString("es-ES")}
          </Text>
        </View>
      </Page>
    </Document>
  );
};