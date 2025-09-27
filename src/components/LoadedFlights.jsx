import { useEffect, useState } from "react"
import { supabase } from "../data/supabaseClient"
import {
  Plane,
  Calendar,
  User,
  Clock,
  MapPin,
  Loader2,
  Filter,
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  FileText,
} from "lucide-react"

const LoadedFlights = ({ formatDate }) => {
  const [flights, setFlights] = useState([])
  const [filteredFlights, setFilteredFlights] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    piloto: "",
    avion: "",
    tipoVuelo: "",
    fechaInicio: "",
    fechaFin: "",
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [showFilters, setShowFilters] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportDateRange, setExportDateRange] = useState({ inicio: "", fin: "" })

  useEffect(() => {
    const fetchFlights = async () => {
      const { data, error } = await supabase.from("flight_records").select("*")

      if (error) {
        console.error("Error al traer vuelos:", error)
      } else {
        setFlights(data)
      }
      setLoading(false)
    }

    fetchFlights()
  }, [])

  useEffect(() => {
    let filtered = [...flights]

    // Apply filters
    if (filters.piloto) {
      filtered = filtered.filter((flight) => flight.piloto.toLowerCase().includes(filters.piloto.toLowerCase()))
    }
    if (filters.avion) {
      filtered = filtered.filter((flight) => flight.avion.toLowerCase().includes(filters.avion.toLowerCase()))
    }
    if (filters.tipoVuelo) {
      filtered = filtered.filter((flight) => flight.tipoVuelo.toLowerCase().includes(filters.tipoVuelo.toLowerCase()))
    }
    if (filters.fechaInicio) {
      filtered = filtered.filter((flight) => new Date(flight.fecha) >= new Date(filters.fechaInicio))
    }
    if (filters.fechaFin) {
      filtered = filtered.filter((flight) => new Date(flight.fecha) <= new Date(filters.fechaFin))
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key === "fecha" || sortConfig.key === "fechaDeCreacion") {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    setFilteredFlights(filtered)
  }, [flights, filters, sortConfig])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const exportToCSV = (dataToExport = filteredFlights) => {
    const headers = [
      "Fecha",
      "Avión",
      "Piloto",
      "Tipo de Vuelo",
      "Hora Despegue",
      "Hora Aterrizaje",
      "Cantidad Aterrizajes",
      "Inicio Vuelo",
      "Final Vuelo",
      "Fecha Creación",
    ]

    const csvContent = [
      headers.join(","),
      ...dataToExport.map((flight) =>
        [
          formatDate(flight.fecha),
          flight.avion,
          flight.piloto,
          flight.tipoVuelo,
          flight.horaDespegue,
          flight.horaAterrizaje,
          flight.cantidadAterrizajes,
          flight.comienzoVuelo,
          flight.finalizarVuelo,
          formatDate(flight.fechaDeCreacion),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `vuelos_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportWithDateRange = () => {
    let dataToExport = flights

    if (exportDateRange.inicio) {
      dataToExport = dataToExport.filter((flight) => new Date(flight.fecha) >= new Date(exportDateRange.inicio))
    }
    if (exportDateRange.fin) {
      dataToExport = dataToExport.filter((flight) => new Date(flight.fecha) <= new Date(exportDateRange.fin))
    }

    exportToCSV(dataToExport)
    setShowExportModal(false)
    setExportDateRange({ inicio: "", fin: "" })
  }

  const clearFilters = () => {
    setFilters({
      piloto: "",
      avion: "",
      tipoVuelo: "",
      fechaInicio: "",
      fechaFin: "",
    })
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-4 h-4 opacity-50" />
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 text-pink-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-pink-600" />
    )
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <span className="ml-3 text-slate-600">Cargando registros de vuelos...</span>
      </div>
    )

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Registros de Vuelos</h2>
          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredFlights.length} registros
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Piloto</label>
              <input
                type="text"
                value={filters.piloto}
                onChange={(e) => setFilters({ ...filters, piloto: e.target.value })}
                placeholder="Buscar piloto..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Avión</label>
              <input
                type="text"
                value={filters.avion}
                onChange={(e) => setFilters({ ...filters, avion: e.target.value })}
                placeholder="Buscar avión..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Vuelo</label>
              <input
                type="text"
                value={filters.tipoVuelo}
                onChange={(e) => setFilters({ ...filters, tipoVuelo: e.target.value })}
                placeholder="Buscar tipo..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio</label>
              <input
                type="date"
                value={filters.fechaInicio}
                onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
              <input
                type="date"
                value={filters.fechaFin}
                onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={exportDateRange.fin}
                  onChange={(e) => setExportDateRange({ ...exportDateRange, fin: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
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
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => handleSort("fecha")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Fecha
                    {getSortIcon("fecha")}
                  </button>
                </th>
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => handleSort("avion")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    <Plane className="w-4 h-4" />
                    Avión
                    {getSortIcon("avion")}
                  </button>
                </th>
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => handleSort("piloto")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Piloto
                    {getSortIcon("piloto")}
                  </button>
                </th>
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => handleSort("tipoVuelo")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    Tipo
                    {getSortIcon("tipoVuelo")}
                  </button>
                </th>
                <th className="px-4 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock className="w-4 h-4" />
                    Despegue
                  </div>
                </th>
                <th className="px-4 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock className="w-4 h-4" />
                    Aterrizaje
                  </div>
                </th>
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => handleSort("cantidadAterrizajes")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    Aterrizajes
                    {getSortIcon("cantidadAterrizajes")}
                  </button>
                </th>
                <th className="px-4 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin className="w-4 h-4" />
                    Inicio
                  </div>
                </th>
                <th className="px-4 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin className="w-4 h-4" />
                    Final
                  </div>
                </th>
                <th className="px-4 py-4 text-left">
                  <button
                    onClick={() => handleSort("fechaDeCreacion")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-pink-600 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Creación
                    {getSortIcon("fechaDeCreacion")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFlights.map((flight, index) => (
                <tr
                  key={flight.id}
                  className="hover:bg-slate-50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-4 py-4 text-sm text-slate-900 font-medium">{formatDate(flight.fecha)}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {flight.avion}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{flight.piloto}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-pink-100 text-pink-800">
                      {flight.tipoVuelo}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{flight.horaDespegue}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{flight.horaAterrizaje}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                      {flight.cantidadAterrizajes}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{flight.comienzoVuelo}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{flight.finalizarVuelo}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{formatDate(flight.fechaDeCreacion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFlights.length === 0 && flights.length > 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No se encontraron vuelos con los filtros aplicados</p>
            <button onClick={clearFilters} className="text-pink-600 hover:text-pink-700 text-sm mt-2 underline">
              Limpiar filtros
            </button>
          </div>
        )}

        {flights.length === 0 && (
          <div className="text-center py-12">
            <Plane className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No hay vuelos registrados</p>
            <p className="text-slate-400 text-sm mt-1">Los vuelos aparecerán aquí una vez que agregues datos</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadedFlights
