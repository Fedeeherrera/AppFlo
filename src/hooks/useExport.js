import { useState } from 'react'
import { exportToCSV } from '../utils/dataUtils'

/**
 * Hook para manejar exportación de datos
 * @param {Array} data - Datos a exportar
 * @param {Object} config - Configuración de exportación
 * @returns {Object} Estado y funciones para exportar
 */
export const useExport = (data, config = {}) => {
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportDateRange, setExportDateRange] = useState({ inicio: '', fin: '' })

  const {
    filename = 'data',
    headers = [],
    formatData = (item) => item
  } = config

  // Exportar todos los datos
  const exportAll = () => {
    const formattedData = data.map(formatData)
    exportToCSV(formattedData, headers, filename)
  }

  // Exportar con rango de fechas
  const exportWithDateRange = (originalData) => {
    let dataToExport = originalData

    if (exportDateRange.inicio) {
      dataToExport = dataToExport.filter(
        item => new Date(item.fecha) >= new Date(exportDateRange.inicio)
      )
    }
    
    if (exportDateRange.fin) {
      dataToExport = dataToExport.filter(
        item => new Date(item.fecha) <= new Date(exportDateRange.fin)
      )
    }

    const formattedData = dataToExport.map(formatData)
    exportToCSV(formattedData, headers, `${filename}_${exportDateRange.inicio}_${exportDateRange.fin}`)
    
    setShowExportModal(false)
    setExportDateRange({ inicio: '', fin: '' })
  }

  // Mostrar modal de exportación por rango
  const showRangeExport = () => {
    setShowExportModal(true)
  }

  // Cerrar modal
  const closeExportModal = () => {
    setShowExportModal(false)
    setExportDateRange({ inicio: '', fin: '' })
  }

  return {
    showExportModal,
    exportDateRange,
    setExportDateRange,
    exportAll,
    exportWithDateRange,
    showRangeExport,
    closeExportModal
  }
}