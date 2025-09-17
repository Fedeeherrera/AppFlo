import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { supabase } from "../data/supabaseClient"
import Swal from "sweetalert2"
import { Plane, Clock, User, MapPin, Hash } from "lucide-react"

const vueloSchema = Yup.object().shape({
  fecha: Yup.date().required("La fecha es obligatoria"),
  avion: Yup.string().required("El avión es obligatorio"),
  piloto: Yup.string().required("El piloto es obligatorio"),
  tipoVuelo: Yup.string().required("El tipo de vuelo es obligatorio"),
  horaDespegue: Yup.string().required("La hora de despegue es obligatoria"),
  horaAterrizaje: Yup.string().required("La hora de aterrizaje es obligatoria"),
  cantidadAterrizajes: Yup.number()
    .min(0, "Debe ser un número positivo")
    .required("La cantidad de aterrizajes es obligatoria"),
  comienzoVuelo: Yup.string().required("El comienzo del vuelo es obligatorio"),
  finalizarVuelo: Yup.string().required("El final del vuelo es obligatorio"),
})

export default function FlightsForm() {
  return (
    <div className="w-full mx-auto bg-card rounded-xl p-6 shadow-lg animate-slide-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Plane className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Registrar Vuelo</h2>
      </div>

      <Formik
        initialValues={{
          fecha: "",
          avion: "",
          piloto: "",
          tipoVuelo: "",
          horaDespegue: "",
          horaAterrizaje: "",
          cantidadAterrizajes: "",
          comienzoVuelo: "",
          finalizarVuelo: "",
        }}
        validationSchema={vueloSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { error } = await supabase.from("flight_records").insert([
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
              position: "top-end",
              icon: "success",
              title: "Vuelo Registrado Con Éxito ✈️",
              showConfirmButton: false,
              timer: 1500,
            })
            resetForm()
          } catch (err) {
            console.error("Error guardando vuelo:", err.message)
            Swal.fire({
              icon: "error",
              title: "Error",
              showConfirmButton: false,
              text: "Hubo un error al registrar el vuelo",
              timer: 2000,
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha del vuelo */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Clock className="w-4 h-4" />
                Fecha del vuelo
              </label>
              <Field
                type="date"
                name="fecha"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
              <ErrorMessage name="fecha" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Avión */}
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

            {/* Piloto */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <User className="w-4 h-4" />
                Piloto
              </label>
              <Field
                name="piloto"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Nombre del piloto"
              />
              <ErrorMessage name="piloto" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Tipo de vuelo */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Hash className="w-4 h-4" />
                Tipo de Vuelo
              </label>
              <Field
                as="select"
                name="tipoVuelo"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              >
                <option value="">Seleccionar tipo...</option>
                <option value="instruccion">Instrucción</option>
                <option value="recreativo">Recreativo</option>
                <option value="traslado">Traslado</option>
              </Field>
              <ErrorMessage name="tipoVuelo" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Hora de despegue */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Clock className="w-4 h-4" />
                Hora Despegue
              </label>
              <Field
                type="time"
                name="horaDespegue"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
              <ErrorMessage name="horaDespegue" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Hora de aterrizaje */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Clock className="w-4 h-4" />
                Hora Aterrizaje
              </label>
              <Field
                type="time"
                name="horaAterrizaje"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
              <ErrorMessage name="horaAterrizaje" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Cantidad de aterrizajes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <Hash className="w-4 h-4" />
                Cantidad de Aterrizajes
              </label>
              <Field
                type="number"
                name="cantidadAterrizajes"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Ej: 2"
                min="0"
              />
              <ErrorMessage
                name="cantidadAterrizajes"
                component="div"
                className="text-destructive text-sm font-medium"
              />
            </div>

            {/* Comienzo vuelo */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <MapPin className="w-4 h-4" />
                Aeródromo de Origen
              </label>
              <Field
                name="comienzoVuelo"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Ej: Ezeiza (SAEZ)"
              />
              <ErrorMessage name="comienzoVuelo" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Finalizar vuelo */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                <MapPin className="w-4 h-4" />
                Aeródromo de Destino
              </label>
              <Field
                name="finalizarVuelo"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Ej: San Fernando (SADF)"
              />
              <ErrorMessage name="finalizarVuelo" component="div" className="text-destructive text-sm font-medium" />
            </div>

            {/* Botón enviar */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-sky-600 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className=" w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Guardando...
                  </span>
                ) : (
                  "Registrar Vuelo"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
