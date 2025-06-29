export function formatearFecha(utcString: string) {
  const [year, month, day] = utcString.slice(0, 10).split("-");

  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const nombreMes = meses[parseInt(month, 10) - 1];
  return `${parseInt(day, 10)} de ${nombreMes}`;
}