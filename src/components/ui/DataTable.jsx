import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

const DataTable = ({
  data,
  columns,
  sortConfig,
  onSort,
  emptyMessage = "No hay datos disponibles",
  emptyIcon: EmptyIcon,
  className = ""
}) => {
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-4 h-4 opacity-50" />
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 text-pink-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-pink-600" />
    )
  }

  // Vista móvil - Cards
  const MobileCardView = () => (
    <div className="md:hidden space-y-4">
      {data.map((row, index) => (
        <div
          key={row.id || index}
          className="bg-white rounded-lg shadow-md border border-slate-200 p-4"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="space-y-3">
            {columns.slice(0, 6).map((column) => {
              const value = row[column.key]
              if (!value && value !== 0) return null
              
              return (
                <div key={column.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    {column.icon && <column.icon className="w-4 h-4" />}
                    {column.title}:
                  </div>
                  <div className="text-sm">
                    {column.render ? column.render(value, row) : value}
                  </div>
                </div>
              )
            })}
            
            {/* Campos adicionales colapsables en móvil */}
            {columns.length > 6 && (
              <details className="mt-3">
                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">
                  Ver más detalles...
                </summary>
                <div className="mt-2 space-y-2 pl-4 border-l-2 border-slate-200">
                  {columns.slice(6).map((column) => {
                    const value = row[column.key]
                    if (!value && value !== 0) return null
                    
                    return (
                      <div key={column.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          {column.icon && <column.icon className="w-3 h-3" />}
                          {column.title}:
                        </div>
                        <div className="text-xs">
                          {column.render ? column.render(value, row) : value}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </details>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  // Vista desktop - Tabla
  const DesktopTableView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-4 text-left">
                {column.sortable ? (
                  <button
                    onClick={() => onSort(column.key)}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    {column.icon && <column.icon className="w-4 h-4" />}
                    {column.title}
                    {getSortIcon(column.key)}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    {column.icon && <column.icon className="w-4 h-4" />}
                    {column.title}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="hover:bg-slate-50 transition-colors duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-4">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${className}`}>
      {/* Botones de ordenamiento para móvil */}
      {data.length > 0 && (
        <div className="md:hidden p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-slate-600 mr-2">Ordenar por:</span>
            {columns.filter(col => col.sortable).slice(0, 3).map((column) => (
              <button
                key={column.key}
                onClick={() => onSort(column.key)}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  sortConfig.key === column.key
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {column.icon && <column.icon className="w-3 h-3" />}
                {column.title}
                {sortConfig.key === column.key && getSortIcon(column.key)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {data.length > 0 ? (
        <>
          <MobileCardView />
          <DesktopTableView />
        </>
      ) : (
        <div className="text-center py-12">
          {EmptyIcon && <EmptyIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />}
          <p className="text-slate-500 text-lg">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}

export default DataTable