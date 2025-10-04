import { useState } from 'react'

/**
 * Hook para manejar filtros de datos
 * @param {Object} initialFilters - Filtros iniciales
 * @returns {Object} Estado y funciones para manejar filtros
 */
export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters)

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  const resetToInitial = () => {
    setFilters(initialFilters)
  }

  return {
    filters,
    updateFilter,
    clearFilters,
    resetToInitial,
    setFilters
  }
}

/**
 * Hook para manejar ordenamiento de datos
 * @param {Object} initialSort - Configuración inicial de ordenamiento
 * @returns {Object} Estado y funciones para manejar ordenamiento
 */
export const useSorting = (initialSort = { key: null, direction: 'asc' }) => {
  const [sortConfig, setSortConfig] = useState(initialSort)

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const clearSort = () => {
    setSortConfig(initialSort)
  }

  return {
    sortConfig,
    handleSort,
    clearSort,
    setSortConfig
  }
}