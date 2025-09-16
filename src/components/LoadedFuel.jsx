import { useEffect, useState } from 'react';
import { supabase } from '../data/supabaseClient';

const LoadedFlights = () => {
  const [fuelRecords, setFuelRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFuelRecords = async () => {
      const { data, error } = await supabase
        .from('fuel_records')
        .select('*'); // Trae todas las columnas

      if (error) {
        console.error('Error al traer datos:', error);
      } else {
        setFuelRecords(data);
      }
      setLoading(false);
    };

    fetchFuelRecords();
  }, []);

  if (loading) return <p>Cargando registros...</p>;

  return (
    <div>
      <h2>Registros de Combustible</h2>
      <ul>
        {fuelRecords.map(record => (
          <li key={record.id}>
            Fecha: {record.fecha}, Litros: {record.litros}, Encargado: {record.encargado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadedFlights;
