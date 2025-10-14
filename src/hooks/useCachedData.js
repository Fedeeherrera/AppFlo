import { useState, useEffect, useMemo } from 'react'
import { useDataCache } from './useDataCache'

/**
 * Hook optimizado para manejar datos con filtros y ordenamiento usando caché
 * @param {string} tableName - Nombre de la tabla
 * @param {Object} options - Opciones de filtrado y ordenamiento
 * @returns {Object} Datos filtrados, datos originales y estado de carga
 */
export const useCachedData = (tableName, options = {}) => {
  const { state, loadTableData, CACHE_STATES } = useDataCache()
  const [filteredData, setFilteredData] = useState([])
  
  const {
    filters = {},
    sortConfig = { key: null, direction: 'asc' }
  } = options

  const tableState = state[tableName]
  
  // Memoizar datos originales para evitar re-renders
  const originalData = useMemo(() => tableState?.data || [], [tableState?.data])
  
  const loading = tableState?.status === CACHE_STATES.LOADING
  const error = tableState?.error

  // Cargar datos si no están en caché
  useEffect(() => {
    if (tableState?.status === CACHE_STATES.IDLE) {
      loadTableData(tableName)
    }
  }, [tableName, tableState?.status, loadTableData, CACHE_STATES.IDLE])

  // Aplicar filtros y ordenamiento de forma optimizada
  const processedData = useMemo(() => {
    if (!originalData.length) return []

    let result = [...originalData]

    // Aplicar filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return
      
      result = result.filter(item => {
        const itemValue = item[key]
        if (!itemValue && itemValue !== 0) return false
        
        // Filtros de fecha
        if (key.includes('fecha') || key.includes('Date')) {
          if (key.includes('Inicio') || key.includes('inicio')) {
            return new Date(itemValue) >= new Date(value)
          }
          if (key.includes('Fin') || key.includes('fin')) {
            return new Date(itemValue) <= new Date(value)
          }
          return new Date(itemValue).toDateString() === new Date(value).toDateString()
        }
        
        // Filtros numéricos
        if (key.includes('Min')) {
          const fieldName = key.replace('Min', '').toLowerCase()
          return Number(item[fieldName]) >= Number(value)
        }
        
        if (key.includes('Max')) {
          const fieldName = key.replace('Max', '').toLowerCase()
          return Number(item[fieldName]) <= Number(value)
        }
        
        // Filtros de texto
        return itemValue.toString().toLowerCase().includes(value.toLowerCase())
      })
    })

    // Aplicar ordenamiento
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key.includes('fecha') || sortConfig.key.includes('Date')) {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        } else if (!isNaN(aValue) && !isNaN(bValue)) {
          aValue = Number(aValue)
          bValue = Number(bValue)
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [originalData, filters, sortConfig])

  // Actualizar datos filtrados cuando cambian los datos procesados
  useEffect(() => {
    setFilteredData(processedData)
  }, [processedData])

  return {
    data: filteredData,
    originalData,
    loading,
    error,
    isEmpty: originalData.length === 0,
    hasFilter: Object.values(filters).some(value => value)
  }
}