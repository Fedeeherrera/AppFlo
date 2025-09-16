import { useEffect, useState } from 'react';
import { supabase } from '../data/supabaseClient';

const LoadedFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      const { data, error } = await supabase
        .from('flight_records')
        .select('*'); // Trae todas las columnas

      if (error) {
        console.error('Error al traer vuelos:', error);
      } else {
        setFlights(data);
      }
      setLoading(false);
    };

    fetchFlights();
  }, []);

  if (loading) return <p>Cargando vuelos...</p>;

  return (
    <div>
      <h2>Registros de Vuelos</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            Fecha: {flight.fecha}, Avión: {flight.avion}, Piloto: {flight.piloto}, Tipo: {flight.tipoVuelo},
            Despegue: {flight.horaDespegue}, Aterrizaje: {flight.horaAterrizaje},
            Aterrizajes: {flight.cantidadAterrizajes}, Inicio: {flight.comienzoVuelo}, Final: {flight.finalizarVuelo}
            {flight.fechaDeCreacion && (
              <> (Creado: {flight.fechaDeCreacion})</>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadedFlights;