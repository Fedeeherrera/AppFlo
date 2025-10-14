import { supabase } from '../data/supabaseClient'
import { useDataCache } from './useDataCache'
import Swal from 'sweetalert2'

export const useFuelSubmission = () => {
  const { addRecord } = useDataCache()

  const submitFuel = async (values, { resetForm }) => {
    try {
      const newRecord = {
        fecha: values.fecha,
        litros: Number(values.litros),
        encargado: values.encargado,
        lecturaSurtidor: values.lecturaSurtidor,
        avion: values.avion,
        fechaDeCreacion: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('fuel_records')
        .insert([newRecord])
        .select()
        .single()

      if (error) throw error
      
      // Actualizar caché local inmediatamente
      addRecord('fuel_records', data)
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Carga registrada con éxito ⛽',
        showConfirmButton: false,
        timer: 1500,
      })
      
      resetForm()
    } catch (err) {
      console.error('Error guardando carga:', err.message)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: false,
        text: 'Hubo un error al registrar la carga',
        timer: 2000,
      })
    }
  }

  return { submitFuel }
}