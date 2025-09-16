import { useEffect, useState } from 'react';
import { supabase } from '../data/supabaseClient';

const LoadedFuel = ({formatDate}) => {
  const [fuelRecords, setFuelRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFuelRecords = async () => {
      const { data, error } = await supabase
        .from('fuel_records')
        .select('*'); 

      if (error) {
        console.error('Error al traer datos:', error);
      } else {
        setFuelRecords(data);
      }
      setLoading(false);
    };

    fetchFuelRecords();
  }, []);

  if (loading) return <p>Cargando registros de combustible...</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Registros de Combustible</h2>
      <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-2 py-2">Fecha</th>
            <th className="px-2 py-2">Litros</th>
            <th className="px-2 py-2">Encargado</th>
            <th className="px-2 py-2">Creación</th>
          </tr>
        </thead>
        <tbody>
          {fuelRecords.map(record => (
            <tr key={record.id} className="border-t border-gray-700">
              <td className="px-2 py-2">{formatDate(record.fecha)}</td>
              <td className="px-2 py-2">{record.litros}</td>
              <td className="px-2 py-2">{record.encargado}</td>
              <td className="px-2 py-2">{formatDate(record.fechaDeCreacion)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {fuelRecords.length === 0 && (
        <p className="mt-4 text-center text-gray-400">No hay registros de combustible.</p>
      )}
    </div>
  );
};

export default LoadedFuel;