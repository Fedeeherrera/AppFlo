import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { supabase } from '../data/supabaseClient'
import Swal from 'sweetalert2'
import { Fuel, Calendar, Droplets, User, Plane } from 'lucide-react'

const fuelSchema = Yup.object().shape({
  fecha: Yup.date().required('La fecha es obligatoria'),
  litros: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('Los litros son obligatorios'),
  encargado: Yup.string().required('El encargado es obligatorio'),
  lecturaSurtidor: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('La lectura es obligatoria'),
  avion: Yup.string().required('El avión es obligatorio'),
})

const FuelForm = () => {
  return (
    <div className="w-full mx-auto bg-card rounded-xl p-6 shadow-lg animate-slide-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Fuel className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Carga de Combustible
        </h2>
      </div>

      <Formik
        initialValues={{
          fecha: '',
          litros: '',
          encargado: '',
          lecturaSurtidor: 0,
          avion: "",
        }}
        validationSchema={fuelSchema}
        onSubmit={async (values, { resetForm }) => {
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
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Fecha */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Calendar className="w-4 h-4" />
                Fecha de la carga
              </label>
              <Field
                type="date"
                name="fecha"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
              <ErrorMessage
                name="fecha"
                component="div"
                className="text-destructive text-sm font-medium"
              />
            </div>

            {/* Avion */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Plane className="w-4 h-4" />
                Avión
              </label>
              <Field
                as="select"
                name="avion"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              >
                <option value="">Seleccionar avión...</option>
                <option value="lvncu">LV-NCU</option>
                <option value="lvyge">LV-YGE</option>
                <option value="lviwc">LV-IWC</option>
              </Field>
              <ErrorMessage name="avion" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Litros */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Droplets className="w-4 h-4" />
                Litros cargados
              </label>
              <Field
                type="number"
                name="litros"
                placeholder="Ej: 120"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                min="0"
                step="0.1"
              />
              <ErrorMessage
                name="litros"
                component="div"
                className="text-destructive text-sm font-medium"
              />
            </div>
            {/* Lectura Surtidor */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Fuel className="w-4 h-4" />
                Lectura Surtidor
              </label>
              <Field
                type="number"
                name="lecturaSurtidor"
                placeholder="Ej: 120"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                min="0"
                step="0.1"
              />
              <ErrorMessage
                name="lecturaSurtidor"
                component="div"
                className="text-destructive text-sm font-medium"
              />
            </div>

            {/* Encargado */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <User className="w-4 h-4" />
                Encargado de la carga
              </label>
              <Field
                type="text"
                name="encargado"
                placeholder="Nombre del encargado"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
              <ErrorMessage
                name="encargado"
                component="div"
                className="text-destructive text-sm font-medium"
              />
            </div>

            {/* Botón */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-sky-600 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin"></div>
                    Guardando...
                  </span>
                ) : (
                  'Registrar Carga'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FuelForm
