import { Download, FileText } from 'lucide-react'

const ExportActions = ({
  onExportAll,
  onExportRange,
  exportAllLabel = "Exportar Todo",
  exportRangeLabel = "Exportar Rango"
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onExportAll}
        className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
        {exportAllLabel}
      </button>
      <button
        onClick={onExportRange}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
      >
        <FileText className="w-4 h-4" />
        {exportRangeLabel}
      </button>
    </div>
  )
}

export default ExportActions