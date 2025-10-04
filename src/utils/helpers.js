/**
 * Genera clases CSS condicionales
 * @param {...(string|Object)} classes - Clases CSS o objetos con condiciones
 * @returns {string} String con las clases CSS
 */
export const classNames = (...classes) => {
  return classes
    .map(cls => {
      if (typeof cls === 'string') return cls
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(' ')
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')
}

/**
 * Debounce una función
 * @param {Function} func - Función a debouncer
 * @param {number} wait - Tiempo de espera en milisegundos
 * @returns {Function} Función debounceda
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}