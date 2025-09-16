import { useEffect, useState } from 'react'
import { supabase } from '../data/supabaseClient'

const LoadedFlights = ({formatDate}) => {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlights = async () => {
      const { data, error } = await supabase.from('flight_records').select('*')

      if (error) {
        console.error('Error al traer vuelos:', error)
      } else {
        setFlights(data)
      }
      setLoading(false)
    }

    fetchFlights()
  }, [])

  if (loading) return <p>Cargando vuelos...</p>

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Registros de Vuelos</h2>
      <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-2 py-2">Fecha</th>
            <th className="px-2 py-2">Avión</th>
            <th className="px-2 py-2">Piloto</th>
            <th className="px-2 py-2">Tipo</th>
            <th className="px-2 py-2">Despegue</th>
            <th className="px-2 py-2">Aterrizaje</th>
            <th className="px-2 py-2">Aterrizajes</th>
            <th className="px-2 py-2">Inicio</th>
            <th className="px-2 py-2">Final</th>
            <th className="px-2 py-2">Creación</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id} className="border-t border-gray-700">
              <td className="px-2 py-2">
                {formatDate(flight.fecha)}
              </td>
              <td className="px-2 py-2">{flight.avion}</td>
              <td className="px-2 py-2">{flight.piloto}</td>
              <td className="px-2 py-2">{flight.tipoVuelo}</td>
              <td className="px-2 py-2">{flight.horaDespegue}</td>
              <td className="px-2 py-2">{flight.horaAterrizaje}</td>
              <td className="px-2 py-2">{flight.cantidadAterrizajes}</td>
              <td className="px-2 py-2">{flight.comienzoVuelo}</td>
              <td className="px-2 py-2">{flight.finalizarVuelo}</td>
              <td className="px-2 py-2">
                {formatDate(flight.fechaDeCreacion)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {flights.length === 0 && (
        <p className="mt-4 text-center text-gray-400">
          No hay vuelos registrados.
        </p>
      )}
    </div>
  )
}

export default LoadedFlights
