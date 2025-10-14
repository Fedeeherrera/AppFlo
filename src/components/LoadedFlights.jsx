import { useState } from "react"
import { Plane, Calendar, User, Clock, MapPin, Loader2, Search } from "lucide-react"
import { useCachedData } from "../hooks/useCachedData"
import { useExport } from "../hooks/useExport"
import {
  DataTable,
  DataFilters,
  FilterInput,
  ExportActions,
  DataHeader,
  Modal
} from "./ui"

const LoadedFlights = ({ formatDate }) => {
  const [filters, setFilters] = useState({
    piloto: "",
    avion: "",
    tipoVuelo: "",
    fechaInicio: "",
    fechaFin: "",
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [showFilters, setShowFilters] = useState(false)

  // Hook para manejar datos con caché, filtros y ordenamiento
  const { data: filteredFlights, originalData: flights, loading } = useCachedData(
    "flight_records",
    {
      filters,
      sortConfig
    }
  )

  // Configuración para exportación
  const exportConfig = {
    filename: 'vuelos',
    headers: [
      'fecha',
      'avion', 
      'piloto',
      'instructor',
      'tipoVuelo',
      'horaDespegue',
      'horaAterrizaje',
      'cantidadAterrizajes',
      'comienzoVuelo',
      'finalizarVuelo',
      'fechaDeCreacion'
    ],
    formatData: (flight) => ({
      fecha: formatDate(flight.fecha),
      avion: flight.avion,
      piloto: flight.piloto,
      instructor: flight.instructor,
      tipoVuelo: flight.tipoVuelo,
      horaDespegue: flight.horaDespegue,
      horaAterrizaje: flight.horaAterrizaje,
      cantidadAterrizajes: flight.cantidadAterrizajes,
      comienzoVuelo: flight.comienzoVuelo,
      finalizarVuelo: flight.finalizarVuelo,
      fechaDeCreacion: formatDate(flight.fechaDeCreacion)
    })
  }

  // Hook para manejo de exportación
  const {
    showExportModal,
    exportDateRange,
    setExportDateRange,
    exportAll,
    exportWithDateRange,
    showRangeExport,
    closeExportModal
  } = useExport(filteredFlights, exportConfig)

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
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

  const handleExportWithDateRange = () => {
    exportWithDateRange(flights)
  }

  // Definición de columnas para la tabla
  const columns = [
    {
      key: "fecha",
      title: "Fecha",
      icon: Calendar,
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-900 font-medium">
          {formatDate(value)}
        </span>
      )
    },
    {
      key: "avion",
      title: "Avión",
      icon: Plane,
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: "piloto",
      title: "Piloto",
      icon: User,
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-700">{value}</span>
      )
    },
    {
      key: "instructor",
      title: "Instructor", 
      icon: User,
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-700">{value}</span>
      )
    },
    {
      key: "tipoVuelo",
      title: "Tipo",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-pink-100 text-pink-800">
          {value}
        </span>
      )
    },
    {
      key: "horaDespegue",
      title: "Despegue",
      icon: Clock,
      render: (value) => (
        <span className="text-sm text-slate-600">{value}</span>
      )
    },
    {
      key: "horaAterrizaje", 
      title: "Aterrizaje",
      icon: Clock,
      render: (value) => (
        <span className="text-sm text-slate-600">{value}</span>
      )
    },
    {
      key: "cantidadAterrizajes",
      title: "Aterrizajes",
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
          {value}
        </span>
      )
    },
    {
      key: "comienzoVuelo",
      title: "Inicio",
      icon: MapPin,
      render: (value) => (
        <span className="text-sm text-slate-600">{value}</span>
      )
    },
    {
      key: "finalizarVuelo",
      title: "Final",
      icon: MapPin,
      render: (value) => (
        <span className="text-sm text-slate-600">{value}</span>
      )
    },
    {
      key: "fechaDeCreacion",
      title: "Creación",
      icon: Clock,
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-500">{formatDate(value)}</span>
      )
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <span className="ml-3 text-slate-600">Cargando registros de vuelos...</span>
      </div>
    )
  }

  return (
    <div className="mt-8 px-2 sm:px-0">
      <DataHeader
        icon={Plane}
        title="Registros de Vuelos"
        count={filteredFlights.length}
        iconColor="from-pink-500 to-rose-600"
        badgeColor="bg-pink-100 text-pink-800"
      >
        <DataFilters
          isVisible={showFilters}
          onToggleVisibility={() => setShowFilters(!showFilters)}
          onClearFilters={clearFilters}
        >
          <FilterInput
            label="Piloto"
            value={filters.piloto}
            onChange={(e) => setFilters({ ...filters, piloto: e.target.value })}
            placeholder="Buscar piloto..."
            focusColor="focus:ring-pink-500"
          />
          <FilterInput
            label="Avión"
            value={filters.avion}
            onChange={(e) => setFilters({ ...filters, avion: e.target.value })}
            placeholder="Buscar avión..."
            focusColor="focus:ring-pink-500"
          />
          <FilterInput
            label="Tipo de Vuelo"
            value={filters.tipoVuelo}
            onChange={(e) => setFilters({ ...filters, tipoVuelo: e.target.value })}
            placeholder="Buscar tipo..."
            focusColor="focus:ring-pink-500"
          />
          <FilterInput
            label="Fecha Inicio"
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
            focusColor="focus:ring-pink-500"
          />
          <FilterInput
            label="Fecha Fin"
            type="date"
            value={filters.fechaFin}
            onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
            focusColor="focus:ring-pink-500"
          />
        </DataFilters>

        <ExportActions
          onExportAll={exportAll}
          onExportRange={showRangeExport}
        />
      </DataHeader>

      <DataTable
        data={filteredFlights}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        emptyMessage={
          flights.length === 0 
            ? "No hay vuelos registrados"
            : "No se encontraron vuelos con los filtros aplicados"
        }
        emptyIcon={flights.length === 0 ? Plane : Search}
      />

      <Modal
        isOpen={showExportModal}
        onClose={closeExportModal}
        title="Exportar por Rango de Fechas"
      >
        <div className="space-y-4">
          <FilterInput
            label="Fecha Inicio"
            type="date"
            value={exportDateRange.inicio}
            onChange={(e) => setExportDateRange({ ...exportDateRange, inicio: e.target.value })}
            focusColor="focus:ring-pink-500"
          />
          <FilterInput
            label="Fecha Fin"
            type="date"
            value={exportDateRange.fin}
            onChange={(e) => setExportDateRange({ ...exportDateRange, fin: e.target.value })}
            focusColor="focus:ring-pink-500"
          />
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={closeExportModal}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors order-2 sm:order-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleExportWithDateRange}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors order-1 sm:order-2"
            >
              Exportar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LoadedFlights
