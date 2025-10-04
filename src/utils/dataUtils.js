/**
 * Exporta datos a formato CSV
 * @param {Array} data - Array de objetos con los datos
 * @param {Array} headers - Array de strings con los headers
 * @param {string} filename - Nombre del archivo sin extensión
 */
export const exportToCSV = (data, headers, filename) => {
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map(header => {
        const value = row[header] || ''
        // Escapar comillas y envolver en comillas si contiene comas
        return typeof value === 'string' && value.includes(',') 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      }).join(",")
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Filtra un array de objetos basado en múltiples criterios
 * @param {Array} data - Array de datos a filtrar
 * @param {Object} filters - Objeto con los filtros a aplicar
 * @returns {Array} Array filtrado
 */
export const applyFilters = (data, filters) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true // Si el filtro está vacío, no filtrar por este campo
      
      const itemValue = item[key]
      if (!itemValue) return false
      
      // Manejar diferentes tipos de filtros
      if (key.includes('fecha') || key.includes('Date')) {
        return new Date(itemValue) >= new Date(value)
      }
      
      if (key.includes('Min')) {
        const fieldName = key.replace('Min', '').toLowerCase()
        return Number(item[fieldName]) >= Number(value)
      }
      
      if (key.includes('Max')) {
        const fieldName = key.replace('Max', '').toLowerCase()
        return Number(item[fieldName]) <= Number(value)
      }
      
      // Filtro de texto (case insensitive)
      return itemValue.toString().toLowerCase().includes(value.toLowerCase())
    })
  })
}

/**
 * Ordena un array de objetos por una clave específica
 * @param {Array} data - Array de datos a ordenar
 * @param {string} key - Clave por la cual ordenar
 * @param {string} direction - 'asc' o 'desc'
 * @returns {Array} Array ordenado
 */
export const applySorting = (data, key, direction = 'asc') => {
  return [...data].sort((a, b) => {
    let aValue = a[key]
    let bValue = b[key]

    // Manejar fechas
    if (key.includes('fecha') || key.includes('Date')) {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
    // Manejar números
    else if (!isNaN(aValue) && !isNaN(bValue)) {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }
    
    // Manejar strings
    else if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}