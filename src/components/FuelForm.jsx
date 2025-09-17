import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../data/supabaseClient'
import Swal from 'sweetalert2'

const fuelSchema = Yup.object().shape({
  fecha: Yup.date().required('La fecha es obligatoria'),
  litros: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('Los litros son obligatorios'),
  encargado: Yup.string().required('El encargado es obligatorio'),
})

const FuelForm = () => {
  return (
    <div className="w-full mx-auto mt-10 text-white rounded-2xl p-2">
      <h2 className="text-xl font-bold mb-4">Carga de Combustible</h2>

      <Formik
        initialValues={{ fecha: '', litros: '', encargado: '' }}
        validationSchema={fuelSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { error } = await supabase.from('fuel_records').insert([
              {
                fecha: values.fecha, // enviar directamente la fecha
                litros: Number(values.litros), // convertir a número
                encargado: values.encargado,
              },
            ])

            if (error) throw error
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Carga registrada con éxito ✅',
              showConfirmButton: false,
              timer: 1200,
            })
            resetForm()
          } catch (err) {
            console.error('Error guardando carga:', err.message)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'Hubo un error al registrar la carga ⚠️',
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Fecha */}
            <div>
              <label htmlFor="fecha" className="block mb-1 font-semibold">
                Fecha
              </label>
              <Field
                type="date"
                id="fecha"
                name="fecha"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="fecha"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Litros */}
            <div>
              <label htmlFor="litros" className="block mb-1 font-semibold">
                Litros cargados
              </label>
              <Field
                type="number"
                id="litros"
                name="litros"
                placeholder="Ej: 120"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="litros"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Encargado */}
            <div>
              <label htmlFor="encargado" className="block mb-1 font-semibold">
                Encargado de la carga
              </label>
              <Field
                type="text"
                id="encargado"
                name="encargado"
                placeholder="Nombre del encargado"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
              <ErrorMessage
                name="encargado"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium transition-colors"
            >
              {isSubmitting ? 'Guardando...' : 'Registrar carga'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FuelForm
