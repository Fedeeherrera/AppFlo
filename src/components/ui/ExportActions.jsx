import { Download, FileText } from 'lucide-react'

const ExportActions = ({
  onExportAll,
  onExportRange,
  exportAllLabel = "Exportar Todo",
  exportRangeLabel = "Exportar Rango"
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
      <button
        onClick={onExportAll}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm font-medium"
      >
        <Download className="w-4 h-4" />
        <span className="sm:inline">{exportAllLabel}</span>
      </button>
      <button
        onClick={onExportRange}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium"
      >
        <FileText className="w-4 h-4" />
        <span className="sm:inline">{exportRangeLabel}</span>
      </button>
    </div>
  )
}

export default ExportActions