import { Formik, Form } from 'formik'
import { Plane, Clock, User, MapPin, Hash } from 'lucide-react'

// Componentes UI
import FormField from './ui/FormField'
import FormSelect from './ui/FormSelect'
import FormButton from './ui/FormButton'
import FormHeader from './ui/FormHeader'

// Schemas y constantes
import { flightSchema } from '../schemas/flightSchema'
import { FLIGHT_INITIAL_VALUES } from '../constants/formInitialValues'
import { AIRCRAFT_OPTIONS, INSTRUCTOR_OPTIONS, FLIGHT_TYPE_OPTIONS } from '../constants/formOptions'

// Hooks
import { useFlightSubmission } from '../hooks/useFlightSubmission'

export default function FlightsForm() {
  const { submitFlight } = useFlightSubmission()

  return (
    <div className="w-full mx-auto bg-card rounded-xl p-6 shadow-lg animate-slide-in-up">
      <FormHeader icon={Plane} title="Registrar Vuelo" />

      <Formik
        initialValues={FLIGHT_INITIAL_VALUES}
        validationSchema={flightSchema}
        onSubmit={submitFlight}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha del vuelo */}
            <FormField
              name="fecha"
              label="Fecha del vuelo"
              type="date"
              icon={Clock}
            />

            {/* Avión */}
            <FormSelect
              name="avion"
              label="Avión"
              options={AIRCRAFT_OPTIONS}
              placeholder="Seleccionar avión..."
              icon={Plane}
            />

            {/* Piloto */}
            <FormField
              name="piloto"
              label="Piloto"
              placeholder="Nombre del piloto"
              icon={User}
            />

            {/* Instructor */}
            <FormSelect
              name="instructor"
              label="Instructor"
              options={INSTRUCTOR_OPTIONS}
              placeholder="Seleccionar Instructor..."
              icon={User}
            />

            {/* Hora de despegue */}
            <FormField
              name="horaDespegue"
              label="Hora Despegue"
              type="time"
              icon={Clock}
            />

            {/* Hora de aterrizaje */}
            <FormField
              name="horaAterrizaje"
              label="Hora Aterrizaje"
              type="time"
              icon={Clock}
            />

            {/* Tipo de vuelo */}
            <FormSelect
              name="tipoVuelo"
              label="Tipo de Vuelo"
              options={FLIGHT_TYPE_OPTIONS}
              placeholder="Seleccionar tipo..."
              icon={Hash}
            />

            {/* Cantidad de aterrizajes */}
            <FormField
              name="cantidadAterrizajes"
              label="Cantidad de Aterrizajes"
              type="number"
              placeholder="Ej: 2"
              min="0"
              icon={Hash}
            />

            {/* Comienzo vuelo */}
            <FormField
              name="comienzoVuelo"
              label="Aeródromo de Origen"
              placeholder="Ej: Ezeiza (SAEZ)"
              icon={MapPin}
            />

            {/* Finalizar vuelo */}
            <FormField
              name="finalizarVuelo"
              label="Aeródromo de Destino"
              placeholder="Ej: San Fernando (SADF)"
              icon={MapPin}
            />

            {/* Botón enviar */}
            <div className="md:col-span-2 pt-4">
              <FormButton
                isLoading={isSubmitting}
                loadingText="Guardando..."
                variant="primary"
              >
                Registrar Vuelo
              </FormButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
