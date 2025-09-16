import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../data/supabaseClient'
import Swal from 'sweetalert2'

const vueloSchema = Yup.object().shape({
  fecha: Yup.date().required('La fecha es obligatoria'),
  avion: Yup.string().required('El avión es obligatorio'),
  piloto: Yup.string().required('El piloto es obligatorio'),
  tipoVuelo: Yup.string().required('El tipo de vuelo es obligatorio'),
  horaDespegue: Yup.string().required('La hora de despegue es obligatoria'),
  horaAterrizaje: Yup.string().required('La hora de aterrizaje es obligatoria'),
  cantidadAterrizajes: Yup.number()
    .min(0, 'Debe ser un número positivo')
    .required('La cantidad de aterrizajes es obligatoria'),
  comienzoVuelo: Yup.string().required('El comienzo del vuelo es obligatorio'),
  finalizarVuelo: Yup.string().required('El final del vuelo es obligatorio'),
})

export default function FlightsForm() {
  return (
    <div className="mx-auto mt-10 bg-gray-900 text-white shadow-lg rounded-2xl p-8">
      <h2 className="text-xl font-bold mb-6">Registrar Vuelo</h2>

      <Formik
        initialValues={{
          fecha: '',
          avion: '',
          piloto: '',
          tipoVuelo: '',
          horaDespegue: '',
          horaAterrizaje: '',
          cantidadAterrizajes: '',
          comienzoVuelo: '',
          finalizarVuelo: '',
        }}
        validationSchema={vueloSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { error } = await supabase.from('flight_records').insert([
              {
                fecha: values.fecha,
                avion: values.avion,
                piloto: values.piloto,
                tipoVuelo: values.tipoVuelo,
                horaDespegue: values.horaDespegue,
                horaAterrizaje: values.horaAterrizaje,
                cantidadAterrizajes: Number(values.cantidadAterrizajes),
                comienzoVuelo: values.comienzoVuelo,
                finalizarVuelo: values.finalizarVuelo,
              },
            ])
            if (error) throw error
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Vuelo Registrado Con Exito ✅',
              showConfirmButton: false,
              timer: 1200,
            })
            resetForm()
          } catch (err) {
            console.error('Error guardando vuelo:', err.message)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'Hubo un error al registrar el vuelo ⚠️',
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha del vuelo */}
            <div>
              <label className="block text-sm font-medium">
                Fecha del vuelo
              </label>
              <Field
                type="date"
                name="fecha"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="fecha"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Avión */}
            <div>
              <label className="block text-sm font-medium">Avión</label>
              <Field
                name="avion"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: LV-ABC"
              />
              <ErrorMessage
                name="avion"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Piloto */}
            <div>
              <label className="block text-sm font-medium">Piloto</label>
              <Field
                name="piloto"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del piloto"
              />
              <ErrorMessage
                name="piloto"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Tipo de vuelo */}
            <div>
              <label className="block text-sm font-medium">Tipo de Vuelo</label>
              <Field
                as="select"
                name="tipoVuelo"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar...</option>
                <option value="instruccion">Instrucción</option>
                <option value="recreativo">Recreativo</option>
                <option value="traslado">Traslado</option>
              </Field>
              <ErrorMessage
                name="tipoVuelo"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Cantidad de aterrizajes */}
            <div>
              <label className="block text-sm font-medium">
                Cantidad de Aterrizajes
              </label>
              <Field
                type="number"
                name="cantidadAterrizajes"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 2"
              />
              <ErrorMessage
                name="cantidadAterrizajes"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Hora de despegue */}
            <div>
              <label className="block text-sm font-medium">Hora Despegue</label>
              <Field
                type="time"
                name="horaDespegue"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="horaDespegue"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Hora de aterrizaje */}
            <div>
              <label className="block text-sm font-medium">
                Hora Aterrizaje
              </label>
              <Field
                type="time"
                name="horaAterrizaje"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="horaAterrizaje"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Comienzo vuelo */}
            <div>
              <label className="block text-sm font-medium">
                Comienzo del Vuelo
              </label>
              <Field
                name="comienzoVuelo"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Ezeiza"
              />
              <ErrorMessage
                name="comienzoVuelo"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Finalizar vuelo */}
            <div>
              <label className="block text-sm font-medium">
                Finalizar Vuelo
              </label>
              <Field
                name="finalizarVuelo"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: San Fernando"
              />
              <ErrorMessage
                name="finalizarVuelo"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Botón enviar en full width */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded-md"
              >
                {isSubmitting ? 'Guardando...' : 'Registrar Vuelo'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
