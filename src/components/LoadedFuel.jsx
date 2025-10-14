import { useState } from "react"
import { Fuel, Calendar, User, Clock, Loader2, Search, Plane } from "lucide-react"
import { useSupabaseData } from "../hooks/useSupabaseData"
import { useExport } from "../hooks/useExport"
import {
  DataTable,
  DataFilters,
  FilterInput,
  ExportActions,
  DataHeader,
  Modal
} from "./ui"

const LoadedFuel = ({ formatDate }) => {
  const [filters, setFilters] = useState({
    encargado: "",
    litrosMin: "",
    litrosMax: "",
    fechaInicio: "",
    fechaFin: "",
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [showFilters, setShowFilters] = useState(false)

  // Hook para manejar datos de Supabase con filtros y ordenamiento
  const { data: filteredRecords, originalData: fuelRecords, loading } = useSupabaseData(
    "fuel_records",
    {
      filters,
      sortConfig
    }
  )

  // Configuración para exportación
  const exportConfig = {
    filename: 'combustible',
    headers: [
      'fecha',
      'avion',
      'litros',
      'lecturaSurtidor', 
      'encargado',
      'fechaDeCreacion'
    ],
    formatData: (record) => ({
      fecha: formatDate(record.fecha),
      avion: record.avion,
      litros: record.litros,
      lecturaSurtidor: record.lecturaSurtidor,
      encargado: record.encargado,
      fechaDeCreacion: formatDate(record.fechaDeCreacion)
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
  } = useExport(filteredRecords, exportConfig)

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
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

  const handleExportWithDateRange = () => {
    exportWithDateRange(fuelRecords)
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
      key: "litros",
      title: "Litros",
      icon: Fuel,
      sortable: true,
      render: (value) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
          {value}L
        </span>
      )
    },
    {
      key: "lecturaSurtidor",
      title: "Lectura Surtidor",
      icon: Fuel,
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-700">{value}</span>
      )
    },
    {
      key: "encargado",
      title: "Encargado",
      icon: User,
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-700">{value}</span>
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
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        <span className="ml-3 text-slate-600">Cargando registros de combustible...</span>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <DataHeader
        icon={Fuel}
        title="Registros de Combustible"
        count={filteredRecords.length}
        iconColor="from-cyan-500 to-blue-600"
        badgeColor="bg-cyan-100 text-cyan-800"
      >
        <DataFilters
          isVisible={showFilters}
          onToggleVisibility={() => setShowFilters(!showFilters)}
          onClearFilters={clearFilters}
        >
          <FilterInput
            label="Encargado"
            value={filters.encargado}
            onChange={(e) => setFilters({ ...filters, encargado: e.target.value })}
            placeholder="Buscar encargado..."
            focusColor="focus:ring-cyan-500"
          />
          <FilterInput
            label="Litros Mínimos"
            type="number"
            value={filters.litrosMin}
            onChange={(e) => setFilters({ ...filters, litrosMin: e.target.value })}
            placeholder="Ej: 50"
            focusColor="focus:ring-cyan-500"
          />
          <FilterInput
            label="Litros Máximos"
            type="number"
            value={filters.litrosMax}
            onChange={(e) => setFilters({ ...filters, litrosMax: e.target.value })}
            placeholder="Ej: 200"
            focusColor="focus:ring-cyan-500"
          />
          <FilterInput
            label="Fecha Inicio"
            type="date"
            value={filters.fechaInicio}
            onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
            focusColor="focus:ring-cyan-500"
          />
          <FilterInput
            label="Fecha Fin"
            type="date"
            value={filters.fechaFin}
            onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
            focusColor="focus:ring-cyan-500"
          />
        </DataFilters>

        <ExportActions
          onExportAll={exportAll}
          onExportRange={showRangeExport}
        />
      </DataHeader>

      <DataTable
        data={filteredRecords}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        emptyMessage={
          fuelRecords.length === 0 
            ? "No hay registros de combustible"
            : "No se encontraron registros con los filtros aplicados"
        }
        emptyIcon={fuelRecords.length === 0 ? Fuel : Search}
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
            focusColor="focus:ring-cyan-500"
          />
          <FilterInput
            label="Fecha Fin"
            type="date"
            value={exportDateRange.fin}
            onChange={(e) => setExportDateRange({ ...exportDateRange, fin: e.target.value })}
            focusColor="focus:ring-cyan-500"
          />
          <div className="flex gap-3 pt-4">
            <button
              onClick={closeExportModal}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleExportWithDateRange}
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Exportar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LoadedFuel
