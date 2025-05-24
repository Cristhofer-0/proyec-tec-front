export function formatearFecha(fechaISO: string) {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long' }).format(fecha);
}