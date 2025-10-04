import { supabase } from '../data/supabaseClient'
import Swal from 'sweetalert2'

export const useFuelSubmission = () => {
  const submitFuel = async (values, { resetForm }) => {
    try {
      const { error } = await supabase.from('fuel_records').insert([
        {
          fecha: values.fecha,
          litros: Number(values.litros),
          encargado: values.encargado,
          lecturaSurtidor: values.lecturaSurtidor,
          avion: values.avion,
        },
      ])

      if (error) throw error
      
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