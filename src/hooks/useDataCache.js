import { useContext } from 'react'
import { DataCacheContext } from '../contexts/DataCacheContext'

// Hook para usar el contexto
export const useDataCache = () => {
  const context = useContext(DataCacheContext)
  if (!context) {
    throw new Error('useDataCache must be used within a DataCacheProvider')
  }
  return context
}