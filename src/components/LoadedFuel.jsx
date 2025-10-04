import { useEffect, useState } from "react"
import { supabase } from "../data/supabaseClient"
import {
  Fuel,
  Calendar,
  User,
  Clock,
  Loader2,
  Filter,
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  FileText,
  Plane,
} from "lucide-react"

const LoadedFuel = ({ formatDate }) => {
  const [fuelRecords, setFuelRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    encargado: "",
    litrosMin: "",
    litrosMax: "",
    fechaInicio: "",
    fechaFin: "",
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [showFilters, setShowFilters] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportDateRange, setExportDateRange] = useState({ inicio: "", fin: "" })

  useEffect(() => {
    const fetchFuelRecords = async () => {
      const { data, error } = await supabase.from("fuel_records").select("*")

      if (error) {
        console.error("Error al traer datos:", error)
      } else {
        setFuelRecords(data)
      }
      setLoading(false)
    }

    fetchFuelRecords()
  }, [])

  useEffect(() => {
    let filtered = [...fuelRecords]

    // Apply filters
    if (filters.encargado) {
      filtered = filtered.filter((record) => record.encargado.toLowerCase().includes(filters.encargado.toLowerCase()))
    }
    if (filters.litrosMin) {
      filtered = filtered.filter((record) => Number.parseFloat(record.litros) >= Number.parseFloat(filters.litrosMin))
    }
    if (filters.litrosMax) {
      filtered = filtered.filter((record) => Number.parseFloat(record.litros) <= Number.parseFloat(filters.litrosMax))
    }
    if (filters.fechaInicio) {
      filtered = filtered.filter((record) => new Date(record.fecha) >= new Date(filters.fechaInicio))
    }
    if (filters.fechaFin) {
      filtered = filtered.filter((record) => new Date(record.fecha) <= new Date(filters.fechaFin))
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key === "fecha" || sortConfig.key === "fechaDeCreacion") {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        } else if (sortConfig.key === "litros" || sortConfig.key === "lecturaSurtidor") {
          aValue = Number.parseFloat(aValue)
          bValue = Number.parseFloat(bValue)
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    setFilteredRecords(filtered)
  }, [fuelRecords, filters, sortConfig])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const exportToCSV = (dataToExport = filteredRecords) => {
    const headers = ["Fecha", "Avión", "Litros", "Lectura Surtidor", "Encargado", "Fecha Creación"]

    const csvContent = [
      headers.join(","),
      ...dataToExport.map((record) =>
        [formatDate(record.fecha), record.avion, record.litros, record.lecturaSurtidor, record.encargado, formatDate(record.fechaDeCreacion)].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `combustible_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportWithDateRange = () => {
    let dataToExport = fuelRecords

    if (exportDateRange.inicio) {
      dataToExport = dataToExport.filter((record) => new Date(record.fecha) >= new Date(exportDateRange.inicio))
    }
    if (exportDateRange.fin) {
      dataToExport = dataToExport.filter((record) => new Date(record.fecha) <= new Date(exportDateRange.fin))
    }

    exportToCSV(dataToExport)
    setShowExportModal(false)
    setExportDateRange({ inicio: "", fin: "" })
  }

  const clearFilters = () => {
    setFilters({
      encargado: "",
      litrosMin: "",
      litrosMax: "",
      fechaInicio: "",
      fechaFin: "",
    })
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-4 h-4 opacity-50" />
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 text-cyan-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-cyan-600" />
    )
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        <span className="ml-3 text-slate-600">Cargando registros de combustible...</span>
      </div>
    )

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
            <Fuel className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Registros de Combustible</h2>
          <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredRecords.length} registros
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button
            onClick={() => exportToCSV()}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar Todo
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            Exportar Rango
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Filtros</h3>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Encargado</label>
              <input
                type="text"
                value={filters.encargado}
                onChange={(e) => setFilters({ ...filters, encargado: e.target.value })}
                placeholder="Buscar encargado..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Litros Mínimos</label>
              <input
                type="number"
                value={filters.litrosMin}
                onChange={(e) => setFilters({ ...filters, litrosMin: e.target.value })}
                placeholder="Ej: 50"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Litros Máximos</label>
              <input
                type="number"
                value={filters.litrosMax}
                onChange={(e) => setFilters({ ...filters, litrosMax: e.target.value })}
                placeholder="Ej: 200"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio</label>
              <input
                type="date"
                value={filters.fechaInicio}
                onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
              <input
                type="date"
                value={filters.fechaFin}
                onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Exportar por Rango de Fechas</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  value={exportDateRange.inicio}
                  onChange={(e) => setExportDateRange({ ...exportDateRange, inicio: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={exportDateRange.fin}
                  onChange={(e) => setExportDateRange({ ...exportDateRange, fin: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={exportWithDateRange}
                  className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("fecha")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Fecha
                    {getSortIcon("fecha")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("avion")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    <Plane className="w-4 h-4" />
                    Avión
                    {getSortIcon("avion")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("litros")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    <Fuel className="w-4 h-4" />
                    Litros
                    {getSortIcon("litros")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("lecturaSurtidor")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    <Fuel className="w-4 h-4" />
                    Lectura Surtidor
                    {getSortIcon("lecturaSurtidor")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("encargado")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Encargado
                    {getSortIcon("encargado")}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort("fechaDeCreacion")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Creación
                    {getSortIcon("fechaDeCreacion")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRecords.map((record, index) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">{formatDate(record.fecha)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {record.avion}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                      {record.litros}L
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.lecturaSurtidor}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.encargado}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{formatDate(record.fechaDeCreacion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && fuelRecords.length > 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No se encontraron registros con los filtros aplicados</p>
            <button onClick={clearFilters} className="text-cyan-600 hover:text-cyan-700 text-sm mt-2 underline">
              Limpiar filtros
            </button>
          </div>
        )}

        {fuelRecords.length === 0 && (
          <div className="text-center py-12">
            <Fuel className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No hay registros de combustible</p>
            <p className="text-slate-400 text-sm mt-1">Los registros aparecerán aquí una vez que agregues datos</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadedFuel
