/**
 * Formatea una fecha en formato español argentino
 * @param {string|Date} fecha - La fecha a formatear
 * @returns {string} Fecha formateada en formato DD/MM/YYYY o "-" si no hay fecha
 */
export const formatDate = (fecha) => {
  return fecha
    ? new Date(fecha).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-"
}

/**
 * Formatea una fecha para inputs de tipo date (YYYY-MM-DD)
 * @param {string|Date} fecha - La fecha a formatear
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
export const formatDateForInput = (fecha) => {
  if (!fecha) return ''
  
  const date = new Date(fecha)
  return date.toISOString().split('T')[0]
}

/**
 * Calcula la diferencia de tiempo entre dos horas
 * @param {string} horaInicio - Hora de inicio en formato HH:MM
 * @param {string} horaFin - Hora de fin en formato HH:MM
 * @returns {string} Diferencia en formato HH:MM
 */
export const calculateTimeDifference = (horaInicio, horaFin) => {
  if (!horaInicio || !horaFin) return '00:00'
  
  const [horasInicio, minutosInicio] = horaInicio.split(':').map(Number)
  const [horasFin, minutosFin] = horaFin.split(':').map(Number)
  
  const inicioEnMinutos = horasInicio * 60 + minutosInicio
  let finEnMinutos = horasFin * 60 + minutosFin
  
  // Manejar vuelos que cruzan medianoche
  if (finEnMinutos < inicioEnMinutos) {
    finEnMinutos += 24 * 60
  }
  
  const diferenciaMinutos = finEnMinutos - inicioEnMinutos
  const horas = Math.floor(diferenciaMinutos / 60)
  const minutos = diferenciaMinutos % 60
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`
}