import { supabase } from '../data/supabaseClient'
import { useDataCache } from './useDataCache'
import Swal from 'sweetalert2'

export const useFlightSubmission = () => {
  const { addRecord } = useDataCache()

  const submitFlight = async (values, { resetForm }) => {
    try {
      const newRecord = {
        fecha: values.fecha,
        avion: values.avion,
        piloto: values.piloto,
        instructor: values.instructor,
        tipoVuelo: values.tipoVuelo,
        horaDespegue: values.horaDespegue,
        horaAterrizaje: values.horaAterrizaje,
        cantidadAterrizajes: Number(values.cantidadAterrizajes),
        comienzoVuelo: values.comienzoVuelo,
        finalizarVuelo: values.finalizarVuelo,
        fechaDeCreacion: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('flight_records')
        .insert([newRecord])
        .select()
        .single()
      
      if (error) throw error
      
      // Actualizar caché local inmediatamente
      addRecord('flight_records', data)
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Vuelo Registrado Con Éxito ✈️',
        showConfirmButton: false,
        timer: 1500,
      })
      
      resetForm()
    } catch (err) {
      console.error('Error guardando vuelo:', err.message)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: false,
        text: 'Hubo un error al registrar el vuelo',
        timer: 2000,
      })
    }
  }

  return { submitFlight }
}