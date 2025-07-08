export function formatearFecha(utcString: string) {
  const fecha = new Date(utcString);

  const dia = fecha.getDate();
  const mes = fecha.getMonth(); // 0-11
  const anio = fecha.getFullYear();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");

  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const nombreMes = meses[mes];

  return `${dia} de ${nombreMes} de ${anio} a las ${horas}:${minutos}`;
}
