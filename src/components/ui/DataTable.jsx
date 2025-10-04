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
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-4 text-left">
                  {column.sortable ? (
                    <button
                      onClick={() => onSort(column.key)}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors"
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

      {data.length === 0 && (
        <div className="text-center py-12">
          {EmptyIcon && <EmptyIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />}
          <p className="text-slate-500 text-lg">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}

export default DataTable