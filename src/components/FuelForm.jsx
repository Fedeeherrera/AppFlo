import { Formik, Form } from 'formik'
import { Fuel, Calendar, Droplets, User, Plane } from 'lucide-react'

// Componentes UI
import FormField from './ui/FormField'
import FormSelect from './ui/FormSelect'
import FormButton from './ui/FormButton'
import FormHeader from './ui/FormHeader'

// Schemas y constantes
import { fuelSchema } from '../schemas/fuelSchema'
import { FUEL_INITIAL_VALUES } from '../constants/formInitialValues'
import { FUEL_AIRCRAFT_OPTIONS } from '../constants/formOptions'

// Hooks
import { useFuelSubmission } from '../hooks/useFuelSubmission'

const FuelForm = () => {
  const { submitFuel } = useFuelSubmission()

  return (
    <div className="w-full mx-auto bg-card rounded-xl p-6 shadow-lg animate-slide-in-up">
      <FormHeader icon={Fuel} title="Carga de Combustible" iconColor="text-accent" />

      <Formik
        initialValues={FUEL_INITIAL_VALUES}
        validationSchema={fuelSchema}
        onSubmit={submitFuel}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Fecha */}
            <FormField
              name="fecha"
              label="Fecha de la carga"
              type="date"
              icon={Calendar}
            />

            {/* Avion */}
            <FormSelect
              name="avion"
              label="Avión"
              options={FUEL_AIRCRAFT_OPTIONS}
              placeholder="Seleccionar avión..."
              icon={Plane}
            />

            {/* Litros */}
            <FormField
              name="litros"
              label="Litros cargados"
              type="number"
              placeholder="Ej: 120"
              min="0"
              step="0.1"
              icon={Droplets}
            />

            {/* Lectura Surtidor */}
            <FormField
              name="lecturaSurtidor"
              label="Lectura Surtidor"
              type="number"
              placeholder="Ej: 120"
              min="0"
              step="0.1"
              icon={Fuel}
            />

            {/* Encargado */}
            <FormField
              name="encargado"
              label="Encargado de la carga"
              placeholder="Nombre del encargado"
              icon={User}
            />

            {/* Botón */}
            <div className="pt-4">
              <FormButton
                isLoading={isSubmitting}
                loadingText="Guardando..."
                variant="accent"
              >
                Registrar Carga
              </FormButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FuelForm
