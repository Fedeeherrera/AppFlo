import { useState, useEffect } from 'react'
import { supabase } from '../data/supabaseClient'

/**
 * Hook para manejar datos de Supabase con funcionalidades de filtrado y ordenamiento
 * @param {string} tableName - Nombre de la tabla en Supabase
 * @param {Object} options - Opciones de configuración
 * @returns {Object} Estado y funciones para manejar los datos
 */
export const useSupabaseData = (tableName, options = {}) => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    select = '*',
    orderBy = null,
    filters = {},
    sortConfig = { key: null, direction: 'asc' }
  } = options

  // Fetch inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let query = supabase.from(tableName).select(select)
        
        if (orderBy) {
          query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true })
        }
        
        const { data: result, error } = await query
        
        if (error) throw error
        
        setData(result || [])
        setError(null)
      } catch (err) {
        console.error(`Error fetching ${tableName}:`, err)
        setError(err)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tableName, select, orderBy])

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...data]

    // Aplicar filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return
      
      result = result.filter(item => {
        const itemValue = item[key]
        if (!itemValue) return false
        
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

    setFilteredData(result)
  }, [data, filters, sortConfig])

  // Función para refrescar datos
  const refreshData = async () => {
    setLoading(true)
    // Lógica de refetch...
  }

  return {
    data: filteredData,
    originalData: data,
    loading,
    error,
    refreshData
  }
}