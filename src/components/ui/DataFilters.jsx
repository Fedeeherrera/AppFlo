import { Filter, X } from 'lucide-react'

const DataFilters = ({
  isVisible,
  onToggleVisibility,
  onClearFilters,
  children,
  title = "Filtros"
}) => {
  return (
    <>
      {/* Botón toggle filtros */}
      <button
        onClick={onToggleVisibility}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">{title}</span>
      </button>

      {/* Panel de filtros */}
      {isVisible && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 mb-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm self-start sm:self-auto"
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
          
          {/* Grid responsive mejorado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default DataFilters