import { createContext, useReducer, useEffect } from 'react'
import { supabase } from '../data/supabaseClient'

// Estados del caché
const CACHE_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

// Acciones del reducer
const ACTIONS = {
  START_LOADING: 'START_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  INVALIDATE_CACHE: 'INVALIDATE_CACHE',
  UPDATE_RECORD: 'UPDATE_RECORD',
  ADD_RECORD: 'ADD_RECORD'
}

// Estado inicial
const initialState = {
  flight_records: {
    data: [],
    status: CACHE_STATES.IDLE,
    error: null,
    lastFetch: null
  },
  fuel_records: {
    data: [],
    status: CACHE_STATES.IDLE,
    error: null,
    lastFetch: null
  }
}

// Reducer para manejar el estado del caché
const cacheReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_LOADING:
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          status: CACHE_STATES.LOADING,
          error: null
        }
      }

    case ACTIONS.SET_DATA:
      return {
        ...state,
        [action.table]: {
          data: action.data,
          status: CACHE_STATES.SUCCESS,
          error: null,
          lastFetch: Date.now()
        }
      }

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          status: CACHE_STATES.ERROR,
          error: action.error
        }
      }

    case ACTIONS.INVALIDATE_CACHE:
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          status: CACHE_STATES.IDLE,
          lastFetch: null
        }
      }

    case ACTIONS.ADD_RECORD:
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          data: [action.record, ...state[action.table].data]
        }
      }

    case ACTIONS.UPDATE_RECORD:
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          data: state[action.table].data.map(record =>
            record.id === action.record.id ? { ...record, ...action.record } : record
          )
        }
      }

    default:
      return state
  }
}

// Contexto
export const DataCacheContext = createContext()

// Provider
export const DataCacheProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cacheReducer, initialState)

  // Función para cargar datos de una tabla
  const loadTableData = async (tableName, forceRefresh = false) => {
    const tableState = state[tableName]
    const cacheExpiry = 5 * 60 * 1000 // 5 minutos
    const isStale = !tableState.lastFetch || (Date.now() - tableState.lastFetch > cacheExpiry)

    // Si ya tenemos datos válidos y no es una actualización forzada, no hacemos nada
    if (tableState.status === CACHE_STATES.SUCCESS && !isStale && !forceRefresh) {
      return tableState.data
    }

    // Si ya está cargando, no iniciamos otra carga
    if (tableState.status === CACHE_STATES.LOADING) {
      return tableState.data
    }

    try {
      dispatch({ type: ACTIONS.START_LOADING, table: tableName })

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('fechaDeCreacion', { ascending: false })

      if (error) throw error

      dispatch({
        type: ACTIONS.SET_DATA,
        table: tableName,
        data: data || []
      })

      return data || []
    } catch (error) {
      console.error(`Error loading ${tableName}:`, error)
      dispatch({
        type: ACTIONS.SET_ERROR,
        table: tableName,
        error
      })
      return []
    }
  }

  // Función para agregar un nuevo registro
  const addRecord = (tableName, record) => {
    dispatch({
      type: ACTIONS.ADD_RECORD,
      table: tableName,
      record
    })
  }

  // Función para actualizar un registro
  const updateRecord = (tableName, record) => {
    dispatch({
      type: ACTIONS.UPDATE_RECORD,
      table: tableName,
      record
    })
  }

  // Función para invalidar caché
  const invalidateCache = (tableName) => {
    dispatch({
      type: ACTIONS.INVALIDATE_CACHE,
      table: tableName
    })
  }

  // Función para refrescar datos
  const refreshTable = (tableName) => {
    return loadTableData(tableName, true)
  }

  // Cargar datos iniciales cuando se monta el provider
  useEffect(() => {
    const loadInitialData = async () => {
      // Cargar ambas tablas en paralelo al inicio
      await Promise.allSettled([
        loadTableData('flight_records'),
        loadTableData('fuel_records')
      ])
    }
    
    loadInitialData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    state,
    loadTableData,
    addRecord,
    updateRecord,
    invalidateCache,
    refreshTable,
    CACHE_STATES
  }

  return (
    <DataCacheContext.Provider value={value}>
      {children}
    </DataCacheContext.Provider>
  )
}